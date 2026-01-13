import { Component, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { Posts } from '../../../models/posts.model';
import { form, required, minLength, FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-modal-posts-form',
  imports: [DialogModule, FormField, FormsModule, SelectModule],
  templateUrl: './modal-posts-form.html',
  styleUrl: './modal-posts-form.css',
})
export class ModalPostsForm {
  ref = inject(DynamicDialogRef);
  service = inject(PostsService);
  private dialogConfig = inject(DynamicDialogConfig);
  isLoading = false;
  data!: null | Posts;

  options = [
    { label: 'User 1', value: 1 },
    { label: 'User 2', value: 2 },
  ];

  formSignal = signal<Posts>({
    userId: 0,
    id: 0,
    title: '',
    body: '',
  });

  form = form(this.formSignal, (item) => {
    required(item.title);
    minLength(item.title, 3);
    required(item.body);
    minLength(item.body, 3);
  });

  ngOnInit() {
    this.data = this.dialogConfig.data['posts'];
    if (this.data) {
      this.formSignal.set(this.data);
    }
  }

  closeDialog(result: boolean) {
    this.ref.close(result);
  }
  onSave() {
    this.form().touched();
    if (this.form().valid()) {
      this.isLoading = true;
      const body: any = this.form().value();
      const id = +body.id;
      if (this.data == null) {
        delete body.id;
        this.service.savePosts(body).subscribe((res) => {
          this.isLoading = false;
          this.ref.close(true);
        });
      } else {
        this.service.updatePosts(id, body).subscribe((res) => {
          this.isLoading = false;
          this.ref.close(true);
        });
      }
    }
  }
}
