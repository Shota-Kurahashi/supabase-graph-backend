import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserUpdatefollowInput } from './dto/user-updatefollow.input';
import { CurrentUser } from '../auth/decorator/user.decorator';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';
import { UserInput } from './dto/user-InputUserId.input';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('userInput') userInput: UserInput) {
    return this.usersService.create(userInput.userId);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@CurrentUser() user: SupabaseAuthUser) {
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  removeUser(@CurrentUser() user: SupabaseAuthUser) {
    return this.usersService.remove(user.id);
  }

  @Mutation(() => User, { name: 'follow' })
  follow(
    @Args('userUpdatefollowInput') userUpdatefollowInput: UserUpdatefollowInput,
  ) {
    return this.usersService.follow(userUpdatefollowInput);
  }
}
