import { Component, OnInit, Input } from '@angular/core';
import {Contacts} from '../contacts.model';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  @Input() contact: Contacts;

  constructor() { }

  ngOnInit() {

  }

}
