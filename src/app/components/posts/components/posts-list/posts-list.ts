import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Posts } from '../../models/posts.model';

@Component({
  selector: 'app-posts-list',
  imports: [],
  templateUrl: './posts-list.html',
  styleUrl: './posts-list.css',
})
export class PostsList {
  @Input() items: Posts[] = [];

  @Output() pageChange = new EventEmitter<number>();
  @Output() editChange = new EventEmitter<Posts>();
  @Output() deleteChange = new EventEmitter<number>();

  onPageChange(page: number) {
    this.deleteChange.emit(page);
  }

  onEdit(item: Posts) {
    this.editChange.emit(item);
  }

  onDelete(index: number) {
    this.deleteChange.emit(index);
  }
}
