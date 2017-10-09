import {
  browser, element, by, By, $, $$, ExpectedConditions
} from 'protractor';

import { clickButton, clickLink } from './helpers';

class PrancerUI {
  studyDropDown: any

  constructor() {
    this.studyDropDown = $('.md-nav-bar-study');
  }

  goToHomepage() {
    browser.setLocation('/');
  }

  // TODO: this should be more specific about only clicking links in the menu
  clickMenuItem(menuItem: string) {
    clickLink(menuItem);
  }

  selectStudy(studyId: string, site: string) {
    this.studyDropDown.click();
    // NOTE: research suggests that `sendKeys` is the most reliable way to select
    // options while staying independent of nested markup.
    element(by.model('ctrl.studyCode')).sendKeys(studyId);
    element(by.model('ctrl.siteCode')).sendKeys(site);
    clickButton('Select');
  }

  pageBody() {
    return $('body').getText();
  }
}

export default PrancerUI;
