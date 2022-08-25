import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Role } from 'src/@generated/prisma-nestjs-graphql/prisma/role.enum';
import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class Comment {
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

  @Field(() => Post, { nullable: false })
  post?: Post;

  @Field(() => String, { nullable: false })
  postId!: string;

  @Field(() => Role, { nullable: false, defaultValue: 'ANONYMOUS' })
  authorRole!: keyof typeof Role;

  @Field(() => String, { nullable: false })
  content!: string;

  @Field(() => [String], { nullable: true })
  likes!: Array<string>;

  @Field(() => [String], { nullable: true })
  unLiked!: Array<string>;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  spoiler!: boolean;

  @Field(() => [String], { nullable: true })
  spoilers!: Array<string>;
}
