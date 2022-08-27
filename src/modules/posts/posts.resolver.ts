import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostUpdatekeepedInput } from './dto/post-updatekeeped.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { SupabaseAuthUser } from 'nestjs-supabase-auth';
import { CurrentUser } from '../auth/decorator/user.decorator';
@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.postsService.findOne(id);
  }

  @Query(() => [Post], { name: 'postsByUserId' })
  @UseGuards(GqlAuthGuard)
  findUserPosts(@CurrentUser() user: SupabaseAuthUser) {
    return this.postsService.findUserPosts(user.id);
  }

  @Query(() => [Post], { name: 'keepPosts' })
  @UseGuards(GqlAuthGuard)
  findKeepPosts(@CurrentUser() user: SupabaseAuthUser) {
    return this.postsService.findKeepPosts(user.id);
  }

  @Query(() => [Post], { name: 'followAndSelfPosts' })
  @UseGuards(GqlAuthGuard)
  findFollowAndSelfPosts(@CurrentUser() user: SupabaseAuthUser) {
    return this.postsService.findFollowAndSelfPosts(user.id);
  }
  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(
      updatePostInput.userId,
      updatePostInput.id,
      updatePostInput,
    );
  }

  @Mutation(() => Post, { name: 'keep' })
  @UseGuards(GqlAuthGuard)
  addKeepPost(
    @CurrentUser() user: SupabaseAuthUser,
    @Args('postUpdatekeepedInput')
    postUpdatekeepedInput: PostUpdatekeepedInput,
  ) {
    return this.postsService.keep(user.id, postUpdatekeepedInput);
  }

  @Mutation(() => Post)
  removePost(
    @Args('id', { type: () => String }) id: string,
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.postsService.remove(userId, id);
  }
}
