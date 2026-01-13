import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PostsService } from '@app/components/posts/services/posts.service';
import { Posts } from '@/app/components/posts/models/posts.model';
import { environment } from '@/app/enviroment/enviroment';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe ser creado correctamente service', () => {
    expect(service).toBeTruthy();
  });

  it('debe devolver un array de posts', () => {
    const mockPosts: Posts[] = [
      { id: 1, title: 'Post 1', body: 'Contenido 1', userId: 1 },
      { id: 2, title: 'Post 2', body: 'Contenido 2', userId: 1 },
    ];
    const params = { userId: '1' };

    service.getPosts(params).subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });

    const url = `${environment.apiUrl}/${environment.api.posts}?userId=1`;
    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');

    req.flush(mockPosts);
  });
});
