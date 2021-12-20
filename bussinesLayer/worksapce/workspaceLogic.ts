import {
    commonElements, gridElements, workspaceElements, pageTitles, reportElements,
    searchElements, transposeElements, partDetailsElements
} from "../../elements/elements";
import {buttonNames, columnHeaders, linksNames, login, meganavItems, modalTitles, titles} from "../../testData/global";
import {Button} from "../../components/simple/button";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Input} from "../../components/simple/input";
import {Grid, Transpose} from "../../components/grid";
import {Link} from "../../components/simple/link";
import {Meganav} from "../../components/meganav";
import {Modal} from "../../components/modal";
import {Toolbar} from "../../components/toolbar";
import {Waiters as w} from "../../helper/waiters";
import {browser, ElementFinder} from "protractor";
import {allureStep, expectToEqual} from "../../helper/allure/allureSteps";
import {protractor} from "protractor/built/ptor";
import {QuickSearch} from "../../components/quickSearch";
import {commonSearch} from "../../testData/search";


const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const grid: Grid = new Grid();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();
const transpose: Transpose = new Transpose();

const commentText: string = 'Comment is maximum 255 characters:qwertyuiopasdfghjklzxcvbnm1234567890=+}{[],.<>:; ' +
    'qwertyuiopasdfghjklzxcvbnm1234567890=+}{[],.<>:; qwertyuiopasdfghjklzxcvbnm1234567890=+}{[],.<>:; ' +
    'qwertyuiopasdfghjklzxcvbnm1234567890=+}{[],.<>:; qwertyuiopasdfghjklzxcvbnm';

export class WorkspaceLogic {

    public async openRemoveModal() {
        await allureStep(`Open remove modal in workspace`, async () => {
            await w.waitUntilElementIsClickable(gridElements.firstRowLink);
            const linkText: string = await gridElements.firstRowLink.getText();
            await grid.newMechanismCheckboxRangeChecking(0, 1);
            await modal.openModalWithButtonByName(buttonNames.removeMyWorkspace);
            const modalText: string = 'Are you sure that you want to REMOVE the selection(s) from your workspace?';
            await expect(await modal.modalTitle.getText()).toEqual(modalTitles.confirmRemovalFromWorkspace);
            await expect(await workspaceElements.removeModalText.getText()).toEqual(modalText);
            await expect(await workspaceElements.removeModalItems.get(0).getText()).toEqual(linkText);
        })
    };

    async removeItemFromWorkspace() {
        await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
        await browser.sleep(1500);
        if (await gridElements.newGridRows.get(0).isPresent()) {
            await grid.checkFirstCheckBoxIfNotChecked();
            const initialCount: number = await gridElements.newGridRows.count();
            await modal.openModalWithButtonByName(buttonNames.removeMyWorkspace);
            await modal.closeModalWithButton(buttonNames.yesRemoveSelected);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
            await expect(await gridElements.gridRows.count()).toEqual(initialCount - 1);
        }
    };

    async removeAllItemFromWorkspace() {
        await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
        await browser.sleep(1500);
        if (await gridElements.newGridRows.get(0).isPresent()) {
            await grid.newMechanismSelectAllCheckboxChecking();
            await modal.openModalWithButtonByName(buttonNames.removeMyWorkspace);
            await modal.closeModalWithButton(buttonNames.yesRemoveSelected);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
        }
    };
    async addToWorkspaceParts() {
        await allureStep(`Select second row in Part Search Results Grid and add a part to workspaces`, async () => {
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
            await grid.newMechanismCheckboxRangeChecking(0, 1);
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await modal.openModalWithButtonByName(buttonNames.addToWorksapce);
            await w.waitUntilElementIsDisplayed(modal.severalModalBodies.get(0));
            await w.waitUntilElementIsClickable(modal.severalModalBodies.get(0));
            await expectToEqual(modal.severalModalBodies.get(0).getText, 'Selected part(s) have been added to your Workspace.');
            await modal.closeModalWithButton(buttonNames.OK)
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        })
    };

