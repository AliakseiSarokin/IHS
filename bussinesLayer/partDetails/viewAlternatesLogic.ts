import {allureStep, expectToEqual} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {buttonNames, fieldStatuses} from "../../testData/global";
import {CheckBox} from "../../components/simple/checkBox";
import {
    gridElements, partDetailsElements, searchElements, toolbarElements
} from "../../elements/elements";
import {browser, ElementFinder} from "protractor";
import {File} from "../../utils/file";
import {Grid} from "../../components/grid";
import {Modal} from "../../components/modal";
import {modalTitles} from "../../testData/global";
import {PartDetailsLogic} from "./partDetailsLogic";
import {Waiters as w} from "../../helper/waiters";
import {ElementAttributes} from "../../utils/elementAttributes";

const button = new Button();
const checkbox: CheckBox = new CheckBox();
const file: File = new File();
const grid: Grid = new Grid();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();

export class ViewAlternatesLogic {

    async openFilterDropdown() {
        await allureStep('Open View Alternates Filter', async () => {
            await button.clickOnTheElement(partDetailsElements.viewAlternatesFilterToolbarButton);
            await browser.sleep(1000);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(partDetailsElements.openViewAltDropdown);
            await w.waitUntilElementIsClickable(partDetailsElements.filterCheckboxLabel.get(0));
            await w.waitUntilElementIsClickable(partDetailsElements.filterCheckboxLabel.last());
        });
    };

    public async closeFilterDropdownByClickOnElement() {
        await allureStep('Close View Alternates Filter', async () => {
            await button.clickOnTheElement(partDetailsElements.viewAlternatesFilterToolbarButton);
            await w.waitUntilElementNotDisplayed(partDetailsElements.openViewAltDropdown);
        })
    };

    async openViewAlternatesModal(lockUnlockNumber: number, columnHeaderName: string, newGrid: boolean = true) {
        let partNumbers: string[];
        if (newGrid) {
            partNumbers = await grid.newGridReturnCellValuesByColumnName(lockUnlockNumber, columnHeaderName);
            let rowNumber:any = await elementAttributes.getElementAttribute(
                await partDetailsElements.rowsByAltIcon.first(), 'row-index');
            await modal.openModalWithElement(partDetailsElements.viewAltIcon.first());
            await w.waitUntilWorkingModalNotDisplayed();
            await expect(await modal.severalModalTitles.get(0).getText()).toEqual('Alternates for Part Number: ' + partNumbers[rowNumber]);
        }
        else {
            partNumbers = await grid.returnCellValuesByColumnName(lockUnlockNumber, columnHeaderName);
            await modal.openModalWithElement(partDetailsElements.viewAltIcon.first());
            await w.waitUntilWorkingModalNotDisplayed();
            await expect(await modal.severalModalTitles.get(0).getText()).toEqual('Alternates for Part Number: ' + partNumbers[0]);
        }
    };

    async openViewAlternatesModalFromBom(lockUnlockNumber: number, columnHeaderName: string, newGrid: boolean = true, partNbr: string) {
        let partNumbers: string[];
        await w.waitUntilWorkingModalNotDisplayed();
        if (newGrid) {
            partNumbers = await grid.newGridReturnCellValuesByColumnName(lockUnlockNumber, columnHeaderName);
            for(let i:number = 0;i<partNumbers.length;i++) {
                if (partNbr==partNumbers[i])
                {
                    await modal.openModalWithElement(partDetailsElements.viewAltIconINBOM(i));
                    break
                }
            }
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilDomIsReady();
            await browser.sleep(1000);
            await expectToEqual(await modal.severalModalTitles.get(0).getText,
                'Alternates for Part Number: ' + partNbr);
        }
        else {
            partNumbers = await grid.returnCellValuesByColumnName(lockUnlockNumber, columnHeaderName);
            await modal.openModalWithElement(partDetailsElements.viewAltIcon.first());
            await w.waitUntilWorkingModalNotDisplayed();
            await expectToEqual(await modal.severalModalTitles.get(0).getText,
                'Alternates for Part Number: ' + partNumbers[0]);
        }
    };

