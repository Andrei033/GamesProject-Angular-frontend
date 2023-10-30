import { Component, OnInit , OnDestroy  } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
let i:number=0;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy {
  searchQuery: any = { name: '', genre: '', price: 'all' };
  sortOrder: string = 'asc'; // Inițial, sortare crescătoare
  games: any[] = []; // Lista de jocuri
  filteredGames: any[] = []; // Declarați corect aici lista filtrată
  initialGames: any[]=[];
  allgames:any[]=[];
  newgames: any[]=[];
  minPrice: number = 0;
  maxPrice: number = 100;
  combinedGames: any[] = [];
  public gameAddedSubscription: Subscription = new Subscription();


  constructor(public authService: AuthService,private cdr: ChangeDetectorRef, private router: Router, private gameService: GameService) {}

  ngOnInit(): void {
    // Simulăm încărcarea inițială a datelor (înlocuiți cu date reale dintr-un serviciu)
    /*this.games = [
      { name: 'Call of duty', genre: 'Action', price: 29.99, imageUrl:'https://static.tweaktown.com/news/16x9/90313_report-call-of-duty-2023-will-be-full-game-with-campaign.png'},
      { name: 'Elden Ring', genre: 'RPG', price: 39.99, imageUrl:'https://assets.nuuvem.com/image/upload/v1/products/618418052f91a002e3f9cf6b/sharing_images/dl3d5ccidn9wlkemhfjr.jpg'},
      { name: 'Counter-Strike', genre: 'Action', price:19.99,imageUrl:'https://zonait.ro/wp-content/uploads/2021/01/CS-GO.jpg' },
      {name: 'Raft', genre:'RPG', price:'50.99',imageUrl:'https://raft-game.com/____impro/1/onewebmedia/MainCapsule_Renovation.png?etag=%224b62e-60d47d07%22&sourceContentType=image%2Fpng&ignoreAspectRatio&resize=386%2B221&extract=0%2B0%2B358%2B221' },
      {name: 'Resident evil', genre:'Action', price:'65.99',imageUrl:'https://cdn.cloudflare.steamstatic.com/steam/apps/883710/capsule_616x353.jpg?t=1692001351' }, 
      {name: 'Terraria', genre:'RPG', price:'70.99',imageUrl:'https://cdn.cloudflare.steamstatic.com/steam/apps/105600/header.jpg?t=1666290860' }
      // Adăugați mai multe jocuri aici
    ];*/
    
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
      // Handle the response if needed
      console.log('New game added:', response);
      
      // You can choose to refresh the games list here if required.
      // Fetch the updated games from the server.
      this.gameService.getGames().subscribe((games) => {
        this.games = games;
        //this.initialGames = games.slice(0, 5);
      });
    });
    
  }

  searchGames() {
    // Funcție apelată la trimiterea formularului de căutare
    
    this.filterAndSortGames();
    this.changeNgFor();
    
  }
  searchNewGames() {
    // Funcție apelată la trimiterea formularului de căutare
    this.changeNgFor();
    this.filterAndSortGames();
    
  }

  changeNgFor(): void {
    this.initialGames = this.filteredGames;
  }

  navigateToAddGamePage() {
    // Navigați către ruta pentru adăugarea unui joc (add-game)
    this.router.navigate(['/add-game']);
  }
  
  filterAndSortGames() {
    // Filtrați și sortați jocurile pe baza query-ului de căutare și a opțiunilor de sortare
    this.filteredGames = this.games.filter((game) => {
      const nameMatch = game.name.toLowerCase().includes(this.searchQuery.name.toLowerCase());
      const genreMatch = !this.searchQuery.genre || game.genre === this.searchQuery.genre;
      
        
      return nameMatch && genreMatch;
    });
    

    // Filter your games array based on the selected price range
    const minPrice = 0;
  const maxPrice = 100;

  // Emit the price range change event to PriceRangeSliderComponent
  
 

    // Sortați jocurile în funcție de opțiunea de sortare
    if (this.sortOrder === 'asc') {
      this.filteredGames.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      this.filteredGames.sort((a, b) => b.price - a.price);
    }
  }

  onPriceRangeChange(priceRange: [number, number]) {
    
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];
    
    // Filter your games array based on the selected price range
    this.filteredGames = this.games.filter((game) => {
      const gamePrice = game.price;
      this.changeNgFor();
      return gamePrice >= minPrice && gamePrice <= maxPrice;
    });
    
  }
  logout() {
    // Log out logic
    this.authService.logout();
    // Perform any necessary logout actions
  }

  deleteGame(game: any) {
  const gameId = game.id; // Assuming you have an 'id' property in the game object

  // Send an HTTP DELETE request to the server to delete the game by ID
  this.gameService.deleteGame(gameId).subscribe(() => {
    // Handle the success response or any additional logic
    console.log('Game deleted successfully');
    // Update the games list by fetching the updated list from the server
    
    
      this.router.navigate(['']);
   
  });
  this.gameService.getGames().subscribe((games) => {
    this.games = games;
    this.initialGames=this.games;
  });
}
}
