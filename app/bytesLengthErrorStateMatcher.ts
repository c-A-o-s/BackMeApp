import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BackmeappService } from './backmeapp.service';

export class BytesLengthErrorStateMatcher implements ErrorStateMatcher {
  constructor(private maxLength: number, private backMeAppSvc: BackmeappService){}
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.value && this.backMeAppSvc.byteLenghtOf(control.value)) > this.maxLength;
  }
}
