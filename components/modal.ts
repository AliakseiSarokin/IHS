import {allureStep} from "../helper/allure/allureSteps";
import {Button} from "./simple/button";
import {browser, by, element, ElementArrayFinder, ElementFinder} from "protractor";
import {File} from "../utils/file";
import {Link} from "./simple/link";
import {Waiters as w} from "../helper/waiters";
import {adminGridElements, adminToolbarElements} from "../elements/elements";

const button = new Button();
const link = new Link();
const file: File = new File();

export class Modal {

    modalTitle: any;
    modalTitles: any;
    modalBody: any;
    modalBodyLast: any;
    modalX: any;
    severalModalBodies: any;
    txtButton: any;
    lockedColumnModalBody: any;
    unlockedColumnModalBody: any;
    modalBodyParag: any;
    modalBodyPartNotesParag: any;
    severalModalTitles: any;
    partOfCompoundModalTitle: any;
    modalSegmentTitles: any;
    modalSegmentPreambles: any;
    modalLi: any;
    modalTd: any;
    modalBodyGrid: any;
    modalBodyRows: any;
    modalBodyCells: any;
    modalBodyCellsFirstRow: any;
    modalGridCounter: any;
    spinnerModalTitle: any;
    exportButton: any;
    modalBodyGridCells: ElementArrayFinder;
    resolutionText: ElementFinder;

    constructor() {
        this.modalTitle = element(by.css('.modal-title'));
        this.modalTitles = element.all(by.css('.modal-title div div'));
        this.severalModalTitles = element.all(by.css('.modal-header .modal-title'));
        this.partOfCompoundModalTitle = element.all(by.xpath("//div[@class='shim-right ng-star-inserted']"));
        // this.partOfCompoundModalTitle = element.all(by.className('shim-right ng-star-inserted'));
        this.modalSegmentTitles = element.all(by.css('.ng-star-inserted .title'));
        this.modalSegmentPreambles = element.all(by.css('.ng-star-inserted >th >label'));
        this.modalBody = element(by.css('.modal-body'));
        this.modalBodyLast = element.all(by.css('.modal-body')).last();
        this.modalBodyGrid = element(by.css('.modal-body .ui-grid, .modal-body .ag-body, .ag-body-viewport'));
        this.modalBodyGridCells = element.all(by.css('.modal-body .ui-grid .ui-grid-cell, .modal-body .ag-body .ag-cell'));
        this.severalModalBodies = element.all(by.css('.modal-body'));
        this.modalBodyRows = element.all(by.css('.modal-body .ui-grid-row'));
        this.modalGridCounter = element(by.css('.modal-body .ui-grid-pager-count,.modal-body .pagination-info'));
        this.modalBodyCells = element.all(by.css('.modal-body .ui-grid-row .ui-grid-cell-contents, .modal-body .ag-center-cols-container .ag-cell'));
        this.modalBodyCellsFirstRow = element.all(by.css('.modal-body .ui-grid-row .ui-grid-cell-contents, .modal-body .ag-center-cols-container>div'))
            .get(0).all(by.css('.cap-string-val'));
        this.modalX = element.all(by.css('.modal-header .pointer'));
        this.txtButton = element(by.cssContainingText('.radio>label', 'Tab-Delimited Text (TXT)'));
        this.lockedColumnModalBody = element.all(by.css('.modal-body .ui-grid-header-canvas')).get(0)
            .all(by.css('.ui-grid-header-cell'));
        this.unlockedColumnModalBody = element.all(by.css('.modal-body .ui-grid-header-canvas')).get(1)
            .all(by.css('.ui-grid-header-cell'));
        this.modalBodyParag = element.all(by.css('.modal-body p'));
        this.modalBodyPartNotesParag = element.all(by.css('.modal-body.flex-container .row > p, strong > p'));
        this.modalLi = element.all(by.css('.modal-body li'));
        this.modalTd = element.all(by.css('.stretched-modal td'));
        this.exportButton = element(by.css('.modal-footer .btn-default.btn-sm'));
        this.spinnerModalTitle = element(by.cssContainingText('.modal-title', 'Working...'));
        this.resolutionText = element(by.cssContainingText('modal-view p',
            'We have detected that your screen resolution has been set'))

    };

    public async openModalWithButtonByName(buttonName: string) {
        await allureStep('Open modal by clicking on the ' + buttonName + ' button', async () => {
            //await browser.waitForAngularEnabled(false);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(button.returnButtonByText(buttonName));
            await button.clickByButtonName(buttonName);
            browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(this.severalModalBodies.get(0));
            await w.waitUntilElementIsClickable(this.severalModalBodies.get(0));
            if (await this.severalModalTitles.get(0).isPresent()) {
                await w.waitUntilElementIsClickable(this.severalModalTitles.get(0));
            }
        });
    };

