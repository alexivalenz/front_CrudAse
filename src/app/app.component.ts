import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontCrud_examenAse';

  usersArray: User[] = [
    {id: 1, name: 'Alexia Valenz', status: 'Activo'},
    {id: 2, name: 'Wendy Val', status: 'Activo'},
    {id: 3, name: 'Jefecito Arellano', status: 'Activo'},
    {id: 4, name: 'Yunis Gonz', status: 'Activo'}
  ]

  selectedUser: User = new User(0, '','');

  addOrEdit(){
    if(this.selectedUser.id === 0){
      this.selectedUser.id = this.usersArray.length + 1;
      this.usersArray.push(this.selectedUser);
    }

    this.selectedUser = new User(0, '','');
  }

  editUser(user: User){
    this.selectedUser = user;
  }

  deleteUser(user: User){
    if(confirm('¿Estás seguro que quieres borrar el registro de '+user.name+'?')){
      this.usersArray = this.usersArray.filter(x => x.id != user.id);
      this.selectedUser = new User(0, '','')
    }
  }
}
