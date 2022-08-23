import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserUpdatefollowInput } from './dto/user-updatefollow.input';
import { IsUUID } from 'class-validator';
import { UserInput } from './dto/user-InputUserId.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('userId') UserInput: UserInput) {
    return this.usersService.create(UserInput.userId);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('userId') UserInput: UserInput) {
    return this.usersService.findOne(UserInput.userId);
  }

  @Mutation(() => User)
  removeUser(@Args('userId') UserInput: UserInput) {
    return this.usersService.remove(UserInput.userId);
  }

  @Mutation(() => User, { name: 'follow' })
  follow(
    @Args('userUpdatefollowInput') userUpdatefollowInput: UserUpdatefollowInput,
  ) {
    return this.usersService.follow(userUpdatefollowInput);
  }
}
