import {browser} from "protractor";
import {
    gridElements, cplElements, importElements, pageTitles, partDetailsElements, growler
} from "../../../elements/elements";
import {buttonNames, columnHeaders} from "../../../testData/global";
import {Button} from "../../../components/simple/button";
import {ElementAttributes} from "../../../utils/elementAttributes";
import {Grid} from "../../../components/grid";
import {Link} from "../../../components/simple/link";
import {Modal} from "../../../components/modal";
import {Waiters as  w} from "../../../helper/waiters";
import {quickSearchData} from "../../../testData/search";
import {QuickSearch} from "../../../components/quickSearch";
import {allureStep} from "../../../helper/allure/allureSteps";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const link: Link = new Link();
const modal:Modal = new Modal();
const quickSearch = new QuickSearch();

export class CplDetailsLogic {


    public async openRightSideGridByClickingOnCorpPN() {
        let cplDetailsCorpPNValues: string[] = await grid.newGridReturnCellValuesByColumnName(1, "Corp P/N");
        let result: string = cplDetailsCorpPNValues[1];
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement(result, gridElements.severalGrid.get(1));
        await w.waitUntilElementIsClickable(cplElements.cplDetails.gridTitle.get(1))
        await browser.sleep(4000);
        await expect(await cplElements.cplDetails.gridTitle.get(1).getText())
            .toEqual('Mfr Parts for selected Corp P/N: ' + result);
    };

    public async rightSideGridColumnsBeBold() {
        let result: number = await cplElements.cplDetails.rightSideColumns.count();
        for (let i = 0; i < result; i++) {
            await expect(await elementAttributes.getElementAttribute(cplElements.cplDetails.rightSideColumns.get(i),
                'class')).toContain('bold')
        }
    };

    public async openPartDetailsModalByLinksMatchedMfrPN() {
        await browser.executeScript(`document.querySelectorAll('${cplElements.attributes.newGridColumns}')[10].scrollIntoView()`);
        await browser.executeScript(`document.querySelectorAll('${cplElements.attributes.newGridColumns}')[11].scrollIntoView()`);
        let result: string = await cplElements.cplDetails.rightGridLinks.get(0).getText();
        await modal.openModalWithLinkName(result);
        await w.waitUntilElementIsClickable(modal.modalBodyGrid);
        await w.waitUntilElementIsClickable(partDetailsElements.titleWithIpn);
        await expect(await modal.modalBodyGrid.isDisplayed()).toBeTruthy('part detail grid is displayed');
        await expect(await partDetailsElements.titleWithIpn.getText()).toEqual('Part Details for Part Number: ' + result);
        const expectedColumnHeaders = ['Attribute', 'Value'];
        await grid.checkingColumnHeadersPartDetails(0, expectedColumnHeaders);
        await modal.closeModalWithXButton();
    };

    public async openPartDetailsModalByLinksMatchedMfrName() {
        await browser.executeScript(`document.querySelectorAll('${cplElements.attributes.newGridColumns}')[10].scrollIntoView()`);
        await browser.executeScript(`document.querySelectorAll('${cplElements.attributes.newGridColumns}')[11].scrollIntoView()`);
        let result = await cplElements.cplDetails.rightGridLinks.get(0).getText();
        await cplElements.cplDetails.rightGridLinks.get(1).click();
        await w.waitUntilElementIsDisplayed(modal.modalBody);
        await w.waitUntilElementIsClickable(partDetailsElements.titleWithIpn);
        await expect(modal.modalBody.isDisplayed()).toBeTruthy();
        await expect(await partDetailsElements.titleWithIpn.getText()).toEqual('Part Details for Part Number: ' + result);
        const expectedColumnHeaders = ['Attribute', 'Value'];
        await grid.checkingColumnHeadersPartDetails(0, expectedColumnHeaders);
        await modal.closeModalWithXButton();
    };


    async deleteButtonChecking() {
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeFalsy();
        await grid.checkCheckboxRange(1, 2);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
        await grid.checkCheckboxRange(2, 5);
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
        await grid.goToTheNextPage();
        await expect(button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();

    };

    async openAndCheckDeleteModal() {
        await grid.goToThePreviousPage();
        await w.waitUntilElementIsDisplayed(await gridElements.gridLinks.get(0))
        let p1: string = await gridElements.gridLinks.get(1).getText();
        let p2: string = await gridElements.gridLinks.get(2).getText();
        let p3: string = await gridElements.gridLinks.get(3).getText();
        await modal.openModalWithButtonByName(buttonNames.delete);
        await expect(await modal.modalTitle.getText()).toEqual('Confirm Delete');
        const subtitle = 'Are you sure that you want to delete ' + 4 +
            ' selected Corporate Part(s) and their associated Manufacturer Parts?';
        await expect(await modal.modalBodyParag.get(0).getText()).toEqual(subtitle);
        await expect(await cplElements.cplDetails.tableText.getText()).toEqual([p1, p2, p3]);
    };

    async reimportChecking() {
        await button.clickByButtonName(buttonNames.reimport);
        await w.waitUntilElementIsDisplayed(importElements.aboutImport);
        await expect(await pageTitles.pageTitleShim2.getText()).toEqual('Import a Corporate Part List (CPL) File');
    };

    public async checkCplIcon() {
        await allureStep('Check if CPL icon is displayed in search results grid for Matched P/N from CPL list', async () => {
            const matchedPnValues: any = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.cpl[4]);
            let partNumber: string;
            for (let i: number = 0; i < matchedPnValues.length; i++) {
                if (matchedPnValues[i] !== '') {
                    partNumber = matchedPnValues[i];
                    break;
                };
            };
            await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[2]);
            await quickSearch.closeQuickSearchDropdwon();
            await quickSearch.performQuickSearchWithWait(partNumber, gridElements.firstRowLink);
            await expect(await partDetailsElements.cplIcon.first().isDisplayed()).toBe(true);


        });
    };

    public async reprocessCplWithoutWaitingForProcessedStatus() {
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await modal.closeModalWithButton('Yes, reprocess this CPL');
        await w.waitUntilElementIsDisplayed(await growler.growlerBody.last());
        await expect(await growler.growlerBody.last().isPresent()).toBeTruthy();
        await expect(await growler.growlerTitle.getText()).toEqual('CPL Reprocess');
    };

    public async waitForGrowlerReadyStatus() {
        await allureStep('Check growler status when CPL Reprocess', async () => {
            let importStatus: string = await growler.growlerStatus.getText();
            if(importStatus !== 'CPL is now ready for viewing') {
                await w.waitUntilTextToBePresent(growler.growlerStatus, 'CPL is now ready for viewing', 250000);
            }
        })
    };

    public async clickOnGrowlerCplLink() {
        await allureStep('Check if Growler CPL link is clickable', async () => {
            let cplLink: any = await growler.selectLink.get(1);
            await button.clickOnTheElement(cplLink);
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
            await expect(await cplElements.cplDetails.gridTitle.first().getText()).toEqual('Corporate Parts');
        })
    };
}

