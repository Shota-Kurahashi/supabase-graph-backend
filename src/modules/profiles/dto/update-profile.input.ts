import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ProfileCreatefavoriteInput } from 'src/@generated/prisma-nestjs-graphql/profile/profile-createfavorite.input';
import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  userId!: string;

  @Field(() => ProfileCreatefavoriteInput, { nullable: true })
  @IsOptional()
  favorite?: ProfileCreatefavoriteInput;

  @Field(() => String, { nullable: true })
  @IsOptional()
  twitterId?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  img?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  username?: string;
}
