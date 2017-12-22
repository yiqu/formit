import { Component, Input, OnChanges }                   from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Reactive Forms with Angular';
  subTitle = "Form building with FormGroup, FormControl, and FormArray";
}
