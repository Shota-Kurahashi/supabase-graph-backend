import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostUpdatekeepedInput } from './dto/post-updatekeeped.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/strategy/gql-auth-guard';
@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.postsService.findOne(id);
  }

  @Query(() => [Post], { name: 'postsByUserId' })
  findUserPosts(@Args('userId', { type: () => String }) userId: string) {
    return this.postsService.findUserPosts(userId);
  }

  @Query(() => [Post], { name: 'keepPosts' })
  findKeepPosts(@Args('userId', { type: () => String }) userId: string) {
    return this.postsService.findKeepPosts(userId);
  }

  @Query(() => [Post], { name: 'followAndSelfPosts' })
  findFollowAndSelfPosts(
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.postsService.findFollowAndSelfPosts(userId);
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
  addKeepPost(
    @Args('postUpdatekeepedInput')
    postUpdatekeepedInput: PostUpdatekeepedInput,
  ) {
    return this.postsService.keep(postUpdatekeepedInput);
  }

  @Mutation(() => Post)
  removePost(
    @Args('id', { type: () => String }) id: string,
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.postsService.remove(userId, id);
  }
}
