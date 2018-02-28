import { Injectable, EventEmitter } from '@angular/core';
import {Contact} from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactsService {

  contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

}
