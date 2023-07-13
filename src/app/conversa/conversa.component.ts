import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { StorageService } from '../storage.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../Usuario';
import { MensagemService } from '../mensagem.service';
import { Mensagem } from '../Mensagem';
@Component({
  selector: 'app-conversa',
  templateUrl: './conversa.component.html',
  styleUrls: ['./conversa.component.css']
})
export class ConversaComponent {
  constructor(private usuarioService: UsuarioService, 
    private localStorage: StorageService,
    private route: ActivatedRoute,
    private mensagemService: MensagemService){}
  usuario = {} as Usuario;
  emissor = JSON.parse(this.localStorage.get("usuario")|| '{}').principal
  mensagens: Mensagem[] =[]
  msg = {} as Mensagem
  ngOnInit(): void{
    
    this.getUsuario()
    setInterval(()=>{
      this.getMensagens()
    }, 1000)
   
  }
 
  getUsuario(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.getUsuarioById(id)
    .subscribe(usuario => {
      this.usuario = usuario
      this.getMensagens()
    })
    
  }
  getMensagens(){
    console.log(this.emissor.id)
    console.log(this.usuario.id)
    this.mensagemService.getMensagens(this.usuario.id, this.emissor.id)
    .subscribe(mensagens => {
      mensagens[0].data.toLocaleString()

      
      this.mensagens = mensagens
      this.converterData()
    })
  }
  adicionarMensagem(){
    
    this.msg.emissor  = this.emissor
    this.msg.receptor = this.usuario
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    this.msg.data = today
    this.mensagemService.saveMensagem(this.msg).subscribe(mensagem=>{
      
      this.getMensagens()
      this.msg.mensagem = ""
    })
  }
  converterData(){
    for (let i = 0; i < this.mensagens.length; i++) {
      this.mensagens[i].dataString = new Date(this.mensagens[i].data).toLocaleDateString()
      
    }
  }
 
}
