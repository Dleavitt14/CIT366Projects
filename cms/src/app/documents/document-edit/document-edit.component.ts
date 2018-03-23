import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {DocumentsService} from '../documents.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Document} from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  document: Document;
  originalDocument: Document;
  editMode: boolean = false;
  id: string;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];

          if (this.id === null) {
            this.editMode = false;
            return
          }

          this.originalDocument = this.documentService.getDocument(this.id);

          if (this.originalDocument === null) {
            return
          }

          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      );
  }

  onSubmit(form: NgForm) {
    let newId = this.documentService.getMaxId();
    newId = newId++;
    let values = form.value;
    let newDocument = new Document(newId.toString(), values['name'], values['description'], values['url'], null);
    if(this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {

      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }


}
