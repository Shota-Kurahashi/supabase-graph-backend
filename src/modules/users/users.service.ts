import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.prisma.user.findMany({
      take: 100,
      include: {
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

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
