import { Component, OnInit, Input } from '@angular/core';
import {Contact} from '../contacts.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ContactsService} from '../contacts.service';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {

  contact: Contact;
  id: string;

  constructor(private contactService: ContactsService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
        }
      );

  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts']);
  }

}
