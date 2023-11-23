#front_crudAse
Proyecto frontend encargado de la administración (consulta, creación, modificación y borrado) de usuarios, apoyado de una API en NodeJS (`ws_crudAse`) que realiza el procesamiento pertinente para realizar las tareas de administración de usuarios.
Los estilos que observas se encuentran realizados 100% en CSS. 

##Development server
Para iniciar el proyecto despues de clonarlo, correr el comando `npm install` para agregar las dependencias en el Package.json. Despues correr el comando `ng serve` para levantar el servidor en su modo Desarrollo. Para mandar peticiones a la API, la URL que se necesita es http://localhost:4200.

##IMPORTANTE ANTES DE CORRER LA APLICACIÓN
Para que la aplicación pueda correr de forma correcta, es necesario que antes este levantada la API que la apoya (`ws_crudAse`), ya que en el constructor del componente principal se 
realizan peticiones a dicha API para poder mostrar de inicio los usuarios que se encuentran registrados en la base de datos (en caso de existir algunos).
