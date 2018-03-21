import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { PersonServiceService } from '../../services/person-service.service';
import { personModel } from '../person.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {

  @Input()editOrNew;
  @Input() personEdit;
  @ViewChild('ngForm') formAddEdit;

     constructor(private personSer: PersonServiceService) { }

      ngOnInit() {

      }

  onsubmitItem(form) {
    if(this.editOrNew=="edit"){
    //  let editIndex = this.personSer.getEditingIndex();
      let person = new personModel(form.value.fname, form.value.lname, form.value.mail, form.value.title);  
      this.personSer.updatePerson(person);

    }else{
      let person = new personModel(form.value.fname, form.value.lname, form.value.mail, form.value.title);
      this.personSer.addNewPerson(person);
    }     
  }

}
