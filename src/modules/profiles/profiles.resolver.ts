import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ) {
    return this.profilesService.create(createProfileInput);
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('userId', { type: () => String }) userId: string) {
    return this.profilesService.findOne(userId);
  }

  @Query(() => Profile, { name: 'profileByUserName' })
  findOneByUserName(
    @Args('userName', { type: () => String }) userName: string,
  ) {
    return this.profilesService.findOneByUserName(userName);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profilesService.update(
      updateProfileInput.userId,
      updateProfileInput,
    );
  }
}
