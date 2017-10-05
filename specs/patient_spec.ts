import {browser, element, by, $} from 'protractor';
import {
  clickLink,
  clickButton,
  provisionStudy,
  prancerAdminLogin,
  selectStudy
} from './helpers';

describe('TC1: Screen a patient', () => {
  beforeAll(async () => {
    await provisionStudy('e2e_study_02')

    prancerAdminLogin();

    selectStudy('e2e_study_01', '102')
  }, 90000);

  afterAll(async () => {
    await provisionStudy('e2e_study_01', {clean: true})
  }, 90000)

  // NOTE: Return to home after each scenario.
  beforeEach(() => {
    browser.setLocation('/')
  });

  it('Adds a patient to the patient list', async () => {
    clickLink('Patients');

    const patientRows = element.all(by.repeater('patient in patients'));
    // NOTE: Using snake case per spec document...should be camelCase here.
    const n_patients_before = await patientRows.count()
    clickButton('Screen a patient');
    // NOTE: Both the input name and ng-model are generic (input and
    // ngModel respectively) so unfortunately there doesn't seem to be a
    // better way to reference this input.
    const yearOfBirthInput = element(by.name('input'));
    yearOfBirthInput.sendKeys('1960')
    clickButton('Next');
    clickButton('Submit');
    // Back to patients list
    clickButton('Back to patients');
    patientRows.count().then(n_patients_after => {
      expect(n_patients_after).toEqual(n_patients_before + 1);
    });
  });

  describe('User inputs an invalid year of birth', () => {
    it('Shows a validation error', () => {
      clickLink('Patients');
      const patientRows = element.all(by.repeater('patient in patients'));
      clickButton('Screen a patient');
      const yearOfBirthInput = element(by.name('input'));
      yearOfBirthInput.sendKeys('1000');
      clickButton('Next');
      // NOTE: We could look at a specific model or div but we mainly just
      // want to ensure this message appears ANYWHERE on the page.
      const error = $('body').getText();
      expect(error).toContain(
        'Needs to be a numeric value, equal to, or higher than 1900.'
      )
    });
  });
});
