import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      take: 100,
      //   include: {},
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPost(id: string): Promise<Post> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }

  async createPost(post: Post): Promise<Post> {
    return this.prisma.post.create({
      data: post,
    });
  }

  async updatePost(id: string, post: Post): Promise<Post> {
    return this.prisma.post.update({
      where: {
        id,
      },
      data: post,
    });
  }

  async deletePost(id: string): Promise<Post> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }

  async getTargetUserPosts(targetUserId: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        userId: targetUserId,
      },
    });
  }
}
