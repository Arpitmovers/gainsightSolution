import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main/main.component';
import { ModalComponent } from './main/modal/modal.component';
import { NewPersonComponent } from './main/new-person/new-person.component';
import { PersonServiceService } from './services/person-service.service';
import { PersonTableComponent } from './person-table/person-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ModalComponent,
    NewPersonComponent,
    PersonTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [PersonServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
