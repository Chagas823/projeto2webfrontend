import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { StorageService } from '../storage.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  loginFailMessage: string = '';

  constructor(private loginService: LoginService,private localStorage: StorageService,private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log('login - ' + this.username + ':' + this.password);
    this.loginService.login(this.username, this.password).subscribe((user) => {
      console.log('USER/ME: ');
      console.log(user);
      this.localStorage.set('usuario',JSON.stringify(user));

      this.localStorage.set('authorization', btoa(this.username + ':' + this.password));
      this.router.navigate(['/menu']);
    }, (error) => {
      this.loginFailMessage = 'Usuario ou senha invalidos. Tente novamente';
    });
  }

}