import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, MenuController } from '@ionic/angular';
import { TemplateService } from '../services/template.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //login:  
  //admin2@admin.com
  //123456

  formGroup : FormGroup; 
  constructor(private formBuilder : FormBuilder,
    private auth : AngularFireAuth,
    private navCtrl : NavController,
    private menuCtrl : MenuController,
    private template : TemplateService
    ) { this.iniciarForm(); 
    } 
  ngOnInit() { 
    this.menuCtrl.enable(false); //bloquando menu
  }
  autenticar() {
    let user = this.formGroup.controls['username'].value;
    let pass = this.formGroup.controls['password'].value; 

    this.template.loading.then(load=>{ 
      this.auth.signInWithEmailAndPassword(user,pass).then(data=>{
        //sucesso
        load.dismiss(); //encerrando
        this.menuCtrl.enable(true); //ativar menu
        this.navCtrl.navigateRoot(['clientes']); //redirecionar 
      }).catch(data=>{//erro
        load.dismiss();
        this.template.myAlert("Erro ao atenticar"); 
      })
    })
  }
  iniciarForm(){
    this.formGroup= this.formBuilder.group({
    username : ['',[Validators.email] ],
    password: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(16)]]
    })
    } 
}
