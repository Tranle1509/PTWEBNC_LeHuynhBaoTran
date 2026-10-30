import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  styleUrl: './contact.css',
  templateUrl: './contact.html',
})
export class Contact {
  sayHello(){
    alert("Hello from Contact Component");
  }
  sayHello2(mydiv:HTMLDivElement)
  {
    mydiv.innerHTML='Nguyễn Thị Long Lanh';
  }
}
