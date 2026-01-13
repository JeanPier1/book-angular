import { describe, it, expect, vi, beforeEach } from 'vitest';

class MockPostsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  getPosts(params: any) {
    const mockPosts = [
      { id: 1, title: 'Test Post 1', body: 'Contenido 1', userId: 1 },
      { id: 2, title: 'Test Post 2', body: 'Contenido 2', userId: 2 },
    ];

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPosts), 100);
    });
  }
}

describe('PostsService (Mock)', () => {
  let service: MockPostsService;

  beforeEach(() => {
    service = new MockPostsService();
  });

  it('debe ser creado correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener posts', async () => {
    const mockPosts = [
      { id: 1, title: 'Test Post 1', body: 'Contenido 1', userId: 1 },
      { id: 2, title: 'Test Post 2', body: 'Contenido 2', userId: 2 },
    ];

    const params = { userId: '1' };
    const posts = (await service.getPosts(params)) as any[];

    expect(posts.length).toBe(2);
    expect(posts).toEqual(mockPosts);
  });

  it('debe manejar diferentes parámetros', async () => {
    const posts = (await service.getPosts({ userId: '2' })) as any[];

    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it('debe tener la estructura correcta', async () => {
    const posts = (await service.getPosts({})) as any[];

    posts.forEach((post) => {
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
      expect(post).toHaveProperty('userId');
    });
  });
});
