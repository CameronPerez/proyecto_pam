import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface UserState {
  user: any;  
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  data: any = {}; 

  constructor(private router: Router) {
    
    const navigation = this.router.getCurrentNavigation();

  
    if (navigation?.extras?.state?.['user']) {
      this.data = navigation.extras.state['user']; 
      console.log('Datos del usuario recibidos:', this.data); 
    } else {
      console.log('No se encontraron datos del usuario en la navegación');
    }
  }
}
