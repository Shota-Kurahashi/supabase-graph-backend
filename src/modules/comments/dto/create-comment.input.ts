import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Role } from 'src/modules/posts/entities/role.enum';
import { CommentCreatelikesInput } from '../entities/comment-createlikes.input';
import { CommentCreatespoilersInput } from '../entities/comment-createspoilers.input';
import { CommentCreateunLikedInput } from '../entities/comment-createun-liked.input';

@InputType()
export class CreateCommentInput {
  @Field(() => Float, { nullable: true })
  @IsOptional()
  ipAddress?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  postId!: string;

  @Field(() => Role, { nullable: true })
  @IsOptional()
  authorRole?: keyof typeof Role;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @Field(() => CommentCreatelikesInput, { nullable: true })
  @IsOptional()
  likes?: CommentCreatelikesInput;

  @Field(() => CommentCreateunLikedInput, { nullable: true })
  @IsOptional()
  unLiked?: CommentCreateunLikedInput;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  spoiler?: boolean;

  @Field(() => CommentCreatespoilersInput, { nullable: true })
  @IsOptional()
  spoilers?: CommentCreatespoilersInput;
}
