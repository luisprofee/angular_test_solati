import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  
  {path:'reactivo', component: ReactiveComponent},
  {path:'usuarios', component: UsuariosComponent},
  {path:'formulario', component: FormularioComponent},
  {path: '**', pathMatch: 'full', redirectTo:'reactivo'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
