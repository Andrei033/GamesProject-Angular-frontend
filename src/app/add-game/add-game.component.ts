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

  constructor(private router: Router, private gameService: GameService) { }
  newGame: any = {}; 
  addGame(gameForm: NgForm) {
    // Create a new game object from the form data
    const newGame = {
      name: gameForm.value.name,
      genre: gameForm.value.genre,
      price: gameForm.value.price,
      imageUrl: gameForm.value.imageUrl
    };

    
  
    // Call a service method to add the new game to the list
    this.gameService.addGame(newGame);
  
    // Reset the form
    gameForm.resetForm();
  
    // Navigate back to the home page or perform any other desired action
    this.router.navigate(['']);
  }
  ngOnInit() {
    console.log('AddGameComponent initialized');
  }
}
