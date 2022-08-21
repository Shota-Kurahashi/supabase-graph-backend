import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  id: string;
  userId?: string;
  ipAdress?: number;
  createdAt: Date;
  updatedAt: Date;
  authorRole: string;
  authorName: string;
  startTime: Date;
  airtime: Date;
  title: string;
  @Field(() => Int)
  episode?: number;
  category: string;
  content?: string;
  participant: string[];
  // comments: Comment[];
  keeped: string[];
  public: boolean;
}
