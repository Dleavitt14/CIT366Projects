import {EventEmitter, Injectable} from '@angular/core';
import {Document} from './document.model';
import {Subject} from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class DocumentsService {

  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor(private http: HttpClient) {
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

  addDocument(document: Document) {
    if (!document) {
      return
    }

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });

    document.id = '';
    const strDocument = JSON.stringify(document);

    this.http.post('http://localhost:3000/documents', strDocument, {headers: headers})
      .map(
        (res: any) => {
          return res.json().obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return
    }

    const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);

    this.http.patch('http://localhost:3000/documents/' + originalDocument.id, strDocument,
      {headers: headers})
      .map(
        (res: any) => {
          return res.json().obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .map(
        (res: any) => {
          return res.json().obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentChangedEvent.next(this.documents.slice());
        });
  }

  inItDocuments() {
    this.http.get('https://localhost:3000/documents')
    .map(
      (res: any) => {
        return res.json().obj
      }
    )
      .subscribe(
        (documentsReturned: Document[]) => {
          this.documents = documentsReturned;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
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
