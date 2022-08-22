import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
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

  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: true,
        _count: true,
      },
    });
  }

  findUserPosts(userId: string) {
    return this.prisma.post.findMany({
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
