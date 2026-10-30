import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-two-way-component',
  standalone: false,
  styleUrl: './binding-two-way-component.css',
  templateUrl: './binding-two-way-component.html',
})
export class BindingTwoWayComponent {
  hsa:number=0
  hsb:number=0
  hsc:number=0
  result: string = "";
  giaiptb2(): void {

    if (this.hsa == 0) {

      // Phương trình trở thành bx + c = 0
      if (this.hsb == 0) {

        if (this.hsc == 0) {
          this.result = "Phương trình vô số nghiệm";
        } else {
          this.result = "Phương trình vô nghiệm";
        }

      } else {

        let x = -this.hsc / this.hsb;
        this.result = "Phương trình có nghiệm x = " + x;

      }

    } else {

      // Phương trình bậc 2
      let delta = Math.pow(this.hsb, 2) - 4 * this.hsa * this.hsc;

      if (delta < 0) {

        this.result = "<font color='red'>Phương trình vô nghiệm</font>";

      } else if (delta == 0) {
        this.result = "<font color='green'>x1=x2= " + (-this.hsb / (2 * this.hsa)) + "</font>";
      } else {
        let x1 = (-this.hsb + Math.sqrt(delta)) / (2 * this.hsa);
        let x2 = (-this.hsb - Math.sqrt(delta)) / (2 * this.hsa);
        this.result = "<font color='blue'>x1 = " + x1 + "</br><font color='purple'>x2 = " + x2 + "</font>";
      }
    }
  }
}