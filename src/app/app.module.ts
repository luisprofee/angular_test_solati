import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveComponent } from './pages/reactive/reactive.component';

import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsersComponent } from './components/users/users.component';
import { ComponentsModule } from './components/components.module';

import { FormularioComponent } from './pages/formulario/formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveComponent,
    UsuariosComponent,
    UsersComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
