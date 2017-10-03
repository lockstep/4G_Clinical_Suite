// Because this file references protractor, you'll need to have it as a project
// dependency to use 'protractor/globals'. Here is the full list of imports:
//
// import {browser, element, by, By, $, $$, ExpectedConditions}
//   from 'protractor/globals';
//
// The jasmine typings are brought in via DefinitelyTyped ambient typings.
import { browser, element, by, $ } from 'protractor';
import { provisionStudy, prancerAdminLogin } from './helpers';

describe('screening a patient', () => {
  beforeAll(() => {
    // TODO: This login is just for the API, better API auth would be nice
    prancerAdminLogin()
    // TODO: this is not currently working
    // provisionStudy('e2e_study_01', { clear: true });
    // provisionStudy('e2e_study_02');
  });

  // TODO: better selectors, these where the fastest to get working
  it('increases the row number by 1', () => {
    // TOOD: we're implictly on the start page due to the login in `beforeAll`, be more explicit!
    // TODO: select correct study from dropdown

    element(by.cssContainingText('.md-button', 'Patients')).click();

    let patientRows = element.all(by.repeater('patient in patients'));
    patientRows.count().then(n_patients_before => {
      element(by.cssContainingText('.md-button', 'Screen a patient')).click();

      let yobInput = element(by.name('input'));
      // Verify error message on invalid input
      yobInput.sendKeys('1000');
      element(by.cssContainingText('.btn-next', 'Next')).click();
      let error = $('[ng-message=min]').getText();
      expect(error).toEqual('Needs to be a numeric value, equal to, or higher than 1900.')

      yobInput.clear().then(() => {
        yobInput.sendKeys('1960')

        element(by.cssContainingText('.btn-next', 'Next')).click();
        element(by.cssContainingText('.btn-next', 'Submit')).click();

        // Back to patients list
        element(by.cssContainingText('.btn-next', 'Back to patients')).click();

        patientRows.count().then(n_patients_after => {
          expect(n_patients_after).toEqual(n_patients_before + 1);
        });
      });
    })
  });
});
