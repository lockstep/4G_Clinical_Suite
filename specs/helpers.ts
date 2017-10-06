import {
  browser, element, by, By, $, $$, ExpectedConditions
} from 'protractor';

// TODO: Seems like this only works via require? Also, no way to authenticate
// if you do it this way...needs the browser auth cookies no? See my email
// to the 4G team.
import fetch from 'node-fetch'

// TODO: Move credential
const adminEmail = 'admin@4gclinical.com';
const adminPassword = 'admin';

export let authenticate = async function () {
  let endpoint = "https://lockstep.4gclinical.com/api/v1/auth/login"
  let headers = new fetch.Headers({ 'Content-Type': 'application/json' })
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      headers: headers
    });

    return response;
  } catch (err) {
    console.log(err)
  }
}

export const provisionStudy = async (studyId: string, options = { clean: false }) => {
  const endpoint = 'https://lockstep.4gclinical.com/test_api/studyprovision'

  // TODO: better error handling for fetches
  try {
    const authResponse = await authenticate()
    const userData = await authResponse.json()

    const cookiesObject = parseCookieObject(authResponse)
    const cookieString = toCookieString(cookiesObject)

    const cookie = `${cookieString} authenticatedUser=${encodeURIComponent(JSON.stringify(userData))}`

    const headers = new fetch.Headers({
      'Content-Type': 'application/json',
      'X-CSRFTOKEN': findCookie(cookiesObject, 'csrftoken'),
      'Cookie': cookie,
      'Origin': 'https://lockstep.4gclinical.com'
    })

    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ study: studyId, clean: options.clean }),
      credentials: 'include',
      headers: headers
    })
  } catch (err) {
    console.log(err);
  }
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

export const parseCookieObject = (response) => {
  let cookiesObject = {};

  response.headers._headers['set-cookie'].forEach(function (cookieStr) {
    let cookieSplit = cookieStr.split('=');
    cookiesObject[cookieSplit[0]] = decodeURIComponent(cookieSplit[1]);
    if (cookiesObject[cookieSplit[0]].match(/^[{]/)) {
      cookiesObject[cookieSplit[0]] = JSON.parse(cookiesObject[cookieSplit[0]]);
    }
  });

  return cookiesObject;
}

export const toCookieString = (cookiesObject) => {
  let cookieString = "";
  for (let key in cookiesObject) {
    cookieString += `${key}=${cookiesObject[key].split(';')[0]}; `
  }

  return cookieString
}

export let findCookie = (cookiesObject, name) => {
  let csrf = "";
  for (let key in cookiesObject) {
    if (key === name) {
      csrf = cookiesObject[name].split(';')[0]
    }
  }
  return csrf;
};
