import { Routes } from '@angular/router';
import { App } from './app';
import { Comments } from './components/comments/comments';

export const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
      {
        path: 'posts',
        loadChildren: () => import('./components/posts/posts.routes').then((m) => m.routes),
      },
    ],
  },
];
