import {comparePartsElements, modalElements, searchElements} from "../../elements/elements";
import {Button} from "../../components/simple/button";
import {Waiters as w} from "../../helper/waiters";
import {buttonNames, fieldStatuses} from "../../testData/global";
import {browser} from "protractor";
import {Modal} from "../../components/modal";
import {modalTitles} from "../../testData/global";
import {commonSearch} from "../../testData/search";
import {CheckBox} from "../../components/simple/checkBox";
import {CommonMatchingLogic} from "../matching/commonMatchingLogic";

const commonMatchingLogic = new CommonMatchingLogic();
const checkbox: CheckBox = new CheckBox();
const button: Button = new Button();
const modal: Modal = new Modal();

export class ComparePartsLogic {

    public async setAsAnchorCompareModal () {
        await w.waitUntilElementIsClickable(searchElements.comparePartsColumnHeaders.get(1));
        const text:string = await searchElements.comparePartsColumnHeaders.get(1).getText();
        await checkbox.checkUnCheckCheckboxRange(comparePartsElements.columnLabel, comparePartsElements.columnCheckboxInput,
            fieldStatuses.fillField, 1, 2);
        await browser.waitForAngularEnabled(false);
        await button.clickByButtonName(buttonNames.setAsAnchor);
        await w.waitUntilElementIsClickable(modal.modalBody);
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await  searchElements.comparePartsColumnHeaders.get(0).getText())
            .toEqual(text);
    };

    public async removePartCompareModal () {
        const firstColumnCount:number = await modalElements.newGirdModalUnlockedHeaderColumns.count();
        await browser.executeScript("document.querySelectorAll('.modal-body .ag-header-cell .grid-checkbox-item')[1].click()")
        await button.clickByButtonName(buttonNames.remove);
        await w.waitUntilElementIsClickable(modal.modalBody);
        let firstColumnCountAfterRemove = await modalElements.newGirdModalUnlockedHeaderColumns.count();
        await expect(firstColumnCountAfterRemove).toEqual(firstColumnCount-1);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.compareParts(firstColumnCount.toString()));
        await expect(await searchElements.comparePartsSubtitle.getText())
            .toEqual(commonSearch.comparePartsSubtitle(firstColumnCount.toString()));
    };

    public async removePartCompareModalBomDetails () {
        const firstColumnCount:number = await modalElements.newGirdModalUnlockedHeaderColumns.count();
        await browser.executeScript("document.querySelectorAll('.modal-body .ag-header-cell .grid-checkbox-item')[1].click()")
        await button.clickByButtonName(buttonNames.remove);
        await w.waitUntilElementIsClickable(modal.modalBody);
        let firstColumnCountAfterRemove = await modalElements.newGirdModalUnlockedHeaderColumns.count();
        await expect(firstColumnCountAfterRemove).toEqual(firstColumnCount-1);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.compareParts(firstColumnCount.toString()));
        await expect(await searchElements.comparePartsSubtitle.getText())
            .toEqual(commonSearch.compareBomDetailsSubtitle(firstColumnCount.toString()));
    };

    public async useSelectedCompareModal () {
        await w.waitUntilElementIsClickable(searchElements.comparePartsColumnHeaders.get(1));
        const text:string = await searchElements.comparePartsColumnHeaders.get(1).getText();
        await checkbox.checkUnCheckCheckboxRange(comparePartsElements.columnLabel, comparePartsElements.columnCheckboxInput,
            fieldStatuses.fillField, 1, 2);
        await button.clickByButtonName(buttonNames.useSelected);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(3000);
        await commonMatchingLogic.verifySelectedMatchHighlight();
    };
}