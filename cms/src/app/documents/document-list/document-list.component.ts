import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Document } from '../document.model';
import {Contacts} from '../../contacts/contacts.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  document: Document[] = [
    new Document (1, 'file1', 'file for school', 'fakeURL1', 'noChildren'),
    new Document (2, 'file2', 'file for work', 'fakeURL2', 'noChildren'),
    new Document (3, 'file3', 'file for fun', 'fakeURL3', 'noChildren'),
    new Document (4, 'file4', 'file for taxes', 'fakeURL4', 'noChildren'),
    new Document (5, 'file5', 'file for school', 'fakeURL', 'noChildren')
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);

  }

}
