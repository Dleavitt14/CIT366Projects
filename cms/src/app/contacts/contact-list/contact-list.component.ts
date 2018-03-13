import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Contact } from '../contacts.model';
import {ContactsService} from '../contacts.service';
import {Document} from '../../documents/document.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contact: Contact = null;

  contacts: Contact[] = [];

  constructor(private contactService: ContactsService) {

  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  ngOnInit() {

    this.contacts = this.contactService.getContacts();

    this.contactService.contactChangedEvent.subscribe((contact: Contact[]) => {
      this.contacts = contact;
    });
  }

}
