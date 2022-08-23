import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class UserInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
}
