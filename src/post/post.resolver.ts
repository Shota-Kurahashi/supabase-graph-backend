import { Query, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }

  @Query(() => Post)
  async getPost(id: string): Promise<Post> {
    return this.postService.getPost(id);
  }
}
