import {
    bomVaultElements,
    gridElements,
    modalElements,
    partStandardization, shadeElements
} from "../../elements/elements";
import {Input} from "../../components/simple/input";
import {Random} from "../../utils/random";
import {Waiters as w} from "../../helper/waiters";
import {browser} from "protractor";
import {Button} from "../../components/simple/button";
import {buttonNames, modalTitles} from "../../testData/global";
import {allureStep} from "../../helper/allure/allureSteps";
import {Toolbar} from "../../components/toolbar";
import {Grid} from "../../components/grid";
import {Modal} from "../../components/modal";
import {Link} from "../../components/simple/link";
import {Shade} from "../../components/shade";
import {BomTreeLogic} from "./bomTreeLogic";
import {JsScripts} from "../../utils/jsScripts";
import {Slider} from "../../components/slider";
import {BomTreePartsLogic} from "./bomTreePartsLogic";

const input: Input = new Input();
const random: Random = new Random();
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();
const grid: Grid = new Grid();
const modal: Modal = new Modal();
const link: Link = new Link();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const bomTreePartsLogic: BomTreePartsLogic  = new BomTreePartsLogic();

export class PartStandardizationLogic {

    public async goToViewTab() {
        await allureStep(`go to View tab`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await link.clickOnTheLinkByName('Views');
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(toolbar.returnToolbarButtonByValue(buttonNames.delete));
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        });
    };

    public async goToBomsTab () {
        await allureStep(`go to Boms tab`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await link.clickOnTheLinkByName('BOMs');
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(toolbar.returnToolbarButtonByValue(buttonNames.remove));
            // await w.waitUntilElementIsDisplayed(gridElements.severalGrid.get(1));
        });
    };

    public async goToSummaryTab () {
        await allureStep(`go to Summary tab`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await link.clickOnTheLinkByName('Summary');
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(await toolbar.returnToolbarButton(buttonNames.layout));
            // await w.waitUntilElementIsDisplayed(gridElements.severalGrid.last());
            await w.waitUntilElementIsDisplayed(gridElements.newGridRows.last());
        });
    };

    public async filteredOnlyOwnPartStandartization() {
        await allureStep(`only own view filter`, async() => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(toolbar.returnToolbarButton(buttonNames.filters));
            await toolbar.openToolbarDropdownByButtonName(buttonNames.filters);
            await link.clickOnTheLinkByName(buttonNames.myPartStandardizationViews);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(partStandardization.panelTitle.get(0));
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsDisplayed(gridElements.newGridCellByRowIndex(0).get(1));
        });
    }

    public async verifyDescriptionForXSS() {
        await allureStep(`Verify XSS injection text in description field`, async() => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(partStandardization.panelTitle.get(0));
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsDisplayed(gridElements.newGridCellByRowIndex(0).get(1));
            let xssDescriptiontext = await grid.newGridReturnCellValuesByColumnName(1, 'Description');
            await expect(xssDescriptiontext[0])
                .toEqual("This is a test");
        });
    }
    public async addNewPartStandardizationViewWithRandomName() {
        await allureStep(`add new part standardization view`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await Shade.openShadeWithButton(buttonNames.addNewPartStandardizationView);
            await w.waitUntilElementIsDisplayed(partStandardization.partNameField);
            await w.waitUntilElementIsDisplayed(partStandardization.descriptionField);
            await input.fillFieldWithValue(partStandardization.partNameField, random.randomTextGenerator(10));
            await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.createView));
            await Shade.closeShadeWithButton(buttonNames.createView);
            await w.waitUntilElementIsDisplayed(gridElements.newGridOpenHeaderSortButton.get(0));
            await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelectorByIndex(0));
        });
    }

    public async addNewPartStandardizationView(viewName: string) {
        await allureStep(`add new part standardization view`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await Shade.openShadeWithButton(buttonNames.addNewPartStandardizationView);
            await input.fillFieldWithValue(partStandardization.partNameField, viewName);
            await w.waitUntilElementIsClickable(await button.returnButtonByText(buttonNames.createView));
            await Shade.closeShadeWithButton(buttonNames.createView);
            await w.waitUntilElementIsDisplayed(gridElements.newGridOpenHeaderSortButton.get(0));
            await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
        });
    }
    public async addNewPartStandardizationViewWithDescription(viewName: string, description : string) {
        await allureStep(`add new part standardization view`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await Shade.openShadeWithButton(buttonNames.addNewPartStandardizationView);
            await input.fillFieldWithValue(partStandardization.partNameField, viewName);
            await input.fillFieldWithValue(partStandardization.descriptionField, description);
            await w.waitUntilElementIsClickable(await button.returnButtonByText(buttonNames.createView));
            await Shade.closeShadeWithButton(buttonNames.createView);
            await w.waitUntilElementIsDisplayed(gridElements.newGridOpenHeaderSortButton.get(0));
            await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
        });
    }

    public async deleteAllOwnPartStandardizationIfPresent () {
        await allureStep(`delete all own part standardization from view`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await toolbar.openToolbarDropdownByButtonName(buttonNames.filters);
            await link.clickOnTheLinkByNameAndWaitForElement(buttonNames.myPartStandardizationViews, partStandardization.tagByName('My Part Standardization Views'));
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(partStandardization.panelTitle.get(0));
            await w.waitUntilElementIsDisplayed(gridElements.selectAllCheckbox);
            await browser.sleep(1000);
            if (await gridElements.newGridRows.get(0).isPresent()) {
                await grid.newMechanismSelectAllCheckboxChecking();
                await w.waitUntilElementIsClickable(partStandardization.deleteButton);
                await modal.openModalWithElement(partStandardization.deleteButton);
                await w.waitUntilElementIsDisplayed(await modalElements.modalTitleByName(modalTitles.deleteViews));
                await w.waitUntilElementIsClickable(await button.returnButtonByText(buttonNames.okay));
                await modal.closeModalWithButton(buttonNames.okay);
            }
        });
    };

    public async deleteViewByName(name: string) {
        await allureStep(`delete ${name} view from part standardization`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await toolbar.openToolbarDropdownByButtonName(buttonNames.filters);
            await link.clickOnTheLinkByNameAndWaitForElement(buttonNames.myPartStandardizationViews, partStandardization.tagByName('My Part Standardization Views'));
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(partStandardization.panelTitle.get(0));
            await w.waitUntilElementIsDisplayed(gridElements.selectAllCheckbox);
            await grid.mechanismCheckCheckboxByName('Name', name);
            await w.waitUntilElementIsClickable(partStandardization.deleteButton);
            await expect(await button.returnButtonByText(buttonNames.delete).isEnabled()).toBeTruthy();
            await modal.openModalWithElement(partStandardization.deleteButton);
            await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.okay));
            await modal.closeModalWithButton(buttonNames.okay);
        });
    };


    public async addBomToPartStandardizationView () {
        await allureStep('add any bom to part standardization view', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(toolbar.returnToolbarButtonByValue(buttonNames.remove));
            await w.waitUntilElementIsClickable(partStandardization.toolbarButtons.get(2));
            await button.clickOnTheElement(partStandardization.toolbarButtons.get(2));
            await w.waitUntilElementIsClickable(partStandardization.dropdownMenuButtons.get(3));
            await button.clickOnTheElementAndWait(partStandardization.dropdownMenuButtons.get(3), bomVaultElements.bomTree.bomTreeRows.get(1));
            await w.waitUntilElementIsClickable(gridElements.shadeCheckboxSelector.get(1));
            await bomTreeLogic.checkNewGridBomRowsInShade(3);
            await w.waitUntilElementIsClickable(partStandardization.shadeAddBomsButton);
            await modal.openModalWithElement(partStandardization.shadeAddBomsButton);
            await Shade.closeShadeWithButton(buttonNames.okay);
            await w.waitUntilElementIsClickable(gridElements.newGridRows.last());
        });
    };

    public async addAmountOfBomsToView (number: number) {
        await allureStep('add any bom to part standardization view', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(toolbar.returnToolbarButtonByValue(buttonNames.remove));
            await w.waitUntilElementIsClickable(partStandardization.toolbarButtons.get(2));
            await button.clickOnTheElement(partStandardization.toolbarButtons.get(2));
            await w.waitUntilElementIsClickable(partStandardization.dropdownMenuButtons.get(3));
            await button.clickOnTheElementAndWait(partStandardization.dropdownMenuButtons.get(3), bomVaultElements.bomTree.bomTreeRows.get(1));
            await w.waitUntilElementIsClickable(gridElements.shadeCheckboxSelector.get(1));
            await bomTreeLogic.checkNewGridBomRowsInShade(number);
            await w.waitUntilElementIsClickable(partStandardization.shadeAddBomsButton);
            await modal.openModalWithElement(partStandardization.shadeAddBomsButton);
            await Shade.closeShadeWithButton(buttonNames.okay);
            await w.waitUntilElementIsClickable(gridElements.newGridRows.last());
        });
    };

    public async newMechanismSelectAllCheckboxPartStandard() {
        await allureStep(`click on select all checkboxes in part standardization`, async () => {
            await w.waitUntilElementIsClickable(gridElements.selectAllCheckboxes.last());
            await gridElements.selectAllCheckboxes.last().click();
        });
    };

    public async deleteAllBomFromView () {
        await allureStep(`delete all bom from view`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(partStandardization.newGridRowsForBomsTab.get(0));
            await this.newMechanismSelectAllCheckboxPartStandard();
            await w.waitUntilElementIsClickable(toolbar.returnToolbarButtonByValue(buttonNames.remove));
            await modal.openModalWithElement(toolbar.returnToolbarButtonByValue(buttonNames.remove));
            await modal.closeModalWithButton(buttonNames.okay);
            await w.waitUntilElementIsDisplayed(gridElements.newGridBodies.last());
            await w.waitUntilElementIsDisplayed(gridElements.newGridNoRowsToShowText.last());
        });
    }

    public async deleteSingleBomFromView () {
        await allureStep(`delete single bom from view`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(await partStandardization.newGridRowsForBomsTab.get(0));
            await grid.newMechanismCheckboxElementRangeChecking(partStandardization.checkboxSelectorForBomsTab,0, 1);
            await w.waitUntilElementIsClickable(toolbar.returnToolbarButtonByValue(buttonNames.remove));
            await modal.openModalWithElement(toolbar.returnToolbarButtonByValue(buttonNames.remove));
            await modal.closeModalWithButton(buttonNames.okay);
        });
    }

    public async analysisStatusShouldBeCompleted() {
        await allureStep(`should wait until status should be completed`, async () => {
            async function check() {
                await w.waitUntilElementIsDisplayed(gridElements.newGridRows.get(0));
                let result: string = await gridElements.newGridCellByRowIndex(0).get(4).getText();
                if (result == 'Queued' || result == 'In Process' || result == 'Update Required') {
                    await button.clickOnTheElement(toolbar.returnToolbarButtonByValue(buttonNames.refresh));
                    await w.waitUntilElementIsDisplayed(gridElements.checkboxSelector.get(0));
                    await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
                    await check();
                }
            }
            await check();
            await expect(await gridElements.newGridCellByRowIndex(0).get(4).getText()).toEqual('Completed');
        });
    };

    public async analysisStatusShouldBeCompletedByName(viewName: string, lockUnlock: number, columnHeaderName: string) {
        await allureStep(`should wait until status ${viewName} should be completed`, async () => {
            await w.waitUntilElementIsDisplayed(gridElements.newGridCellWithoutContentByRowIndex(0).get(0));
            let index = await grid.returnRowNumberByLinkName(lockUnlock, columnHeaderName, viewName);
            async function check(index) {
                await w.waitUntilElementIsDisplayed(gridElements.newGridRows.get(0));
                let result: string = await gridElements.newGridCellByRowIndex(index).get(4).getText();
                if (result == 'Queued' || result == 'In Process' || result == 'Update Required') {
                    await button.clickOnTheElement(toolbar.returnToolbarButtonByValue(buttonNames.refresh));
                    await w.waitUntilElementIsDisplayed(gridElements.checkboxSelector.get(0));
                    await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
                    await check(index);
                }
            }
            await check(index);
            await expect(await gridElements.newGridCellByRowIndex(index).get(4).getText()).toEqual('Completed');
        });
    };

    public async newGridCheckingColumnHeadersForBomsTab(expectedHeaders: string[]) {
        await allureStep(`checking header name with ${expectedHeaders}`, async ()=> {
            await w.waitUntilElementIsClickable(partStandardization.bomPageLoad);
            const actualHeaders: string[] = await partStandardization.newGridHeaderNamesForBomsTab.getText();
            let remainActualHeaders: string[];
            let sliceExpectedHeaders: string[];
            for (let i: number = 0; i < actualHeaders.length; i++) {
                await expect(actualHeaders[i]).toEqual(expectedHeaders[i]);
                await grid.newGridHideColumnByName(actualHeaders[i]);
            }
            remainActualHeaders = await partStandardization.newGridHeaderNamesForBomsTab.getText();
            if (remainActualHeaders.length > 0) {
                sliceExpectedHeaders = await expectedHeaders.slice(actualHeaders.length);
                await this.newGridCheckingColumnHeadersForBomsTab(sliceExpectedHeaders);
            }
        });
    };

    public async openModalByFirstLinkInColumn(columnHeaderName: string, title: string) {
        await allureStep(`click and check modal by first link in ${columnHeaderName}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(partStandardization.newGridHeaderNamesForSummaryTab.get(0));
            const acceptText: string[] = await this.returnCellValuesByColumnNameSummaryTab(columnHeaderName);

            for (let i:number = 0; i < acceptText.length; i++) {
                if (await acceptText[i].length>0) {
                    await modal.openModalWithLinkName(acceptText[i]);
                    await w.waitUntilElementIsClickable(modal.modalTitle);
                    await expect(modal.modalTitle.getText()).toContain(title);
                    await modal.closeModalWithXButton();
                    break;
                }
            }
        });
    };

    public async openModalByFirstElementInColumn(columnHeaderName: string, title: string) { 
        await allureStep(`click and check modal by first link in ${columnHeaderName}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(partStandardization.newGridHeaderNamesForSummaryTab.get(0));            
            const textLinesInColumn: string[] = await this.returnCellValuesByColumnNameSummaryTab(columnHeaderName);                
            const colNumber: number = await this.returnColumnNumberByColumnNamePartStandard(columnHeaderName);                      
            for (let i: number = 0; i < textLinesInColumn.length; i++) {   
                let link = await partStandardization.newGridUnlockedColumnLinksByRowAndCellNumbers(i, colNumber).get(0); 
                let linkText = await partStandardization.newGridUnlockedColumnLinksByRowAndCellNumbers(i, colNumber).getText();
                if(linkText.length > 0){
                    await modal.openModalWithElement(link);
                    await w.waitUntilElementIsClickable(modal.modalTitle);
                    await expect(modal.modalTitle.getText()).toContain(title);
                    await modal.closeModalWithXButton();
                    break; 
                }                             
            }          
        });         
    }

    public async openSliderByFirstLinkInColumnById(id: string, title:string) {
        const columnValues: string[] = await this.returnCellValuesByColumnNameSummaryTab(await gridElements.newGridReturnColumnNameByColumnId(id).getText());
        await allureStep(`click and check slider by first link with column id ${id}`, async () => {
            for (let i:number = 0; i < columnValues.length; i++) {

                    if (await columnValues[i].length > 0 || parseInt(columnValues[i])>0) {
                        await Slider.openSliderByClickingOnTheElement(gridElements.newGridCellLinksById(id).get(i));
                        await browser.sleep(2000);
                        await w.waitUntilElementIsClickable(partStandardization.sliderTitle);
                        await expect(partStandardization.sliderTitle.getText()).toContain(title);
                        await Slider.closeSlider(partStandardization.closeXButton, gridElements.newGridRows.last());
                        break;

                }
            }
        });
    };

    public async openSliderByFirstLinkByIdAndNotClose(id: string, title:string) {
        const columnValues: string[] = await this.returnCellValuesByColumnNameSummaryTab(await gridElements.newGridReturnColumnNameByColumnId(id).getText());
        await allureStep(`click and check slider by first link with column id ${id}`, async () => {
            for (let i:number = 0; i < columnValues.length; i++) {

                if (await columnValues[i].length > 0 || parseInt(columnValues[i])>0) {
                    await Slider.openSliderByClickingOnTheElement(gridElements.newGridCellLinksById(id).get(i));
                    await browser.sleep(2000);
                    await w.waitUntilElementIsClickable(partStandardization.sliderTitle);
                    await expect(partStandardization.sliderTitle.getText()).toContain(title);
                    break;
                }
            }
        });
    };

    public async returnColumnNumberByColumnNamePartStandard(columnHeaderName: string): Promise<number> {
        await w.waitUntilElementIsDisplayed(partStandardization.newGridHeaderNamesForSummaryTab.get(0));
        await w.waitUntilElementIsClickable(partStandardization.newGridHeaderNamesForSummaryTab.get(0));
        const headerText: string[] = await partStandardization.newGridHeaderNamesForSummaryTab.getText();
        for (let i = 0; i < headerText.length; i++) {
            if (headerText[i] === columnHeaderName) {
                return i
            }
        }
    };

    public async returnColumnNumberByColumnNameBomsTab(columnHeaderName: string): Promise<number> {
        let columnNumber: number;
        await allureStep(`return column number by column ${columnHeaderName}`, async() => {
            await w.waitUntilElementIsDisplayed(partStandardization.newGridHeaderNamesForBomsTab.get(0));
            await w.waitUntilElementIsClickable(partStandardization.newGridHeaderNamesForBomsTab.get(0));
            const headerText: string[] = await partStandardization.newGridHeaderNamesForBomsTab.getText();
            for (let i = 0; i < headerText.length; i++) {
                if (headerText[i] === columnHeaderName) {
                    columnNumber = i;
                    break
                }
            }
        });
        return columnNumber;
    };

    public async returnCellValuesByColumnNameSummaryTab(columnHeaderName: string): Promise<string[]> {
        let resArr: string[] = [];
        await allureStep(`return cell values by column name ${columnHeaderName}`, async () => {
            const colNumber: number = await this.returnColumnNumberByColumnNamePartStandard(columnHeaderName);
            const cellInARow: number = await partStandardization.columnRowCellsWithContentSummaryTab(0).count();
            const allCells: string[] = await partStandardization.columnCellsWithContentSummaryTab.getText();
            for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                resArr.push(await partStandardization.columnRowCellsWithContentSummaryTab((i - colNumber) / cellInARow).get(colNumber).getText());
            }
        });
        return resArr;
    };

    public async returnCellValuesByColumnNameBomsTab(columnHeaderName: string): Promise<string[]> {
        let resArr: string[] = [];
        await allureStep(`return cell values by column name ${columnHeaderName}`, async () => {
            const colNumber: number = await this.returnColumnNumberByColumnNameBomsTab(columnHeaderName);
            const cellInARow: number = await partStandardization.columnRowCellsWithContentBomsTab(0).count();
            const allCells: string[] = await partStandardization.columnCellsWithContentBomsTab.getText();
            for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                resArr.push(await partStandardization.columnRowCellsWithContentBomsTab((i - colNumber) / cellInARow).get(colNumber).getText());
            }
        });
        return resArr;
    };

    public async newGridHideDuplicateColumnByName(cellName: string) {
        await allureStep('Hide duplicate ' + cellName + ' column', async () => {
            const colNumber: number = await this.returnColumnNumberByColumnNamePartStandard(cellName);
            await grid.newGridOpenFilterBoxByName(cellName);
            await grid.switchToSortColumnMenu();
            await grid.clickOnHideThisColumn();
            await browser.sleep(500);    //here we have to add w.waitUntilElementNotDisplayed for hided column
            await expect(gridElements.newGridHeaderNames.get(colNumber).getText()).not.toEqual(cellName);
        });
    };

    public async addNewViewFromSliderAndReturnName(): Promise<string> {
        let viewName: any;
        await allureStep(`create new view with random name`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            viewName = random.randomTextGenerator(10);
            await input.fillFieldWithValue(partStandardization.partNameField, viewName);
            await w.waitUntilElementIsClickable(button.returnButtonByTextInSlider(buttonNames.createViewAndAddBoms));
            await expect(await button.returnButtonByText(buttonNames.createViewAndAddBoms).isEnabled()).toBeTruthy();
            await expect(await button.returnButtonByText(buttonNames.reset).isEnabled()).toBeTruthy();
            await modal.openModalWithButtonByName(buttonNames.createViewAndAddBoms);
            await Slider.closeSliderWithButtonName(buttonNames.okay, gridElements.newGridRows.last());
        });
        return viewName;
    };

    public async addNewViewFromSlider(name: string) {
        await allureStep(`create new view with ${name}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await input.fillFieldWithValue(partStandardization.partNameField, name);
            await w.waitUntilElementIsClickable(button.returnButtonByTextInSlider(buttonNames.createViewAndAddBoms));
            await expect(await button.returnButtonByText(buttonNames.createViewAndAddBoms).isEnabled()).toBeTruthy();
            await expect(await button.returnButtonByText(buttonNames.reset).isEnabled()).toBeTruthy();
            await w.waitUntilElementIsClickable(await button.returnButtonByText(buttonNames.createViewAndAddBoms));
            await modal.openModalWithButtonByName(buttonNames.createViewAndAddBoms);
            await Slider.closeSliderWithButtonName(buttonNames.okay, gridElements.newGridCheckboxSelector.get(1));
        });
    };

    public async addBomsToViewForNewGrid(name: string) {
        await allureStep(`add bom to view from new grid`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.addNewViewFromSlider(name);
            await grid.newMechanismCheckboxRangeChecking(1, 2);
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
            await w.waitUntilElementIsDisplayed(gridElements.newGridRowsInSlider.get(0));
            await w.waitUntilElementIsClickable(gridElements.newGridSliderCheckboxSelectorByIndex(0));
            await grid.mechanismCheckCheckboxByNameInSlider('Name', name);
            await w.waitUntilElementIsClickable(button.returnButtonByTextInSlider(buttonNames.addBomsToSelectedViews));
            await modal.openModalWithButtonByName(buttonNames.addBomsToSelectedViews);
            await Slider.closeSliderWithButtonName(buttonNames.okay, gridElements.newGridRows.get(1));
        });
    };

    public async addBomsToViewBomTree(name: string) {
        await allureStep(`add bom to view from bom tree`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.addNewViewFromSlider(name);
            await bomTreeLogic.checkBomRows(2);
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
            await w.waitUntilElementIsDisplayed(gridElements.newGridRowsInSlider.get(1));
            await w.waitUntilElementIsClickable(gridElements.newGridSliderCheckboxSelectorByIndex(0));
            await grid.mechanismCheckCheckboxByNameInSlider('Name', name);
            await w.waitUntilElementIsClickable(button.returnButtonByTextInSlider(buttonNames.addBomsToSelectedViews));
            await modal.openModalWithButtonByName(buttonNames.addBomsToSelectedViews);
            await Slider.closeSliderWithButtonName(buttonNames.okay, bomVaultElements.bomTree.bomTreeRows.get(1));
        });
    };

    public async addBomsToViewBomTreeParts(name: string) {
        await allureStep(`add bom to view from bom tree parts`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.addNewViewFromSlider(name);
            await bomTreePartsLogic.openFirstBom();
            await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
            await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
            await w.waitUntilElementIsDisplayed(gridElements.newGridRowsInSlider.get(0));
            await w.waitUntilElementIsClickable(gridElements.newGridSliderCheckboxSelectorByIndex(0));
            await grid.mechanismCheckCheckboxByNameInSlider('Name', name);
            await w.waitUntilElementIsClickable(button.returnButtonByTextInSlider(buttonNames.addBomsToSelectedViews));
            await modal.openModalWithButtonByName(buttonNames.addBomsToSelectedViews);
            await Slider.closeSliderWithButtonName(buttonNames.okay, bomVaultElements.bomTreeParts.bomTreePartsWait.get(0));
        });
    }

    public async addBomsToView(viewName: string) {
        await allureStep(`add bom by name from new grid`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await Slider.openSliderByClickingOnTheElement(button.returnButtonByText(buttonNames.addBomsToPartStandardization));
            await w.waitUntilElementIsDisplayed(gridElements.newGridRowsInSlider.get(0));
            await w.waitUntilElementIsClickable(gridElements.newGridSliderCheckboxSelectorByIndex(0));
            await grid.mechanismCheckCheckboxByNameInSlider('Name', viewName);
            await w.waitUntilElementIsClickable(button.returnButtonByTextInSlider(buttonNames.addBomsToSelectedViews));
            await modal.openModalWithButtonByName(buttonNames.addBomsToSelectedViews);
            await Slider.closeSliderWithButtonName(buttonNames.okay, gridElements.gridWrapper);
        });
    };

    public async createNewReprocessedView(viewName: string, numberOfBoms: number) {
        await allureStep(`add ${viewName} view with ${numberOfBoms} Boms`, async () => {
            await this.addNewPartStandardizationView(viewName);
            await this.filteredOnlyOwnPartStandartization();
            await grid.mechanismCheckCheckboxByName('Name', viewName);
            await this.goToBomsTab();
            await this.addAmountOfBomsToView(numberOfBoms);
            await grid.mechanismCheckCheckboxByName('Name', viewName);
            await this.goToBomsTab();
            await modal.openModalWithElement(partStandardization.toolbarButtonsBomsTab.get(0));
            await modal.closeModalWithButton(buttonNames.okay);
            await this.filteredOnlyOwnPartStandartization();
            await this.analysisStatusShouldBeCompletedByName(viewName, 1, 'Name');
        });
    }

    public async expandFirstIndenturedBomOnAddPartShade () {
        await allureStep(`find BOM with indentured icon and expand it`, async ()=>{
            let rowCount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for (let i:number =0; i < rowCount-1; i++) {
                if(await partStandardization.indenturedBomIconByRowNumber(i).isPresent()){
                    await JsScripts.clickByCompoundCssAndNumber(bomVaultElements.bomTree.bomTreeRowCss, i, bomVaultElements.bomTree.expandFolderIconNewGridCss);
                    break
                }
            }
        });
    };
    public async checkBomByNameOnShade(name: string) {
        await allureStep(`check bom with checkbox by it's name`, async ()=> {
            let rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for (let i: number = 1; i < rowAmount; i++) {
                if (await  shadeElements.bomTreeRowsBoms(i).isPresent()) {
                    if (await  shadeElements.bomTreeRowsBoms(i).getText() === name) {
                        await partStandardization.checkboxSelectorOnAddBomsShade.get(i).click();
                        break
                    }
                }
            }
        });
    };

    public async checkFolderByNameOnShade(name: string) {
        await allureStep(`check folder with checkbox by it's name`, async ()=> {
            let rowAmount: number = await bomVaultElements.bomTree.bomTreeRows.count();
            for (let i: number = 1; i < rowAmount; i++) {
                if (await  shadeElements.bomTreeRowsFolders(i).isPresent()) {
                    if (await  shadeElements.bomTreeRowsFolders(i).getText() === name) {
                        await partStandardization.checkboxSelectorOnAddBomsShade.get(i).click();
                        break
                    }
                }
            }
            await browser.sleep(2000);
        });
    };
}