import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProfileInput: CreateProfileInput) {
    return this.prisma.profile.create({
      data: {
        ...createProfileInput,
      },
    });
  }

  findOne(userId: string) {
    return this.prisma.profile.findUnique({
      where: { userId },
    });
  }

  findOneByUserName(userName: string) {
    return this.prisma.profile.findUnique({
      where: { username: userName },
    });
  }

  async update(userId: string, updateProfileInput: UpdateProfileInput) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile || profile.userId !== userId) {
      throw new ForbiddenException('No permision to update');
    }

    return this.prisma.profile.update({
      where: { userId },
      data: {
        ...updateProfileInput,
      },
    });
  }
}
