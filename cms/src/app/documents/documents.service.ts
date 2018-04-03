import {EventEmitter, Injectable} from '@angular/core';
import {Document} from './document.model';
import {Subject} from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DocumentsService {

  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor(private http: Http) {
    this.inItDocuments();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId() {
    let maxId: number;
    maxId = 0;

    for (let document of this.documents) {
      const currentId = parseInt(document.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null) {
      return
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || newDocument === null) {
      return
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return
    }

    let pos = this.documents.indexOf(document);
    if (pos < 0) {
      return
    }

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  inItDocuments() {
    this.http.get('https://cit261-cms.firebaseio.com/documents.json')
    .map(
      (response: Response) => {
        const documentsReturned: Document[] = response.json();
        return documentsReturned;
      }
    )
      .subscribe(
        (documentsReturned: Document[]) => {
          this.documents = documentsReturned;
          this.maxDocumentId = this.getMaxId();
          const documentListClone = this.documents.slice();
          this.documentListChangedEvent.next(documentListClone);
        }
      );
  }

  storeDocuments() {
    JSON.stringify(this.documents);
    this.http.put('https://cit261-cms.firebaseio.com/documents.json', this.documents)
      .subscribe(
        () => {
          let documentsListClone = this.documents.slice();
          this.documentListChangedEvent.next(documentsListClone);
        }
      )

  }

}
