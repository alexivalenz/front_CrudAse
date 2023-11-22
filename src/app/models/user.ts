export class User {
  id: number;
  name: String;
  status: String;


  constructor(id: number,nombre:string, estatus:string) {
    this.id = id;
    this.name = nombre;
    this.status = estatus;
  }
}
