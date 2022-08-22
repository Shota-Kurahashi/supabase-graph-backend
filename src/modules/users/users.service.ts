import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(id: string) {
    return this.prisma.user.create({
      data: {
        id,
      },
    });
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
