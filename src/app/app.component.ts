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
      (resultSet.length != 0)? this.usersArray = resultSet : 0 ;
      console.log(resultSet);
    });
    this.servicioUsuarios.nextIdInDB().subscribe(resultSet => {
      console.log('si entro en el nextid');
      console.log(resultSet);
      this.nextId = resultSet;
    })
  }

  usersArray: User[] = []

  selectedUser: User = new User(0, '','');
  nextId = 0;

  gStyle='w3-badge w3-tiny w3-green'
  rStyle='w3-badge w3-tiny w3-red'

  addOrEdit(){

    if((this.selectedUser.name === '' && this.selectedUser.status === '') || this.selectedUser.name === ''  || this.selectedUser.status === '')
    {
      alert("Los campos Nombre y Estatus no se pueden guardar vacíos. Favor de revisar.")

    }else {
      //Script para agregar un nuevo usuario
    if(this.selectedUser.id === 0){
      this.selectedUser.id = this.nextId;
      console.log(this.selectedUser)
      this.servicioUsuarios.createNewUser(this.selectedUser).subscribe(resultSet => {
        console.log('POST - si se hizo lo de aqui xd')
      });
      this.usersArray.push(this.selectedUser);
      alert("¡¡Usuario registrado de forma exitosa!!. Si el registro no se muestra, puedes hacer scroll sobre el area derecha donde se muestran los registros guardados.")
      this.servicioUsuarios.nextIdInDB().subscribe(resultSet => {
        console.log('si entro en el nextid');
        console.log(resultSet);
        this.nextId = resultSet;
      })
    }
    else{
        //Script para editar un usuario
        this.servicioUsuarios.updateUserById(this.selectedUser).subscribe(resultSet => {
          console.log('PUT - si se hizo lo de aqui xd')
        });
      }
      this.selectedUser = new User(0, '','');
    }

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
