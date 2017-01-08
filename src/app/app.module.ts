import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WikiComponentComponent } from './wiki-component/wiki-component.component';
import { WikiServiceService } from './wiki-component/wiki-service.service';
import { CustomDirectiveContainerComponent } from './custom-directive-container/custom-directive-container.component';
import { MyHighlightDirective } from './custom-directive-container/my-highlight.directive';
import { HeroesComponent } from './tour-of-heroes/heroes.component';
import { MyHeroDetailComponent } from './tour-of-heroes/my-hero-detail.component';
import { HeroService } from './tour-of-heroes/hero.service';
import { AnimTestComponent } from './anim-test/anim-test.component';
import { MyFormComponent } from './my-form/my-form.component';
import { MyFormLeftComponent } from './my-form/my-form-left.component';
import { MyFormRightComponent } from './my-form/my-form-right.component';
import { DataManagerService } from './my-form/data-manager.service';
import { MyFormLeftBuilderComponent } from './my-form/my-form-left-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    WikiComponentComponent,
    CustomDirectiveContainerComponent,
    MyHighlightDirective,
    HeroesComponent,
    MyHeroDetailComponent,
    AnimTestComponent,
    MyFormComponent,
    MyFormLeftComponent,
    MyFormRightComponent,
    MyFormLeftBuilderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  providers: [WikiServiceService, HeroService, DataManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
