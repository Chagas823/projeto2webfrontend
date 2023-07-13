import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Mensagem } from './Mensagem';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {
  private url: string = "http://localhost:8080/api/v1/mensagens"
  constructor(private storage: StorageService, private http: HttpClient) { }
  getMensagens(id1: number, id2: number): Observable<Mensagem[]>{
    const headers = {
      authorization : 'Basic ' + this.storage.get("authorization")
    }
    console.log("teste")
  
    return this.http.get<Mensagem[]>(this.url+"/"+id1+"/"+id2, {headers: headers})
        .pipe(
          retry(2))
  }
  saveMensagem(mensagem: Mensagem ): Observable<Mensagem>{
    
    const headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic '+ this.storage.get("authorization")
      })
    }
    return this.http.post<Mensagem>(this.url, JSON.stringify(mensagem), headers).pipe(retry(2))
  }
}
