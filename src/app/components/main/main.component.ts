import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Recipient } from '../../interface/Recipient'
import { MainService } from 'src/app/services/main.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/interface/Message';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  sendMessageFormGroup: FormGroup;
  

  recipientControl = new FormControl('');
  recipients: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(private mainService: MainService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.recipientsList();
    console.log(this.route.snapshot.paramMap);


    this.sendMessageFormGroup = this.formBuilder.group({
      message: this.formBuilder.group({
        title: new FormControl('',
          [Validators.required,
          Validators.minLength(2)]),

        content: new FormControl('',
          [Validators.required,
          Validators.minLength(2)]),

      })
    });


    this.filteredOptions = this.recipientControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  public recipientsList() {
    this.mainService.getRecipientsList().subscribe(
      data => {
        this.recipients = data;
      }
    );
  }

  onSubmit() {
    let message = this.sendMessageFormGroup.controls['message'].value;

    message.sender = localStorage.getItem('actual_sender');
    message.recipient = this.recipientControl.value;

    
    this.mainService.sendMessage(message).subscribe({
      next: response => {
        console.log("response after send message");
      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
    );


  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.recipients.filter(option => option.toLowerCase().includes(filterValue));
  }

  get title() { return this.sendMessageFormGroup.get('message.title'); }
  get content() { return this.sendMessageFormGroup.get('message.content'); }
}
