import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from './services/character.service';
import { Character } from './interfaces/character';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'characters';

  characterService = inject(CharacterService);
  character: Character[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cardCharacters();

  }

  cardCharacters(){
    this.characterService.getCharacter().subscribe( character => {
      this.character = character;
      console.log(this.character);

    });
  }

  searchCharacter() {
    if (this.searchTerm.trim() === '') {
      this.cardCharacters();
      return;
    }
    this.characterService.searchCharacters(this.searchTerm).subscribe(results => {
      this.character = results;
    });
  }
}
