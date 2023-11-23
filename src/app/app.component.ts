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

  usersArray: User[] = []
  selectedUser: User = new User(0, '','');

  nextId = 0;
  gStyle='w3-badge w3-tiny w3-green';
  rStyle='w3-badge w3-tiny w3-red';

  constructor(private servicioUsuarios: UsersServiceService) {
    this.servicioUsuarios.getAllUsers().subscribe(resultSet => {
      (resultSet.length != 0)? this.usersArray = resultSet : 0 ;
      //console.log(resultSet);
      console.log('Ejecuto GET Req para getAllUsers');
    });
    this.servicioUsuarios.nextIdInDB().subscribe(resultSet => {
      console.log('Ejecuto GET Req para nextIdInDB');
      this.nextId = resultSet;
    })
  }

  addOrEdit(){
    if((this.selectedUser.name === '' && this.selectedUser.status === '') || this.selectedUser.name === ''  || this.selectedUser.status === ''){
      alert("Los campos Nombre y Estatus no se pueden guardar vacíos. Favor de revisar.")
    } else{
      //Script para agregar un nuevo usuario
      if(this.selectedUser.id === 0){
        this.selectedUser.id = this.nextId;
        this.servicioUsuarios.createNewUser(this.selectedUser).subscribe(resultSet => {
            console.log('Ejecuto POST Req para createNewUser');

            this.servicioUsuarios.nextIdInDB().subscribe(resultSet => {
              console.log('Ejecuto GET Req para nextIdInDB');
              this.nextId = resultSet;
            });
          });
        this.usersArray.push(this.selectedUser);
        alert("¡¡Usuario registrado de forma exitosa!!. Si el registro no se muestra, puedes hacer scroll sobre el area derecha donde se muestran los registros guardados.")

      } else{
        //Script para editar un usuario
        this.servicioUsuarios.updateUserById(this.selectedUser).subscribe(resultSet => {
          console.log('Ejecuto PUT Req para updateUserById');
          alert("¡¡Usuario modificado de forma exitosa!!")
        });
      }
      this.servicioUsuarios.nextIdInDB().subscribe(resultSet => {
        console.log('Ejecuto GET Req para nextIdInDB');
        this.nextId = resultSet;
      });
      this.selectedUser = new User(0, '','');
    }
  }

  editUser(user: User){
    this.nextId = user.id;
    this.selectedUser = user;
  }

  deleteUser(user: User){
    if(confirm('¿Estás seguro que quieres borrar el registro de '+user.name+'?')){
      this.servicioUsuarios.deleteUserById(user).subscribe(resultSet => {
        console.log('Ejecuto DELETE Req para deleteUserById');
        this.servicioUsuarios.nextIdInDB().subscribe(resultSet => {
          console.log('Ejecuto GET Req para nextIdInDB');
          this.nextId = resultSet;
        });
      });
      this.usersArray = this.usersArray.filter(x => x.id != user.id);
      this.selectedUser = new User(0, '','')
    }
  }
}
