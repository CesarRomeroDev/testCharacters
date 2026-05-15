import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from '../interfaces/character';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private http = inject(HttpClient);
  private ApiUrl = 'https://hp-api.onrender.com/api/characters';

  constructor() {
  }

  // Método que obtiene TODOS los personajes de la API
  getCharacter(): Observable<Character[]>{
    return this.http.get<Character[]>(this.ApiUrl);
  }

  // Método que filtra personajes según un término de búsqueda
  searchCharacters(name: string): Observable<Character[]> {
    return this.http.get<Character[]>(this.ApiUrl).pipe(
      map(characters => characters.filter(
        term => term.name.toLowerCase().includes(name.toLowerCase())
      ))
    );
  }

}
