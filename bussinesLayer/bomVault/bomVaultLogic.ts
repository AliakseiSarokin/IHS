import {Actions} from "../../utils/actions";
import {AmlLogic} from "./amlLogic";
import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {
    bomElements,
    commonElements,
    gridElements,
    modalElements,
    pageTitles,
    reportElements
} from "../../elements/elements";
import {bomVaultData} from "../../testData/bomVault";
import {browser} from "protractor";
import {buttonNames, columnHeaders, modalTitles, titles} from "../../testData/global";
import {Grid} from "../../components/grid";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {RadioButton} from "../../components/simple/radioButton";
import {Shade} from "../../components/shade";
import {SingleBomLogic} from "./singleBomLogic";
import {Toolbar} from "../../components/toolbar";
import {Waiters as w} from "../../helper/waiters";
import {columnIdByColumnName} from "../../testData/columnIdByColumnName";
import {importItems} from "../../testData/import";

const actions: Actions = new Actions();
const amlLogic: AmlLogic = new AmlLogic();
const button: Button = new Button();
const grid: Grid = new Grid();
const link = new Link();
const modal: Modal = new Modal();
const radioButton: RadioButton = new RadioButton();
const singlebomlogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();

export class BomVaultLogic {

    public async reprocessModalChecking() {
        const bomName: string = await gridElements.newGridCellByRowIndex(0).get(1).getText();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.reprocessSelectedBom);
        await expect(await modal.modalLi.get(0).getText()).toContain(bomName);
        const bodyText: string = 'If you select YES, these BOMs are queued for processing to' +
            ' identify matching updates in Part and/or Manufacturer data. If you select NO, ' +
            'you return to the View All BOMs list and these BOMs remain unchanged.';
        await expect(await modalElements.modalBodyParagNew.get(0).getText()).toEqual(bodyText);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await modal.closeModalWithButton(buttonNames.noDoNotReporcess);
    };

    public async deleteExactBom(bomName: string) {
        await allureStep('Delete ' + bomName + ' from grid', async () => {
            while (!await link.returnElementByLinkName(bomName).isPresent()) {
                await grid.goToTheNextPage();
            }
            await grid.newGridSelectRowWithMatchValue(0,
                columnHeaders.columnHeaderNames.newGrid[1], bomName);
            await modal.openModalWithButtonByName(buttonNames.delete);
            await browser.waitForAngularEnabled(false);
            await button.clickByButtonName(buttonNames.yesDeleteSelectedItems);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilElementNotDisplayed(link.returnElementByLinkName(bomName));
            await expect(link.returnElementByLinkName(bomName).isPresent()).toBeFalsy();
        });
    };

    public async deleteSeveralExactBoms(bomNames: string[]) {
        await allureStep('Delete ' + bomNames + ' from grid', async () => {
            for (let i: number = 0; i < bomNames.length; i++) {
                while (!await link.returnElementByLinkName(bomNames[i]).isPresent()) {
                    await grid.goToTheNextPage();
                }
                await grid.newGridSelectRowWithMatchValue(0,
                    columnHeaders.columnHeaderNames.newGrid[1], bomNames[i]);
            }
            await modal.openModalWithButtonByName(buttonNames.delete);
            await browser.waitForAngularEnabled(false);
            await button.clickByButtonName(buttonNames.yesDeleteSelectedItems);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilElementNotDisplayed(link.returnElementByLinkName(bomNames[bomNames.length - 1]));
            for (let i: number = 0; i < bomNames.length; i++) {
                await expect(link.returnElementByLinkName(bomNames[i]).isPresent()).toBeFalsy();
            }
        });
    };

    public async deleteModalChecking() {
        const bomName: string = await gridElements.newGridCellByRowIndex(0).get(1).getText();
        await modal.openModalWithButtonByName(buttonNames.delete);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.confirmDelete);
        await expect(await modal.modalLi.get(0).getText()).toContain(bomName);
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.delete);
        await modal.closeModalWithButton(buttonNames.noDoNotDeleteSelectedItems);
    };

    public async goToGenerateReportWithoutSelecting() {
        await button.clickByButtonName(buttonNames.generateReportButton);
        await w.waitUntilElementIsDisplayed(pageTitles.generereReportTitle.get(0));
        await w.waitUntilElementIsClickable(gridElements.grid);
        await expect(await pageTitles.generereReportTitle.getText()).toEqual([titles.generateReport]);
    };


    public async goToGenerateReportPage() {
        const bomName: string = await gridElements.newGridCellByRowIndex(0).get(1).getText();
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        await button.clickByButtonName(buttonNames.generateReportButton);
        await w.waitUntilElementIsClickable(reportElements.reports.standardReports.get(1));
        await expect(await pageTitles.generereReportTitle.get(0).getText()).toEqual(titles.generateReport);
        await expect(await pageTitles.generereReportTitle.get(1).getText()).toContain(bomName);
    };

    public async goToGenerateReportPageMultipleSelection() {
        const bomName: string = await gridElements.newGridCellByRowIndex(0).get(1).getText();
        const bomName1: string = await gridElements.newGridCellByRowIndex(1).get(1).getText();
        await grid.newMechanismCheckboxRangeChecking(0, 2);
        await button.clickByButtonName(buttonNames.generateReportButton);
        await w.waitUntilElementIsClickable(reportElements.reports.standardReports.get(1));
        await expect(await pageTitles.generereReportTitle.getText()).toEqual([titles.generateReport]);
        await expect(await pageTitles.multipleReports.getText()).toEqual('Multiple BOMs Selected');
        await actions.mouseMoveToElementAndWaitForTooltip(pageTitles.multipleReports, commonElements.popoverContent.get(0));
        await expect(await commonElements.popoverContentLi.get(0).getText()).toContain(bomName);
        await expect(await commonElements.popoverContentLi.get(1).getText()).toContain(bomName1);
    };

    public async activeModufyOwnerButton() {
        for (let i: number = 0; i < bomVaultData.bomVault.modifyOwnerShadeUserList.length; i++) {
            await radioButton.checkRadioButton(bomElements.bomVault.userRadioButtonLabels.get(i),
                bomElements.bomVault.userRadioButtonInputs.get(i));
            await expect(button.returnButtonByText(buttonNames.modifyOwner).isEnabled()).toBeTruthy();
        }
    };

    public async openModifyOwnerShade() {
        await grid.newMechanismCheckboxRangeChecking(0, 1);
        const bomName: string = await gridElements.newGridCellByRowIndex(0).get(1).getText();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.modifyOwner);
        await expect(await bomElements.bomVault.modifyOwnerShadeColumnHeaders.getText()).toEqual(['BOM Name', 'BOM Path']);
        await expect(await bomElements.bomVault.modifyOwnerShadeRows.get(0).getText()).toEqual(bomName);
    };

    public async waitingForProcessedStatus() {
        async function checking() {
            let text:string[] = await grid.getCellValuesByCellId(columnIdByColumnName.bomVault['matchStatus']);
            if (text[0] !== 'Processed') {
                await button.clickByButtonName(buttonNames.refresh);
                await w.waitUntilElementIsDisplayed(gridElements.grid);
                await checking();
            }
        }
        await checking();
    };

    public async setBestPartToPreferred(bomName: string) {
        await allureStep('Set ' + bomName + ' as a best bom to preferred', async () => {
            await grid.newGridSelectRowWithMatchValue(0, columnHeaders.columnHeaderNames.newGrid[1],
                bomName);
            await amlLogic.setBestPartToPref();
            await button.clickByButtonNameAndWait(buttonNames.refresh, gridElements.newGridRows.get(0));
        });
    };

    public async checkSetBestPartToPreferred(bomName: string, bomOwner: string, state: boolean) {
        await allureStep("Check for another user's imported (" + bomName + ") 'Set Best Part to Preferred' is enabled", async () => {
            const rowNumber: number = await grid.returnRowNumberByLinkName(0,
                columnHeaders.columnHeaderNames.newGrid[1], bomName);
            const bomOwnerColumnValues: string[] = await grid.newGridReturnCellValuesByColumnName(1,
                'Owner');
            await expect(bomOwnerColumnValues[rowNumber]).toEqual(bomOwner);
            await grid.newGridSelectRowWithMatchValue(0, columnHeaders.columnHeaderNames.newGrid[1],
                bomName);
            await amlLogic.checkingSetBestPartToPref(state);
        });
    };

    public async setSeveralBestPartToPreferred(bomNames: string[]) {
        await allureStep('Set ' + bomNames + ' as a best bom to preferred', async () => {
            for (let i: number = 0; i < bomNames.length; i++) {
                await grid.newGridSelectRowWithMatchValue(0, columnHeaders.columnHeaderNames.newGrid[1],
                    bomNames[i]);
            }
            await amlLogic.setBestPartToPref();
            await button.clickByButtonNameAndWait(buttonNames.refresh, gridElements.newGridRows.get(0));
        });
    };

    public async reprocessBomChecking(buttonName: string) {
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await modal.closeModalWithButton(buttonName);
        await w.waitUntilElementIsClickable(gridElements.grid);
        await this.waitingForProcessedStatus();
    };

    public async reprocessBomWithoutWaitingForProcessedStatus(bomName: string) {
        await singlebomlogic.openSingleBomByName(bomName);
        await modal.openModalWithButtonByName(buttonNames.reprocess);
        await modal.closeModalWithButton('Yes, reprocess this BOM');
        await browser.sleep(5000);    //here we have to add w.waitUntilElementDisplayed for display View Single BOM page
    };

    public async goToGenerateReportPageMultipleSelectionFromBOMSummary() {
        let BOMName: string[] = [];
        await allureStep(`Select BOM from BOM summary page and goto generate report page.`, async () => {
            const bomName: string = await gridElements.newGridCellByRowIndex(0).get(1).getText();
            const bomName1: string = await gridElements.newGridCellByRowIndex(1).get(1).getText();
            BOMName.push(bomName);
            BOMName.push(bomName1);
            await grid.newMechanismCheckboxRangeChecking(0, 2);
            await button.clickByButtonName(buttonNames.generateReportButton);
            await w.waitUntilElementIsClickable(reportElements.reports.standardReports.get(1));
            await expect(await pageTitles.generereReportTitle.getText()).toEqual([titles.generateReport]);
            await expect(await pageTitles.multipleReports.getText()).toEqual('Multiple BOMs Selected');
            await actions.mouseMoveToElementAndWaitForTooltip(pageTitles.multipleReports, commonElements.popoverContent.get(0));
            await expect(await commonElements.popoverContentLi.get(0).getText()).toContain(bomName);
            await expect(await commonElements.popoverContentLi.get(1).getText()).toContain(bomName1);
        });
        return BOMName;
    };
}