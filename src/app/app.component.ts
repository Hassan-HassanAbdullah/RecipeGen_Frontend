import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthCardComponent } from "./components/auth-card/auth-card.component";
import { FooterComponent } from './components/footer/footer.component';
import { NgIf } from '@angular/common';
import { ToastComponent } from './shared/toast/toast.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, AuthCardComponent,  NgIf, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Genius AI';

  authCardVisible: boolean = false;

  handleAuthCard(value: boolean) {
    this.authCardVisible = value;
  }


  ngOnInit(): void {
    initFlowbite();
  }
}
