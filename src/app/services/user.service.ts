
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model'; 

@Injectable({                   //do oznaczenia, że klasa jest usługą wstrzykiwania zależności
  providedIn: 'root'            //dostępna w całej aplikacji, globalnie
})
export class UserService {

  private apiUrl = 'http://localhost:5139/user';    //endpoint user odpowiada adresowi kontrolera UserController   // prywatne pole, przechowuje adres URL do endpointu API, z którego pobierane będą dane użytkowników

  constructor(private http: HttpClient) { }             //przyjmuje wstrzykiwaną zależność HttpClient - wykonywanie żądań HTTP 

  getUsers(): Observable<User[]> {                      //metoda, która wywołuje zapytanie GET do określonego adresu URL - this.apiUrl, zwraca wynik jako Observable. wynik będzie tablicą obiektów typu User
    return this.http.get<User[]>(this.apiUrl);          //będzie używana do pobierania danych użytkowników z serwera
  }
}
