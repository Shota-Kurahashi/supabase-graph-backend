import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserUpdatefollowInput } from './dto/user-updatefollow.input';
import { UserInput } from './dto/user-InputUserId.input';

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
  findOne(@Args('userInput') userInput: UserInput) {
    return this.usersService.findOne(userInput.userId);
  }

  @Mutation(() => User)
  removeUser(@Args('userInput') userInput: UserInput) {
    return this.usersService.remove(userInput.userId);
  }

  @Mutation(() => User, { name: 'follow' })
  follow(
    @Args('userUpdatefollowInput') userUpdatefollowInput: UserUpdatefollowInput,
  ) {
    return this.usersService.follow(userUpdatefollowInput);
  }
}
