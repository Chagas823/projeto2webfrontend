import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../Usuario';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private usuarioService: UsuarioService, private localStorage: StorageService){}
  usuarios: Usuario[] = [];
   usuarioLogado = JSON.parse(this.localStorage.get("usuario")|| '{}').principal
   busca = ""
  ngOnInit(): void {
    this.getUsuarios();
   
    
    console.log(this. usuarioLogado)
  }
  getUsuarios(): void{
    this.usuarioService.getAllUsuarios()
    .subscribe(usuarios => {
      
      this.usuarios = usuarios
      this.carregar()
    } )
    
  }
  procurar(): void{
    console.log("teste")
    this.getUsuarios()
    
  }
  carregar(): void{
    console.log(this.busca)
    let aux: Usuario[] = [];
    if(this.busca){
      this.usuarios.forEach(usuario =>{
        if(usuario.nome.toLowerCase().includes(this.busca.toLowerCase()) ||
        usuario.username.toLowerCase().includes(this.busca.toLowerCase())
        ){
          aux.push(usuario)
        }
      })
      if(aux){
        this.usuarios = aux;
  
        console.log(this.usuarios)
      }
    }
    console.log(this.busca)
  }
}
