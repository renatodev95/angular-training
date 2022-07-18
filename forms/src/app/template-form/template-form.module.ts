import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { TemplateFormComponent } from './template-form.component';

@NgModule({
  declarations: [
    TemplateFormComponent,
    FormDebugComponent,
    CampoControlErroComponent,
  ],
  imports: [CommonModule, FormsModule],
})
export class TemplateFormModule {}
