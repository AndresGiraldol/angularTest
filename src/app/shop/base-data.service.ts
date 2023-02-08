import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const DATA_URL = new InjectionToken('DATA_URL');

export interface Entity {
  id?: number;
}

@Injectable()
export class BaseDataService<T extends Entity> {
  protected API_URL = 'http://localhost/api/';

  constructor(
    protected _http: HttpClient,
  ) {
  }

  fetchOne(id) {
    return this._http.get<T>(this.API_URL + id);
  }

  fetchAll() {
    return this._http.get<T[]>(this.API_URL);
  }

  persist(entity: T) {
    const id = entity.id;
    let request: Observable<T>;
    if (id) {
      request = this._http.put<T>(this.API_URL + id, entity);
    } else {
      request = this._http.post<T>(this.API_URL, entity);
    }
    return request;
  }

  remove(entity: T) {
    const id = entity.id;
    return this._http.delete<T>(this.API_URL + id);
  }
}
