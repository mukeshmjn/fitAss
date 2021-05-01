import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactsService } from '../services/contacts.service';
import { ToastrService } from 'ngx-toastr';
import  Swal  from 'sweetalert2';
@Component({
  selector: 'app-myContacts',
  templateUrl: './myContacts.component.html',
  styleUrls: ['./myContacts.component.scss']
})
export class MyContactsComponent implements OnInit {

  constructor(private modalService: NgbModal,private cs : ContactsService,private toastr: ToastrService) { }
  closeResult: string;
  contactform : FormGroup;
  contacts:any;
  singleContact:any;
  term:any;
  
  ngOnInit() {
    this.initForm();
    this.getContacts();
  }

  initForm(){

    this.contactform = new FormGroup({
      name: new FormControl('',[Validators.required, Validators.minLength(2)]),
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      number: new FormControl('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    });
  }

  openCreate(content) {
    this.initForm();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  openEdit(content,id) {
    this.getSigleContact(id,content);


    
  }
  
  private getDismissReason1(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
//(click)="modal.close('Save click')"

getContacts(){
  this.cs.getContacts().subscribe(res=>{
  console.log(res)
  this.contacts = res
    this.initForm;
  })
}

onSubmit(){
console.log('submittteeed')
var data = this.contactform.value;
this.cs.createContact(data).subscribe(res=>{
  console.log('created: ',res)
  this.toastr.success('Successfully!', 'Contact created!');
  this.contactform.setValue({
    name:'',
    email:'',
    number:''
  })
})
}

deleteContact(data){
  Swal.fire({
    title: 'Are you sure you want to delete the contact?',
    showDenyButton: true,
   // showCancelButton: true,
    confirmButtonText: `Yes`,
    denyButtonText: `No`,
  }).then((result) => {
 
    if (result.isConfirmed) {
      this.cs.deleteContact(data).subscribe(res=>{
    this.toastr.success('Successfully!', 'Contact deleted!');
  })
      
    } else if (result.isDenied) {
      // Swal.fire('Changes are not saved', '', 'info')
    }
  })
  // this.cs.deleteContact(data).subscribe(res=>{
  //   console.log(res)
  // })
}

getSigleContact(data,content){
  this.cs.getSingleContact(data).subscribe(res=>{
    console.log(res.data())
    this.singleContact = res.data();
    this.contactform.setValue({
      name:this.singleContact.name,
      email:this.singleContact.email,
      number:this.singleContact.number
    })
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason1(reason)}`;
  
    });
  })
}
editContact(){
  var data = this.contactform.value;
  data.id = this.singleContact.id;
  this.cs.editContact(data).subscribe(res=>{
    console.log(res);
    this.toastr.success('Successfully!', 'Contact edited!');
  })
}
}
