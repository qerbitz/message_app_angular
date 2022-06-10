import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Message } from '../interface/Message'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  public getRecipientsList(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.apiUrl}/home/recipientsList`);
  }

  public getMessagesBySender(recipient: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${this.apiUrl}/home/senderMessages?sender=${recipient}`);
  }

  public sendMessage(message: Message): Observable<any> {
    return this.httpClient.post<Message>(`${this.apiUrl}/home/saveMessage`, message);
  }
}
