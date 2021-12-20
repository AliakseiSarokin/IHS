import {browser} from "protractor";
import {
    bomVaultElements,
    commonElements,
    gridElements,
    growler,
    pageTitles,
    reportElements
} from "../../elements/elements";
import {buttonNames, modalTitles, titles} from "../../testData/global";
import {reportsData} from "../../testData/reports";
import {Actions} from "../../utils/actions";
import {Button} from "../../components/simple/button";
import {Grid} from "../../components/grid";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {RadioButton} from "../../components/simple/radioButton";
import {Toolbar} from "../../components/toolbar";
import {Waiters as w} from "../../helper/waiters";
import {allureStep} from "../../helper/allure/allureSteps";
import {columnIdByColumnName} from "../../testData/columnIdByColumnName";

const actions: Actions = new Actions();
const button: Button = new Button();
const grid: Grid = new Grid();
const input: Input = new Input();
const link: Link = new Link();
const modal: Modal = new Modal();
const radioButton: RadioButton = new RadioButton();
const toolbar: Toolbar = new Toolbar();

export class ReportsLogic {

    public async goToStep2WithAdvancedReport(advancedReportName: string) {
        await w.waitUntilElementIsDisplayed(await reportElements.reports.elementByText(advancedReportName));
        const reportNames: any = await reportElements.reports.advancedReportNames.count();
        for (let i: number = 0; i < reportNames; i++) {
            if ((await reportElements.reports.advancedReportNamesByIndex(i).getText()) === advancedReportName) {
                await grid.newMechanismCheckboxRangeChecking(i, i + 1);
                await browser.executeScript("document.querySelector('.col-sm-3 button').scrollIntoView()");
                await button.clickByButtonName(buttonNames.goToStep2);
                await w.waitUntilElementIsClickable(reportElements.reports.reportNameField);
                break
            }
        }
    };

    public async verifyStdReportTooltip(standardReportName: Map<string,string>) {
        await w.waitUntilElementIsDisplayed(await reportElements.reports.elementByText('Standard Reports'));
        let iterator = standardReportName.keys();
        for (let i: number = 0; i < standardReportName.size; i++) {
            let currentReportName =  iterator.next().value;
            let reportNameElement = await reportElements.reports.elementByText(currentReportName);
            expect(reportNameElement.getAttribute('title')).toEqual(standardReportName.get(currentReportName));
        }
    };

    public async goToStep2WithStandardReport(standardReportName: string) {
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(commonElements.radioButtonLabel.get(0));
        await w.waitUntilElementIsClickable(commonElements.radioButtonLabel.get(0));
        await w.waitUntilWorkingModalNotDisplayed();
        await radioButton.checkRadioButtonByLabelName(standardReportName);
        await browser.executeScript("document.querySelector('.col-sm-3 button').scrollIntoView()");
        await button.clickByButtonName(buttonNames.goToStep2);
        await w.waitUntilElementIsClickable(reportElements.reports.reportNameField);
    };

    public async goToStep3() {
        await w.waitUntilElementIsDisplayed(reportElements.reports.reportNameField);
        await input.fillFieldWithValue(reportElements.reports.reportNameField, reportsData.reports.reportName);
        await expect(button.returnButtonByText(buttonNames.goToStep3).isEnabled()).toBeTruthy();
        await button.clickByButtonName(buttonNames.goToStep3);
        await w.waitUntilElementIsClickable(reportElements.reports.step3);
    };
    public async goToStep3WithReportName(reportName:string) {
        await w.waitUntilElementIsDisplayed(reportElements.reports.reportNameField);
        await input.fillFieldWithValue(reportElements.reports.reportNameField, reportName);
        await expect(button.returnButtonByText(buttonNames.goToStep3).isEnabled()).toBeTruthy();
        await button.clickByButtonName(buttonNames.goToStep3);
        await w.waitUntilElementIsClickable(reportElements.reports.step3);
    };

