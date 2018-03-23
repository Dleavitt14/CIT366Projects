import {Component, OnInit, OnDestroy} from '@angular/core';
import { Document } from '../document.model';
import {DocumentsService} from '../documents.service';
import {Subscription} from 'rxjs/Subscription';

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

    this.subscription = this.documentService.documentChangedEvent.
        subscribe((document: Document[]) => {
      this.document = document;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
