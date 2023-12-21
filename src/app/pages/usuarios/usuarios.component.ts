import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  
  @Output() editar = new EventEmitter<number>();

  private users = this.service.urlBase+'users';
  usuarios: any = [];

  constructor(private service: HttpService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.service.get(this.users)
      .subscribe( resp => {
        this.usuarios = resp;
      },(error) =>{
        console.log('hubo un error al listar usuarios: ', error);  
      })
  }

  editarUsuario(id:number){
    this.editar.emit(id);
  }

}
