import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsList } from '@/app/components/posts/components/posts-list/posts-list';
import { Posts } from '@/app/components/posts/models/posts.model';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

describe('<app-posts-list/>', () => {
  let component: PostsList;
  let fixture: ComponentFixture<PostsList>;

  const mockPosts: Posts[] = [
    {
      id: 1,
      title: 'Post 1',
      body: 'Body 1',
      userId: 1,
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'Body 2',
      userId: 2,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsList],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsList);
    component = fixture.componentInstance;

    component.items = mockPosts;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar la cantidad correcta de filas', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockPosts.length);
  });

  it('debe emitir editChange cuando se hace click en Editar', () => {
    const spy = vi.spyOn(component.editChange, 'emit');
    const editBtn = fixture.debugElement.query(By.css('button.bg-teal-600'));
    editBtn.nativeElement.click();
    expect(spy).toHaveBeenCalledWith(mockPosts[0]);
  });

  it('debe emitir deleteChange cuando se hace clic en Eliminar', () => {
    const spy = vi.spyOn(component.deleteChange, 'emit');
    const deleteBtn = fixture.debugElement.query(By.css('button.bg-red-500'));
    deleteBtn.nativeElement.click();
    expect(spy).toHaveBeenCalledWith(mockPosts[0].id);
  });
});
