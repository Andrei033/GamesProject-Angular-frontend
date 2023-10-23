import { Injectable } from '@angular/core';
import { Subject,Observable  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private games: any[] = [];
  private gameAddedSubject: Subject<any> = new Subject<any>();

  addGame(newGame: any) {
    this.games.push(newGame);
    this.gameAddedSubject.next(newGame); // Emit the new game when it's added
    console.log('addGame method called');
  }

  getGames() {
    return this.games;
  }

  gameAdded$(): Observable<any> {
    return this.gameAddedSubject.asObservable();
  }
}
