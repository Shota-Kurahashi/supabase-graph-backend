import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { SupabaseStrategy } from '../auth/strategy/jwt.strategy';

@Module({
  imports: [PrismaModule, PassportModule],
  providers: [PostsResolver, PostsService, SupabaseStrategy],
})
export class PostsModule {}
