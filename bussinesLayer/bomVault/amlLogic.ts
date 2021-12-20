import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {browser} from "protractor";
import {bomElements, commonElements, gridElements, pageTitles} from "../../elements/elements";
import {buttonNames, titles} from "../../testData/global";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Grid} from "../../components/grid";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {SingleBomLogic} from "./singleBomLogic";
import {Shade} from "../../components/shade";
import {Toolbar} from "../../components/toolbar";
import {Waiters as w} from "../../helper/waiters";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const link: Link = new Link();
const modal: Modal = new Modal();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();
let initialColumnsAmount: number;
let origRowsAmount: number;

export class AmlLogic {

    async openAmlModal() {
        await allureStep('Open AML modal', async () => {
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelectorByIndex(0));
            await browser.sleep(2000);
            const columnNumber: number = await grid.newGridReturnColumnNumberByColumnName(0,
                'Internal Part Number');
            await w.waitUntilElementIsDisplayed(await gridElements.newGridLockedColumnRowCellsWithContent(0).get(columnNumber));
            const result: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(columnNumber).getText();
            await modal.openModalWithLinkName(result);
            await expect(await modal.modalTitle.getText()).toEqual('AML for Internal Part: ' + result);
        });
    };

    async openAmlModalBOMTree() {
        await allureStep('Open AML modal in BOM Tree', async () => {
            await w.waitUntilElementIsClickable(await gridElements.newGridCheckboxSelectorByIndex(0));
            await browser.sleep(2000);
            const columnNumber: number = await grid.newGridReturnColumnNumberByColumnName(0,
                'Internal Part Number');
            await w.waitUntilElementIsDisplayed(gridElements.newGridLockedColumnRowCellsWithContent(0).get(columnNumber-1));
            const result: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(columnNumber-1).getText();
            await modal.openModalWithLinkName(result);
            await expect(await modal.modalTitle.getText()).toEqual('AML for Internal Part: ' + result);
        });
    };

    async amlModalSubtitle() {
        const subTitle: string = 'View list of Approved Manufacturer Parts (AML) for this internal part.';
        await expect(await bomElements.amlModal.subtitle.getText()).toEqual(subTitle);
    };

    async openAddAmlPartModal() {
        await allureStep('Open add a part shade in AML modal', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.sleep(2000);
            await w.waitUntilElementIsClickable(bomElements.amlModal.headerCells.get(0));
            const result: string = await bomElements.amlModal.headerCells.get(0).getText();
            await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.addAPartToThisAml));
            await browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
            await Shade.openShadeWithButton(buttonNames.addAPartToThisAml);
        });
    };

    async goToTab(tabName: string) {
        await link.clickOnTheLinkByNameAndWaitForElement(tabName, bomElements.amlModal.modalContainer);
        await expect(await commonElements.activeNavTab(tabName).isPresent()).toBeTruthy();
    };

    public async checkValueForPreferredPart(bomTreeFlag:boolean = false) {
        await w.waitUntilElementIsDisplayed(gridElements.newGridLockedColumnRowCellsWithContent(0).get(1));
        const lcRisk: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(1).getText();
        const envRisk: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(2).getText();
        const scRisk: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(3).getText();
        const ipn: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(5).getText();
        const matchedPN = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0).getText();
        // const matchedMfr = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(1).getText();
        // const cageCode = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(2).getText();
        if(bomTreeFlag == false){
            await this.openAmlModal();
        }
        if(bomTreeFlag==true){
            await this.openAmlModalBOMTree();
        }
        await w.waitUntilElementIsClickable(bomElements.amlModal.prefColumns.get(0));
        await expect(await bomElements.amlModal.prefColumns.getText()).toContain(ipn);
        if (lcRisk.length > 0) {
            await expect(await bomElements.amlModal.prefColumns.getText()).toContain(lcRisk);
        }
        if (scRisk.length > 0) {
            await expect(await bomElements.amlModal.prefColumns.getText()).toContain(scRisk);
        }
        if (envRisk.length > 0) {
            await expect(await bomElements.amlModal.prefColumns.getText()).toContain(envRisk);
        }
        await expect(await bomElements.amlModal.prefColumns.getText()).toContain(matchedPN);
        // await expect(await bomElements.amlModal.prefColumns.getText()).toContain(matchedMfr);
        // await expect(await bomElements.amlModal.prefColumns.getText()).toContain(cageCode);
        initialColumnsAmount = await bomElements.amlModal.headerCells.count();
    };

    async checkingAmlToolbar(option: string, status: boolean) {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.aml);
        await expect(await button.returnButtonByText(option).isEnabled()).toEqual(status);
    };

    async expandFolderWithBoms() {
        await browser.executeScript("document.getElementsByClassName('expand-icon')[1].click()");
    };

    public async amlFilter() {
        origRowsAmount = await parseInt(((await gridElements.gridCounter.getText()).split(' '))[4]);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.aml);
        await button.clickByButtonName(buttonNames.viewAllAmlParts);
        await w.waitUntilElementIsDisplayed(gridElements.gridCounter);
        await w.waitUntilElementIsClickable(gridElements.gridCounter);
        await browser.sleep(3000);
        await w.waitUntilWorkingModalNotDisplayed();
        const changedValue = ((await gridElements.gridCounter.getText()).split(' '))[4];
        await expect(parseInt(changedValue)).toBeGreaterThanOrEqual(origRowsAmount)
    };

    public async _checkingAmlBom(name: string, status: boolean) {
        await singleBomLogic.openSingleBomByName(name);
        await browser.sleep(2000);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.editAmlForIpn).isPresent()).toEqual(status);
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        const columnNumber: number = await grid.newGridReturnColumnNumberByColumnName(0,
            'Internal Part Number');
        const allCells: number = await gridElements.newGridRowsBomTreeParts.count();
        for (let i: number = 0; i < allCells; i++) {
            await expect(await gridElements.newGridLockedColumnLinksByRowAndCellNumbers(i, columnNumber-1).isPresent()).toEqual(status);
        }
    };

    public async checkingBOmWithAmlOff() {
        await this._checkingAmlBom('AML_IPN_OFF', false);
    };

    public async checkingBOmWithAmlOn() {
        await this._checkingAmlBom('AML_IPN_ON', true);
    };


    public async preferedAml() {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.aml);
        await button.clickByButtonName(buttonNames.viewPrefferedAmlParts);
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelectorByIndex(0));
        await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).last());
        await browser.sleep(1000);
        await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
        const currentRowsAmount = await parseInt(((await gridElements.gridCounter.getText()).split(' '))[4]);
        await expect(currentRowsAmount).toEqual(origRowsAmount);
    };

    public async preferedAmlSingleBOM() {
        await allureStep('Show Preferred AML Parts using AML fiter - BOM Details', async () => {
            await toolbar.openToolbarDropdownByButtonName(buttonNames.aml);
            await button.clickByButtonName(buttonNames.viewPrefferedAmlParts);
            await browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
            await expect(await gridElements.newGridRows.count()).toBeLessThanOrEqual(origRowsAmount);
        });
    };

    public async setBestPartToPref() {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.aml);
        await button.clickByButtonName(buttonNames.setBestPartToPreffered);
        await w.waitUntilElementIsClickable(gridElements.grid);
        await expect(await pageTitles.pageTitle.getText()).toEqual(titles.bomVault);
        await browser.sleep(3000); // have we need to take a pause for update grid
        await button.clickByButtonNameAndWait(buttonNames.refresh, gridElements.newGridRows.get(0));
    };

    public async checkingSetBestPartToPref(state: boolean) {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.aml);
        await w.waitUntilElementIsDisplayed(await button.returnButtonByText(buttonNames.setBestPartToPreffered));
        await expect(await button.returnButtonByText(buttonNames.setBestPartToPreffered).isEnabled()).toEqual(state);
    };

    public async checkingEditAmlButton() {
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.editAmlForIpn).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await grid.newMechanismCheckboxRangeChecking(0, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.editAmlForIpn).isEnabled()).toBeFalsy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
        await grid.newMechanismCheckboxRangeChecking(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await expect(await button.returnButtonByText(buttonNames.editAmlForIpn).isEnabled()).toBeTruthy();
        await toolbar.closeToolbarDropdownByButtonName(buttonNames.modify);
    };

    public async openAmlClickingOnEditAml(bomTree:number = 0) {
        const columnNumber: number = await grid.newGridReturnColumnNumberByColumnName(0,
            'Internal Part Number');
        let result: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(columnNumber - bomTree).getText();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.editAmlForIpn);
        await w.waitUntilElementIsClickable(bomElements.amlModal.attributes.get(1));
        await expect(await modal.modalTitle.getText()).toEqual('AML for Internal Part: ' + result);
        await modal.closeModalWithButton(buttonNames.close);
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelectorByIndex(0));
        await grid.checkFirstCheckBoxIfNotChecked();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await modal.openModalWithButtonByName(buttonNames.editAmlForIpn);
        await modal.closeModalWithXButton();
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(1));
    };

    public async rightColumnHeaders() {
        const expectedHeaders: string[] = ['Internal Part Number', 'LC Risk', 'SC Risk', 'Preferred (Y/N)', 'Matched P/N',
            'Matched Mfr', 'CAGE Code', 'Manufacturer Support', 'Part Status', 'Part Description',
            'Imported P/N', 'Imported Mfr', 'Quantity', 'Custom 1', 'Custom 2'];
        let a: number = 0;
        let result = await bomElements.amlModal.attributes.getText();
        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < expectedHeaders.length; j++) {
                if (result[i] == expectedHeaders[j]) {
                    a = a + 1;
                }
            }
        }
        if (a != result.length) {
            await expect(a).toBeLessThan(result.length);
        }
    };

    public async tooltipsChecking() {
        let result = await bomElements.amlModal.attributes.count();
        for (let i = 0; i < result; i += 1) {
            let tooltip: string = await elementAttributes.getElementAttribute(bomElements.amlModal.attributes.get(i), 'title');
            await expect(tooltip.length).toBeGreaterThan(1);
        }
    };

    public async setAsPrefAmlModal() {
        let nonPreferredIpn = await bomElements.amlModal.headerCells.get(0).getText();
        await browser.executeScript("document.querySelector('.modal-body .grid-checkbox-item').click()");
        await browser.waitForAngular();
        await button.clickByButtonName(buttonNames.setAsPrefered);
        await w.waitUntilElementIsDisplayed(modal.modalBody);
        await browser.sleep(2000);
        await w.waitUntilElementIsClickable(bomElements.amlModal.attributes.get(1));
        let preferredIpn: string = await bomElements.amlModal.headerCells.get(1).getText();
        await expect(nonPreferredIpn).toEqual(preferredIpn);
    };

    async removePartAmlModal() {
        await browser.executeScript("document.querySelector('.modal-body .grid-checkbox-item').click()");
        await button.clickByButtonName(buttonNames.removeSelected);
        await w.waitUntilElementIsDisplayed(modal.modalBody);
        await browser.sleep(2000);
        await w.waitUntilElementIsClickable(bomElements.amlModal.attributes.get(1));
        await expect(await bomElements.amlModal.headerCells.count()).toEqual(initialColumnsAmount);
    };

    public async addPartAml() {
        await Shade.closeShadeWithButton(buttonNames.addParts);
        await w.waitUntilElementIsClickable(modal.modalBody);
        await w.waitUntilElementIsClickable(bomElements.amlModal.attributes.get(1));
        let value = await bomElements.amlModal.headerCells.count();
        await expect(value).toEqual(initialColumnsAmount + 1);
    };

    public async checkingRiskColumnPresent(status: boolean) {
        await expect(await bomElements.amlModal.lcRiskHeader.isPresent()).toEqual(status);
        await expect(await bomElements.amlModal.amlRiskHeader.isPresent()).toEqual(status);
    };

    async openAmlModalPN() {
        await allureStep('Open AML modal with Internal P/N', async () => {
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelectorByIndex(0));
            await browser.sleep(2000);
            const columnNumber: number = await grid.newGridReturnColumnNumberByColumnName(0,
                'Internal P/N');
            await w.waitUntilElementIsClickable(gridElements.newGridLockedColumnRowCellsWithContent(0).get(columnNumber));
            const result: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(columnNumber).getText();
            await modal.openModalWithLinkNameAndWait(result, modal.modalTitle);
            await expect(await modal.modalTitle.getText()).toEqual('AML for Internal Part: ' + result);
        });
    };
}
