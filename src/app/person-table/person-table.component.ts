import { Component, OnInit, EventEmitter, Output, OnDestroy, Input ,OnChanges,SimpleChange  } from '@angular/core';
import { PersonServiceService } from '../services/person-service.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {


 @Input()filtString: String;
 personSubscribe: Subscription;
 filteredData: Subscription;
 PersonArray = [];
 PeronArrayCopy = [];
  constructor(private personServ: PersonServiceService) {

  }

  ngOnInit() {
    this.PersonArray = this.personServ.getPersons();
    this.PeronArrayCopy = this.PersonArray;
    this.personSubscribe = this.personServ.newPersonCreated
		  .subscribe((person) => {
        if(person.edit){
          this.PersonArray = this.personServ.getPersons();
        }else
			    this.PersonArray.push(person);
		  });
   

     this.filteredData = this.personServ.filteredPersons
     .subscribe((str)=>{
       if (!str.length) {
         this.PersonArray = this.PeronArrayCopy;
         return;
       }
       var matched = this.PersonArray.filter((item) => {
         if (item.fname.indexOf(str) > -1) {
           return true;
         }
         return false;
       });
       this.PersonArray = matched;
     });
  

  }
  

  deletePerson(index){
    this.personServ.deletePerson(index);
    this.PersonArray = this.personServ.getPersons();
  }

  Edit(index){
    this.personServ.editPerson(index);  
  }

  ngOnDestroy(){
    this.personSubscribe.unsubscribe();
  }

}
