import { Component, OnInit, OnDestroy } from '@angular/core';

import { Contact } from '../contacts.model';
import {ContactsService} from '../contacts.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contact: Contact = null;
  term = '';
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: ContactsService) {

  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
    console.log(contact);
  }

  ngOnInit() {

    this.contacts = this.contactService.getContacts();

    this.subscription = this.contactService.contactChangedEvent.
          subscribe((contact: Contact[]) => {
      this.contacts = contact;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }

}
