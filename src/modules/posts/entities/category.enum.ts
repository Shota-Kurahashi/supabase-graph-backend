import { registerEnumType } from '@nestjs/graphql';

export enum Category {
  Anime = 'Anime',
  Drama = 'Drama',
  DramaMovie = 'DramaMovie',
  AnimeMovie = 'AnimeMovie',
  TV = 'TV',
  Music = 'Music',
  Unknown = 'Unknown',
}

registerEnumType(Category, { name: 'Category', description: undefined });
