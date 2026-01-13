import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsMain } from '@/app/components/posts/components/posts-main/posts-main';
import { PostsService } from '@/app/components/posts/services/posts.service';
import { of } from 'rxjs';
import { Posts } from '@/app/components/posts/models/posts.model';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('<app-posts-main/>', () => {
  let component: PostsMain;
  let fixture: ComponentFixture<PostsMain>;

  const postsServiceMock = {
    getPosts: vi.fn(),
  };

  const mockPosts: Posts[] = [
    { id: 1, title: 'Post 1', body: 'Contenido 1', userId: 1 } as Posts,
    { id: 2, title: 'Post 2', body: 'Contenido 2', userId: 2 } as Posts,
  ];

  beforeEach(async () => {
    postsServiceMock.getPosts.mockReturnValue(of(mockPosts));

    await TestBed.configureTestingModule({
      imports: [PostsMain],
      providers: [{ provide: PostsService, useValue: postsServiceMock }],
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
});
