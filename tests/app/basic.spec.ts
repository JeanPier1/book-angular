import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Basic Test Example (pure Vitest)', () => {
  it('should create test environment', () => {
    expect(true).toBe(true);
  });

  it('should work with basic assertions', () => {
    expect(2 + 2).toBe(4);
  });

  it('should handle objects', () => {
    const testData = { id: 1, name: 'Test Data' };
    expect(testData.id).toBe(1);
    expect(testData.name).toBe('Test Data');
  });

  it('should handle async operations', async () => {
    const result = await Promise.resolve('async test');
    expect(result).toBe('async test');
  });

  it('should handle arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toContain(3);
    expect(numbers.length).toBe(5);
  });
});
