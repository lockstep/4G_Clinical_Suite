import {
  browser, element, by, By, $, $$, ExpectedConditions
} from 'protractor';

import { clickButton } from './helpers';

class Prancer {
  studyDropDown: any
  patientRows: any
  yearOfBirthInput: any

  constructor() {
    this.studyDropDown = $('.md-nav-bar-study');
    this.patientRows = element.all(by.repeater('patient in patients'));
    // NOTE: Both the input name and ng-model are generic (input and
    // ngModel respectively) so unfortunately there doesn't seem to be a
    // better way to reference this input.
    this.yearOfBirthInput = element(by.name('input'));
  }

  selectStudy(studyId: string, site: string) {
    this.studyDropDown.click();
    // NOTE: research suggests that `sendKeys` is the most reliable way to select
    // options while staying independent of nested markup.
    element(by.model('ctrl.studyCode')).sendKeys(studyId);
    element(by.model('ctrl.siteCode')).sendKeys(site);
    clickButton('Select');
  }

  countPatientRows() {
    return this.patientRows.count();
  }

  enterYearOfBirth(input) {
    this.yearOfBirthInput.sendKeys(input);
    clickButton('Next');
  }

  pageBody() {
    return $('body').getText();
  }
}

export default Prancer;
