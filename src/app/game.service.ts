import { Injectable } from '@angular/core';
import { Subject,Observable  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get<any[]>(`${this.baseUrl}/games`);
  }

  addGame(newGame: any) {
    return this.http.post(`${this.baseUrl}/games`, newGame);
  }

  getGameById(gameId: number): Observable<any> {
    const url = `${this.baseUrl}/games/${gameId}`;
    return this.http.get<any>(url);
  }

  updateGame(gameId: number, updatedGame: any): Observable<any> {
    const url = `${this.baseUrl}/games/${gameId}`;
    return this.http.put<any>(url, updatedGame);
  }

  deleteGame(gameId: number): Observable<void> {
    const url = `${this.baseUrl}/games/${gameId}`;
    return this.http.delete<void>(url);
  }
}
