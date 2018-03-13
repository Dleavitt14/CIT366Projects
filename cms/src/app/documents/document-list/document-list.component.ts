import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Document } from '../document.model';
import {DocumentsService} from '../documents.service';
import {Contact} from '../../contacts/contacts.model';
import {Params} from '@angular/router';
import {Message} from '../../messages/message.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  document: Document[] = [];

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.document = this.documentService.getDocuments();

    this.documentService.documentChangedEvent.subscribe((document: Document[]) => {
      this.document = document;
    });
  }
}
