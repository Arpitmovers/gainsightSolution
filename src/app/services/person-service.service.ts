import { Injectable, EventEmitter } from '@angular/core';
import { personModel } from '../main/person.model';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonServiceService {

  constructor() { }

  startEdit = new Subject<Number>();
  persons = [];
  personsCopy = [];
  newPersonCreated = new Subject<personModel>();
  clearAddEditWindow = new Subject<any>();
  currentEditingIndex:number;
  localStorageUsers = localStorage.getItem('users');
 
  filteredPersons = new Subject<personModel[]>();
  

  addNewPerson(person: personModel) {
	  this.persons.push(person);
	  this.newPersonCreated.next(person);
    localStorage.setItem("users", JSON.stringify(this.persons));

   }

  getPersons(){
    if (JSON.parse(this.localStorageUsers)) {
     if (this.persons.length == 0){
       this.persons =JSON.parse(this.localStorageUsers);     
     }
     return this.persons;
   }else{
     this.persons = [];
     return [];
   } 
  }

  deletePerson(index){
     this.persons.splice(index,1);
  }

  editPerson(index){
    let person = this.getPerson(index);
     person.edit = true;
    this.currentEditingIndex = index;
    this.startEdit.next(index);

  }

  updatePerson(person: personModel) {
    let index = this.getEditingIndex();
    this.persons[index] = person;
    person.edit = true;
    localStorage.setItem("users", JSON.stringify(this.persons));
    this.newPersonCreated.next(person);
  }

  getEditingIndex(){
    return  this.currentEditingIndex;
  }

  getPerson(index){
    var person= this.persons[index];
    return  person;
   }

  closeAddEditWindow(){
    this.clearAddEditWindow.next();
  }

  getEmptyPerson(){
     return { fname: '', llname: '', mail: '', title: '', fullName: '' };
  }

  filterdata (filterInput) {
    this.filteredPersons.next(filterInput);
  }

}
