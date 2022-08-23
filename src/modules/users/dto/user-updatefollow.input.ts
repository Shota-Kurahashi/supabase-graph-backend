import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UserUpdatefollowInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  followingUserId!: string;
}
