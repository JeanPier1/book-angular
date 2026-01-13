import { Component, inject, signal } from '@angular/core';
import { PostsList } from '../posts-list/posts-list';
import { PostsFilter } from '../posts-filter/posts-filter';
import { PostsService } from '../../services/posts.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Posts } from '../../models/posts.model';
import { handleResponseError } from '../../../../helpers/handleResponseError';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalPostsForm } from '../modals/modal-posts-form/modal-posts-form';
import { MessageService } from 'primeng/api';
import { NotificationUtilService } from '@/app/utils/notification-util.service';

@Component({
  selector: 'app-posts-main',
  imports: [PostsList, PostsFilter],
  providers: [NotificationUtilService],
  templateUrl: './posts-main.html',
  styleUrl: './posts-main.css',
})
export class PostsMain {
  service = inject(PostsService);
  messageService = inject(MessageService);
  notificationUtilService = inject(NotificationUtilService);
  ref!: DynamicDialogRef | null;
  dialogService = inject(DialogService);
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

  add() {
    this.ref = this.dialogService.open(ModalPostsForm, {
      header: 'Registrar Publicación',
      width: '70vw',
      maximizable: false,
      closable: true,
      modal: true,
      data: {
        posts: null,
      },
    });
    this.ref?.onClose.subscribe((data: boolean) => {
      if (data) {
        this.posts.reload();
        this.messageService.add({
          severity: 'success',
          summary: 'Creado',
          detail: 'Realizado correctamente',
          life: 3000,
        });
      }
    });
  }

  edit(item: Posts) {
    this.service.getPostsById(item.id).subscribe((res) => {
      this.ref = this.dialogService.open(ModalPostsForm, {
        header: 'Editar Publicación',
        width: '70vw',
        maximizable: false,
        closable: true,
        modal: true,
        data: {
          posts: res,
        },
      });
      this.ref?.onClose.subscribe((data: boolean) => {
        if (data) {
          this.posts.reload();
          this.messageService.add({
            severity: 'success',
            summary: 'Editado',
            detail: 'Realizado correctamente',
            life: 3000,
          });
        }
      });
    });
  }

  delete(index: number) {
    this.notificationUtilService.configDelete(
      'Eliminar Publicación',
      '¿Está seguro de eliminar esta publicación?',
      () => {
        this.service.deletePosts(index).subscribe((res) => {
          this.posts.reload();
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'Realizado correctamente',
            life: 3000,
          });
        });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la publicación',
          life: 3000,
        });
      },
    );
  }

  paramsChange({ action, values }: { action: string; values: any }) {
    switch (action) {
      case 'create':
        this.add();
        break;
    }
  }
}
