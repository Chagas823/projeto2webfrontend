import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Usuario } from './Usuario';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = "http://localhost:8080/api/v1/user"
  constructor(private storage: StorageService, private http: HttpClient) { }
  getAllUsuarios(): Observable<Usuario[]>{
    const headers = {
      authorization : 'Basic ' + this.storage.get("authorization")
    }
    return this.http.get<Usuario[]>(this.url, {headers: headers})
        .pipe(
          retry(2))
  }
  getUsuarioById(id: number): Observable<Usuario>{
    const headers = {
      authorization : 'Basic ' + this.storage.get("authorization")
    }
   
    return this.http.get<Usuario>(this.url+"/"+id, {headers: headers})
        .pipe(
          retry(2))
  }
  saveUsuario(usuario: Usuario): Observable<Usuario>{
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ this.storage.get("authorization")
      })
    }
    return this.http.post<Usuario>(this.url+"/cadastrar", JSON.stringify(usuario), headers).pipe(retry(2))
  }
}
