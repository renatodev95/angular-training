import { NgModule, LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/pt';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ExemplosPipesComponent } from './exemplos-pipes/exemplos-pipes.component';
import { CamelCasePipe } from './camel-case.pipe';
import { SettingsService } from './settings.service';
import { FiltroArrayPipe } from './filtro-array.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExemplosPipesComponent,
    CamelCasePipe,
    FiltroArrayPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    // {
    //   provide: LOCALE_ID, --> fornecendo as informações HARD CODED
    //   useValue: 'pt-BR'
    // }
    SettingsService,
    {
      provide: LOCALE_ID,   // --> fornecendo as informações através de um Service
      deps: [SettingsService],
      useFactory: (settingsService: { getLocale: () => any; }) => settingsService.getLocale()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
