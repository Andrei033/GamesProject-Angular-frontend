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
  gameId: number = 0; // Add a property to store the game ID
  newGame: any = {}; // Initialize an empty new game object
  updatedGame: any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    // Get the game ID from the route parameters
    this.gameId = +this.route.snapshot.paramMap.get('id')!;
    
    // Fetch the existing game data by ID and set it to the newGame object
    this.gameService.getGameById(this.gameId).subscribe((game) => {
      this.newGame = game;
    });
  }

  updateGame(updatedGameData: any, gameId: number) {
    console.log(gameId);
    const updateUrl = `http://localhost:3000/games/${gameId}`; // Replace gameId with the actual game ID
    this.httpClient.put(updateUrl, updatedGameData).subscribe((response) => {
      // Handle the response, update the game, or perform any other actions
      console.log('Game updated:', response);
      this.router.navigate(['']);
    });
}
}