import {Actions} from "../utils/actions";
import {allureStep} from "../helper/allure/allureSteps";
import {Button} from "./simple/button";
import {buttonNames, columnHeaders} from "../testData/global";
import {browser, ElementArrayFinder, ElementFinder} from "protractor";
import {
    commonElements, dateRange,
    gridElements, modalElements, partDetailsElements,
    toolbarElements,
    transposeElements
} from "../elements/elements";
import {ElementAttributes} from "../utils/elementAttributes";
import {element, by} from "protractor";
import {Input} from "../components/simple/input";
import {JsScripts} from "../utils/jsScripts";
import {Modal} from "./modal";
import {Waiters as w} from "../helper/waiters";
import * as moment from "moment";
import {Dropdown} from "./dropdown";

const actions: Actions = new Actions();
const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const modal: Modal = new Modal();

export class Grid {

    headerName: string;

    constructor() {
        this.headerName;
    };

    public async checkCheckboxRange(startCheckbox: number, endCheckbox: number) {
        for (let i: number = startCheckbox; i < endCheckbox; i++) {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(gridElements.checkboxSelector.get(i));
            await actions.mouseMoveToElement(gridElements.checkboxSelector.get(i));
            // await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(i));
            await gridElements.checkboxSelector.get(i).click()
        }
    };

    public async checkCheckboxElementRange(checkBoxes: ElementArrayFinder, startCheckbox: number, endCheckbox: number) {
        for (let i: number = startCheckbox; i < endCheckbox; i++) {
            await w.waitUntilWorkingModalNotDisplayed();
            await actions.mouseMoveToElement(checkBoxes.get(i));
            // await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(i));
            await checkBoxes.get(i).click()
        }
    };

