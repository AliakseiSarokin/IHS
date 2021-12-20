import {allureStep} from "../helper/allure/allureSteps";
import {browser, element, by} from "protractor";
import {Button} from "./simple/button";
import {Header} from "./header";
import {Input} from "./simple/input";
import {Link} from "./simple/link";
import {buttonNames, headerItems} from "../testData/global";
import {Waiters as w} from "../helper/waiters";
import {headerElements, homeElements, loginElements, quickSearchElements, searchElements} from "../elements/elements";
import {Modal} from "./modal";

const modal: Modal = new Modal();
const newCheckboxInput = element(by.css('#check-hide-news'));
const newsCheckboxLabel = element(by.css('.pull-left.checkbox>label'));
const input: Input = new Input();
const link: Link = new Link();
const button: Button = new Button();

export class Login {

    public async loginWithDirectLink(userLink: string) {
        await allureStep('Login to the BOM Intelligence with URL: ' + browser.baseUrl+userLink, async () => {
            await browser.waitForAngularEnabled(false);
            await browser.get(browser.baseUrl + userLink);
            // await browser.navigate().refresh();
            await w.waitUntilElementIsDisplayed(homeElements.learnMorePanelImage);
            await w.waitUntilElementIsClickable(homeElements.learnMorePanelImage);
            if (await newCheckboxInput.isPresent()) {
                await newsCheckboxLabel.click();
                await modal.closeModalWithXButton();
            }
            if (await modal.resolutionText.isPresent()) {
                await modal.closeModalWithButton(buttonNames.okay);
            }
            await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
        });
    };

    public async loginWithDirectLinkPI(userLink: string) {
        await allureStep('Login to the Parts Intelligence with URL: ' + browser.baseUrl+userLink, async () => {
            await browser.waitForAngularEnabled(false);
            await browser.get(browser.baseUrl+userLink);
            await w.waitUntilElementIsDisplayed(quickSearchElements.searchField);
            await w.waitUntilElementIsDisplayed(searchElements.searchField);
            if (await newCheckboxInput.isPresent()) {
                await newsCheckboxLabel.click();
                await modal.closeModalWithXButton();
            }
            if (await modal.resolutionText.isPresent()) {
                await modal.closeModalWithButton(buttonNames.okay);
            }
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
        });
    };

    public async loginWithErc(login: string, password: string) {
        await browser.waitForAngularEnabled(false);
        await browser.get('https://loginsqa.ihserc.com/login/erc');
        await w.waitUntilElementIsDisplayed(loginElements.passwordField);
        await input.fillFieldWithValue(loginElements.loginField, login);
        await input.fillFieldWithValue(loginElements.passwordField, password);
        await button.clickOnTheElement(loginElements.submitButton);
        await w.waitUntilElementIsDisplayed(loginElements.registerUserText);
        await input.fillFieldWithValue(loginElements.emailAddressField, browser.params.email);
        await input.fillFieldWithValue(loginElements.emailPasswordField, browser.params.emailPassword);
        await button.clickOnTheElement(loginElements.submitButton);
        await browser.waitForAngularEnabled(false);
        await w.waitUntilElementIsClickable(homeElements.learnMorePanelImage);
    };

    public async logout() {
        await allureStep('Log out', async () => {
            await Header.hoverOnHeaderItem(headerElements.userRole);
            await w.waitUntilElementIsDisplayed(link.returnElementByLinkName(headerItems.logout));
            await modal.openModalWithLinkName(headerItems.logout);
            browser.waitForAngularEnabled(false);
            await modal.closeModalWithButton(buttonNames.logout);
            // for a time we hide next two waiters
            // await w.waitUntilElementIsDisplayed(loginElements.passwordField);
            // await w.waitUntilElementIsClickable(loginElements.passwordField);
            await expect(browser.getCurrentUrl()).toContain('?loginCode=LOGOUT');
            browser.waitForAngularEnabled(false);
        });
    };
}