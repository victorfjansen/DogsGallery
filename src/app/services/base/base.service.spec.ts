import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';

const TEST_MOCK_SERVICE = 'testService';

describe(BaseService.name, () => {
  let testService: TestMockService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestMockService],
    }).compileComponents();

    testService = TestBed.inject(TestMockService);
  });

  it('should return null when called without params', () => {
    const url = testService.getParams();
    expect(url).toBeNull();
  });

  it('should return http params when called with params', () => {
    const defaultParams = {
      page: '2',
      page_size: '15',
      per_page: '10',
      sort_by: 'created_at',
      sort: 'created_at',
      sort_order: 'desc',
    };

    const url = testService.getParams(defaultParams);
    const keys = url.keys();
    const params = keys.reduce(
      (acc, key) => ({ ...acc, [key]: url.get(key) }),
      {}
    );
    const isEqual = JSON.stringify(defaultParams) === JSON.stringify(params);

    expect(isEqual).toBeTruthy();
  });

  it('should ignore null parameters', () => {
    const defaultParams = {
      page: '2',
      page_size: '15',
      per_page: '10',
      sort_by: 'created_at',
      sort: 'created_at',
      sort_order: 'desc',
      search: null,
    };

    const url = testService.getParams(defaultParams);
    const keys = url.keys();

    Reflect.deleteProperty(defaultParams, 'search');

    const params = keys.reduce(
      (acc, key) => ({ ...acc, [key]: url.get(key) }),
      {}
    );
    const isEqual = JSON.stringify(defaultParams) === JSON.stringify(params);

    expect(isEqual).toBeTruthy();
  });
});

@Injectable()
class TestMockService extends BaseService {
  constructor(protected http: HttpClient) {
    super(TEST_MOCK_SERVICE);
  }

  getPath(test?: string): string {
    return this.getApiUrl(test);
  }

  getParams(args?: unknown): HttpParams {
    return this.getQueryParams<unknown>(args);
  }
}
