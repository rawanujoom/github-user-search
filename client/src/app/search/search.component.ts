import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userList: Array<Object> = [];
  emptySearch: Boolean = true;
  userCount: Number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  userFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  onSubmit() {
    // Validation is happening in MyErrorStateMatcher 
    this.getUser();
  }

  handlePageEvent($event) {
    this.getUser(++$event.pageIndex);
  }

  getUser(pageIndex = 1) {
    this.userService.getUser(this.userFormControl.value, pageIndex).subscribe((res: any) => {
      this.userList = res['items'];
      this.userCount = res['total_count']; 
    });
  }
  
  isDisabledSearch() {
    return !this.userFormControl.value || this.userFormControl.value.trim().length == 0;
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && isSubmitted);
  }
}