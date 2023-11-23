import { Component } from '@angular/core';
import { User } from './models/user';
import { UsersServiceService } from './services/users-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  title = 'frontCrud_examenAse';

  constructor(private servicioUsuarios: UsersServiceService) {
    this.servicioUsuarios.getAllUsers().subscribe(resultSet => {
      console.log('Respuesta de la API en GET getAllUsers')
      console.log( resultSet);

      (resultSet.length != 0)? this.usersArray = resultSet : 0 ;
    })
  }

  usersArray: User[] = []

  selectedUser: User = new User(0, '','');

  addOrEdit(){
    //Script para agregar un nuevo usuario
    if(this.selectedUser.id === 0){
      this.servicioUsuarios.createNewUser(this.selectedUser).subscribe(resultSet => {
        console.log('POST - si se hizo lo de aqui xd')
      });
      this.selectedUser.id = this.usersArray.length + 1;
      this.usersArray.push(this.selectedUser);
    }

    if(this.selectedUser.id > 0){
      this.servicioUsuarios.updateUserById(this.selectedUser).subscribe(resultSet => {
        console.log('PUT - si se hizo lo de aqui xd')
      });
    }
    //Script para modificar un usuario
    this.selectedUser = new User(0, '','');

  }

  editUser(user: User){
    this.selectedUser = user;
  }

  deleteUser(user: User){
    if(confirm('¿Estás seguro que quieres borrar el registro de '+user.name+'?')){
      this.servicioUsuarios.deleteUserById(user).subscribe(resultSet => {
        console.log('DELETE - si se hizo lo de aqui xd')
      });
      this.usersArray = this.usersArray.filter(x => x.id != user.id);
      this.selectedUser = new User(0, '','')
    }
  }
}
