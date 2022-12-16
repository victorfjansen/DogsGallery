import { HttpParams } from '@angular/common/http';

export abstract class BaseService {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  protected getApiUrl(params?: string): string {
    return params ? `${this.baseUrl}/${params}` : this.baseUrl;
  }

  protected getQueryParams<T>(parameters: T): unknown {
    if (!parameters) return null;

    let params = new HttpParams();

    Object.keys(parameters).forEach((key) => {
      const param = (parameters as any)[key];
      if (!param) return;
      params = params.append(key, (parameters as any)[key]);
    });

    return params;
  }
}
