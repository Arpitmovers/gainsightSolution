import { Component, OnInit, ViewChild, ElementRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormControl, FormArray, Validators, FormArrayName } from '@angular/forms';
import { NgClass } from '@angular/common';
import { PersonServiceService } from '../../services/person-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 
	modalVisible = false;
  @ViewChild('tableData') table: ElementRef;
  disableAddBtn = false;
  newpersonSubscribe: Subscription;
  editSubscribe: Subscription;
  clearaddeditWindow: Subscription;  
  mode: string='add';  

  person={};
  constructor(private personServ: PersonServiceService) { }
  filteredData = [];
  ngOnInit() {
    let me = this;

    this.newpersonSubscribe = this.personServ.newPersonCreated
      .subscribe(() => {
          this.modalVisible = false; 
          this.disableAddBtn = false;
          this.person = this.personServ.getEmptyPerson();  /* clear value of add/edit window*/
          this.mode = 'add';
      });

    this.editSubscribe = this.personServ.startEdit  /*on double click of row*/
      .subscribe((index) => {
          this.mode = 'edit';
          this.modalVisible = true;
          this.disableAddBtn = true;
          this.person = this.personServ.getPerson(index);  /*set values for add/edit window*/

      });

    this.clearaddeditWindow = this.personServ.clearAddEditWindow
      .subscribe(() => { 
        this.person = this.personServ.getEmptyPerson();
    });


  }

  
  AddPerson() {
    this.disableAddBtn = true;
    this.modalVisible = true;
    this.personServ.closeAddEditWindow();
   // this.myModal.myModal ? this.myModal.myModal.nativeElement.className = ' modal fade show' : '';
  }



 /*flag = true on closeing the window  */
  toggleModal(flag){
    this.modalVisible = !flag; /*hide window*/
    this.disableAddBtn = !flag;
  }
  

  filterRows(filterInput) {
     this.personServ.filterdata(filterInput.value);

  }


  ngOnDestroy(){
    this.newpersonSubscribe.unsubscribe();
    this.editSubscribe.unsubscribe();
    this.clearaddeditWindow.unsubscribe();
  }
}
