import {Component, OnInit, OnDestroy} from '@angular/core';
import { Document } from '../document.model';
import {DocumentsService} from '../documents.service';
import {Subscription} from 'rxjs/Subscription';
import {Contact} from '../../contacts/contacts.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  document: Document[] = [];
  private subscription: Subscription;

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.document = this.documentService.getDocuments();

    this.subscription = this.documentService.documentListChangedEvent.
        subscribe((documentList: Document[]) => {
      this.document = documentList;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
