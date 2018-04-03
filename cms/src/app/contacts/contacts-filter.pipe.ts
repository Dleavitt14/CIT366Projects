import { Pipe, PipeTransform } from '@angular/core';
import {Contact} from './contacts.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], [term]) {
    let filteredArray: Contact[] = [];

    filteredArray = contacts.filter(
      (contact: any) => {
        return contact.name.toLowerCase().includes(term.toLowerCase())
      }
    );

    if (filteredArray.length < 1) {
      return contacts;
    }

    return filteredArray;
  }
}
