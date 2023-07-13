import { Component } from '@angular/core';
import { Usuario } from '../Usuario';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute } from '@angular/router';
import { MensagemService } from '../mensagem.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  constructor(private usuarioService: UsuarioService, 
    private route: ActivatedRoute,
    private router: Router,
    private mensagemService: MensagemService){}
  usuario= {} as Usuario 
 erroMsg : string = '';
 senha: string = '';
  cadastrar(){
    console.log(this.usuario)
    this.usuarioService.getAllUsuarios().subscribe(usuarios=>{
      let emailEhIgual = false;
      let senhasEhDiferente = false
      if(this.senha !== this.usuario.senha){
        this.erroMsg = 'as senhas estão diferentes'
          senhasEhDiferente = true
      }
      usuarios.forEach(usuario => {
        console.log(usuario)
        if(usuario.username === this.usuario.email){
          console.log("aqui")
          this.erroMsg = 'email já cadastrado'
          emailEhIgual = true
          return;
        }
      })
      if(emailEhIgual === false && senhasEhDiferente === false){
        this.concluirCadastro()
        this.router.navigate(['/login']);
      }
    })
    
  }
  concluirCadastro(){
    console.log("concluiu")
    this.usuarioService.saveUsuario(this.usuario).subscribe(usuario => {
      alert("usuario cadastrado")
    })
  }

}
