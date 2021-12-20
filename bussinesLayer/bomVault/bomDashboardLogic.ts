import {Actions} from "../../utils/actions";
import {Button} from "../../components/simple/button";
import {bomElements, cplElements, gridElements, settings} from "../../elements/elements";
import {browser} from "protractor";
import {buttonNames} from "../../testData/global";
import {Toolbar} from "../../components/toolbar";
import {Waiters as w} from "../../helper/waiters";

const actions: Actions = new Actions();
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();

export class BomDashboardLogic {

    public async checkingPartSummaryLInks(linkNumber) {
        await w.waitUntilElementIsClickable(bomElements.dashboard.partsSummaryLinks.get(linkNumber));
        const link: string = await bomElements.dashboard.partsSummaryLinks.get(linkNumber).getText();
        await browser.waitForAngularEnabled(false);
        await bomElements.dashboard.partsSummaryLinks.get(linkNumber).click();
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);

        if (link === '0') {
            await w.waitUntilElementIsDisplayed(gridElements.newGridLeftPort);
            await expect(await gridElements.newGridCellByRowIndex(0).get(0).isPresent()).toBe(true);
        }
        else if (Number(link) >= 1 && Number(link)<9) {
            await browser.sleep(1000);
            await w.waitUntilElementIsDisplayed(gridElements.gridCounter);
            await w.waitUntilElementIsClickable(gridElements.gridCounter);
            const value: string = await gridElements.gridCounter.getText();
            await expect(Number((value.split(' ')[2]))).toBeCloseTo(Number(link), -1);
        }
        else if (Number(link) > 10000) {
            await w.waitUntilElementIsClickable(gridElements.gridCounter);
            await expect(await gridElements.gridCounter.getText()).toEqual('');
        }
        else {
            await browser.sleep(1000);
            await w.waitUntilElementIsDisplayed(gridElements.gridCounter);
            await w.waitUntilElementIsClickable(gridElements.gridCounter);
            const value: string = await gridElements.gridCounter.getText();
            await expect(Number((value.split(' ')[4]))).toBeCloseTo(Number(link), -1);
        }
        await browser.waitForAngularEnabled(false);
        await browser.navigate().back();
        await w.waitUntilElementIsDisplayed(bomElements.dashboard.bomSummary);

    };

    public async checkingPartSummaryLInksByFilterValue(linkNumber: number, filterValue: string) {
        await browser.waitForAngularEnabled(false);
        await w.waitUntilElementIsClickable(bomElements.dashboard.partsSummaryLinks.get(linkNumber));
        await bomElements.dashboard.partsSummaryLinks.get(linkNumber).click();
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await gridElements.checkboxSelector.get(1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await expect(await settings.searchSettings.activeLayout.getText()).toEqual(filterValue);
        await browser.navigate().back();
        await w.waitUntilElementIsDisplayed(bomElements.dashboard.bomSummary);
    };

    public async checkingPartAlertsLinks(linkNumber) {
        await browser.sleep(2000);
        await w.waitUntilElementIsClickable(bomElements.dashboard.partsAlertsLinks.get(linkNumber));
        const link: string = await bomElements.dashboard.partsAlertsLinks.get(linkNumber).getText();
        await browser.waitForAngularEnabled(false);
        await actions.mouseMoveToElement(bomElements.dashboard.partsAlertsLinks.get(linkNumber));
        await bomElements.dashboard.partsAlertsLinks.get(linkNumber).click();
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilWorkingModalNotDisplayed();
        if (link === '0') {
            await w.waitUntilElementIsDisplayed(gridElements.newGridLeftPort);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await expect(await gridElements.newGridCellByRowIndex(0).get(0).isPresent()).toBe(false);
        }
        else {
            await w.waitUntilElementIsClickable(gridElements.newGridRows.last());
            await w.waitUntilElementIsDisplayed(gridElements.gridCounter);
            await w.waitUntilWorkingModalNotDisplayed();
            const value: string = await gridElements.gridCounter.getText();
            const splitValues: string[] = await value.split(' ');
            await expect(+(splitValues[splitValues.length - 2])).toEqual(+link);
        }
        await browser.navigate().back();
        await w.waitUntilElementIsDisplayed(bomElements.dashboard.bomSummary);
    };

    public async notFoundChecking() {
        await expect(await bomElements.dashboard.notFoundLabel.isPresent()).toBe(false);
    };

    async viewAsSinglePage() {
        await button.clickByButtonName(buttonNames.viewAsASinglePage);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(bomElements.dashboard.bomSummary);
        await browser.sleep(5000);
        await w.waitUntilElementIsDisplayed(cplElements.dashboard.summarySectionTitle.get(1));
        const sectionTitles = ['Parts Summary', 'Manufacturers Summary', 'Life Cycle Summary',
            'Assembly Life Cycle Risk Score', 'Part Alerts', 'Manufacturer Preferences Summary',
            'Manufacturer Matching', 'Part Matching', 'BOM Life Cycle Health Chart', 'Available Parts', 
            'Discontinued Parts', 'EU RoHS Compliance', 'China RoHS Compliance', 'REACH Compliance'];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(sectionTitles);
    };

}