import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursosService } from './cursos/cursos.service';
import { CriarCursoModule } from './criar-curso/criar-curso.module';
import { CursosModule } from './cursos/cursos.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
     CriarCursoModule, 
     CursosModule],
  // providers: [CursosService],
  bootstrap: [AppComponent]
})
export class AppModule {}