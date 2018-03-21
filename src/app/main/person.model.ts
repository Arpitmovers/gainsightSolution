export class personModel{
	fullName: String;
	constructor(public fname:string='', public lname:string='', public mail:string,public title:string,public edit:Boolean=false){
		
		this.fullName = fname  + ' ' + lname;
	}
}