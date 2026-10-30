import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-course-registration-reactive-component',
  standalone: false,
  templateUrl: './course-registration-reactive-component.html',
  styleUrl: './course-registration-reactive-component.css',
})
export class CourseRegistrationReactiveComponent {
public regForm: FormGroup = new FormGroup(
    {
      name: new FormControl('Trần Duy Thanh', 
        [Validators.required,Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPass: new FormControl('', [Validators.required])
    }
  );

  setDefaultValues(): void {
    this.regForm.setValue({
      name: 'Trần Duy Thanh',
      email: 'thanhtd@uel.edu.vn',
      password: '',
      confirmPass: '',
    });
  }
}

