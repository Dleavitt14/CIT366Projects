export class Document {
  public documentId: number;
  public name: string;
  public description: string;
  public url: string;
  public children: string;

  constructor (documentId: number, name: string, description: string, url: string, children: string) {
    this.documentId = documentId;
    this.name = name;
    this.description = description;
    this.url = url;
    this.children = children;
  }
}
