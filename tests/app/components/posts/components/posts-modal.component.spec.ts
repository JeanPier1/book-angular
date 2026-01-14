import { ModalPostsForm } from '@/app/components/posts/components/modals/modal-posts-form/modal-posts-form';
import { signal } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

vi.mock('@angular/forms/signals', () => {
  return {
    form: () => ({
      touched: () => {},
      valid: () => true,
      value: () => ({ id: 1, title: 'Test', body: 'Body', userId: 1 }),
    }),
    required: () => {},
    minLength: () => {},
  };
});

describe('ModalPostsForm', () => {
  let component: ModalPostsForm;
  let fixture: ComponentFixture<ModalPostsForm>;
  let mockDialogRef: any;
  let mockPostsService: any;

  beforeEach(() => {
    mockDialogRef = { close: vi.fn() };
    mockPostsService = {
      savePosts: vi.fn(() => of({ id: 101 })),
      updatePosts: vi.fn(() => of({ id: 1 })),
    };

    component = new ModalPostsForm();

    Object.assign(component, {
      ref: mockDialogRef,
      service: mockPostsService,
      dialogConfig: {
        data: { posts: { id: 1, title: 'Test', body: 'Body', userId: 1 } },
      },
      formSignal: signal({ id: 1, title: 'Test', body: 'Body', userId: 1 }),
      form: {
        touched: vi.fn(),
        valid: vi.fn(() => true),
        value: vi.fn(() => ({ id: 1, title: 'Test', body: 'Body', userId: 1 })),
      },
      isLoading: false,
      data: { id: 1, title: 'Test', body: 'Body', userId: 1 },
    });

    component.ngOnInit();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con datos del config', () => {
    expect(component.formSignal().title).toBe('Test');
  });

  it('debe llamar a updatePosts cuando el formulario es válido y tiene data', () => {
    component.onSave();
    expect(mockPostsService.updatePosts).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('debe llamar a savePosts cuando el formulario es válido y no tiene data', () => {
    component.data = null;
    component.formSignal.set({ id: 0, title: 'Nuevo', body: 'Nuevo body', userId: 1 });

    component.onSave();
    expect(mockPostsService.savePosts).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });
});
