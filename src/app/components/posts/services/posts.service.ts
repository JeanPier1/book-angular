import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../enviroment/enviroment';
import { Posts } from '../models/posts.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  http = inject(HttpClient);

  getPosts(params: any) {
    return this.http.get<Posts[]>(`${environment.apiUrl}/${environment.api.posts}`, {
      params: params,
    });
  }
}
