import { Field, ID } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class PostUpdatekeepedInput {
  @Field(() => ID, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  postId!: string;
}
