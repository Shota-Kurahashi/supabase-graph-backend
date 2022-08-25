import { InputType, Int, Field } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import {
  IsBoolean,
  IsIP,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinDate,
} from 'class-validator';
import { Category } from 'src/@generated/prisma-nestjs-graphql/prisma/category.enum';
import { Role } from 'src/@generated/prisma-nestjs-graphql/prisma/role.enum';
const today = new Date();

@InputType()
export class CreatePostInput {
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsIP()
  ipAddress?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;

  @Field(() => Role, { nullable: true })
  @IsOptional()
  authorRole?: keyof typeof Role;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  authorName!: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @MinDate(today)
  startTime?: Date | string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @MinDate(today)
  airtime?: Date | string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title!: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  episode?: number;

  @Field(() => Category, { nullable: true })
  @IsOptional()
  category?: keyof typeof Category;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  content?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  public?: boolean;
}
