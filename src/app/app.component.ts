import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonButtons, IonLabel, IonMenuButton, IonIcon, IonMenuToggle, IonList, IonContent, IonMenu } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonHeader, IonToolbar, IonTitle, RouterModule, IonButtons, IonLabel, IonMenuButton, IonIcon, IonMenuToggle, IonList, IonContent, IonMenu, IonRouterOutlet],
})
export class AppComponent {
  constructor() { }
}
