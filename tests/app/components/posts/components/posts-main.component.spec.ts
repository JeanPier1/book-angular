import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsMain } from '@/app/components/posts/components/posts-main/posts-main';
import { PostsService } from '@/app/components/posts/services/posts.service';
import { of } from 'rxjs';
import { Posts } from '@/app/components/posts/models/posts.model';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

describe('<app-posts-main/>', () => {
  let component: PostsMain;
  let fixture: ComponentFixture<PostsMain>;

  const postsServiceMock = {
    getPosts: vi.fn(),
    getPostsById: vi.fn(),
    deletePosts: vi.fn(),
  };

  const dialogServiceMock = {
    open: vi.fn().mockReturnValue({ onClose: of(true) }),
  };

  const messageServiceMock = { add: vi.fn() };

  const confirmationServiceMock = {
    confirm: vi.fn((config) => {
      if (config.accept) config.accept();
    }),
  };

  const mockPosts: Posts[] = [
    { id: 1, title: 'Post 1', body: 'Contenido 1', userId: 1 } as Posts,
    { id: 2, title: 'Post 2', body: 'Contenido 2', userId: 2 } as Posts,
  ];

  beforeEach(async () => {
    postsServiceMock.getPosts.mockReturnValue(of(mockPosts));
    postsServiceMock.getPostsById.mockReturnValue(of(mockPosts[0]));
    postsServiceMock.deletePosts.mockReturnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [PostsMain],
      providers: [
        { provide: PostsService, useValue: postsServiceMock },
        { provide: DialogService, useValue: dialogServiceMock },
        { provide: MessageService, useValue: messageServiceMock },
        { provide: ConfirmationService, useValue: confirmationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
    expect(postsServiceMock.getPosts).toHaveBeenCalled();
    expect(component.posts.value()).toEqual(mockPosts);
  });

  it('debería reaccionar a cambios en el filtro', async () => {
    component.filterForm.set({ page: 1, size: 10, search: 'test' });
    fixture.detectChanges();

    expect(postsServiceMock.getPosts).toHaveBeenCalledWith({
      page: 1,
      size: 10,
      search: 'test',
    });
  });

  it('debería llamar al servicio con los filtros iniciales', () => {
    expect(postsServiceMock.getPosts).toHaveBeenCalledWith({
      page: 1,
      size: 10,
      search: '',
    });
  });

  it('debería actualizar los posts cuando el servicio responde', () => {
    expect(component.posts.value()).toEqual(mockPosts);
    expect(component.posts.isLoading()).toBeFalsy();
  });

  it('debería ejecutar la función edit', () => {
    const editSpy = vi.spyOn(component, 'edit');
    const dummyPost = mockPosts[0];

    component.edit(dummyPost);

    expect(editSpy).toHaveBeenCalledWith(dummyPost);
  });

  it('debería abrir el diálogo de edición y recargar al cerrar', async () => {
    const reloadSpy = vi.spyOn(component.posts, 'reload');
    const dummyPost = mockPosts[0];
    component.edit(dummyPost);
    expect(postsServiceMock.getPostsById).toHaveBeenCalledWith(dummyPost.id);
    expect(dialogServiceMock.open).toHaveBeenCalled();
    expect(reloadSpy).toHaveBeenCalled();
    expect(messageServiceMock.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' }),
    );
  });
});
