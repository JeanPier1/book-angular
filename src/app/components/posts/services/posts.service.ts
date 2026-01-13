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

  getPostsById(id: number) {
    return this.http.get<Posts>(`${environment.apiUrl}/${environment.api.posts}/${id}`);
  }

  savePosts(body: any) {
    return this.http.post(`${environment.apiUrl}/${environment.api.posts}`, body);
  }

  updatePosts(id: number, body: any) {
    return this.http.put(`${environment.apiUrl}/${environment.api.posts}/${id}`, body);
  }

  deletePosts(id: number) {
    return this.http.delete(`${environment.apiUrl}/${environment.api.posts}/${id}`);
  }
}
