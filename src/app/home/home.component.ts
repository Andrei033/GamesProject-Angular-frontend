import { Component, OnInit , OnDestroy  } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Papa from 'papaparse';

let i:number=0;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy {
  searchQuery: any = { name: '', genre: '', price: 'all' };
  sortOrder: string = 'asc'; 
  games: any[] = []; 
  filteredGames: any[] = []; 
  initialGames: any[]=[];
  allgames:any[]=[];
  newgames: any[]=[];
  minPrice: number = 0;
  maxPrice: number = 100;
  combinedGames: any[] = [];

  public gameAddedSubscription: Subscription = new Subscription();
  constructor(public authService: AuthService,private cdr: ChangeDetectorRef, private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    if(i==0)
    {
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
        this.initialGames = games.slice(0, 5);
      });
      i++;
    }
    else{
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
        this.initialGames=this.games;
      });
    }
    
    this.filteredGames = this.games;
    
  }

  ngOnDestroy() {
    this.gameAddedSubscription.unsubscribe();
  }

  onGameAdded(newGame: any) {
    
    this.gameService.addGame(newGame).subscribe((response) => {
      console.log('New game added:', response);
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
      });
    });
    
  }

  searchGames() {
    this.filterAndSortGames();
    this.changeNgFor();
  }
  
  searchNewGames() {
    this.changeNgFor();
    this.filterAndSortGames();
  }

  changeNgFor(): void {
    this.initialGames = this.filteredGames;
  }

  navigateToAddGamePage() {
    this.router.navigate(['/add-game']);
  }
  
  filterAndSortGames() {
    this.filteredGames = this.games.filter((game) => {
      const nameMatch = game.name.toLowerCase().includes(this.searchQuery.name.toLowerCase());
      const genreMatch = !this.searchQuery.genre || game.genre === this.searchQuery.genre;
      return nameMatch && genreMatch;
    });
    const minPrice = 0;
    const maxPrice = 100;

    if (this.sortOrder === 'asc') {
      this.filteredGames.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      this.filteredGames.sort((a, b) => b.price - a.price);
    }
  }

  onPriceRangeChange(priceRange: [number, number]) {
    
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];

    this.filteredGames = this.games.filter((game) => {
      const gamePrice = game.price;
      this.changeNgFor();
      return gamePrice >= minPrice && gamePrice <= maxPrice;
    });
    
  }
  logout() {
    this.authService.logout();
  }

  deleteGame(game: any) {
  const gameId = game.id; 

  this.gameService.deleteGame(gameId).subscribe(() => {
    console.log('Game deleted successfully');

    this.gameService.getGames().subscribe((games) => {
      this.games = games;
      this.initialGames=this.games;
      console.log(this.initialGames);
      this.router.navigate(['']);
    });

  });
}

exportGamesToCSV() {
  if (this.authService.isLoggedIn$()) {
    this.gameService.getGames().subscribe((games) => {
      const csvData = Papa.unparse(games);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'games.csv';
      link.click();
    });
  } else {
    alert('You must be authenticated to export as CSV.');
  }
}
}
