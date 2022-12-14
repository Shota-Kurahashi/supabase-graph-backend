import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  imports: [PrismaModule, ProfilesModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
