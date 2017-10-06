import { browser, element, by, $ } from 'protractor';
import {
  clickLink,
  clickButton,
  provisionStudy,
  prancerAdminLogin,
} from './helpers';

import Prancer from './prancer'

describe('TC1: Screen a patient', () => {
  const prancer = new Prancer()

  beforeAll(async () => {
    await provisionStudy('e2e_study_02')

    prancerAdminLogin();
  }, 90000);

  afterAll(async () => {
    await provisionStudy('e2e_study_01', { clean: true })
  }, 90000)

  // NOTE: Return to home after each scenario, then select the first study.
  beforeEach(() => {
    browser.setLocation('/');
    prancer.selectStudy('e2e_study_01', '102');
  });

  it('Adds a patient to the patient list', async () => {
    clickLink('Patients');

    const nPatientsBefore = await prancer.countPatientRows();

    clickButton('Screen a patient');
    prancer.enterYearOfBirth('1960');
    clickButton('Submit');
    // Back to patients list
    clickButton('Back to patients');

    const nPatientsAfter = await prancer.countPatientRows();
    expect(nPatientsAfter).toEqual(nPatientsBefore + 1);
  });

  it('Shows a validation error for invalid birth years', () => {
    clickLink('Patients');

    clickButton('Screen a patient');
    prancer.enterYearOfBirth('1000')
    // NOTE: We could look at a specific model or div but we mainly just
    // want to ensure this message appears ANYWHERE on the page.
    expect(prancer.pageBody()).toContain(
      'Needs to be a numeric value, equal to, or higher than 1900.'
    )
  });
});