    async addToWorkspacePartIfNotAdded() {
        await allureStep(`Add part to Workspace parts if not added`, async () => {
            await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
            await this.goToWorkspaceTab(linksNames.workspaceParts, gridElements.gridWrapper);
            await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckbox);
            await browser.sleep(1500);
            if((await gridElements.newGridRows.count())==0) {
                await quickSearch.performQuickSearch(commonSearch.commonValue);
                await this.addToWorkspaceParts()
            }
        })
    };


    async addToWorkspaceBoms() {
        await allureStep(`Select second row in View All BOMs and add a BOM to workspaces`, async () => {
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
            await grid.newMechanismCheckboxRangeChecking(0, 1);
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await modal.openModalWithButtonByName(buttonNames.addToWorksapce);
            await w.waitUntilElementIsDisplayed(modal.severalModalBodies.get(0));
            await w.waitUntilElementIsClickable(modal.severalModalBodies.get(0));
            await expectToEqual(modal.severalModalBodies.get(0).getText, 'Selected BOM(s) have been added to your Workspace.');
            await modal.closeModalWithButton(buttonNames.OK);
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        })
    };

    async addToWorkspaceProcessedBoms() {
        await allureStep(`Select second row in View All BOMs and add a BOM to workspaces`, async () => {
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
            const bomName: string = await gridElements.bomRowAllLinks.get(0).getText();
            await grid.mechanismCheckCheckboxByName('BOM Name', bomName,0);
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await modal.openModalWithButtonByName(buttonNames.addToWorksapce);
            await w.waitUntilElementIsDisplayed(modal.severalModalBodies.get(0));
            await w.waitUntilElementIsClickable(modal.severalModalBodies.get(0));
            await expectToEqual(modal.severalModalBodies.get(0).getText, 'Selected BOM(s) have been added to your Workspace.');
            await modal.closeModalWithButton(buttonNames.OK);
            await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1));
        })
    };

    async addToWorkspaceBomsFromViewSingleBOM() {
        await allureStep(`Add current BOM to workspaces`, async () => {
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(1));
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await modal.openModalWithButtonByName(buttonNames.addCurrentBOMToWorkspace);
            await w.waitUntilElementIsDisplayed(modal.severalModalBodies.get(0));
            await w.waitUntilElementIsClickable(modal.severalModalBodies.get(0));
            await expectToEqual(modal.severalModalBodies.get(0).getText, 'Selected BOM(s) have been added to your Workspace.');
            await modal.closeModalWithButton(buttonNames.OK);
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(1));
        })
    };

    async addToWorkspaceBomsFromBOMTree() {
        await allureStep(`Add current BOM to workspaces`, async () => {
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(1));
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await modal.openModalWithButtonByName(buttonNames.addToWorksapce);
            await w.waitUntilElementIsDisplayed(modal.severalModalBodies.get(0));
            await w.waitUntilElementIsClickable(modal.severalModalBodies.get(0));
            await expectToEqual(modal.severalModalBodies.get(0).getText, 'Selected BOM(s) have been added to your Workspace.');
            await modal.closeModalWithButton(buttonNames.OK);
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(1));
        })
    };

    public async goToWorkspaceTab(linkName: string, waitElement?: ElementFinder) {
        if (linkName == linksNames.workspaceParts) {
            await link.clickOnTheLinkByNameAndWaitForElement(linkName, gridElements.newGridHeaderByName('Part Number'));
            await expect(await button.returnButtonByText(buttonNames.generateReportButton).isPresent()).toBeFalsy();
        }
        else if (linkName == linksNames.workspaceBoms) {
            await link.clickOnTheLinkByNameAndWaitForElement(linkName, gridElements.newGridHeaderByName('BOM Name'));
            await expect(await button.returnButtonByText(buttonNames.generateReportButton).isPresent()).toBeTruthy();
        }
        if (Boolean(waitElement)) {
            await w.waitUntilElementIsClickable(waitElement)
        }

    };

    private async _openCommentPopover() {
        await w.waitUntilElementIsClickable(workspaceElements.newGridPencilIcon);
        await button.clickOnTheElement(workspaceElements.newGridPencilIcon);
        await w.waitUntilElementIsDisplayed(workspaceElements.textarea);
    };

    public async commentAreaChecking() {
        await this._openCommentPopover();
        await expect(await elementAttributes.getElementAttribute(workspaceElements.textarea,
            'maxlength')).toEqual('255');
        await browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
    };

    private async _checkingX(button: any) {
        await input.fillFieldWithValue(commonElements.popoverInput, 'sdfsdfdf');
        await button.click();
        await w.waitUntilElementNotDisplayed(commonElements.popoverInput);
        await expect(await workspaceElements.commentCell.getText()).toEqual('');
    }

    public async cancelXChecking() {
        await this._checkingX(button.returnButtonByText(buttonNames.cancel));
        await this._openCommentPopover();
        await this._checkingX(commonElements.popoverX);
    };

    public async addComment() {
        await this._openCommentPopover();
        await input.fillFieldWithValue(workspaceElements.textarea, commentText);
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        await w.waitUntilElementNotDisplayed(workspaceElements.textarea);
        // await browser.sleep(1000);
        await expect(await workspaceElements.newGridCommentCell.getText()).toEqual(commentText.slice(0, -1));
    };

    public async deleteComment() {
        await this._openCommentPopover();
        await input.fillFieldWithValue(workspaceElements.textarea, " ");
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
        await w.waitUntilElementNotDisplayed(workspaceElements.textarea);
        await expect(await workspaceElements.newGridCommentCell.getText()).toEqual('');
    };

    public async openViewSingleBomByClickingOnTheBomLink() {
        await w.waitUntilElementIsClickable(gridElements.gridLinks.first());
        const linkText: string = await gridElements.gridLinks.first().getText();
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement(linkText, pageTitles.pageTitleShim);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await expect(await pageTitles.pageTitleShim.getText()).toEqual('View Single BOM: ' + linkText);
    };

    public async goToGenerateReport() {
        await w.waitUntilElementIsClickable(gridElements.gridLinks.first());
        const linkText: string = await gridElements.gridLinks.first().getText();
        await button.clickByButtonName(buttonNames.generateReportButton);
        await w.waitUntilElementIsClickable(reportElements.reports.standardReports.get(0));
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
        await expect(await pageTitles.generereReportTitle.get(1).getText()).toContain(linkText);
    };

    public async openPartDetailsModal(typeLink?: string) {
        const partLink: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Part Number');
        const mfrLink: string[] = await grid.newGridReturnCellValuesByColumnName(0,
            'Manufacturer Name');
        if (typeLink == 'Manufacturer') {
            await link.clickOnTheLinkByNameAndWaitForElement(mfrLink[0], modal.modalBody);
        }
        else {
            await link.clickOnTheLinkByNameAndWaitForElement(partLink[0], modal.modalBody);
        }
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsClickable(modal.modalTitle);
        await w.waitUntilElementIsClickable(modal.modalBodyGrid);
        await w.waitUntilElementIsDisplayed(await partDetailsElements.cell.first());
        await expect(await modal.modalTitles.get(0).getText()).toEqual('Part Details for Part Number: '
            + partLink[0]);
        await expect(('Manufacturer Name: ' + mfrLink[0]).toUpperCase())
            .toContain((await modal.modalTitles.get(2).getText()).toUpperCase());
        await modal.closeModalWithXButton();
    };

    public async checkColumnSortOptionsWorkspaceTab(lockedColumnHeaders: string[], unlockedColumnHeaders: string[]) {
        for (let i: number = 0; i < gridElements.newGridLockedColumnHeaders.count(); i++) {
            await grid.newGridOpenFilterBoxByName(lockedColumnHeaders[i]);
            await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
            await grid.closeOpenFilterBox();
        }
        for (let i: number = 0; i < gridElements.newGridUnlockedColumnHeaders.count(); i++) {
            await grid.newGridOpenFilterBoxByName(unlockedColumnHeaders[i]);
            await expect(await gridElements.newGridColumnFilterOptions.getText()).toEqual(columnHeaders.bom.sortOptions2);
            await grid.closeOpenFilterBox();
        }
    };

    async addToWorkspacePartsFromTranspose() {
        await allureStep(`Select second row in Part Search Results Grid and add a part to workspaces`, async () => {
            await w.waitUntilElementIsClickable(transposeElements.headerCheckbox.get(0));
            await transpose.transposeCheckboxRangeChecking(0, 1);
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await modal.openModalWithButtonByName(buttonNames.addToWorksapce);
            await w.waitUntilElementIsDisplayed(modal.severalModalBodies.get(0));
            await w.waitUntilElementIsClickable(modal.severalModalBodies.get(0));
            await expectToEqual(modal.severalModalBodies.get(0).getText, 'Selected part(s) have been added to your Workspace.');
            await modal.closeModalWithButton(buttonNames.OK);
            await w.waitUntilElementIsClickable(transposeElements.headerCheckbox.get(0));
        })
    };
}
