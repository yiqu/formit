import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reactive Forms with Angular';
  subTitle = "Form building with FormGroup, FormControl, and FormArray";

  companyForm: FormGroup;
  addressComponents: Array<string> = ["street", "city", "zip", "state"];
  states: Array<string> = ["VA", "MD", "CA"];
  prettyValue: any;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    // Create the addrress FormGroup, which has 4 controls
    let addressFG = new FormGroup({});
    for (let i of this.addressComponents) {
      addressFG.addControl(i, new FormControl({
        value: '', 
        disabled: false
      }, i==="state" ? null : Validators.required));
    };
    
    /**
     *  Create children FormGroup
     *  Children -> name, age, address (multiple)
     *      
     */
    let childrenFG = new FormGroup({});
    childrenFG.addControl("name", new FormControl("child name"));
    childrenFG.addControl("age", new FormControl("21"));
    childrenFG.addControl("addresses", this.fb.array([addressFG]));

    /**
     * Create employee FormGroup
     */
    let employeeFG = new FormGroup({});
    employeeFG.addControl("name", new FormControl(""));
    employeeFG.addControl("age", new FormControl(""));
    employeeFG.addControl("address", new FormControl({
      value: "", 
      disabled: false}, 
    Validators.required));
    employeeFG.addControl("children", this.fb.array([childrenFG]));
    
    /**
     * Create management FromGroup
     */
    let managementFG = new FormGroup({});
    managementFG.addControl("name", new FormControl(""));
    managementFG.addControl("age", new FormControl(""));
    managementFG.addControl("address", this.fb.array([addressFG]));
    managementFG.addControl("children", this.fb.array([childrenFG]));

    


    this.companyForm = this.fb.group({
      sales: this.fb.array([managementFG]),
      hr: this.fb.array([managementFG]),
      ceo: employeeFG,
      vp: employeeFG
    });

    console.log(this.companyForm); 

    this.prettyValue = JSON.stringify(this.companyForm.value, undefined, 2)

    this.companyForm.valueChanges.subscribe(data => {
      console.log(data);
    })
  }

  createAddresses() {
   
  }


}
