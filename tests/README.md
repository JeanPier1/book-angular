# Test configuration for Angular project

This folder contains all test files and configuration for the Angular project.

## Structure

- `unit/` - Unit tests for individual components and services
- `integration/` - Integration tests for multiple components working together
- `fixtures/` - Test data and mock objects
- `mocks/` - Mock implementations of services and external dependencies
- `helpers/` - Utility functions for testing

## Configuration

- `tsconfig.spec.json` - TypeScript configuration for tests with path aliases
- `vitest.config.ts` - Vitest configuration with Angular support
- `setup-files.ts` - Global test setup

## Usage

Run tests with:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test -- --coverage
```

## Path Aliases

Tests can import from source code using these aliases:
- `@/` - Points to `src/`
- `@app/` - Points to `src/app/`
- `@core/` - Points to `src/app/core/`
- `@shared/` - Points to `src/app/shared/`
- `@env/` - Points to `src/environments/`

## Example

```typescript
import { TestBed } from '@angular/core/testing';
import { MyComponent } from '@/app/components/my.component';
import { MyService } from '@/app/services/my.service';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComponent],
      providers: [MyService]
    }).compileComponents();
  });
});
```