    public returnModalTitleByName(titleText: string): ElementFinder {
        const modalTitle: ElementFinder = element(by.cssContainingText('.modal-header>.modal-title', titleText));
        return modalTitle
    };

    public returnModalBodyByName(titleText: string): ElementFinder {
        const modalBody: ElementFinder = element(by.cssContainingText('.modal-body', titleText));
        return modalBody
    };

    public async openModalWithElement(element: ElementFinder, modalNumber: number = 0) {
        await allureStep('Open modal by clicking on the button', async () => {
            await w.waitUntilElementIsClickable(element);
            await button.clickOnTheElement(element);
            await w.waitUntilElementIsDisplayed(this.severalModalTitles.get(modalNumber));
            await w.waitUntilElementIsClickable(this.severalModalTitles.get(modalNumber));
            await w.waitUntilElementIsDisplayed(this.severalModalBodies.get(modalNumber));
            await w.waitUntilElementIsClickable(this.severalModalBodies.get(modalNumber));
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async openModalWithLink(link: ElementFinder, modalNumber: number = 0) {
        await allureStep('Open modal by click on the link', async () => {
            await browser.sleep(3000);
            await w.waitUntilElementIsDisplayed(link);
            await w.waitUntilElementIsClickable(link);
            await link.click()
            await w.waitUntilElementIsDisplayed(this.severalModalTitles.get(modalNumber));
            await w.waitUntilElementIsClickable(this.severalModalTitles.get(modalNumber));
            await w.waitUntilElementIsDisplayed(this.severalModalBodies.get(modalNumber));
            await w.waitUntilElementIsClickable(this.severalModalBodies.get(modalNumber));
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async openModalWithElementAndWait(element: ElementFinder, waitElement: ElementFinder) {
        await allureStep('Open modal by clicking on the button', async () => {
            await button.clickOnTheElement(element);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(waitElement);
            await w.waitUntilElementIsClickable(waitElement);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async openModalWithLinkName(linkName: string) {
        await allureStep('Open modal by clicking on the ' + linkName + ' link', async () => {
            await browser.waitForAngularEnabled(false);
            await w.waitUntilElementIsClickable(link.returnElementByLinkName(linkName));
            await link.clickOnTheLinkByName(linkName);
            await w.waitUntilElementIsDisplayed(this.modalTitle);
            await w.waitUntilElementIsClickable(this.modalTitle);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async openModalWithLinkNameAndWait(linkName: string,  waitElement: ElementFinder) {
        await allureStep('Open modal by clicking on the ' + linkName + ' link', async () => {
            await browser.waitForAngularEnabled(false);
            await link.clickOnTheLinkByName(linkName);
            await w.waitUntilElementIsDisplayed(waitElement);
            await w.waitUntilElementIsClickable(waitElement);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async checkModalTitleName(titleName: string, linkNumber: number = 0) {
        await allureStep('Check modal title name', async () => {
            await w.waitUntilElementIsDisplayed(this.severalModalTitles.get(linkNumber));
            await expect(await this.severalModalTitles.get(linkNumber).getText()).toEqual(titleName);
        });
    };

    public async checkSubstringModalTitleNames(titleNames: string [], truncateElement: string) {
        await allureStep('Check modal title name', async () => {
            for (let i = 0; i < titleNames.length; i++) {
                const fullExistingTitle: string = await this.partOfCompoundModalTitle.get(i).getText();
                const shortExistingTitle: string = await fullExistingTitle.substring(0, fullExistingTitle.indexOf(truncateElement) + 1);
                await expect(shortExistingTitle).toEqual(titleNames[i]);
            }
        });
    };

    public async closeModalWithXButton(titleModalName: string = '') {
        await allureStep('Close modal with X button', async () => {
            await browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
            if (titleModalName) {
                const titleNames: string [] = await this.severalModalTitles.getText();
                const numberModal: number = titleNames.indexOf(titleModalName);
                await w.waitUntilElementIsClickable(this.modalX.get(numberModal))
                await button.clickOnTheElement(this.modalX.get(numberModal));
                // await w.waitUntilElementNotDisplayed(this.severalModalTitles.get(numberModal));
                await w.waitUntilElementNotDisplayed(this.returnModalTitleByName(titleModalName));
            }
            else {
                await w.waitUntilElementIsClickable(this.modalX.get(0));
                await button.clickOnTheElement(this.modalX.get(0));
                await w.waitUntilElementNotDisplayed(this.severalModalTitles.get(0));
            }
            await browser.sleep(1000);
        });
    };

    public async closeSingleModalWithXButton(titleModalName: string = '') {
        await allureStep('Close single modal with X button', async () => {
            await browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(this.modalX.get(0));
            await button.clickOnTheElement(this.modalX.get(0));
            await w.waitUntilElementNotDisplayed(this.severalModalTitles.get(0));
            await browser.sleep(1000);
        });
    };

    public async closeModalIfPresent() {
        if (await this.modalTitle.isPresent()) {
            await this.closeModalWithXButton();
        }
    };

    public async closeModalWithElement(element) {
        await allureStep('Close modal with X button', async () => {
            const titleNumber: number = await this.severalModalTitles.count();
            if (titleNumber > 1) {
                await button.clickOnTheElement(element);
                await w.waitUntilElementNotDisplayed(this.severalModalTitles.get(titleNumber - 1));
            }
            else {
                await button.clickOnTheElement(element);
                await w.waitUntilElementNotDisplayed(this.severalModalTitles.get(0));
            }
        });
    };


    public async closeModalWithButton(buttonName: string) {
        await allureStep('Close modal with ' + buttonName + ' button', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            const titleNumber: number = await this.severalModalTitles.count();
            if (titleNumber > 1) {
                await w.waitUntilWorkingModalNotDisplayed();
                await w.waitUntilElementIsClickable(button.returnButtonByText(buttonName));
                await button.clickByButtonName(buttonName);
                await w.waitUntilElementNotDisplayed(this.severalModalTitles.get(titleNumber - 1));
            }
            else {
                await w.waitUntilWorkingModalNotDisplayed();
                await w.waitUntilElementIsClickable(button.returnButtonByText(buttonName));
                await button.clickByButtonName(buttonName);
                await w.waitUntilElementNotDisplayed(this.severalModalTitles.get(0));
            }
            await browser.sleep(500);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async exportModalAttributes(expectedLabels, options) {
        const labels = element.all(by.css('.modal-body h4'));
        const labelText = await labels.getText();
        await expect(labelText).toEqual(expectedLabels);
        const radioLabel = await  element.all(by.css('.modal-body .radio label')).getText();
        await expect(radioLabel).toEqual(options);
    };

    public async txtButtonChecking(okayButton, waitElement2, fileName) {
        let value = this.txtButton.isPresent();
        if (await value) {
            await this.txtButton.click();
            await button.clickByButtonName(okayButton);
            await w.waitUntilElementIsClickable(waitElement2);
            await file.checkNameDownloadsFile(fileName);
        }
        else {
            await button.clickByButtonName(okayButton);
            await w.waitUntilElementIsClickable(waitElement2);
            await file.checkNameDownloadsFile(fileName);
        }
    };

    public async checkingExportFile(exportButton, okayButton, waitElement2, fileName) {
        await file.createDownloadsFolder();
        let result = await this.modalBody.isPresent();
        if (await result) {
            await button.clickByButtonName(exportButton);
            let result1 = await this.severalModalBodies.count();
            if (result1 > 1) {
                await w.waitUntilElementIsClickable(this.modalBody);
                await w.waitUntilElementIsClickable(this.modalTitle);
                await this.txtButtonChecking(okayButton, waitElement2, fileName)
            }
            else {
                await file.checkNameDownloadsFile(fileName);
            }

        }

        else {
            await button.clickByButtonName(exportButton);
            let result1 = await this.modalBody.isPresent();
            if (result1) {
                await w.waitUntilElementIsClickable(this.modalBody);
                await w.waitUntilElementIsClickable(this.modalTitle);
                await this.txtButtonChecking(okayButton, waitElement2, fileName)
            }
            else {
                await file.checkNameDownloadsFile(fileName);
            }
        }
    };

    public async checkingExportFileAlternate(exportButton, okayButton, waitElement2, fileName) {
        await allureStep('checking Export file for alternate', async () => {
            await file.createDownloadsFolder();
            await button.clickOnTheElement(await adminToolbarElements.toolbarByButtontiltle('Export').first());
            await w.waitUntilElementIsClickable(this.modalBodyLast);
            await w.waitUntilElementIsClickable(this.modalTitle);
            await this.txtButton.click();
            await this.exportButton.click();
            await w.waitUntilElementIsClickable(waitElement2);
            await file.checkNameDownloadsFile(fileName);
        })
    };

    public async checkingExportFileOcmsSlider(exportButton, okayButton, waitElement2, fileName) {
        await file.createDownloadsFolder();
        let result = await this.modalBody.isPresent();
        if (await result) {
            await button.clickByButtonNameInSlider(exportButton);
            let result1 = await this.severalModalBodies.count();
            if (result1 > 1) {
                await w.waitUntilElementIsClickable(this.modalBody);
                await w.waitUntilElementIsClickable(this.modalTitle);
                await this.txtButtonChecking(okayButton, waitElement2, fileName)
            }
            else {
                await file.checkNameDownloadsFile(fileName);
            }

        }

        else {
            await button.clickByButtonNameInSlider(exportButton);
            let result1 = await this.modalBody.isPresent();
            if (result1) {
                await w.waitUntilElementIsClickable(this.modalBody);
                await w.waitUntilElementIsClickable(this.modalTitle);
                await this.txtButtonChecking(okayButton, waitElement2, fileName)
            }
            else {
                await file.checkNameDownloadsFile(fileName);
            }
        }
    };
}