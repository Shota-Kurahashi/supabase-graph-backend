import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  updatedAt!: Date;

  @Field(() => [Post], { nullable: true })
  posts?: Array<Post>;

  @Field(() => [Comment], { nullable: true })
  comments?: Array<Comment>;

  @Field(() => [String], { nullable: true })
  keepPost!: Array<string>;

  @Field(() => Profile, { nullable: true })
  profile?: Profile | null;

  @Field(() => [String], { nullable: true })
  follow!: Array<string>;

  @Field(() => [String], { nullable: true })
  followed!: Array<string>;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  deleted!: boolean;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}
