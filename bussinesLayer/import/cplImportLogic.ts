import {gridElements, importElements, commonElements, homeElements,
    cplImportElements, growler, cplElements, transposeElements
} from "../../elements/elements";
import {importItems} from "../../testData/import";
import {Waiters as w} from "../../helper/waiters";
import {allureStep} from "../../helper/allure/allureSteps";
import {Input} from "../../components/simple/input";
import {Button} from "../../components/simple/button";
import {buttonNames} from "../../testData/global";
import {Modal} from "../../components/modal";
import {browser} from "protractor";
import {ElementAttributes} from "../../utils/elementAttributes";
import {RadioButton} from "../../components/simple/radioButton";
import {HelpLogic} from "../help/helpLogic";

const radioButton: RadioButton = new RadioButton();
const helpLogic: HelpLogic = new HelpLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const button = new Button();
const modal = new Modal();
const input = new Input();

export class CplImportLogic {

    validXlsFileCplImport: string;
    invalidFile: string;

    constructor() {
        this.validXlsFileCplImport = '.\\..\\..\\..\\testData\\files\\import\\AutomationCPL.xls';
        this.invalidFile = '.\\..\\..\\..\\testData\\files\\import\\AutomationCPLError.xls';
    };

    public async cancelWithoutUploadSimpleImport() {
        await button.clickByButtonName(buttonNames.cancelCplImport);
        await w.waitUntilElementIsDisplayed(homeElements.learnMorePanelImage);
    };

    async _switchToButtons(label: string, modalText: string) {
        await radioButton.checkRadioButtonByLabelName(label);
        await w.waitUntilElementIsDisplayed(modal.modalBody);
        await w.waitUntilElementIsDisplayed(modal.modalTitle);
        await expect(await modal.modalTitle.getText()).toEqual('Notification');
        await expect(await modal.modalBody.getText()).toEqual(modalText);
    };

    async checkTypeOption(optionName: string, radioButton: number, modalText: string) {
        await button.clickOnTheElement(cplImportElements.optionsContainer.get(0));
        await this._switchToButtons(optionName, modalText);
        await helpLogic.openHelpPanelAndCheckOpenedUnderSubitem('Configure CPL Import Settings',
            'CPL Import Type');
        if (optionName === 'Append' || optionName === 'Update') {
            await modal.closeModalWithButton(buttonNames.okayThanks);
        }
        else
            await modal.closeModalWithButton(buttonNames.yes);
        await expect(await elementAttributes.getElementAttribute(cplImportElements.importTypeRadioButtonsInput.get(radioButton),
            'checked')).toEqual('true');
        await button.clickOnTheElement(cplImportElements.optionsContainer.get(0));
        await expect(await cplImportElements.importOptionsText.getText()).toEqual(optionName);
    };

    public async openOptionModalByTitle(optionTitle: string) {
        await allureStep('Open ' + optionTitle + ' option', async () => {
            await w.waitUntilElementNotDisplayed(
                await commonElements.divByName('No custom column mappings have been entered.'));
            let optionTitlesText = await cplImportElements.optionsTitles.getText();
            for (let i: number = 0; i < optionTitlesText.length; i++) {
                if (optionTitlesText[i] === optionTitle) {
                    await browser.executeScript("document.querySelectorAll('.data-ct>h2')[" + i + "].scrollIntoView()");
                    await button.clickOnTheElement(cplImportElements.optionsTitles.get(i));
                    await w.waitUntilElementIsDisplayed(importElements.optionModalTitle);
                    await w.waitUntilElementIsClickable(importElements.optionModalTitle);
                    await w.waitUntilElementIsClickable(importElements.optionModalBody);
                    break
                }
            }
        });
    };

    public async mappingFieldsChecking() {
        await expect(await importElements.columnMappingLine.count()).toEqual(4);
        await expect(await importElements.columnMappingLine.get(0).getText()).toEqual('Map Corp P/N to:');
        await expect(await importElements.columnMappingLine.get(1).getText()).toEqual('Map Corp Name to:');
        await expect(await importElements.columnMappingLine.get(2).getText()).toEqual('Map Corp P/N Desc to:');
        await expect(await importElements.columnMappingLine.get(3).getText()).toEqual('Map Mfr P/N to:');
    };

