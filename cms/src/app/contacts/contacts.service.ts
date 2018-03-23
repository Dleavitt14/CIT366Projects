import { Injectable, EventEmitter } from '@angular/core';
import {Contact} from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Subject} from 'rxjs/Subject';
import {Document} from '../documents/document.model';

@Injectable()
export class ContactsService {

  contacts: Contact[] = [];
  contactListChanged = new Subject<Contact[]>();
  maxContactId: number;

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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

  getMaxId() {
    let maxId: number;
    maxId = 0;

    for (let contact of this.contacts) {
      const currentId = parseInt(contact.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null) {
      return
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    let contactListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact === null || newContact === null) {
      return
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactListClone);
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return
    }

    let pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return
    }

    this.contacts = this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    this.contactChangedEvent.next(contactsListClone);
  }
}
