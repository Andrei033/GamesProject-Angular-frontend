import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { NgForm } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent  implements OnInit   {

  newGame: any = {};

  constructor(private router: Router, private gameService: GameService) {}

  addGame() {
    if (this.newGame.price <= 0) {
      alert('Prețul trebuie să fie mai mare de 0');
      return; // Ieșiți din funcție fără a face cererea HTTP.
    }

    if (this.newGame.name!= undefined && this.newGame.name.length < 5) {
      alert('Numele trebuie să aibă cel puțin 5 caractere');
      return; // Ieșiți din funcție fără a face cererea HTTP.
    }
    
    if (!this.newGame.name || !this.newGame.genre || !this.newGame.price) {
      alert('Completati toate casutele');
      return;
    }
    this.gameService.addGame(this.newGame).subscribe((game) => {
      console.log('Jocul a fost adăugat cu succes:', game);
      // Resetați formularul sau efectuați alte acțiuni necesare
      this.newGame = {};
      this.router.navigate(['']); // Navigați înapoi la pagina principală
    });
  }

  ngOnInit() {
    console.log('AddGameComponent initialized');
  }
}
