import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import {Contact} from "../contacts/contacts.model";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import 'rxjs/Rx';
import {Document} from "../documents/document.model";

@Injectable()
export class MessagesService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  getMaxId():number {

    var maxId = 0;

    for(let message of this.messages){
      let currentId = parseInt(message.id);
      if( currentId > maxId){
        maxId = currentId;
      } //end if
    } //end for
    return maxId;
  }

  initMessages(){
    this.http.get('http://localhost:3000/messages')
      .map(
        (response: any) => {
          // const messages: Message[] = response.json();
          return response.obj;
        }
      )
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        }
      )
  }

  // storeMessages(){
  //   let messageArray = JSON.stringify(this.messages);
  //   console.log('store messages method called');
  //   console.log('the array of MESSAGES that should be passed on is this: ' + messageArray);
  //   this.http.put('https://cmscit366.firebaseio.com/messages.json', messageArray)
  //     .subscribe(
  //       (response: Response)=> {
  //         console.log(response)
  //         console.log('Response has happened in store messages');
  //       }
  //     );
  // }

  constructor(private http: HttpClient) {
    this.initMessages();
  }
  getMessages() :Message[]{
    return this.messages.slice();
  } ;

  addMessage(message: Message) {
    if (message === undefined || message === null) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const strDocument = JSON.stringify(message);
    this.http.post('http://localhost:3000/messages', strDocument, {headers: headers})
      .map(
        (res: any) => {
          return res.obj;
        })
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.next(this.messages.slice());
        }
      );
  }

  getMessage(id:string ):Message {
    for( let message of this.messages){
      if (message.id == id){
        return message;
      }//end if
    }//end for
    return null;
  }
}
