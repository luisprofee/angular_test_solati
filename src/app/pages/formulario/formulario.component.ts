import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { UsuariosComponent } from '../usuarios/usuarios.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  private users = this.service.urlBase+'users';
  usuarios: any = [];
  usuario = {
    nombres: '',
    apellidos: '',
    cedula: '',
    correo: '',
    telefono: '',
    id: ''
  }
  forma!: FormGroup;
  estado = true;

  @ViewChild(UsuariosComponent) userComponents!:UsuariosComponent;
  constructor( private fb: FormBuilder,
               private service: HttpService,
                ) { 
    this.crearformulario();
  }

  ngOnInit(): void {
    
  }


  get nombreNoValido(){
    return this.forma.get('nombres')?.invalid && this.forma.get('nombres')?.touched
  }
  get apellidoNoValido(){
    return this.forma.get('apellidos')?.invalid && this.forma.get('apellidos')?.touched
  }
  get cedulaNoValido(){
    return this.forma.get('cedula')?.invalid && this.forma.get('cedula')?.touched
  }
  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }
  get telefonoNoValido(){
    return this.forma.get('telefono')?.invalid && this.forma.get('telefono')?.touched
  }

  crearformulario(){
    this.forma = this.fb.group({
      nombres   : [this.usuario.nombres, [Validators.required, Validators.minLength(5)]],
      apellidos : [this.usuario.apellidos, [Validators.required, Validators.minLength(5)]],
      cedula    : [this.usuario.cedula, [Validators.required, Validators.min(4)]],
      correo    : [this.usuario.correo, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono  : [this.usuario.telefono, [Validators.required, Validators.min(9)]]
    });
  }

  guardar(){
    if(this.forma.invalid){
      return Object.values( this.forma.controls ).forEach( control => {
        control.markAllAsTouched();
      })
    }

    this.service.post(this.users, this.forma.value)
      .subscribe(resp => {
        this.obtenerUsuarios();
        this.limpiarFormulario();
        this.userComponents.obtenerUsuarios();
      },(error) =>{
        alert('No se aceptan cedulas ni correos duplicados, por favor verifique');
        
      })
    console.log('formulario valido');
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
    console.log('el id: ', id);
    this.service.get(this.users+'/'+id)
      .subscribe(resp => {
        //@ts-ignore
        this.usuario = resp.data.attributes;
        //@ts-ignore
        this.usuario.id = resp.data.id;
        this.crearformulario();
        this.estado = false;
      },(error) =>{
        console.log('hubo un error al buscar el usuario: ', error);
        
      })
    
  }

  actualizarUsuario(){
    this.service.put(this.users+'/'+this.usuario.id, this.forma.value)
      .subscribe(resp =>{
        this.limpiarFormulario();
        this.userComponents.obtenerUsuarios();
      },(error) =>{
        alert('No se aceptan cedulas ni correos duplicados, por favor verifique');
      })
  }

  limpiarFormulario(){
    this.usuario.nombres = ''; 
    this.usuario.apellidos = ''; 
    this.usuario.cedula = ''; 
    this.usuario.correo = ''; 
    this.usuario.telefono = ''; 
    this.crearformulario();
    this.estado = true;
  }

}
