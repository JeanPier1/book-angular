import { Component, inject, signal } from '@angular/core';
import { PostsList } from '../posts-list/posts-list';
import { PostsFilter } from '../posts-filter/posts-filter';
import { PostsService } from '../../services/posts.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Posts } from '../../models/posts.model';
import { handleResponseError } from '../../../../helpers/handleResponseError';

@Component({
  selector: 'app-posts-main',
  imports: [PostsList, PostsFilter],
  templateUrl: './posts-main.html',
  styleUrl: './posts-main.css',
})
export class PostsMain {
  service = inject(PostsService);
  filterForm = signal<any>({
    page: 1,
    size: 10,
    search: '',
  });

  posts = rxResource<Posts[], any>({
    params: () => this.filterForm(),
    stream: () => {
      return this.service.getPosts(this.filterForm()).pipe(handleResponseError());
    },
  });

  edit(item: Posts) {}

  delete(index: number) {}
}
