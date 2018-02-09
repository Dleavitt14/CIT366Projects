import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import {Message} from '../message.model';
import {Contacts} from '../../contacts/contacts.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'Derek Leavitt';

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subject.nativeElement.value;
    const msgText = this.msgText.nativeElement.value;
    const messageId = 1;
    const sender = this.currentSender;
    const newMessage = new Message(messageId, subject, msgText, sender);

    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }

}
