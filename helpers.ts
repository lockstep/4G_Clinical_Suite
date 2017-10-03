import { browser, element, by, By, $, $$, ExpectedConditions } from 'protractor';
import { fetch } from 'node-fetch'

export let provisionStudy = async function (studyId: string, options = { clear: false }) {
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

export let selectStudy = function (studyId: string, site: string) {

}

// Only used for authenticating the API for now, so we use the driver directly
export let prancerAdminLogin = function () {
  browser.get('https://lockstep.4gclinical.com');
  element(by.model('email')).sendKeys('admin@4gclinical.com');
  element(by.model('password')).sendKeys('admin');
  element(by.id('login__submit')).click();
}
