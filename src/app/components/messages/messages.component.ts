import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Message } from '../../interface/Message';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  actual_sender: string;

  private updateSubscription: Subscription;

  constructor(private mainService: MainService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.actual_sender = localStorage.getItem('actual_sender');
    this.updateSubscription = interval(3000).subscribe(
      (val) => { this.messagesList(this.actual_sender);});
  }

  public messagesList(recipient: string) {
    this.mainService.getMessagesBySender(recipient).subscribe(
      data => {
        this.messages = data;
      }
    );
  }
}
