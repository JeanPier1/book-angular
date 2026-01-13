import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-posts-filter',
  imports: [],
  templateUrl: './posts-filter.html',
  styleUrl: './posts-filter.css',
})
export class PostsFilter {
  @Output() paramsChange = new EventEmitter<{ action: string; values: any }>();

  createPost() {
    this.paramsChange.emit({ action: 'create', values: null });
  }
}
