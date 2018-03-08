import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('clinic-frontend App', () => {
	let page: AppPage;
	
	beforeEach(() => {
		page = new AppPage();
	});

	it('should display a footer', () => {
		page.navigateTo('/');
		expect(page.getText('footer')).toBeTruthy();
	});
	
	it('should display welcome message', () => {
		page.navigateTo('/');
		expect(page.getText('#welcome-title')).toBeTruthy();
	});

	it('should display a map of clinics', () => {
		page.navigateTo('/clinics');
		expect(page.getElement('agm-map')).toBeTruthy();
	});

	it('should dispay a map of a clinic', () => {
		page.navigateTo('/clinics/1');
		expect(page.getElement('agm-map')).toBeTruthy();
	});

	it('should display a login form', () => {
		page.navigateTo('/login');
		expect(page.getElement('app-login')).toBeTruthy();
		expect(page.getElement('form')).toBeTruthy();
	});

	it('should prevent logged out users from viewing admin dashboard', () => {
		page.navigateTo('/admin-dashboard');
		browser.getCurrentUrl().then((url) => {
			expect(url.indexOf('/admin-dashboard')).toBe(-1);
		});
	});
});
