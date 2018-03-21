import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter,Input } from '@angular/core';
import { NewPersonComponent } from '../new-person/new-person.component';
import { PersonServiceService } from '../../services/person-service.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

 
  @Input()mode: string;
  modalVisible = false;
	@ViewChild('myModal') myModal;
  @ViewChild('app-new-person') newForm: ElementRef;
  @Output() hide = new EventEmitter<Boolean>();


  @Input()per;
  constructor(private perSerive:PersonServiceService) { }

  ngOnInit() {

  }


  closeModel() {
    this.myModal.nativeElement.className = ' modal hide';
    this.hide.emit(true); // true to close the window
    this.perSerive.closeAddEditWindow();
 

  }

}
