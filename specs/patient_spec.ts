import {
  clickButton,
  provisionStudy,
  prancerAdminLogin,
} from './helpers';

import PrancerUI from './prancer'
import PatientsPage from './patients_page'

describe('TC1: Screen a patient', () => {
  const prancer = new PrancerUI();
  const patients_page = new PatientsPage();

  beforeAll(async () => {
    await provisionStudy('e2e_study_02');

    prancerAdminLogin();
  }, 90000);

  afterAll(async () => {
    await provisionStudy('e2e_study_01', { clean: true })
  }, 90000)

  // NOTE: Return to home after each scenario, then select the first study.
  beforeEach(() => {
    prancer.goToHomepage();
    prancer.selectStudy('e2e_study_01', '102');
  });

  it('Adds a patient to the patient list', async () => {
    prancer.clickMenuItem('Patients');

    const nPatientsBefore = await patients_page.countPatientRows();

    clickButton('Screen a patient');
    patients_page.enterYearOfBirth('1960');
    clickButton('Submit');
    // Back to patients list
    clickButton('Back to patients');

    const nPatientsAfter = await patients_page.countPatientRows();
    expect(nPatientsAfter).toEqual(nPatientsBefore + 1);
  });

  it('Shows a validation error for invalid birth years', () => {
    prancer.clickMenuItem('Patients');

    clickButton('Screen a patient');
    patients_page.enterYearOfBirth('1000')
    // NOTE: We could look at a specific model or div but we mainly just
    // want to ensure this message appears ANYWHERE on the page.
    expect(prancer.pageBody()).toContain(
      'Needs to be a numeric value, equal to, or higher than 1900.'
    )
  });
});
