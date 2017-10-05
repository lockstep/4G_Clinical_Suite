import { browser, element, by, By, $, $$, ExpectedConditions }
  from 'protractor';

// TODO: Seems like this only works via require? Also, no way to authenticate
// if you do it this way...needs the browser auth cookies no? See my email
// to the 4G team.
import fetch from 'node-fetch'

export const provisionStudy = async (studyId: string, options = { clear: false }) => {
  let endpoint = "https://lockstep.4gclinical.com/test-api/studyprovision"

  // TODO: better error handling for fetches
  try {
    await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ study: studyId, clear: options.clear })
    });
  } catch (err) {
    console.log(err);
  }
}

export const selectStudy = (studyId: string, site: string) => {
  $('.md-nav-bar-study').click();
  // NOTE: research suggests that `sendKeys` is the most reliable way to select
  // options while staying independent of nested markup.
  element(by.model('ctrl.studyCode')).sendKeys(studyId);
  element(by.model('ctrl.siteCode')).sendKeys(site);
  clickButton('Select');
}

export const clickLink = (text: string) => {
  element(by.cssContainingText('a', text)).click();
}

export const clickButton = (text: string) => {
  element(by.buttonText(text)).click();
}

export const prancerAdminLogin = () => {
  browser.get('https://lockstep.4gclinical.com');
  element(by.model('email')).sendKeys('admin@4gclinical.com');
  element(by.model('password')).sendKeys('admin');
  clickButton('Login');
}
