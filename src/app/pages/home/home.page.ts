import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports:[
    IonicModule, CommonModule
  ],
  standalone:true
})
export class HomePage  {
}
