import { Route } from '@angular/router';
import { PostsMain } from './components/posts-main/posts-main';

export const routes: Route[] = [
  {
    path: '',
    component: PostsMain,
  },
];
