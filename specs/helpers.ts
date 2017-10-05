import {
  browser, element, by, By, $, $$, ExpectedConditions
}
  from 'protractor';

// TODO: Seems like this only works via require? Also, no way to authenticate
// if you do it this way...needs the browser auth cookies no? See my email
// to the 4G team.
import fetch from 'node-fetch'

// TODO: Move credential
const adminEmail = 'admin@4gclinical.com';
const adminPassword = 'admin';

export let authenticate = async function () {
  let endpoint = "https://lockstep.4gclinical.com/api/v1/auth/login"
  let headers = new fetch.Headers({'Content-Type': 'application/json'})
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({email: adminEmail, password: adminPassword}),
      headers: headers
    });

    return response;
  } catch (err) {
    console.log(err)
  }
}

export const provisionStudy = async (studyId: string, options = {clean: false}) => {
  let corsProxyServer = 'http://localhost:1337/'
  let endpoint = `${corsProxyServer}lockstep.4gclinical.com/test-api/studyprovision`

  // TODO: better error handling for fetches
  try {
    const authResponse = await authenticate()

    let cookieString = toCookieString(authResponse)
    const userData = await authResponse.json()

    let cookie = `${cookieString} authenticatedUser=${encodeURIComponent(JSON.stringify(userData))}`

    let headers = new fetch.Headers({
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': parseCsrfToken(authResponse),
      'Cookie': cookie,
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({study: studyId, clean: options.clean}),
      credentials: 'same-origin',
      headers: headers
    })

    console.log(response);
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
  element(by.model('email')).sendKeys(adminEmail);
  element(by.model('password')).sendKeys(adminPassword);
  clickButton('Login');
}

export let parseCookieObject = (response) => {
  let cookiesObject = {};

  response.headers._headers['set-cookie'].forEach(function(cookieStr) {
    let cookieSplit = cookieStr.split('=');
    cookiesObject[cookieSplit[0]] = decodeURIComponent(cookieSplit[1]);
    if (cookiesObject[cookieSplit[0]].match(/^[{]/)) {
      cookiesObject[cookieSplit[0]] = JSON.parse(cookiesObject[cookieSplit[0]]);
    }
  });

  return cookiesObject;
}

export let toCookieString = (response) => {
  let cookies = parseCookieObject(response);

  let cookieString = "";
  for(let key in cookies) {
    cookieString += `${key}=${cookies[key].split(';')[0]}; `
  }

  return cookieString
}

export let parseCsrfToken = (response) => {
  let cookies = parseCookieObject(response);

  let csrf = "";
  for(let key in cookies) {
    if(key === 'csrftoken') {
      csrf = cookies[key]
    }
  }

  return csrf;
}
