import {
  browser, element, by, By, $, $$, ExpectedConditions
} from 'protractor';

import { clickButton } from './helpers';

class PatientsPage {
  patientRows: any
  yearOfBirthInput: any

  constructor() {
    this.patientRows = element.all(by.repeater('patient in patients'));

    // NOTE: Both the input name and ng-model are generic (input and
    // ngModel respectively) so unfortunately there doesn't seem to be a
    // better way to reference this input.
    this.yearOfBirthInput = element(by.name('input'));
  }

  countPatientRows() {
    return this.patientRows.count();
  }

  enterYearOfBirth(input) {
    this.yearOfBirthInput.sendKeys(input);
    clickButton('Next');
  }
}

export default PatientsPage;
