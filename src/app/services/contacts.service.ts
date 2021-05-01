import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactsService {

constructor(private fireStore: AngularFirestore) { }

//create a new contatc
createContact(data:any):Observable<any>{
  data.id = this.fireStore.createId();
  var id = data.id;
  return from(this.fireStore.doc(`contacts/${id}`).set(data));
}

//get all contatcs
getContacts(){
  return this.fireStore.collection(`contacts`).valueChanges();
 }

//get particular contact
 getSingleContact(id){
  return this.fireStore.collection('contacts').doc(id).get()
 }

 //edit a contact
 editContact(data: any){
  return from(this.fireStore.doc(`contacts/${data.id}`).set(data));
 }

 //delete Contact
 deleteContact(data):Observable<any>{
  return from(this.fireStore.collection(`contacts/`).doc(data.id).delete())
}

}
