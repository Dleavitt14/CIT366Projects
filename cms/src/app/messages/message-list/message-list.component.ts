import { Component, OnInit } from '@angular/core';
import {Message} from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message(1, 'School', 'School is good', 'Scooby Doo'),
    new Message(2, 'Work', 'Work is hard', 'John Deer'),
    new Message(3, 'Social Life', 'Date tonight', 'Ben Food')
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);

  }

}
