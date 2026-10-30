import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-property-component',
  standalone: false,
  styleUrl: './binding-property-component.css',
  templateUrl: './binding-property-component.html',
})
export class BindingPropertyComponent {
  public name:string = 'Le Huynh Bao Tran'
  public email: string = 'tranlhb24411e@st.uel.edu.vn'
  public nameid:string="nameid"
  public emailid:string="emailid"
  public isDisabled:boolean=true
  public hello:string="Welcome to K24411E"
  public red_color: string="red"
}