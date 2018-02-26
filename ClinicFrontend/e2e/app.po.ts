import { browser, by, element } from 'protractor';

export class AppPage {
	navigateTo(address: string) {
		return browser.get(address);
	}

	getText(selector: string) {
		return element(by.css(selector)).getText();
	}

	getElement(selector: string) {
		return element(by.css(selector));
	}
}
