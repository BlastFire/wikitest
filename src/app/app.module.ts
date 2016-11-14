import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { WikiComponentComponent } from './wiki-component/wiki-component.component';
import { WikiServiceService } from './wiki-component/wiki-service.service';
import { CustomDirectiveContainerComponent } from './custom-directive-container/custom-directive-container.component';
import { MyHighlightDirective } from './custom-directive-container/my-highlight.directive';
import { TourOfHeroesComponent } from './tour-of-heroes/tour-of-heroes.component';
import { MyHeroDetailComponent } from './tour-of-heroes/my-hero-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    WikiComponentComponent,
    CustomDirectiveContainerComponent,
    MyHighlightDirective,
    TourOfHeroesComponent,
    MyHeroDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  providers: [WikiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
