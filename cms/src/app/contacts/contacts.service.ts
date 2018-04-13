import { Injectable, EventEmitter } from '@angular/core';
import {Contact} from './contacts.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import {Subject} from 'rxjs/Subject';
import {Document} from '../documents/document.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class ContactsService {

  contacts: Contact[] = [];
  contactListChanged = new Subject<Contact[]>();
  maxContactId: number;

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new EventEmitter<Contact>()

  constructor(private http: HttpClient) {
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

  // addContact(newContact: Contact) {
  //   if (newContact === null) {
  //     return
  //   }
  //
  //   this.maxContactId++;
  //   newContact.id = this.maxContactId.toString();
  //   this.contacts.push(newContact);
  //
  //   this.storeContacts();
  // }
  //
  // updateContact(originalContact: Contact, newContact: Contact) {
  //   if (originalContact === null || newContact === null) {
  //     return
  //   }
  //
  //   let pos = this.contacts.indexOf(originalContact);
  //   if (pos < 0) {
  //     return
  //   }
  //
  //   newContact.id = originalContact.id;
  //   this.contacts[pos] = newContact;
  //   this.storeContacts();
  // }
  //
  // deleteContact(contact: Contact) {
  //   if (contact === null) {
  //     return
  //   }
  //
  //   let pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return
  //   }
  //
  //   this.contacts.splice(pos, 1);
  //   this.storeContacts();
  // }

  addContact(contact: Contact) {
    if (!contact) {
      return
    }

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });

    contact.id = '';
    const strContact = JSON.stringify(contact);

    this.http.post('http://localhost:3000/contacts', strContact, {headers: headers})
      .map(
        (res: any) => {
          return res.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return
    }

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });

    const strContact = JSON.stringify(newContact);

    this.http.patch('http://localhost:3000/contacts/' + originalContact.id, strContact,
      {headers: headers})
      .map(
        (res: any) => {
          return res.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .map(
        (res: any) => {
          return res.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChangedEvent.next(this.contacts.slice());
        });
  }

  inItContacts() {
    this.http.get('https://localhost:3000/contacts')
      .map(
        (response: any) => {
          return response.json().obj;
        }
      )
      .subscribe(
        (contactsReturned: Contact[]) => {
          this.contacts = contactsReturned;
          this.maxContactId = this.getMaxId();
          const contactListClone = this.contacts.slice();
          this.contactChangedEvent.next(contactListClone);
        }
      );
  }

  storeContacts() {
    JSON.stringify(this.contacts);
    this.http.put('https://cit261-cms.firebaseio.com/contacts.json', this.contacts)
      .subscribe(
        () => {
          let contactsListClone = this.contacts.slice();
          this.contactChangedEvent.next(contactsListClone);
        }
      )

  }
}
