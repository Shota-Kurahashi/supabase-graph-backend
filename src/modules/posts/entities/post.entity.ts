import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

import { Int } from '@nestjs/graphql';
import { PostCount } from 'src/@generated/prisma-nestjs-graphql/post/post-count.output';
import { Category } from 'src/@generated/prisma-nestjs-graphql/prisma/category.enum';
import { Role } from 'src/@generated/prisma-nestjs-graphql/prisma/role.enum';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Float, { nullable: true })
  ipAddress!: number | null;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => String, { nullable: true })
  userId!: string | null;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => Role, { nullable: false, defaultValue: 'ANONYMOUS' })
  authorRole!: keyof typeof Role;

  @Field(() => String, { nullable: false })
  authorName!: string;

  @Field(() => Date, { nullable: false })
  startTime!: Date;

  @Field(() => Date, { nullable: false })
  airtime!: Date;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => Int, { nullable: true })
  episode!: number | null;

  @Field(() => Category, { nullable: false, defaultValue: 'Unknown' })
  category!: keyof typeof Category;

  @Field(() => String, { nullable: true })
  content!: string | null;

  @Field(() => [String], { nullable: true })
  participant!: Array<string>;

  @Field(() => [Comment], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => [String], { nullable: true })
  keeped!: Array<string>;

  @Field(() => Boolean, { nullable: false, defaultValue: true })
  public!: boolean;

  @Field(() => PostCount, { nullable: false })
  _count?: PostCount;
}
