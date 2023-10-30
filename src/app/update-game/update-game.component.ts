import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.css']
})
export class UpdateGameComponent implements OnInit {
  gameId: number = 0; 
  newGame: any = {}; 
  games: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.gameId = +this.route.snapshot.paramMap.get('id')!;

    this.gameService.getGameById(this.gameId).subscribe((game) => {
      this.newGame = game;
    });
  }

  updateGame(updatedGameData: any, gameId: number) {
    console.log(gameId);
    if (this.newGame.price <= 0) {
      alert('Prețul trebuie să fie mai mare de 0');
      return; 
    }

    if (this.newGame.name!= undefined && this.newGame.name.length < 5) {
      alert('Numele trebuie să aibă cel puțin 5 caractere');
      return; 
    }
    
    if (!this.newGame.name || !this.newGame.genre || !this.newGame.price) {
      alert('Completati toate casutele');
      return;
    }
    this.gameService.updateGame(gameId, updatedGameData).subscribe(
      (response) => {
        console.log('Game updated:', response);
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error updating game:', error);
      }
    );
}
}