    public async saveAlertOptions() {
        await button.clickByButtonName(buttonNames.saveSubs);
        await w.waitUntilElementNotDisplayed(importElements.optionModalBody);
        await expect(await cplImportElements.alertNotifOptions.getText()).toEqual([importItems.validEmail]);
    };

    async checkingCplImportOptionsSection() {
        await expect(await elementAttributes.getElementAttribute(cplImportElements.optionsContainer.get(3), 'class'))
            .toContain('completed');
        await expect(await cplImportElements.importOptionsCheckboxLabel.getText()).toEqual('Auto Part Match');
        await expect(await elementAttributes.getElementAttribute(cplImportElements.importOptionsCheckboxInput, 'class'))
            .toEqual('ng-untouched ng-pristine ng-valid');
    };

    async changeStatusImportOption() {
        await cplImportElements.importOptionsCheckboxLabel.click();
        await cplImportElements.importOptionsCheckboxLabel.click();
        await expect(await elementAttributes.getElementAttribute(cplImportElements.importOptionsCheckboxInput, 'class'))
            .toEqual('ng-valid ng-dirty ng-touched');
        await expect(await elementAttributes.getElementAttribute(cplImportElements.optionsContainer.get(3), 'class'))
            .toContain('completed');
    };

    async validationErrorChecking() {
        await input.uploadAFile(cplImportElements.cplFileInputId, this.invalidFile);
        await w.waitUntilElementIsDisplayed(importElements.step1EnableBox);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.remove));
        await w.waitUntilElementIsClickable(importElements.previewAndValidateButton);
        await button.clickByButtonName(buttonNames.previewAndValidate);
        await w.waitUntilElementIsDisplayed(await transposeElements.unlockedColumnCellsWithContent.get(0));
        await expect(await cplImportElements.validationErrorTitle.getText()).toEqual('Validation: Error Found');
    };

    async reloadCplChecking() {
        await button.clickByButtonName(buttonNames.reloadCpl);
        await expect(await button.returnButtonByText(buttonNames.cancelCplImport).isDisplayed()).toBeTruthy();
    };

    async previewAndValidateChecking() {
        await input.uploadAFile(cplImportElements.cplFileInputId, this.validXlsFileCplImport);
        await w.waitUntilElementIsDisplayed(importElements.step1EnableBox);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.remove));
        await w.waitUntilElementIsClickable(importElements.previewAndValidateButton);
        await button.clickByButtonName(buttonNames.previewAndValidate);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        //await expect(elements.columnHeaderText.getText()).toEqual(['Corp P/N', 'Mfr P/N', 'Mfr Name']);
    };

    public async importCplWithoutWaitingForProcessedStatus() {
        await w.waitUntilElementIsDisplayed(await growler.growlerBody.last());
        await expect(await growler.growlerBody.last().isPresent()).toBeTruthy();
        await expect(await growler.growlerTitle.getText()).toEqual('CPL Import');
    };

    public async waitForGrowlerReadyStatus() {
        await allureStep('Check growler status when Import CPL', async () => {
                let importStatus: string = await growler.growlerStatus.getText();
                if(importStatus !== 'CPL is now ready for viewing') {
                    await w.waitUntilTextToBePresent(growler.growlerStatus, 'CPL is now ready for viewing', 500000);
                }
        })
    };

    public async clickOnGrowlerCplLink() {
        await allureStep('Check if Growler CPL link is clickable', async () => {
            let cplLink: any = await growler.selectLink.last();
            await button.clickOnTheElement(cplLink);
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
            await expect(await cplElements.cplDetails.gridTitle.first().getText()).toEqual('Corporate Parts');
        })
    };

    public async clickOnImportCpl() {
        await button.clickByButtonName(buttonNames.importCpl);
        await browser.waitForAngularEnabled(false);
    };


}