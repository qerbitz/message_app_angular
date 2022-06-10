import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  senderControl= new FormControl('');

  storage: Storage = sessionStorage;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    localStorage.setItem('actual_sender', this.senderControl.value);
    this.router.navigateByUrl(`/main/${this.senderControl.value}`, {skipLocationChange: true});
  }

}
