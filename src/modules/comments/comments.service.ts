import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCommentInput: CreateCommentInput) {
    return this.prisma.comment.create({
      data: {
        ...createCommentInput,
      },
    });
  }

  findAll(postId: string) {
    return this.prisma.comment.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