    public async checkCheckboxRangeNewGrid(startCheckbox: number, endCheckbox: number) {
        await w.waitUntilWorkingModalNotDisplayed();
        for (let i: number = startCheckbox; i < endCheckbox; i++) {
            await actions.mouseMoveToElement(gridElements.newGridCheckboxSelector.get(i));
            await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelector.get(i));
            await gridElements.newGridCheckboxSelector.get(i).click()
        }
    };

    public async newMechanismCheckboxRangeChecking(startCheckbox: number, endCheckbox: number) {
        await allureStep(`Check checkbox range from ${startCheckbox} to ${endCheckbox}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            for (let i: number = startCheckbox; i < endCheckbox; i++) {
                await w.waitUntilElementIsClickable(await gridElements.newGridCheckboxSelectorByIndex(i));
                await gridElements.newGridCheckboxSelectorByIndex(i).click()
            }
        });

    };

    public async newMechanismCheckboxElementRangeChecking(checkBoxes: ElementArrayFinder, startCheckbox: number, endCheckbox: number) {
        for (let i: number = startCheckbox; i < endCheckbox; i++) {
            await w.waitUntilElementIsClickable(checkBoxes.get(i));
            await checkBoxes.get(i).click()
        }
    };

    public async newMechanismModalCheckboxRangeChecking(startCheckbox: number, endCheckbox: number) {
        for (let i: number = startCheckbox; i < endCheckbox; i++) {
            await w.waitUntilElementIsDisplayed(gridElements.newGridModalCheckboxSelectorByIndex(i));
            await w.waitUntilElementIsClickable(gridElements.newGridModalCheckboxSelectorByIndex(i));
            await gridElements.newGridCheckboxSelectorByIndex(i).click()
        }
    };

    public async newMechanismSliderCheckboxRangeChecking(startCheckbox: number, endCheckbox: number) {
        for (let i: number = startCheckbox; i < endCheckbox; i++) {
            await w.waitUntilElementIsDisplayed(gridElements.newGridSliderCheckboxSelectorByIndex(i));
            await w.waitUntilElementIsClickable(gridElements.newGridSliderCheckboxSelectorByIndex(i));
            await gridElements.newGridCheckboxSelectorInSliderByIndex(i).click()
        }
    };

    public async newMechanismSelectAllCheckboxChecking() {
        await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
        await gridElements.selectAllCheckbox.click();
    };

    public async checkFirstCheckBoxIfNotChecked() {
        await w.waitUntilElementIsDisplayed(gridElements.newGridCheckboxSelectorByIndex(0));
        await w.waitUntilElementIsClickable(gridElements.newGridCheckboxSelectorByIndex(0));
        const status: string = await elementAttributes.getElementAttribute(gridElements.newGridCheckboxSelectorByIndex(0), 'class');
        if (!(await gridElements.newGridCheckboxSelectorByIndex(0).isSelected())) {
            await gridElements.newGridCheckboxSelectorByIndex(0).click()
        }
    };

    public async goToTheNextPage() {
        await allureStep('Go to the next page in the grid', async () => {
            await gridElements.nextPageButton.click();
            await w.waitUntilElementIsDisplayed(gridElements.grid);
            await w.waitUntilElementIsClickable(gridElements.grid);
        });
    };

    public async goToThePreviousPage() {
        await allureStep('Go to the previous page in the grid', async () => {
            await gridElements.previousPageButton.click();
            await w.waitUntilElementIsDisplayed(gridElements.grid);
            await w.waitUntilElementIsClickable(gridElements.grid);
        });
    };

    public async openFilterBox(number: number, viewType: string = 'simple') {
        await allureStep('Open header filter box', async () => {
            await browser.waitForAngularEnabled(false);
            if (viewType === 'Slider') {
                this.headerName = await gridElements.headerNameInSlider.get(number).getText();
                await button.clickOnTheElement(gridElements.headerNameInSlider.get(number));
            }
            else {
                this.headerName = await gridElements.headerName.get(number).getText();
                await button.clickOnTheElement(gridElements.headerName.get(number));
            }
            await w.waitUntilElementIsDisplayed(gridElements.sortingBox);
            await w.waitUntilElementIsClickable(gridElements.sortingBox);
            await browser.waitForAngularEnabled(false);
        });
    };

    //for new grid
    public async newGridOpenFilterBoxByName(cellName: string) {
        await allureStep('Open header ' + cellName + ' filter box', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.sleep(2000);
            if(! await gridElements.newGridNoRowsToShowText.get(0).isPresent()) {
            await w.waitUntilWorkingModalNotDisplayed();
            }
            const headerNames: string[] = await gridElements.newGridHeaderNames.getText();
            for (let i: number = 0; i < headerNames.length; i++) {
                if (headerNames[i] === cellName) {
                    await Actions.mouseMoveToElementStatic(gridElements.newGridOpenHeaderSortButton.get(i));
                    await w.waitUntilElementIsClickable(gridElements.newGridOpenHeaderSortButton.get(i));
                    await button.clickOnTheElement(gridElements.newGridOpenHeaderSortButton.get(i));
                    await w.waitUntilElementIsDisplayed(gridElements.newGridOpenSortBox);
                    break
                }
            }
        });
    };

//for new grid inside bomtreeparts
    public async newGridOpenFilterBoxByNamebomtreeparts(cellName: string) {
        await allureStep('Open header ' + cellName + ' filter box', async () => {
            await browser.waitForAngularEnabled(false);
            await w.waitUntilWorkingModalNotDisplayed();

            await browser.sleep(2000);
            // await w.waitUntilElementIsClickable(gridElements.newGridOpenHeaderSortButton.first());
            const headerNames: string[] = await gridElements.newGridHeaderNamesbomTreeParts.getText();
            for (let i: number = 0; i < headerNames.length; i++) {
                if (headerNames[i] === cellName) {
                    await Actions.mouseMoveToElementStatic(gridElements.newGridOpenHeaderSortButton.get(i));
                    await w.waitUntilElementIsClickable(gridElements.newGridOpenHeaderSortButton.get(i));
                    await button.clickOnTheElement(gridElements.newGridOpenHeaderSortButton.get(i));
                    await w.waitUntilElementIsDisplayed(gridElements.newGridOpenSortBox);
                    break
                }
            }
        });
    };

    //for new grid
    public async newGridOpenCalendar() {
        await allureStep('Open calendar in sort box', async () => {
            await button.clickOnTheElementAndWait(gridElements.columnsSort.datePicker,
                gridElements.columnsSort.dateBox)
        });
    };

    //for new grid
    public async closeOpenFilterBox() {
        await allureStep('Close open header filter box', async () => {
            if (await gridElements.columnsSort.closeButton.isPresent()) {
                await button.clickOnTheElement(gridElements.columnsSort.closeButton);
                await w.waitUntilElementNotDisplayed(gridElements.newGridOpenSortBox);
            }
            else {
                await button.clickOnTheElement(gridElements.columnsSort.simpleCloseButton);
                await w.waitUntilElementNotDisplayed(gridElements.newGridOpenSortBox);
            }
        })
    };

    //for new grid
    public async switchToSortColumnMenu() {
        await allureStep('Switch from filter column menu to sort column menu', async () => {
            if (await gridElements.columnsSort.activeFilterIcon.isPresent()) {
                await w.waitUntilElementIsDisplayed(gridElements.columnsSort.simpleCloseButton);
                await w.waitUntilElementIsClickable(gridElements.columnsSort.simpleCloseButton);
                await button.clickOnTheElement(gridElements.columnsSort.simpleCloseButton);
                await w.waitUntilElementIsClickable(gridElements.columnsSort.activeSortIcon)
            }
            await w.waitUntilElementIsDisplayed(gridElements.newGridOpenSortBoxOptionByName('Hide this column'));
            await w.waitUntilElementIsClickable(gridElements.newGridOpenSortBoxOptionByName('Hide this column'));
        })
    };

    //for new grid
    public async switchToFilterColumnMenu() {
        await allureStep('Switch from sort column menu to filter column menu', async () => {
            if(await gridElements.columnsSort.activeSortIcon.isPresent()) {
                await button.clickOnTheElement(gridElements.columnsSort.closeButton);
                await w.waitUntilElementIsClickable(gridElements.columnsSort.activeFilterIcon);
                await w.waitUntilElementIsDisplayed(gridElements.columnsSort.newGridDropdownInput);
                await w.waitUntilElementIsClickable(gridElements.columnsSort.newGridDropdownInput);
            }
            })
    };

    //for new grid
    public async selectOptionInColumnFilter(optionName: string, waitElement?: ElementFinder) {
        await allureStep("Select column option name '${optionName}'", async () => {
            await w.waitUntilElementIsDisplayed(gridElements.newGridColumnFilterOptionByName(optionName));
            await w.waitUntilElementIsClickable(gridElements.newGridColumnFilterOptionByName(optionName));
            await browser.sleep(500);   //here we have to add w.waitUntilElementNotDisplayed for optionName
            await button.clickOnTheElementAndWait(gridElements.newGridColumnFilterOptionByName(optionName), gridElements.newGridBodies.last());
            if (Boolean(waitElement)) {
                await w.waitUntilElementIsClickable(waitElement);
            }
            await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckboxes.last());
        })
    };

    //for new grid
    public async clickOnHideThisColumn() {
        await allureStep('Click on "Hide this column"', async () => {
            await w.waitUntilElementIsDisplayed(gridElements.newGridOpenSortBoxOptionByName('Hide this column'));
            await w.waitUntilElementIsClickable(gridElements.newGridOpenSortBoxOptionByName('Hide this column'));
            await button.clickOnTheElement(gridElements.newGridOpenSortBoxOptionByName('Hide this column'))
        });
    };

    private async waitForHideColumnByName(columnName: string) {
        try {
            const columnNames: string[] = await gridElements.newGridHeaderNames.getText();
            for (let i: number = 0; i < columnNames.length; i++) {
                if (columnNames[i] === columnName) {
                    await this.waitForHideColumnByName(columnName);
                }
            }
        }
        catch (e) {
            if (e) {
                throw `Column name "${columnName}" is not hidden`;
            }
        }
    };

    //for new grid
    public async newGridHideColumnByName(cellName: string) {
        await allureStep('Hide ' + cellName + ' column', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.newGridOpenFilterBoxByName(cellName);
            await this.switchToSortColumnMenu();
            await this.clickOnHideThisColumn();
            await this.waitForHideColumnByName(cellName);
            // await w.waitUntilElementNotDisplayed(await gridElements.newGridHeaderByName(cellName));
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async newGridGetVisibleColumnHeaders() {
        let columnHeaderText: string[] = [];
        await allureStep(`Get visilble column header names`, async () => {
          const headerNumber: number = await gridElements.newGridHeaderNames.count();

          for (let i: number =0; i < headerNumber; i++) {
              if(await gridElements.newGridHeaderNames.get(i).isDisplayed()) {
                  columnHeaderText.push(await gridElements.newGridHeaderNames.get(i).getText())
              }
          }

        });
        return columnHeaderText;
    };

    public async newGridGetVisibleColumnHeadersInModal() {
        // await w.waitUntilElementIsClickable(gridElements.newGridHeaderNamesInModal.get(0)); affects method below
        let columnHeaderText: string[] = [];
        await allureStep(`Get visilble column header names in modal`, async () => {
            await w.waitUntilElementIsDisplayed(await gridElements.newGridHeaderNamesInModal.get(0))
            const headerNumber: number = await gridElements.newGridHeaderNamesInModal.count();
            for (let i: number =0; i < headerNumber; i++) {
                if(await gridElements.newGridHeaderNamesInModal.get(i).isDisplayed()) {
                    columnHeaderText.push(await gridElements.newGridHeaderNamesInModal.get(i).getText())
                }
            }
        });
        return columnHeaderText;
    };

    public async returnSetOfColumnHeadersInModalWithScroll(pixelsToScroll: number, numberOfScrolls: number = 1) {
        let columnHeadersText: string [] = await this.newGridGetVisibleColumnHeadersInModal();
        await allureStep(`Get all column header names in modal with scroll`, async () => {
            for (let i: number = 0; i < numberOfScrolls; i++) {
                await browser.executeScript(`document.querySelector('.modal-body .ag-center-cols-viewport').scrollBy(${pixelsToScroll},0)`);
                await (await this.newGridGetVisibleColumnHeadersInModal()).forEach(item => columnHeadersText.push(item));
            }
        });
        return Array.from(new Set(columnHeadersText));
    };

    //for new grid
    public async newGridHideDuplicateColumnByName(cellName: string) {
        await allureStep('Hide duplicate ' + cellName + ' column', async () => {
            const colNumber: number = await this.newGridReturnColumnNumberByColumnName(1, cellName);
            await this.newGridOpenFilterBoxByName(cellName);
            await this.switchToSortColumnMenu();
            await this.clickOnHideThisColumn();
            await browser.sleep(500);    //here we have to add w.waitUntilElementNotDisplayed for hided column
            await expect(gridElements.newGridHeaderNames.get(colNumber).getText()).not.toEqual(cellName);
        });
    };

    //for new grid
    public async newGridHideColumnByNameInModal(cellName: string) {
        await allureStep('Hide ' + cellName + ' column', async () => {
            await this.newGridOpenFilterBoxByName(cellName);
            await this.switchToSortColumnMenu();
            await this.clickOnHideThisColumn();
            await w.waitUntilElementNotDisplayed(await gridElements.newGridHeaderByNameInModal(cellName));
            await expect(await gridElements.newGridHeaderByNameInModal(cellName).isPresent()).toBeFalsy();
        });
    };

    //for new grid
    public async newGridHideColumnsRange(cellNames: string[]) {
        await allureStep('Hide ' + cellNames + ' columns range', async () => {
            const duplicateNames: string[] = await this.checkDuplicates(cellNames);
            if (duplicateNames.length > 0) {
                for (let i: number = 0; i < duplicateNames.length; i++) {
                    await this.newGridHideDuplicateColumnByName(duplicateNames[i]);
                }
            }
            else {
                for (let i: number = 0; i < cellNames.length; i++) {
                    await this.newGridHideColumnByName(cellNames[i]);
                }
            }
        });
    };

    public async checkDuplicates(cellNames: string[]): Promise<string[]> {
        const duplicateNames: string[] = cellNames.filter(function (elem, pos, arr) {
            return pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);
        });
        return duplicateNames
    };

    //for new grid
    public async newGridReturnHeaderNamberByName(name: string) {
        const headerNames: string[] = await gridElements.newGridHeaderNames.getText();
        for (let i: number = 0; i < headerNames.length; i++) {
            if (headerNames[i] === name) {
                return i
            }
        }
    };

    //forNewGrid
    public async peformSearchInColumnSortWithValue(sortValue: string, waitElement: ElementFinder) {
        await allureStep('Perform search ${sortValue} through column sorting', async () => {
            await input.fillFieldWithValue(gridElements.columnsSort.input, sortValue);
            await button.clickByButtonName(buttonNames.apply);
            await w.waitUntilElementIsClickable(waitElement);
        });
    };

    public async peformSearchInColumnSort(waitElement: ElementFinder) {
        await allureStep(`Perform search through column sorting`, async () => {
            await button.clickByButtonName(buttonNames.apply);
            await w.waitUntilElementIsClickable(waitElement);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckboxes.last());
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async applyFilter(clickElement: any) {
        await clickElement.click();
        await w.waitUntilElementNotDisplayed(gridElements.sortingBox);
    };

    async checkingColumnHeaders(gridNumber: number, expectedResults: string[]) {
        const columnHeaders: any = element.all(by.css('.header-title.text-elipsis'));
        await w.waitUntilElementIsDisplayed(columnHeaders.get(gridNumber));
        let tempArr = await columnHeaders.getText();
        tempArr = tempArr.filter((item) => {
            return item.length > 0
        });
        await expect(tempArr.toString().includes(expectedResults.toString())).toBeTruthy();
    };

    async checkingColumnHeadersPartDetails(gridNumber: number, expectedResults: string[]) {
        await w.waitUntilWorkingModalNotDisplayed();
        const columnHeaders: any = await modalElements.newGirdModalUnlockedHeaderColumns.getText();
        let tempArr = columnHeaders.filter((item) => {
            return item.length > 0
        });
        await expect(expectedResults.toString().includes(tempArr.toString())).toBeTruthy();
    };

    //for new grid
    public async newGridCheckingColumnHeaders(expectedHeaders: string[]) {
        await allureStep(`checking header name with ${expectedHeaders}`, async ()=> {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(gridElements.newGridHeaderNames.first());
            const actualHeaders: string[] = await this.newGridGetVisibleColumnHeaders();
            let remainActualHeaders: string[];
            let sliceExpectedHeaders: string[];
            for (let i = 0; i < actualHeaders.length; i++) {
                await expect(actualHeaders[i]).toEqual(expectedHeaders[i]);
                await this.newGridHideColumnByName(actualHeaders[i]);
            }
            remainActualHeaders = await this.newGridGetVisibleColumnHeaders();
            if (remainActualHeaders.length > 0) {
                sliceExpectedHeaders = await expectedHeaders.slice(actualHeaders.length);
                await this.newGridCheckingColumnHeaders(sliceExpectedHeaders);
            }
        });
    };

    public async newGridCheckingColumnHeadersInModal(expectedHeaders: string[]) {
        await allureStep(`checking header name with ${expectedHeaders}`, async ()=> {
            await w.waitUntilElementIsDisplayed(gridElements.newGridHeaderNamesInModal.first());
            const actualHeaders: string[] = await this.newGridGetVisibleColumnHeadersInModal();
            for (let i: number = 0; i < actualHeaders.length; i++) {
                await expect(actualHeaders[i]).toEqual(expectedHeaders[i]);
            }
        });
    };

    //for new grid
    public async newGridCheckingLockedColumnHeaders(expectedResults: string[]) {
        const headerNames: string[] = await gridElements.newGridLockedColumnHeaders.getText();
        for (let i = 0; i < headerNames.length; i++) {
            await expect(headerNames[i]).toEqual(expectedResults[i]);
        }
    };

    //for new grid
    public async newGridCheckingUnlockedColumnHeaders(expectedResults: string[]) {
        const headerNames: string[] = await gridElements.newGridUnlockedColumnHeaders.getText();
        for (let i = 0; i < headerNames.length; i++) {
            if(await gridElements.newGridUnlockedColumnHeaders.get(i).isDisplayed()) {
                await expect(headerNames[i]).toEqual(expectedResults[i]);
            }
        }
    };

    async scrollGrid(gridNumber: number, elementText: string) {
        let existingElements: any = element.all(by.className('grid-flex-wrapper')).get(gridNumber)
            .all(by.css('.ui-grid-cell .ui-grid-cell-contents'));
        let initialList = await existingElements.getText();

        if (!initialList.includes(elementText)) {
            await browser.executeScript('document.querySelectorAll(".modal-body .ui-grid-cell-contents")[' + initialList.length + '].scrollIntoView()');
            initialList = await existingElements.getText();
            if (!initialList.includes(elementText)) {
                await this.scrollGrid(gridNumber, elementText);
            }
        }
    };

    async notBeSortingPartDetails(gridNumber: number = 0) {
        let result = await partDetailsElements.columnHeadersElem.count();
        for (let i = 0; i < result; i += 1) {
            await  partDetailsElements.columnHeadersElem.get(i).click();
            await expect(gridElements.newGridOpenSortBox.isPresent()).toBeFalsy();
        }
    };

    async paginationChecking() {
        await expect(gridElements.paginationPanel.isDisplayed()).toBeTruthy();
        await expect(gridElements.itemPerPage.isDisplayed()).toBeTruthy();
        let values = await gridElements.itemPerPageValues.getText();
        await expect(values).toEqual(['25', '50', '100', '250', '500'])
    };

    async newGridPaginationChecking() {
        await expect(gridElements.paginationPanel.isDisplayed()).toBeTruthy();
        await expect(gridElements.itemPerPage.isDisplayed()).toBeTruthy();
        const values: string[] = await gridElements.itemPerPageValues.getText();
        const expectedValues: string[] = ['25', '50', '100', '250', '500', 'All'];
        for (let i: number = 0; i < values.length; i++) {
            await expect(await values[i].trim()).toEqual(expectedValues[i]);
        }
    };

    async newGridPaginationCheckingInPanel() {
        await expect(gridElements.paginationPanel.isDisplayed()).toBeTruthy();
        await expect(gridElements.itemPerPage.isDisplayed()).toBeTruthy();
        const values: string[] = await gridElements.paginationItemPerPageValuesInSlider.getText();
        const expectedValues: string[] = ['25', '50', '100', '250', '500', 'All'];
        for (let i: number = 0; i < values.length; i++) {
            await expect(await values[i].trim()).toEqual(expectedValues[i]);
        }
    };

    async changeItemsPerPage(perPageOption: string) {
        await button.clickOnTheElement(gridElements.itemPerPage);
        await button.clickOnTheElement(gridElements.itemPerPageOptionByName(perPageOption));
        await w.waitUntilElementIsDisplayed(gridElements.newGridRows.get(0));
        await w.waitUntilElementIsClickable(gridElements.newGridRows.get(0));
    };

    async goToLastFirstPages() {
        await w.waitUntilElementIsDisplayed(gridElements.maxPagesPerGrid);
        let maxPages: any = await gridElements.maxPagesPerGrid.getText();
        maxPages = await maxPages.split(' ');
        if (parseInt(maxPages[1]) > 1) {
            await gridElements.lastPage.click();
            await browser.waitForAngularEnabled(false);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await browser.waitForAngularEnabled(false);
            let gridCount = await gridElements.gridCounter.getText();
            let processedGridCount = new Promise(async (resolve, reject) => {
                let tempGrid = await gridCount.split(' ');
                resolve(tempGrid)
            });
            await expect((await processedGridCount)[2]).toEqual((await processedGridCount)[4]);
            await gridElements.firstPage.click();
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await browser.sleep(1000);
            let gridCount1 = await gridElements.gridCounter.getText();
            let processedGridCount1 = new Promise(async (resolve, reject) => {
                let tempGrid = await gridCount1.split(' ');
                resolve(tempGrid)
            });
            await expect(+(await processedGridCount1)[2]).toBeLessThan(+(await processedGridCount1)[4]);
        }
    };

    public async openRiskModal(lockUnlockNumber: number, rislCellNumber: number) {
        const riskName: string = await gridElements.newGridLockedColumnRowCellsWithContent(0).get(rislCellNumber).getText();
        await modal.openModalWithLinkName(riskName);
        await expect(await modal.modalTitle.getText()).toEqual('Life Cycle Risk Scores: ' + riskName);
        await modal.closeModalWithButton(buttonNames.okayThanks);
        await modal.openModalWithLinkName(riskName);
        await modal.closeModalWithXButton();
    };

    public async returnColumnNumberByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<number> {
        await w.waitUntilElementIsClickable(gridElements.columnHeaderNamesLockUnlock.first());
        let headerText: string = await gridElements.columnHeaderNamesLockUnlock.getText();
        for (let i: number = 0; i < headerText.length; i++) {
            if (headerText[i] === columnHeaderName) {
                return i
            }
        }
    };

    //for new grid
    public async newGridReturnGroupLabelColumnNumberByName(columnHeaderName: string): Promise<number> {
        let headerText: string = await gridElements.newGridColumnHeadersGroup.getText();
        for (let i: number = 0; i < headerText.length; i++) {
            if (headerText[i] === columnHeaderName) {
                return i
            }
        }
    };


    //for new grid
    public async newGridReturnColumnNumberByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<number> {
        let headerText: string[];
        if (lockUnlockNumber === 0) {
            await w.waitUntilElementIsDisplayed(gridElements.newGridLockedColumnHeaders.last());
            await w.waitUntilElementIsClickable(gridElements.newGridLockedColumnHeaders.last());
            await w.waitUntilWorkingModalNotDisplayed();
            headerText = await gridElements.newGridLockedColumnHeaders.getText();
        }
        else {
            await w.waitUntilElementIsDisplayed(gridElements.newGridUnlockedColumnHeaders.get(0));
            await w.waitUntilElementIsClickable(gridElements.newGridUnlockedColumnHeaders.get(0));
            await w.waitUntilWorkingModalNotDisplayed();
            headerText = await gridElements.newGridUnlockedColumnHeaders.getText();
        }
        for (let i: number = 0; i < headerText.length; i++) {
            if (headerText[i] === columnHeaderName) {
                return i
            }
        }
    };

    //for new grid
    public async newGridReturnColumnNumberInModalByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<number> {
        let headerText: string[];
        if (lockUnlockNumber === 0) {
            await w.waitUntilElementIsDisplayed(gridElements.newGridModalLockedColumnHeaders.last());
            await w.waitUntilElementIsClickable(gridElements.newGridModalLockedColumnHeaders.last());
            headerText = await gridElements.newGridModalLockedColumnHeaders.getText();
        }
        else {
            await w.waitUntilElementIsDisplayed(gridElements.newGridModalUnlockedColumnHeaders.get(0));
            await w.waitUntilElementIsClickable(gridElements.newGridModalUnlockedColumnHeaders.get(0));
            headerText = await gridElements.newGridModalUnlockedColumnHeaders.getText();
        }
        for (let i: number = 0; i < headerText.length; i++) {
            if (headerText[i] === columnHeaderName) {
                return i
            }
        }
    };

    public async newGridReturnColumnNumberInSliderByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<number> {
        let headerText: string[];
        if (lockUnlockNumber === 0) {
            await w.waitUntilElementIsDisplayed(gridElements.newGridInSliderLockedColumnHeaders.last());
            await w.waitUntilElementIsClickable(gridElements.newGridInSliderLockedColumnHeaders.last());
            headerText = await gridElements.newGridInSliderLockedColumnHeaders.getText();
        }
        else {
            await w.waitUntilElementIsDisplayed(gridElements.newGridInSliderUnlockedColumnHeaders.get(0));
            await w.waitUntilElementIsClickable(gridElements.newGridInSliderUnlockedColumnHeaders.get(0));
            headerText = await gridElements.newGridInSliderUnlockedColumnHeaders.getText();
        }
        for (let i:number = 0; i < headerText.length; i++) {
            if (headerText[i] === columnHeaderName) {
                return i
            }
        }
    };

    //for new grid
    public async newGridReturnCellValuesByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<string[]> {
        let resArr: string[] = [];
        await allureStep('return array of cell value by column name', async () => {
            const colNumber: number = await this.newGridReturnColumnNumberByColumnName(lockUnlockNumber, columnHeaderName);
            let cellInARow: number;
            let allCells: string[];
            if (lockUnlockNumber === 0) {
                await browser.sleep(3000);
                await w.waitUntilWorkingModalNotDisplayed();
                // await w.waitUntilElementIsDisplayed(await gridElements.newGridCheckboxSelectorByIndex(0));
                cellInARow = await gridElements.newGridLockedColumnRowCellsWithContent(0).count();
                allCells = await gridElements.newGridLockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await gridElements.newGridLockedColumnRowCellsWithContent((i - colNumber) / cellInARow).get(colNumber).getText());
                }
            }
            else {
                await browser.sleep(3000);
                await w.waitUntilWorkingModalNotDisplayed();
                cellInARow = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).count();
                allCells = await gridElements.newGridUnlockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await gridElements.newGridUnlockedColumnRowCellsWithContent((i - colNumber) / cellInARow).get(colNumber).getText());
                }
            }
        });
        return resArr;
    };

    public async newGridReturnCellValuesByColumnNameBOMTree(lockUnlockNumber: number, columnHeaderName: string): Promise<string[]> {
        let resArr: string[] = [];
        await allureStep('return array of cell value by column name in BOM Tree', async () => {
            const colNumber: number = await this.newGridReturnColumnNumberByColumnName(lockUnlockNumber, columnHeaderName);
            let cellInARow: number;
            let allCells: string[];
            if (lockUnlockNumber === 0) {
                await browser.sleep(3000);
                await w.waitUntilWorkingModalNotDisplayed();
                cellInARow = await gridElements.newGridLockedColumnRowCellsWithContent(0).count();
                allCells = await gridElements.newGridLockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await gridElements.newGridLockedColumnRowCellsWithContent((i - colNumber) / cellInARow).get(colNumber-1).getText());
                }
            }
            else {
                await browser.sleep(3000);
                await w.waitUntilWorkingModalNotDisplayed();
                cellInARow = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).count();
                allCells = await gridElements.newGridUnlockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await gridElements.newGridUnlockedColumnRowCellsWithContent((i - colNumber) / cellInARow).get(colNumber-1).getText());
                }
            }
        });
        return resArr;
    };

    public async newGridReturnColumnNumberById(id: string, lockUnlockNumber: number = 1): Promise<number> {
        let columnNumber: number;
        await allureStep(`return column number by id ${id}`, async() => {
            let headerText: string[];
            if (lockUnlockNumber === 0) {
                await w.waitUntilElementIsDisplayed(gridElements.lockedHeadersForId.last());
                await w.waitUntilElementIsClickable(gridElements.lockedHeadersForId.last());
                headerText = await gridElements.lockedHeadersForId.getAttribute('col-id');
            }
            else {
                await w.waitUntilElementIsDisplayed(gridElements.unlockedHeadersForId.get(0));
                await w.waitUntilElementIsClickable(gridElements.unlockedHeadersForId.get(0));
                headerText = await gridElements.unlockedHeadersForId.getAttribute('col-id');
            }
            for (let i = 0; i < headerText.length; i++) {
                if (headerText[i] === id) {
                    columnNumber = i;
                    break
                }
            }
        });
        return columnNumber;
    };

    public async getCellValuesByCellId(id: string, lockUnlockNumber: number = 1): Promise<string[]> {
        let resArr: string[] = [];
        await allureStep(`return cell values by id ${id}`, async() => {
            await w.waitUntilElementIsClickable(gridElements.newGridRows.last());
            const colNumber: number = await this.newGridReturnColumnNumberById(id, lockUnlockNumber);
            let cellInARow: number;
            let allCells: string[];
            if (lockUnlockNumber === 0) {
                cellInARow = await gridElements.newGridLockedColumnRowCellsWithContent(0).count();
                allCells = await gridElements.newGridLockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await gridElements.newGridLockedCellByRowIndexAndColumnId((i - colNumber) / cellInARow, id).getText());
                }
            }
            else {
                cellInARow = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).count();
                allCells = await gridElements.newGridUnlockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await gridElements.newGridUnlockedCellByRowIndexAndColumnId((i - colNumber) / cellInARow, id).getText());
                }
            }
        });
        return resArr;
    };

    public async getCellValuesByCellIdForBOMTreeParts(id: string, lockUnlockNumber: number = 1): Promise<string[]> {
        let resArr: string[] = [];
        await allureStep(`return cell values by id ${id}`, async() => {
            await w.waitUntilElementIsClickable(gridElements.newGridRows.last());
            const colNumber: number = await this.newGridReturnColumnNumberById(id, lockUnlockNumber);
            let cellInARow: number;
            let allCells: string[];
            if (lockUnlockNumber === 0) {
                cellInARow = await gridElements.newGridLockedColumnRowCellsWithContent(0).count();
                allCells = await gridElements.newGridLockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await gridElements.newGridLockedCellByRowIndexAndColumnIdForBomTreeParts((i - colNumber) / cellInARow, id).getText());
                }
            }
            else {
                cellInARow = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).count();
                allCells = await gridElements.newGridUnlockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await gridElements.newGridUnlockedCellByRowIndexAndColumnIdForBomTreeParts((i - colNumber) / cellInARow, id).getText());
                }
            }
        });
        return resArr;
    };

    //for new grid
    public async newGridReturnCellValuesInModalByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<string[]> {
        const colNumber: number = await this.newGridReturnColumnNumberInModalByColumnName(lockUnlockNumber, columnHeaderName);
        let cellInARow: number;
        let allCells: string[];
        let resArr: string[] = [];
        //await gridElements.newGridRows
        if (lockUnlockNumber === 0) {
            await w.waitUntilWorkingModalNotDisplayed();
            cellInARow = await gridElements.newGridModalLockedColumnRowCellsWithContent(0).count();
            allCells = await gridElements.newGridInModalLockedColumnCellsWithContent.getText();
            for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                resArr.push(await gridElements.newGridModalLockedColumnRowCellsWithContent((i - colNumber) / cellInARow).get(colNumber).getText());
            }
        }
        else {
            await w.waitUntilWorkingModalNotDisplayed();
            cellInARow = await gridElements.newGridModalUnlockedColumnRowCellsWithContent(0).count();
            allCells = await gridElements.newGridInModalUnlockedColumnCellsWithContent.getText();
            for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                resArr.push(await gridElements.newGridModalUnlockedColumnRowCellsWithContent((i - colNumber) / cellInARow).get(colNumber).getText());
            }
        }
        return resArr
    };

    public async newGridReturnCellValuesInSliderByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<string[]> {
        let resArr: string[] = [];
        await allureStep(`return cell values in ${columnHeaderName}`, async() => {
            const colNumber: number = await this.newGridReturnColumnNumberInSliderByColumnName(lockUnlockNumber, columnHeaderName);
            let cellInARow: number;
            let allCells: string[];

            if (lockUnlockNumber === 0) {
                cellInARow = await gridElements.newGridSliderLockedColumnRowCellsWithContent(0).count();
                allCells = await gridElements.newGridSliderLockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await gridElements.newGridSliderLockedColumnRowCellsWithContent((i - colNumber) / cellInARow).get(colNumber).getText());
                }
            }
            else {
                cellInARow = await gridElements.newGridSliderUnlockedColumnRowCellsWithContent(0).count();
                allCells = await gridElements.newGridSliderUnlockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await gridElements.newGridSliderUnlockedColumnRowCellsWithContent((i - colNumber) / cellInARow).get(colNumber).getText());
                }
            }
        });
        return resArr
    };

    public async mechanismCheckCheckboxByNameInSlider(columnHeaderName: string, name: string) {
        await allureStep(`check checkbox by ${name} in ${columnHeaderName} in slider`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.sleep(1000);
            const headerNames: string[] = await this.newGridReturnCellValuesInSliderByColumnName(1 ,columnHeaderName);
            for(let i: number = 0; i < headerNames.length; i++) {
                if(headerNames[i] === name) {
                    await this.newMechanismSliderCheckboxRangeChecking(i, i + 1);
                }
            }
        });
    };

    public async mechanismCheckCheckboxByName(columnHeaderName: string, name: string, lockUnlockNumber: number = 1) {
        await allureStep(`check checkbox by ${name} in ${columnHeaderName} new grid`, async () => {
            const headerNames: string[] = await this.newGridReturnCellValuesByColumnName(lockUnlockNumber ,columnHeaderName);
            for(let i: number = 0; i < headerNames.length; i++) {
                if(headerNames[i] === name) {
                    await this.newMechanismCheckboxRangeChecking(i, i + 1);
                    break;
                }
            }
        });
    };

    public async mechanismCheckCheckboxWithAmountGreaterThan(columnHeaderName: string, number: number, lockUnlockNumber: number = 1) {
        await allureStep(`check checkbox with more than ${number} amount in ${columnHeaderName} new grid`, async () => {
            const amount: string[] = await this.newGridReturnCellValuesByColumnName(lockUnlockNumber ,columnHeaderName);
            for(let i: number = 0; i < amount.length; i++) {
                amount[i] = amount[i].replace(/,/g,"");
            }
            for(let i: number = 0; i < amount.length; i++) {
                if(+amount[i] >= number) {
                    await this.newMechanismCheckboxRangeChecking(i, i + 1);
                    break
                }
            }
        });
    };

    //for new grid
    public async newGridCheckSortingIconPresentInColumnHeaderByColumnName(sortingType: string, lockUnlockColumn: number,
                                                                          columnHeaderName: string, option: boolean) {
        let colNumber: number = await this.newGridReturnColumnNumberByColumnName(lockUnlockColumn, columnHeaderName);
        if (lockUnlockColumn === 1) {
            colNumber = colNumber + await gridElements.newGridLockedColumnHeaders.count();
        }
        if (sortingType === 'DESC') {
            if (option === true) {
                await expect(await gridElements.newGridDescSortingHeaderIconByName(colNumber).isPresent()).toBeTruthy();
            }
            else {
                await expect(await gridElements.newGridDescSortingHeaderIconByName(colNumber).isPresent()).toBeFalsy();
            }
        }
        else {
            if (option === true) {
                await expect(await gridElements.newGridAcsSortingHeaderIconByName(colNumber).isPresent()).toBeTruthy();
            }
            else {
                await expect(await gridElements.newGridAcsSortingHeaderIconByName(colNumber).isPresent()).toBeFalsy();
            }
        }
    };

    //for new grid
    public async newGridCheckFilterIconPresentInColumnHeaderByColumnName(lockUnlockColumn: number, columnHeaderName: string,
                                                                         option: boolean) {
        await w.waitUntilWorkingModalNotDisplayed();
        let colNumber: number = await this.newGridReturnColumnNumberByColumnName(lockUnlockColumn, columnHeaderName);
        if (lockUnlockColumn === 1) {
            colNumber = colNumber + await gridElements.newGridLockedColumnHeaders.count();
        }
        if (option === true) {
            await expect(await gridElements.newGridFilterHeaderIconByName(colNumber).isPresent()).toBeTruthy();
        }
        else {
            await expect(await gridElements.newGridFilterHeaderIconByName(colNumber).isPresent()).toBeFalsy();
        }
    };

    //for new grid
    public async newGridCheckIconPresentInColumnByColumnName(lockUnlockColumn: number, columnHeaderName: string) {
        const colNumber: number = await this.newGridReturnColumnNumberByColumnName(lockUnlockColumn, columnHeaderName);
        let cellInARow: number;
        let allCells: number;
        if (lockUnlockColumn === 0) {
            cellInARow = await gridElements.newGridLockedColumnRowCellsWithContent(0).count();
            allCells = await gridElements.newGridLockedColumnCellsWithContent.count();
            for (let i: number = colNumber; i < allCells; i = i + cellInARow) {
                await expect(await gridElements.newGridLockedColumnCellsWithImgByCellNumber(i).isPresent()).toBeTruthy();
            }
        }
        else {
            cellInARow = await gridElements.newGridUnlockedColumnRowCellsWithContent(0).count();
            allCells = await gridElements.newGridUnlockedColumnCellsWithContent.count();
            for (let i: number = colNumber; i < allCells; i = i + cellInARow) {
                await expect(await gridElements.newGridUnlockedColumnCellsWithImgByCellNumber(i).isPresent()).toBeTruthy();
            }
        }
    };

    //for new grid
    public async clickOnCellLinkAndWaitForElement(lockUnlockColumn: number, rowNumber: number, cellNumber: number,
                                                  waitElement: ElementFinder) {
        await allureStep('Click on the cell link in the grid', async () => {
            if (lockUnlockColumn === 0) {
                await w.waitUntilWorkingModalNotDisplayed();
                await gridElements.newGridLockedColumnLinksByRowAndCellNumbers(rowNumber, cellNumber).click();
                await w.waitUntilElementIsDisplayed(waitElement);
                await w.waitUntilElementIsClickable(waitElement);
            }
            else {
                await w.waitUntilWorkingModalNotDisplayed();
                await gridElements.newGridUnlockedColumnLinksByRowAndCellNumbers(rowNumber, cellNumber).click();
                await w.waitUntilElementIsDisplayed(waitElement);
                await w.waitUntilElementIsClickable(waitElement);
            }
        })
    };

    public async replaceNumberValues(values: string[]): Promise<string[]> {
        let resArr: string[] = [];

        for (let i: number = 0; i < values.length; i++) {
            resArr.push(values[i].replace(/,/g, ''));
        }
        return resArr
    };

    public async compareAscValues(values: string[]): Promise<string[]> {
        values.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        return values;
    };

    public async compareDescValues(values: string[]): Promise<string[]> {
        values.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
        return values;
    };

    public async compareAscNumberValues(values: string[]): Promise<string[]> {
        // values.sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}));
        function ascSort(a, b) {
            return a - b;
        }

        values.sort(ascSort);
        return values;
    };

    public async compareDescNumberValues(values: string[]): Promise<string[]> {
        // values.sort((a, b) => b.localeCompare(a, undefined, {numeric: true, sensitivity: 'base'}));
        function descSort(a, b) {
            return b - a;
        }

        values.sort(descSort);
        return values;
    };

    public async returnRowNumberByFirstLinkInCell(lockUnlockColumn: number, cellNumber: number): Promise<number> {
        const rowNumber: number = await gridElements.newGridRows.count();
        for (let i: number = 0; i < rowNumber; i++) {
            if (lockUnlockColumn === 0) {
                if (await gridElements.newGridLockedColumnLinksByRowAndCellNumbers(i, cellNumber).isPresent()) {
                    return i
                }
            }
            else {
                if (await gridElements.newGridUnlockedColumnLinksByRowAndCellNumbers(i, cellNumber).isPresent()) {
                    return i
                }
            }
        }
    };

    public async returnRowNumberByLinkName(lockUnlockColumn: number, columnHeaderName: string, linkName: string): Promise<number> {
        const cellValues: string[] = await this.newGridReturnCellValuesByColumnName(lockUnlockColumn, columnHeaderName);
        for (let i: number = 0; i < cellValues.length; i++) {
            if (await cellValues[i] === linkName) {
                return i
            }
        }
    };

    public async returnCellValuesByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<string[]> {
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(1000);
        const colNumber: number = await this.returnColumnNumberByColumnName(lockUnlockNumber, columnHeaderName);
        // const cellInARow: number = await gridElements.rowCellsWithContentNewGrid(lockUnlockNumber, 0).count();
        // const allCells: string[] = await gridElements.newGridUnlockedColumnCellsWithContent.getText();
        const rowsAmount: number = await gridElements.newGridRows.count();
        let resArr: string[] = [];
        for (let i: number = 0; i < rowsAmount; i++) {
            resArr.push(await gridElements.cellByRowAndColumnNumber(i, colNumber).getText());
        }
        return resArr;
    };

    public async returnCellAttributesByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<any []> {
        const colNumber: number = await this.returnColumnNumberByColumnName(lockUnlockNumber, columnHeaderName);
        const cellsInARow: number = await gridElements.rowCellsWithContent(lockUnlockNumber, 0).count();
        const allCells: number = await gridElements.cellsWithContent(lockUnlockNumber).count();
        let cellAttributesArray: any = [];
        for (let i: number = colNumber - 1; i < allCells; i += cellsInARow) {
            cellAttributesArray.push(await gridElements.cellsWithContent(lockUnlockNumber).get(i).getText());
        }
        return cellAttributesArray;
    };

    public async returnHeadersOfColumnsAvailableForSorting() {
        const headerNamesNumber: number = await gridElements.columnHeaderNames.count();
        let headerNamesArray: any = [];
        for (let i: number = 0; i < headerNamesNumber; i++) {
            if (await gridElements.columnHeaderArrowDown.get(i).isDisplayed()) {
                await gridElements.columnHeaderNames.get(i).click();
                await w.waitUntilElementIsClickable(gridElements.sortingBox);
            }
            if (await gridElements.filterThisColumnByInput.isPresent()) {
                let placeholderText = await gridElements.filterThisColumnByInput.getAttribute('placeholder');
                if (placeholderText === 'Filter this column by...') {
                    headerNamesArray.push(await gridElements.columnHeaderNames.get(i).getText())
                }
            }
            await this.newGridCloseFilterBoxIfPresent();
        }
        return headerNamesArray;
    };

    public async openSortingBoxByName(name: string) {
        await allureStep('Open sorting box', async () => {
            await button.clickOnTheElement(gridElements.sortingHeader(name));
            await w.waitUntilElementIsDisplayed(gridElements.sortingBox)
        });
    };

    //for new grid
    public async newGridCloseFilterBoxIfPresent() {
        await allureStep('Close column filter box', async () => {
            if (await gridElements.newGridOpenSortBox.isPresent()) {
                await gridElements.newGridCloseHeaderSort.click();
                await w.waitUntilElementNotDisplayed(gridElements.newGridCloseHeaderSort);
            }
        });
    };

    //for new grid
    public async newGridFilteringExactColumnByOption(columnHeaderName: string, sortOption: string) {
        await allureStep('Filtering ' + columnHeaderName + ' column by' + sortOption + 'option', async () => {
            await this.newGridOpenFilterBoxByName(columnHeaderName);
            await w.waitUntilElementIsDisplayed(gridElements.newGridOpenSortBoxSearchField);
            await w.waitUntilElementIsClickable(gridElements.newGridOpenSortBoxSearchField);
            await w.waitUntilElementIsClickable(gridElements.columnsSort.checkboxLabels.get(0));
            if (!(await gridElements.newGridOpenSortBoxFilterOptionByName(sortOption).isPresent())) {
                const numberOfSortingOptions: number = await gridElements.columnsSort.checkboxLabels.count();
                await JsScripts.scrollToElementByCssAndNumber('.ag-set-filter-item-checkbox', numberOfSortingOptions - 1);
                if (!(await gridElements.newGridOpenSortBoxFilterOptionByName(sortOption).isPresent())) {
                    const numberOfSortingOptions: number = await gridElements.columnsSort.checkboxLabels.count();
                    await JsScripts.scrollToElementByCssAndNumber('.ag-set-filter-item-checkbox', numberOfSortingOptions - 1);
                }
            }
            await button.clickOnTheElement(gridElements.newGridOpenSortBoxFilterOptionByName(sortOption));
            await button.clickByButtonName(buttonNames.applyFilter);
            await w.waitUntilElementIsDisplayed(gridElements.newGridRows.get(0));
            await w.waitUntilElementIsClickable(gridElements.newGridRows.get(0));
            await this.newGridCloseFilterBoxIfPresent();
        });
    };

    public async newGridFilterValueColumnByOption(columnHeaderName: string, filterOptionIndex: number, filterText:string) {
        await allureStep('Filtering ' + columnHeaderName + ' column by' + columnHeaders.bom.filterOptions[filterOptionIndex] + 'option with text '+ filterText, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.newGridOpenFilterBoxByName(columnHeaderName);
            await Dropdown.openDropdownByClickOnElementInSortBox(gridElements.columnsSort.dropdown);
            await Dropdown.selectValueInDropdownByValueNameWithoutWait(columnHeaders.bom.filterOptions[filterOptionIndex]);
            await Actions.clearInputWithDelete(gridElements.columnsSort.input);
            await Actions.sendKeys(gridElements.columnsSort.input, filterText);
            await this.peformSearchInColumnSort(gridElements.newGridRows.get(0));
            await this.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1, columnHeaderName,
                true);
        });
    };
    //for new grid
    public async newGridClearExactColumnFilter(columnHeaderName: string) {
        await allureStep('Clear ' + columnHeaderName + ' column filter', async () => {
            await this.newGridOpenFilterBoxByName(columnHeaderName);
            await w.waitUntilElementIsDisplayed(gridElements.newGridOpenSortBoxSearchField);
            await w.waitUntilElementIsClickable(gridElements.newGridOpenSortBoxSearchField);
            await button.clickByButtonName(buttonNames.clearFilter);
            const optionsCount = await gridElements.newGridOpenSortBoxFilterOptions.count();
            for (let i: number = 0; i < optionsCount; i++) {
                await expect(await elementAttributes.getElementAttribute(gridElements.newGridOpenSortBoxFilterOptions.get(i), 'class'))
                    .toContain('checked');
            }
            await button.clickByButtonName(buttonNames.clearFilter);
            await w.waitUntilElementIsDisplayed(gridElements.newGridRows.get(0));
            await w.waitUntilElementIsClickable(gridElements.newGridRows.get(0));
            await this.newGridCloseFilterBoxIfPresent();
            await this.newGridOpenFilterBoxByName(columnHeaderName);
            for (let i: number = 0; i < optionsCount; i++) {
                await expect(await elementAttributes.getElementAttribute(gridElements.newGridOpenSortBoxFilterOptions.get(i), 'class'))
                    .toContain('checked');
            }
        });
    };

    public async newGridFilterColumnCheck(columnHeaderName: string, sortOption: string, state: boolean) {
        await this.newGridOpenFilterBoxByName(columnHeaderName);
        await w.waitUntilElementIsDisplayed(gridElements.newGridOpenSortBoxSearchField);
        await w.waitUntilElementIsClickable(gridElements.newGridOpenSortBoxSearchField);
        if (!(await gridElements.newGridOpenSortBoxFilterOptionByName(sortOption).isPresent())) {
            const numberOfSortingOptions: number = await gridElements.columnsSort.checkboxLabels.count();
            await JsScripts.scrollToElementByCssAndNumber('.ag-filter-value', numberOfSortingOptions - 1);
            if (!(await gridElements.newGridOpenSortBoxFilterOptionByName(sortOption).isPresent())) {
                const numberOfSortingOptions: number = await gridElements.columnsSort.checkboxLabels.count();
                await JsScripts.scrollToElementByCssAndNumber('.ag-filter-value', numberOfSortingOptions - 1);
            }
        }
        await expect(await gridElements.newGridOpenSortBoxFilterOptionByName(sortOption).isSelected() == state);
        await this.newGridCloseFilterBoxIfPresent();
    };

    public async selectRowByCellNameAndColumnNumber(cellName: string, columnNumber: number, gridNumber: number) {
        const rowNumber: number = await gridElements.gridRows.count();
        for (let i: number = 0; i < rowNumber; i++) {
            if (await gridElements.rowCellsWithContent(gridNumber, i).get(columnNumber).getText() === cellName) {
                await this.checkCheckboxRange(i, i + 1);
                break
            }
        }
    };

    public async newGridSelectRowWithMatchValue(lockedUnlockedGrid: number, columnHeaderName: string, cellName: string) {
        const cellValues: string[] = await this.newGridReturnCellValuesByColumnName(lockedUnlockedGrid, columnHeaderName);
        for (let i: number = 0; i < cellValues.length; i++) {
            if (await cellValues[i] === cellName) {
                await this.newMechanismCheckboxRangeChecking(i, i + 1);
                break
            }
        }
    };

    public async newGridSelectRawWithNotMatchValue(lockedUnlockedGrid: number, columnHeaderName: string, cellName: string) {
        const cellValues: string[] = await this.newGridReturnCellValuesByColumnName(lockedUnlockedGrid, columnHeaderName);
        for (let i: number = 0; i < cellValues.length; i++) {
            if (await cellValues[i] !== cellName) {
                await this.newMechanismCheckboxRangeChecking(i, i + 1);
                break
            }
        }
    };

    public async changeGridWithLeftNavOptionByName(leftNavItemName: string, waitElement: ElementFinder) {
        await Actions.click(await commonElements.leftNavOptionByName(leftNavItemName));
        await w.waitUntilElementIsDisplayed(waitElement);
        await w.waitUntilElementIsClickable(waitElement);
    };

    // for date picker

    public async changeDateWithMomentJsInMilliseconds(amount: any, unit: string, h: number, m: number, s: number, ms: number ) {
        let lastPeriod: any;
        await allureStep('change date with help of Moment Js and get milliseconds', async () => {
            lastPeriod = await moment().subtract(amount, unit).hours(h).minutes(m).seconds(s).milliseconds(ms).valueOf();
        });
        return lastPeriod;
    };

    public async openDatePickerSelectDate(dateFromTo: any, dateYear: any, dateMonth: any, dateDate: any) {
        await allureStep('open date picker From/To and select dates', async () => {

            await dateFromTo.click();
            await dateRange.selectYearButton.click();
            await dateRange.selectYearDropdown(dateYear).click();
            await dateRange.selectMonthButton.click();
            await dateRange.selectMonthDropdown(dateMonth).click();
            const date = await dateRange.selectDay.getText();
            for (let i: number = 0; i < date.length; i++) {
                 if (date[i]==dateDate) {
                     (await dateRange.selectDay.get(i)).click(); // tring fix tests
                     // await JsScripts.clickByCssAndNumber('div.btn-light.ng-star-inserted:not(.text-muted)',i)
                }
            }
        });
    };

    public async checkIfOnlyAllowedDataIsInValues(data: string [], allowedValues: string []) {
        let result: boolean;
        for (let i: number = 0; i < data.length; i++) {
            if (allowedValues.indexOf(data[i]) !== -1) {
            } else {
                console.log(data[i] + ' is not in ' + allowedValues);
                result = false;
                return result;
            }
        }
            result = true;
            return result;
    }

    public async verifyCEYTOELValueInResultPage() {
        await allureStep(`verify the CEYTEOL available in grid is calculated properly`, async() => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(gridElements.newGridRows.last());
            await browser.sleep(1000);
            let EYTEOL:string[] = await this.newGridReturnCellValuesByColumnName(1,'Estimated YTEOL');
            let CEYTEOL:string[] = await this.newGridReturnCellValuesByColumnName(1,'CEYTEOL');
            let AlertPrediction:string[] = await this.newGridReturnCellValuesByColumnName(1,'Alert/Prediction Date');
            let APDate = new Date(AlertPrediction[0]);
            let today = new Date();

            let calculatedDate:number =  Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(APDate.getFullYear(), APDate.getMonth(), APDate.getDate()) ) /(1000 * 60 * 60 * 24));
            let calculatedCEYTEOL:number =  parseInt(EYTEOL[0])-(calculatedDate/365);

            expect(parseFloat(CEYTEOL[0])).toEqual(parseFloat(calculatedCEYTEOL.toFixed(1)));

        });
    };


}

export class Transpose extends  Grid {

    public async transposeReturnColumnNumberByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<number> {
        let columnNumber: number;
        await allureStep(`return number of column ${columnHeaderName}`, async ()=> {
            let headerText: string[];
            if (lockUnlockNumber === 0) {
                await w.waitUntilElementIsDisplayed(transposeElements.lockColumn.get(0));
                await w.waitUntilElementIsClickable(transposeElements.lockColumn.get(0));
                headerText = await transposeElements.lockColumn.getText();
            }
            else {
                await w.waitUntilElementIsDisplayed(transposeElements.unlockColumn.get(0));
                await w.waitUntilElementIsClickable(transposeElements.unlockColumn.get(0));
                headerText = await transposeElements.unlockColumn.getText();
            }
            for (let i = 0; i < headerText.length; i++) {
                if (headerText[i] === columnHeaderName) {
                    columnNumber = i;
                    return i;
                }
            }
        });
        return columnNumber;
    };

    public async transposeReturnCellValuesByColumnName(lockUnlockNumber: number, columnHeaderName: string): Promise<string[]> {
        let resArr: string[] = [];
        await allureStep(`return array with values in column ${columnHeaderName}`, async () => {
            //need for stability
            await browser.sleep(2000);
            const colNumber: number = await this.transposeReturnColumnNumberByColumnName(lockUnlockNumber, columnHeaderName);
            let cellInARow: number;
            let allCells: string[];
            if (lockUnlockNumber === 0) {
                // await w.waitUntilElementIsClickable(transposeElements.lockedColumnRowCellsWithContentByRowNumber(0).get(0));
                cellInARow = await transposeElements.lockedColumnRowCellsWithContentByRowNumber(0).count();
                allCells = await transposeElements.lockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await transposeElements.lockedColumnRowCellsWithContentByRowNumber((i - colNumber) / cellInARow)
                        .get(colNumber).getText());
                }
            }
            else {
                // await w.waitUntilElementIsClickable(transposeElements.unlockedColumnRowCellsWithContentByRowNumber(0).get(0));
                cellInARow = await transposeElements.unlockedColumnRowCellsWithContentByRowNumber(0).count();
                allCells = await transposeElements.unlockedColumnCellsWithContent.getText();
                for (let i: number = colNumber; i < allCells.length; i = i + cellInARow) {
                    resArr.push(await transposeElements.unlockedColumnRowCellsWithContentByRowNumber((i - colNumber) / cellInARow)
                        .get(colNumber).getText());
                }
            }
        });
        return resArr.filter(item => {
            return item.length>1
        });
    };

    public async checkingArrayContainSecondArray(firstArray: string[], secondArray: string[]) {
        await allureStep( `check that one ${firstArray} equals ${secondArray}`, async () =>{
            if (firstArray.length >= secondArray.length) {
                for (let i = 0; i < secondArray.length; i++) {
                    await expect(firstArray[i]).toEqual(secondArray[i]);
                }
            } else {
                for (let i = 0; i < firstArray.length - 1; i++) {
                    await expect(secondArray[i]).toEqual(firstArray[i]);
                }
            }
        });
    }

    public async transposeCheckboxRangeChecking(startCheckbox: number, endCheckbox: number) {
        await allureStep(`click ${startCheckbox} checkbox in transpose header`, async () =>{
            for (let i: number = startCheckbox; i < endCheckbox; i++) {
                await w.waitUntilElementIsClickable(transposeElements.headerCheckbox.get(i));
                await transposeElements.allheaderCheckbox.get(i).click()
            }
        });
    };

    public async switchToTransposeGrid() {
        await allureStep(`switch to transpose grid`, async() => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(toolbarElements.transposeButton);
            await w.waitUntilWorkingModalNotDisplayed();
            await browser.sleep(1500);
            await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.headerCheckbox.get(0));
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
            await w.waitUntilElementIsDisplayed(gridElements.currentPaginationValue.get(0));
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async switchToNewGrid() {
        await allureStep(`switch to new grid`, async() => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(transposeElements.buttonTooltip);
            await w.waitUntilWorkingModalNotDisplayed();
            await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(gridElements.selectAllCheckbox);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(gridElements.itemsCountInGrid);
            await w.waitUntilElementIsDisplayed(gridElements.currentPaginationValue.get(0));
        });
    };
}