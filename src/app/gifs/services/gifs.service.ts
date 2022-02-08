import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'G2fPzXDOwe5XDEqDhxHkYTrZuv8jGVao';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();

    this._historial.unshift(query);
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    this.http
      .get<SearchGifsResponse>(
        `http://api.giphy.com/v1/gifs/search?api_key=G2fPzXDOwe5XDEqDhxHkYTrZuv8jGVao&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        this.resultados = resp.data
      });
  }
}
