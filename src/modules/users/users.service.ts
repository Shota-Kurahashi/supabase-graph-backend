import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfilesService } from '../profiles/profiles.service';
import { UserUpdatefollowInput } from './dto/user-updatefollow.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profilesService: ProfilesService,
  ) {}

  async create(id: string) {
    try {
      const user = await this.prisma.user.create({
        data: {
          id,
        },
      });

      await this.profilesService.create({ userId: user.id });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('すでに登録されています');
        }
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      take: 100,
      include: {
        profile: true,
        posts: {
          include: {
            comments: true,
            _count: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        posts: {
          include: {
            comments: true,
            _count: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async follow(userUpdatefollowInput: UserUpdatefollowInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userUpdatefollowInput.userId,
      },
    });

    const followingUser = await this.prisma.user.findUnique({
      where: {
        id: userUpdatefollowInput.followingUserId,
      },
    });

    if (!user || !followingUser) {
      throw new ForbiddenException('ユーザーが見つかりません');
    }

    if (user.id === followingUser.id) {
      throw new ForbiddenException('自分をフォローできません');
    }

    //すでにフォロ-していたらフォロー解除
    if (user.follow.includes(followingUser.id)) {
      const removeFollow = await this.prisma.user.update({
        where: {
          id: userUpdatefollowInput.userId,
        },
        data: {
          follow: {
            set: user.follow.filter(
              (follow) => follow !== userUpdatefollowInput.followingUserId,
            ),
          },
        },
      });

      await this.prisma.user.update({
        where: {
          id: userUpdatefollowInput.followingUserId,
        },
        data: {
          followed: {
            set: followingUser.followed.filter(
              (followed) => followed !== userUpdatefollowInput.userId,
            ),
          },
        },
      });
      return removeFollow;
    }

    //フォローする
    const follow = await this.prisma.user.update({
      where: {
        id: userUpdatefollowInput.userId,
      },
      data: {
        follow: {
          push: userUpdatefollowInput.followingUserId,
        },
      },
    });

    await this.prisma.user.update({
      where: {
        id: userUpdatefollowInput.followingUserId,
      },
      data: {
        followed: {
          push: userUpdatefollowInput.userId,
        },
      },
    });
    return follow;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user || user.id !== id) {
      throw new ForbiddenException('No permision to delete');
    }

    //本番ではtrueにするだけ
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
  }
}
