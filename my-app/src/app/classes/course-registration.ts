export class CourseRegistration {
  fullName = '';
  email = '';
  phone = '';
  course = '';
  select_class = '';
  agree = false;

  getInfor(): string {
    return 'Full Name = ' + this.fullName + '\n'
      + 'Email = ' + this.email + '\n'
      + 'Phone = ' + this.phone + '\n'
      + 'Course = ' + this.course + '\n'
      + 'Select Class = ' + this.select_class + '\n'
      + 'Agree = ' + this.agree;
  }
}
