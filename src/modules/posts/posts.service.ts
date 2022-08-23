import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { PostUpdatekeepedInput } from './dto/post-updatekeeped.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPostInput: CreatePostInput) {
    return this.prisma.post.create({
      data: {
        ...createPostInput,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      take: 100,
      include: {
        comments: true,
        _count: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const post = this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: true,
        _count: true,
      },
    });

    if (!post) {
      throw new ForbiddenException('投稿が見つかりません');
    }
    return post;
  }

  async findUserPosts(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('ユーザが見つかりません');
    }

    const posts = await this.prisma.post.findMany({
      take: 100,
      where: {
        userId,
      },
      include: {
        comments: true,
        _count: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  }

  findKeepPosts(userId: string) {
    return this.prisma.post.findMany({
      take: 100,
      where: {
        keeped: {
          hasEvery: userId,
        },
      },
      include: {
        comments: true,
        _count: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findFollowAndSelfPosts(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('ユーザが見つかりません');
    }

    const followerPosts = await Promise.all(
      user.follow.map((followId) => this.findUserPosts(followId)),
    );

    const selfPosts = await this.findUserPosts(userId);

    return selfPosts.concat(...followerPosts);
  }

  async update(userId: string, id: string, updatePostInput: UpdatePostInput) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post || post.userId !== userId)
      throw new ForbiddenException('No permision to update');
    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostInput,
      },
    });
  }

  async keep(postUpdatekeepedInput: PostUpdatekeepedInput) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postUpdatekeepedInput.postId,
      },
    });

    if (!post) {
      throw new ForbiddenException('投稿が見つかりません');
    }
    //すでに登録済みだったら削除
    if (post.keeped?.includes(postUpdatekeepedInput.userId)) {
      const removeKeepPost = this.prisma.post.update({
        where: {
          id: postUpdatekeepedInput.postId,
        },
        data: {
          keeped: {
            set: post.keeped.filter(
              (userId) => userId !== postUpdatekeepedInput.userId,
            ),
          },
        },
        include: {
          comments: true,
          _count: true,
        },
      });

      return removeKeepPost;
    }

    //登録済みでなければ追加
    const addedPost = this.prisma.post.update({
      where: {
        id: postUpdatekeepedInput.postId,
      },
      data: {
        keeped: {
          push: postUpdatekeepedInput.userId,
        },
      },
      include: {
        comments: true,
        _count: true,
      },
    });

    return addedPost;
  }

  async remove(userId: string, id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (!post || post.userId !== userId)
      throw new ForbiddenException('No permision to delete');
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
