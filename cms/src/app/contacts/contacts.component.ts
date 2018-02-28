import { Component, OnInit } from '@angular/core';
import {ContactsService} from './contacts.service';
import {Contact} from './contacts.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact = null;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.contactSelectedEvent
      .subscribe(
        (contact: Contact) => {
      this.selectedContact = contact;
    }
    );
  }

}