    public async waitForIcon(icon: ElementFinder) {
        await w.waitUntilElementIsDisplayed(icon)
    };

    public async newGridOpenViewAlternatesModal() {
        await w.waitUntilWorkingModalNotDisplayed();
        const pNCells: string[] = await grid.newGridReturnCellValuesByColumnName(0, 'Part Number');
        await modal.openModalWithElement(partDetailsElements.viewAltIcon.first());
        await w.waitUntilElementIsClickable(gridElements.newGridLockedColumnCellsWithContent.get(0));
        await w.waitUntilElementIsClickable(gridElements.newGridModalCheckboxSelectorByIndex(0));
        await expectToEqual(await modal.modalTitle.getText, 'Alternates for Part Number: ' + pNCells[0]);
    }

    public async newGridGoToPartDetailsFromViewAlternates() {
        await partDetailsLogic.newGridOpenPartDetModalLink();
        // await modal.closeModalWithXButton('Part Details for Part Number: ');                                         //here we have to use this method instead next tree steps
        await button.clickOnTheElement(modal.modalX.get(1));
        await w.waitUntilElementNotDisplayed(await modal.returnModalTitleByName('Part Details for Part Number: '));
        await w.waitUntilElementIsDisplayed(await modal.returnModalTitleByName('Alternates for Part Number'));
    };

    public async closeExportInViewAlternates(buttonClick: any) {
        await button.clickOnTheElement(buttonClick);
        await w.waitUntilElementNotDisplayed(modal.returnModalTitleByName(modalTitles.exportAlternates));
    };

    public async applyFilter() {
        await button.clickByButtonName(buttonNames.apply);
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(modal.modalBody);
        await w.waitUntilElementIsClickable(gridElements.newGridSimpleTextCell.get(0));
    }

    public async checkingFilterOptions(startOptionNumber: number, endOptionNumber: number) {
        const beforeTagNumbers = await toolbarElements.modalXTag.count();
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(1000);
        await w.waitUntilWorkingModalNotDisplayed();
        await this.openFilterDropdown();
        await checkbox.checkUnCheckCheckboxRange(partDetailsElements.filterCheckboxLabel, partDetailsElements.filterCheckboxInput,
            fieldStatuses.fillField, startOptionNumber, endOptionNumber);
        await button.clickByButtonName(buttonNames.apply);
        await w.waitUntilElementIsClickable(modal.modalBody);
        await w.waitUntilElementIsClickable(gridElements.newGridSimpleTextCell.get(0));
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await toolbarElements.modalXTag.count()).toEqual(beforeTagNumbers + (endOptionNumber - startOptionNumber));
    }

    public async closingFilterTagsByX(startCloseTagNumber: number, endCloseTagNumber: number) {
        const beforeTagNumbers = await toolbarElements.modalXTag.count();
        for (let i = startCloseTagNumber; i < endCloseTagNumber; i++) {
            await browser.executeScript("document.querySelectorAll('.modal-body [ewbsvguse=\"ihs-icon-x\"]')[" + i + "].click()");
        }
        await w.waitUntilElementIsClickable(modal.modalBody);
        await w.waitUntilElementIsClickable(gridElements.newGridSimpleTextCell.get(0));
        await expect(await toolbarElements.modalXTag.count()).toEqual(beforeTagNumbers - (endCloseTagNumber - startCloseTagNumber));
    }

    public async checkFilterTagNames(expectedFilterTagNames: string []) {
        await w.waitUntilElementIsDisplayed(searchElements.addPartsToBom.panelTitle.get(0));
        for (let i = 0; i < expectedFilterTagNames.length; i++) {
            await expectToEqual(await searchElements.addPartsToBom.panelTitle.get(i).getText, expectedFilterTagNames[i]);
        }
    }

    public async checkingExportFileFromComparePartsModal(exportButton, fileName) {
        await file.createDownloadsFolder();
        await w.waitUntilElementIsClickable(button.returnElementByButtonTextAndIndex(exportButton, 1));
        await button.clickOnTheElement(button.returnElementByButtonTextAndIndex(exportButton, 1));
        await file.checkNameDownloadsFile(fileName);
    };
}