    public async enterNameAndVerifyGenerateReportEnabled(reportName:string) {
        await w.waitUntilElementIsDisplayed(reportElements.reports.reportNameField);
        await input.fillFieldWithValue(reportElements.reports.reportNameField, reportName);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.generateMyReport));
        await expect(button.returnButtonByText(buttonNames.generateMyReport).isEnabled()).toBeTruthy();
    };

    public async goToStep4() {
        // await browser.executeScript('document.querySelectorAll(\'#btnAddRemBoms\')[0].scrollIntoView()');
        await button.clickByButtonName(buttonNames.goToStep4);
        await w.waitUntilElementIsClickable(reportElements.reports.step4);
    };

    public async selectElementFromBomTree() {
        await browser.waitForAngularEnabled(false);
        await w.waitUntilElementIsClickable(reportElements.reports.step3Checkboxes.get(1));
        await button.clickOnTheElement(reportElements.reports.step3Checkboxes.get(2));
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.generateMyReport));
        await expect(button.returnButtonByText(buttonNames.generateMyReport).isEnabled()).toBeTruthy();
    };

    public async returnAdvancedReportsNames(): Promise<string[]> {
        let reportNames: string[]= [];
        await allureStep(`Return advanced report names `,async () => {
            const rowsAmount: number = await gridElements.newGridRows.count();
            for(let i: number = 0; i < rowsAmount; i++) {
                reportNames.push(await gridElements.newGridCellWithoutContentByRowIndex(i).get(1).getText())
            }
        });
        return reportNames
    };

    async cancelModal() {
        await browser.executeScript("document.querySelectorAll('.pull-right.btn')[2].scrollIntoView()");
        await modal.openModalWithButtonByName(buttonNames.cancelDoNotGenerate);
        await expect(await modal.modalTitle.getText()).toEqual(modalTitles.cancelReport);
        await modal.closeModalWithButton(buttonNames.goBackToMyReport);
        await modal.openModalWithButtonByName(buttonNames.cancelDoNotGenerate);
        await modal.closeModalWithXButton();
    };

    async generateReport() {
        await actions.mouseMoveToElement(button.returnButtonByText(buttonNames.generateMyReport));
        await browser.executeScript('document.querySelector(\'#btnGenerateReport\').scrollIntoView() ');
        await browser.sleep(1000);
        await button.clickByButtonName(buttonNames.generateMyReport);
        await w.waitUntilElementNotDisplayed(reportElements.reports.step3Checkboxes.get(1));
        // await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilElementIsDisplayed(gridElements.rowCellsWithContentNewGrid(2,1));
        await browser.waitForAngularEnabled(false);
        await expect(pageTitles.pageTitleShim2.getText()).toEqual(titles.viewReports);
        await expect(await link.returnElementByLinkName(reportsData.reports.reportName).isDisplayed()).toBe(true);
    };

    async generateReportWithReportName(reportName: string) {
        await actions.mouseMoveToElement(button.returnButtonByText(buttonNames.generateMyReport));
        await browser.executeScript('document.querySelector(\'#btnGenerateReport\').scrollIntoView() ');
        await browser.sleep(1000);
        await button.clickByButtonName(buttonNames.generateMyReport);
        await w.waitUntilElementNotDisplayed(reportElements.reports.step3Checkboxes.get(1));
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await browser.waitForAngularEnabled(false);
        await expect(pageTitles.pageTitleShim2.getText()).toEqual(titles.viewReports);
        await expect(await link.returnElementByLinkName(reportName).isDisplayed()).toBe(true);
        await browser.sleep(2000);
    };

    async openViewModalWithDeletedTemplate(reportName: string) {
        await browser.waitForAngularEnabled(false);
        await button.clickByButtonName(buttonNames.reset);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await modal.openModalWithLinkName(reportName);
        const modalBodyText = 'You cannot view a summary of a report for which the template used to create' +
            ' it and/or BOMs used in the report have been deleted. You may still download the finished reports' +
            ' by clicking on the file extension links.';
        await expect(await modal.modalTitle.getText()).toEqual('Report Summary Not Available');
        await expect(await modal.modalBodyParag.get(0).getText()).toEqual(modalBodyText);
        await modal.closeModalWithButton(buttonNames.OK);
    };

    async regenerateReportWithDeletedTemplate(reportName: string) {
        let result = await gridElements.cellUnlocked.count();
        for (let i = 0; i < await result; i = i + 5) {
            let value = await gridElements.cellUnlocked.get(i).getText();
            if (value === reportName) {
                await grid.checkCheckboxRange((i / 5), (i / 5) + 1);
                await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
                await modal.openModalWithButtonByName(buttonNames.regenerateReport);
                await expect(await modal.modalTitle.getText()).toEqual('Report(s) Cannot be Regenerated');
                const modalBodyText = 'You are trying to regenerate a report(s) with deleted template(s):';
                await expect(await modal.modalBodyParag.get(0).getText()).toEqual(modalBodyText);
                await expect(await modal.modalLi.get(0).getText()).toContain(reportName);
                await modal.closeModalWithButton(buttonNames.OK);
                break;
            }
        }
    };


    public async openViewReportModal() {
        const result = await reportElements.reports.reportNameFirstCellLinks.getText();
        await modal.openModalWithLinkName(result);
        await expect(await modal.modalTitle.getText()).toEqual('Report Summary: ' + result);
    };

    public async reportStatusShouldNotBeError() {
        async function checking() {
            let result = await gridElements.newGridCellByRowIndex(0).get(0).getText();
            if (result == 'Queued' || result == 'Generating') {
                await button.clickByButtonName(buttonNames.refresh);
                await w.waitUntilElementIsDisplayed(gridElements.checkboxSelector.get(1));
                await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
                await checking();
            }
        }

        await checking();
        await expect(await gridElements.newGridCellByRowIndex(0).get(0).getText()).toEqual('Completed');
    };

    async waitingForCompletedStatus() {
        async function checking() {
            let result = await  gridElements.newGridCellByRowIndex(0).get(0).getText();
            if (result == 'Completed') {
                await button.clickByButtonName(buttonNames.refresh);
                await w.waitUntilElementIsDisplayed(gridElements.grid);
                await checking();
            }
        }

        await checking()
    };

    public async deleteReport() {
        await allureStep('Delete created report', async () => {
            await browser.waitForAngularEnabled(false);
            const gridCountRow: string = await gridElements.gridCounter.getText();
            const gridCountMaxItems: string = (gridCountRow.split(' '))[4];
            await modal.openModalWithButtonByName(buttonNames.delete);
            await button.clickByButtonName(buttonNames.yesItOkToDeleteThem);
            await w.waitUntilElementIsDisplayed(gridElements.newGridCheckboxSelector.get(1));
            await browser.sleep(2000);
            await w.waitUntilElementIsDisplayed(gridElements.gridCounter);
            const gridCountRow1: string = await gridElements.gridCounter.getText();
            const gridCountMaxItems1: string = (gridCountRow1.split(' '))[4];
            await expect(parseInt(gridCountMaxItems) -1).toEqual(parseInt(gridCountMaxItems1));
            await expect(link.returnElementByLinkName(reportsData.reports.reportName).isPresent()).toBeFalsy();
        });
    };

    async setFiltersInStep4() {
        let count = await reportElements.reports.step4Inputs.count();
        for (let i = 0; i < count; i++) {
            if (i === 5) {
                i++
            }
            await browser.executeScript("document.querySelectorAll('.report-filters-step input:not(.datepicker-input)" +
                ":not(#radio-yes):not(#radio-no):not(#radio-any):not(#include-aml-parts):not(.ng-valid-date)')[" + i + "].scrollIntoView()");
            await input.fillFieldWithValue(reportElements.reports.step4Inputs.get(i), reportsData.reports.filterValue);
        }
    };

    public async deleteSelectedMfr() {
        await allureStep('Deleted one selected Mfr', async () => {
            await button.clickOnTheElement(reportElements.reports.selectedMfrsXButton.get(0));
            await w.waitUntilElementNotDisplayed(reportElements.reports.selectedMfrs.get(0));
        })
    }

    public async selectBomFromBomTree() {
        await w.waitUntilElementIsClickable(reportElements.reports.step3);
        await w.waitUntilElementIsClickable(reportElements.reports.vaultAvailability);
        await browser.sleep(2000)
        const numberOfRows: number = await reportElements.reports.bomTreeCustomIcon.count();
        for (let i: number = 0; i < numberOfRows; i++) {
            if  ((await reportElements.reports.bomTreeCustomIcon.get(i).getAttribute('class')).includes('file')){
                await button.clickOnTheElement(reportElements.reports.step3Checkboxes.get(i));
                await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.generateMyReport));
                break;
            }
        }
    };

    public async selectEnabledSingleBOMStep3(index:number) {
        await w.waitUntilElementIsClickable(reportElements.reports.step3);
        await w.waitUntilElementIsClickable(reportElements.reports.vaultAvailability);
        await w.waitUntilElementIsClickable(reportElements.reports.checkBoxEnabled(index));
        await reportElements.reports.checkBoxEnabled(index).click();
    };

    public async waitForGrowlerQueuedStatus() {
        await allureStep('Check growler status when Report Generation', async () => {
            await w.waitUntilElementIsDisplayed(await growler.growlerBody.last());
            await expect(await growler.growlerBody.last().isPresent()).toBeTruthy();
            await expect(await growler.growlerTitle.getText()).toEqual('Regenerate Report');
            let reportGenerationStatus: string = await growler.growlerStatus.getText();
            let reportName: string = reportGenerationStatus.split(' ')[0];
            if(reportGenerationStatus !== `${reportName} is queued for generating`) {
                await w.waitUntilTextToBePresent(growler.growlerStatus, `${reportName} is queued for generating`, 250000);
            }
        })
    };

    public async waitForGrowlerReadyStatus() {
        await allureStep('Check growler status when Report Generation', async () => {
            let reportGenerationStatus: string = await growler.growlerStatus.getText();
            let reportName: string = reportGenerationStatus.split(' ')[0];
            if(reportGenerationStatus !== `${reportName} is now ready for viewing`) {
                await w.waitUntilTextToBePresent(growler.growlerStatus, `${reportName} is now ready for viewing`, 250000);
            }
        })
    };

    public async getFirstCompletedStatus() {
        await allureStep('Get first report with completed status and regenerate it', async () => {
            let reportStatus:string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Report Status');
            let index: number;
            for(let i: number = 0; i < reportStatus.length; i++){
                if (reportStatus[i] == 'Completed') {
                    index = i;
                    break;
                }
            };
            await grid.newMechanismCheckboxRangeChecking(index, index+1);
            await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
            await modal.openModalWithButtonByName(buttonNames.regenerateReport);
            await expect(await modal.modalTitle.getText()).toEqual('Regenerate Report');
            await modal.closeModalWithButton(buttonNames.regenerateSelectedReport);
        })
    }

    public async generateReportWithoutWaitingForProcessedStatus() {
        await w.waitUntilElementIsDisplayed(await growler.growlerBody.last());
        await expect(await growler.growlerBody.last().isPresent()).toBeTruthy();
        await expect(await growler.growlerTitle.getText()).toEqual('Generate Report');
    };

    public async expandFolderBomTree () {
        await w.waitUntilElementIsClickable(reportElements.reports.step3Checkboxes.get(1));
        const rowCount: number = await reportElements.reports.rowsInBOMHierarchyGrid.count();
        for (let i: number = 1; i < rowCount; i++) {
            if (await reportElements.reports.returnExpandIconByRowNumber(i).isDisplayed()) {
                await reportElements.reports.returnExpandIconByRowNumber(i).click();
                break
            }
        }
        await w.waitUntilElementIsDisplayed(reportElements.reports.step3);
    };

    public async checkRowsIfFolderIsSelected() {
        await browser.waitForAngularEnabled(false);
        await w.waitUntilElementIsClickable(reportElements.reports.step3Checkboxes.get(1));
        let firstIconRowNumber: number = 0;
        const rowCount: number = await reportElements.reports.rowsInBOMHierarchyGrid.count();
        for (let i: number = 1; i < rowCount; i++) {
            if (await reportElements.reports.returnExpandIconByRowNumber(i).isDisplayed()) {
                firstIconRowNumber = i;
                break
            }
        }
        await button.clickOnTheElement(await reportElements.reports.returnCheckboxByRowNumber(firstIconRowNumber));
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.generateMyReport));
        const countIconInExpandFolder = await reportElements.reports.innerRowsIconInExpandFolder.count();
        const notVaultBoms = await reportElements.reports.notVaultBomRows.count();
        await expect(countIconInExpandFolder).toEqual(notVaultBoms);
    };

    public async verifyReportNameWithBraces(reportName: string) {
        const reportNamegrid:string = await reportElements.reports.reportNameGrid.last().getText();
        expect(reportName).toEqual(reportNamegrid);
        await modal.openModalWithLinkNameAndWait(reportNamegrid,reportElements.reports.reportModal.last());
        const reportNameInModal: string = await reportElements.reports.reportModalTitle.last().getText();
        let rep = reportNameInModal.split(': ')[1];
        expect(rep).toEqual(reportName);
        expect(rep).toEqual(reportNamegrid);

    }

    public async verifyBOMNamesPresentInLeftNav(bomName: string[]) {
        await allureStep('Verify recent BOM Names Present in Left Navigation', async () => {
            expect(await bomVaultElements.bomTree.vaultLeftNavRecentBOMs.getText()).toEqual(bomName);
        })
    }
    public async verifyAddToReportLeftNav(bomName: string[]) {
        await allureStep('Verify AddToReport button functionality in Left Navigation', async () => {
            expect(await bomVaultElements.bomTree.addToReportLeftNavButton.last().isPresent()).toBeTruthy();
            expect(await button.returnButtonByText(buttonNames.addToReport).isEnabled()).toBeFalsy();
            await bomVaultElements.bomTree.vaultLeftNavRecentBOMs.get(0).click();
            expect(await button.returnButtonByText(buttonNames.addToReport).isEnabled()).toBeTruthy();
            await bomVaultElements.bomTree.vaultLeftNavRecentBOMs.get(1).click();
            expect(await button.returnButtonByText(buttonNames.addToReport).isEnabled()).toBeTruthy();
            await bomVaultElements.bomTree.vaultLeftNavRecentBOMs.get(0).click();
            await bomVaultElements.bomTree.vaultLeftNavRecentBOMs.get(1).click();

        })
    }

    public async selectBOMsFromLeftNav(BOMsToSelect:string[]) {
        await allureStep(`Select ${BOMsToSelect} number of items from recent BOMS available in the left navigation `, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            for(let i:number=0;i<BOMsToSelect.length;i++) {
                await bomVaultElements.bomTree.vaultLeftNavRecentBOMs.get(i).click();
            }
            await w.waitUntilWorkingModalNotDisplayed();
            await button.returnButtonByText(buttonNames.addToReport).click();

        })
    }

    public async verifyBOMSAddedinStep3(bomName: string[]) {
        await allureStep('Verify BOMs selected in left navigation present present in grid', async () => {

            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(await gridElements.newGridCellByColumnId(columnIdByColumnName.bomVault.bomName).get(0));
            for(let i:number=0;i<bomName.length;i++) {
                expect(bomName).toContain(await gridElements.newGridCellByColumnId(columnIdByColumnName.bomVault.bomName).get(i).getText());
            }

        })
    }
}



