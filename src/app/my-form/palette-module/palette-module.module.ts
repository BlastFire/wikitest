import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaletteModuleComponent } from './palette-module.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaletteModuleComponent],
  exports: [PaletteModuleComponent]
})
export class PaletteModuleModule { }
