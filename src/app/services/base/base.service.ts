import { HttpParams } from '@angular/common/http';

// classe abstrata que servirá pra ser extendida aos serviços e fornecer os métodos getApiUrl e getQueryParams
//
export abstract class BaseService {
  private baseUrl: string;

  //base Url que será passada no super da função que vai extende-lá
  constructor(url: string) {
    this.baseUrl = url;
  }

  //retorna a baseUrl com o endpoints devido
  protected getApiUrl(params?: string): string {
    return params ? `${this.baseUrl}/${params}` : this.baseUrl;
  }

  // retorna os queryParams dinamicamente
  protected getQueryParams<T>(parameters: T): HttpParams {
    if (!parameters) return null as unknown as HttpParams;

    let params = new HttpParams();

    Object.keys(parameters).forEach((key) => {
      const param = (parameters as any)[key];
      if (!param) return;
      params = params.append(key, (parameters as any)[key]);
    });

    return params;
  }
}
