import {allureStep} from "../helper/allure/allureSteps";
import {Button} from "./simple/button";
import {browser} from "protractor";
import {buttonNames} from "../testData/global";
import {by, ElementArrayFinder, ElementFinder, element} from "protractor";
import {commonElements, dropdownElements, gridElements, toolbarElements} from "../elements/elements";
import {Dropdown} from "./dropdown";
import {Grid} from "./grid";
import {Modal} from "./modal";
import {Waiters as w} from "../helper/waiters";
import {Link} from "./simple/link";

const button: Button = new Button();
const grid: Grid = new Grid();
const modal: Modal = new Modal();
const link: Link = new Link();

export class Toolbar {

    unhideButton: ElementFinder;
    simpleFilterButton: any;
    layoutButton: any;
    tagLabel: any;
    filterText: any;
    columnFilterArrow: any;
    headerForIcon: any;
    headerTitle: any;
    columnFiltersLink: any;
    filteringText: any;
    upSortArrow: string;
    downSortArrow: string;
    filterByType: ElementFinder;
    filterByOwner: any;
    filterCategories: any;
    filterByDate: ElementFinder;
    filterTextHardcode: ElementFinder;
    tagName: any;
    modalArrowToolbar: ElementArrayFinder;
    clearAllLink;
    filterXButton;
    openSliderToolbarList: ElementArrayFinder;
    arrowButtom: ElementArrayFinder;

    constructor() {
        this.arrowButtom = element.all(by.css('.toolbar-button.arrow'));
        this.unhideButton = element(by.cssContainingText('.toolbar-button-text', buttonNames.unhide));
        this.simpleFilterButton = element(by.cssContainingText('.toolbar-button-title', buttonNames.filter));
        this.filterCategories = element(by.cssContainingText('.toolbar-button-title', buttonNames.filterCategories));
        this.filterByDate = element(by.cssContainingText('.toolbar-button-title', buttonNames.filterByDate));
        this.layoutButton = element(by.cssContainingText('.toolbar-button-title', buttonNames.layout));
        this.filterByType = element(by.cssContainingText('.toolbar-button-title', buttonNames.filterByType));
        this.filterByOwner = element(by.cssContainingText('.toolbar-button-title', buttonNames.filterByOwner));
        this.tagLabel = element.all(by.css('.toolbar-info-list>span'));
        this.tagName = element.all(by.css('.toolbar-info-list>.panel-title'));
        this.filterText = '';
        this.columnFilterArrow = element.all(by.css('.arrowDown.header-right-icon'));
        this.headerForIcon = element(by.css('.ihsGridHeaderHeader>span:not(.arrowUp)'));
        this.headerTitle = element.all(by.css('.header-title'));
        this.columnFiltersLink = element(by.linkText('Column Filters'));
        this.filteringText = element(by.css('.filter-info'));
        this.filterTextHardcode = element(by.css('.toolbar-info-panel .filters-prefix'));
        this.clearAllLink = element(by.css('.toolbar-clear-all>a'));
        this.filterXButton = element.all(by.css('.svg-icon-x')).last();
        this.modalArrowToolbar = element.all(by.css('.modal-body .toolbar-button.arrow.default'));
        this.upSortArrow = ' ↑(1)';
        this.downSortArrow = ' ↓(1)';
        this.openSliderToolbarList = element.all(by.css('.open .open .toolbar-list-btn'))
    };

    public returnToolbarButton(buttonName: string) {
        const toolbarButton: ElementFinder = element.all(by.cssContainingText('.toolbar-button-text, .toolbar-button-title, .toolbar-button, input.toolbar-list-btn', buttonName)).get(0);
        return toolbarButton
    };

    public returnToolbarButtonByValue(buttonName: string) {
        const toolbarButton: ElementFinder = element(by.css(`.toolbar-button[value='${buttonName}']`));
        return toolbarButton
    };

    public returnToolbarDropdownOption(optionName: string) {
        const toolbarOption: ElementFinder = element(by.css(`input.toolbar-list-btn[value="${optionName}"]`));
        return toolbarOption
    };

    public returnToolbarDropdownOptionAndIndex(optionName: string, num: number) {
        const toolbarOption: ElementFinder = element.all(by.css(`input.toolbar-list-btn[value="${optionName}"]`)).get(num);
        return toolbarOption
    };

    public async openToolbarDropdownByButtonName(buttonName: string, num:number = 0) {
        await allureStep('Open toolbar dropdown by clicking on ' + buttonName, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            // if(buttonName == buttonNames.modify){
            //     await w.waitUntilElementIsClickable(element(by.css('[buttontitle="Modify"] .toolbar-button-text')))
            //     await browser.sleep(2000)
            // }
            const toolbarButton: ElementFinder = element.all(by.cssContainingText('.toolbar-button-text, .toolbar-button-title, .toolbar-button-text, part-search-results-filter span', buttonName)).get(num);
            await w.waitUntilElementIsClickable(toolbarButton);
            await browser.waitForAngularEnabled(false);
            await browser.sleep(2000);
            await button.clickOnTheElement(toolbarButton);
            await w.waitUntilElementIsDisplayed(dropdownElements.openDropdown);
            await w.waitUntilElementIsClickable(dropdownElements.openDropdown);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async openToolbarDropdownByButtonNameAndClicklink(buttonName: string, num:number = 0,sublink: string) {
        await allureStep('Open toolbar dropdown by clicking on ' + buttonName+' and sublink: '+sublink, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(gridElements.checkboxSelector.get(1));
            await this.openToolbarDropdownByButtonName(buttonName,num);
            await link.clickOnTheLinkByName(sublink);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(gridElements.checkboxSelector.get(1));
        });
    };

    public async openToolbarDropdownByButtonNameInModal(buttonName: string) {
        await allureStep('Open toolbar dropdown by clicking on ' + buttonName + ' in modal', async () => {
            const toolbarButton: any = element.all(by.cssContainingText('.modal-body .toolbar-button-text, ' +
                '.modal-body  .toolbar-button-title,.modal-body  .toolbar-button-text', buttonName)).get(0);
            await browser.waitForAngularEnabled(false);
            await button.clickOnTheElement(toolbarButton);
            await w.waitUntilElementIsDisplayed(dropdownElements.openDropdown);
            await w.waitUntilElementIsClickable(dropdownElements.openDropdown);
        });
    };

    public async openToolbarDropdownByButtonNameInSlider(buttonName: string) {
        await allureStep('Open toolbar dropdown by clicking on ' + buttonName, async () => {
            const toolbarButton: any = element.all(by.cssContainingText('.slider-panel.open .toolbar-button-text, ' +
                '.slider-panel.open .toolbar-button-title, .slider-panel.open .toolbar-button', buttonName)).get(0);
            await button.clickOnTheElement(toolbarButton);
            await w.waitUntilElementIsDisplayed(dropdownElements.openDropdown);
            await w.waitUntilElementIsClickable(dropdownElements.openDropdown);
        });
    };

    public async openToolbarDropdownByButtonNameAndWaitForElement(buttonName: string, webElement: any) {
        await allureStep('Open toolbar dropdown by clicking on ' + buttonName, async () => {
            const toolbarButton: any = element.all(by.cssContainingText('.slider-panel.open .toolbar-button-text, ' +
                '.slider-panel.open .toolbar-button-title, .slider-panel.open .toolbar-button, part-search-results-filter span', buttonName)).get(0);
            await button.clickOnTheElement(toolbarButton);
            await w.waitUntilElementIsDisplayed(webElement);
            await w.waitUntilElementIsClickable(webElement);
        });
    };

    public async closeToolbarDropdownByButtonName(buttonName: string) {
        await allureStep('Close toolbar dropdown by clicking on ' + buttonName, async () => {
            const toolbarButton: any = element.all(by.cssContainingText('.toolbar-button-text, .toolbar-button-title, .toolbar-button', buttonName)).get(0);
            await button.clickOnTheElement(toolbarButton);
            await w.waitUntilElementNotDisplayed(dropdownElements.openDropdown);
        });
    };

    public async closeToolbarDropdownByButtonNameInSlider(buttonName: string) {
        await allureStep('Close toolbar dropdown by clicking on ' + buttonName, async () => {
            const toolbarButton: any = element.all(by.cssContainingText('.slider-panel.open .toolbar-button-text, ' +
                '.slider-panel.open .toolbar-button-title, .slider-panel.open .toolbar-button', buttonName)).get(0);
            await button.clickOnTheElement(toolbarButton);
            await w.waitUntilElementNotDisplayed(dropdownElements.openDropdown);
        });
    };

    public async unhideDropdown(viewType: string = 'simple') {
        if (viewType === 'Slider') {
            await browser.waitForAngularEnabled(false);
            await this.openToolbarDropdownByButtonNameInSlider(buttonNames.unhide);
            await expect(button.returnButtonByTextInSlider(buttonNames.unhideAll).isDisplayed()).toBeTruthy();
            await expect(button.returnButtonByTextInSlider(buttonNames.unhideAll).isEnabled()).toBeFalsy();
            await this.closeToolbarDropdownByButtonNameInSlider(buttonNames.unhide);
            await browser.waitForAngularEnabled(false);
        }
        else {
            await expect(this.unhideButton.isDisplayed()).toBeTruthy();
            await this.openToolbarDropdownByButtonName(buttonNames.unhide);
            await expect(button.returnButtonByText(buttonNames.unhideAll).isDisplayed()).toBeTruthy();
            await expect(button.returnButtonByText(buttonNames.unhideAll).isEnabled()).toBeFalsy();
            await this.closeToolbarDropdownByButtonName(buttonNames.unhide);
        }
    };

    public async hideColumn(viewType: string = 'simple') {
        await grid.openFilterBox(1, viewType);
        await grid.applyFilter(gridElements.hideColumn);
        if (viewType === 'Slider') {
            await this.openToolbarDropdownByButtonNameInSlider(buttonNames.unhide);
            await expect(button.returnButtonByTextInSlider(buttonNames.unhideAll).isDisplayed()).toBeTruthy();
            await expect(button.returnButtonByTextInSlider(buttonNames.unhideAll).isEnabled()).toBeTruthy();
            await expect(button.returnButtonByText(grid.headerName).isDisplayed()).toBeTruthy();
            await this.closeToolbarDropdownByButtonNameInSlider(buttonNames.unhide);
        }
        else {
            await this.openToolbarDropdownByButtonName(buttonNames.unhide);
            await expect(button.returnButtonByText(buttonNames.unhideAll).isDisplayed()).toBeTruthy();
            await expect(button.returnButtonByText(buttonNames.unhideAll).isEnabled()).toBeTruthy();
            await this.closeToolbarDropdownByButtonName(buttonNames.unhide);
        }

    };

    //for new grid
    public async displayHiddenColumnInDropdonwToolbar(cellName: string) {
        await this.openToolbarDropdownByButtonName(buttonNames.unhide);
        await expect(button.returnButtonByText(buttonNames.unhideAll).isDisplayed()).toBeTruthy();
        await expect(button.returnButtonByText(buttonNames.unhideAll).isEnabled()).toBeTruthy();
        await expect(button.returnButtonByText(cellName).isDisplayed()).toBeTruthy();
        await this.closeToolbarDropdownByButtonName(buttonNames.unhide);
    };

    public async displayHiddenColumnInDropdonwToolbarSlider(cellName: string) {
        await this.openToolbarDropdownByButtonNameInSlider(buttonNames.unhide);
        await expect(button.returnButtonByTextInSlider(buttonNames.unhideAll).isDisplayed()).toBeTruthy('1');
        await expect(button.returnButtonByTextInSlider(buttonNames.unhideAll).isEnabled()).toBeTruthy('2');
        await expect(button.returnButtonByText(cellName).isDisplayed()).toBeTruthy('3');
        await this.closeToolbarDropdownByButtonNameInSlider(buttonNames.unhide);
    };

    //for new grid
    public async unhideCellNameWithUnhideAll(cellName: string) {
        await this.openToolbarDropdownByButtonName(buttonNames.unhide);
        await button.clickByButtonName(buttonNames.unhideAll);
        await w.waitUntilElementIsDisplayed(gridElements.newGridHeaderByName(cellName));
        await w.waitUntilElementIsClickable(gridElements.newGridHeaderByName(cellName));
    };

    public async unhideCellNameWithUnhideAllInSlider(cellName: string) {
        await this.openToolbarDropdownByButtonNameInSlider(buttonNames.unhide);
        await browser.sleep(1500);
        await this.returnToolbarDropdownOptionAndIndex(buttonNames.unhideAll, 1).click();
        // await button.clickByButtonName(buttonNames.unhideAll);
        await w.waitUntilElementIsDisplayed(gridElements.newGridHeaderByName(cellName))
    };

    public async unhideCellNameWithUnhideAllByNumber(cellName: string, num: number) {
        await this.openToolbarDropdownByButtonName(buttonNames.unhide, num);
        await w.waitUntilElementIsClickable(button.returnElementByButtonTextAndIndex(buttonNames.unhideAll, num));
        await button.clickOnTheElement(button.returnElementByButtonTextAndIndex(buttonNames.unhideAll,num) );
        await w.waitUntilElementIsDisplayed(gridElements.newGridHeaderByName(cellName))
    };

    public async unhideCellByNameAndUnhideNumber(cellName: string, num) {
        await this.openToolbarDropdownByButtonName(buttonNames.unhide, num);
        await w.waitUntilElementIsClickable(button.returnElementByButtonTextAndIndex(buttonNames.unhideAll, num));
        await button.clickOnTheElement(button.returnButtonByText(cellName));
        await w.waitUntilElementIsDisplayed(gridElements.newGridHeaderByName(cellName))
    };

    //for new grid
    public async unhideDuplicateCellNameWithUnhideAll(colNumber: number, cellName: string) {
        await this.openToolbarDropdownByButtonName(buttonNames.unhide);
        await button.clickByButtonName(buttonNames.unhideAll);
        await browser.sleep(500);   //here we have to add w.waitUntilElementNotDisplayed for unhided column
        await expect(await gridElements.newGridUnlockedColumnHeaders.get(colNumber).getText()).toEqual(cellName);
    };

    //for new grid
    public async unhideCellNameWithCellValue(cellName: string) {
        await this.openToolbarDropdownByButtonName(buttonNames.unhide);
        await button.clickByButtonName(cellName);
        await w.waitUntilElementIsDisplayed(gridElements.newGridHeaderByName(cellName))
    };

    //for new grid
    public async unhideCellNameWithUnhideAllInModal(cellName: string) {
        await this.openToolbarDropdownByButtonNameInModal(buttonNames.unhide);
        await button.clickByButtonName(buttonNames.unhideAll);
        await w.waitUntilElementIsDisplayed(gridElements.newGridHeaderByName(cellName))
    }

    async unhideColumn(viewType: string = 'simple') {
        if (viewType === 'Slider') {
            await this.openToolbarDropdownByButtonNameInSlider(buttonNames.unhide);
            await button.clickByButtonNameInSlider(buttonNames.unhideAll);
            await w.waitUntilElementIsDisplayed(element(by.cssContainingText('.header-title,.ag-header-cell-text ', grid.headerName)));
        }
        else {
            await this.openToolbarDropdownByButtonName(buttonNames.unhide);
            await button.clickByButtonName(buttonNames.unhideAll);
            await w.waitUntilElementIsDisplayed(element(by.cssContainingText('.header-title, .ag-header-cell-text', grid.headerName)));
        }
    };

    public async showFilterOptionsTag(buttonName: string) {
        const filterButton: any = element(by.cssContainingText('.toolbar-button-title', buttonName));
        await Dropdown.openDropdownByClickOnElement(filterButton);
        const selectedOption: any = await dropdownElements.dropdownValues.get(1).getText();
        await browser.waitForAngularEnabled(false);
        await button.clickOnTheElement(dropdownElements.dropdownValues.get(1));
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await browser.waitForAngularEnabled(false);
        const appliedValues: string[] = await this.tagLabel.getText();
        for (let i: number = 0; i < appliedValues.length; i++) {
            if (appliedValues[i] === (selectedOption)) {
                break
            }
        }
        await expect(this.clearAllLink.isDisplayed()).toBeTruthy();
    };

    public async checkingTagBust(buttonName) {
        const filterButton: any = element(by.cssContainingText('.toolbar-button-title', buttonName));
        await Dropdown.openDropdownByClickOnElement(filterButton);
        await button.clickOnTheElement(dropdownElements.dropdownValues.get(2));
        await w.waitUntilElementIsDisplayed(gridElements.grid);
        let value: number = await element.all(by.xpath(`.//*[contains(@class, 'panel-title')]/ancestor::*[contains(@class, 'toolbar-info-list')]//*[contains(@class, 'svg-icon-x')]`)).count();
        await expect(value).toEqual(1)
    };

    public async removeTagWithX(buttonName) {
        const filterButton: any = element(by.cssContainingText('.toolbar-button-title', buttonName));
        await Dropdown.openDropdownByClickOnElement(filterButton);
        await button.clickOnTheElement(dropdownElements.dropdownValues.get(1));
        await browser.waitForAngularEnabled(false);
        await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
        //await this.importSavedConf();
        await browser.executeScript("document.querySelector('.svg-icon-x').click()");
        await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
        await expect(await toolbarElements.tagByName(buttonName).isPresent()).toBe(false);
    };

    public async removeWithClearAllWithDefaultTag() {
        await browser.executeScript("document.querySelector('.svg-icon-x').click()");
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
    };

    public async removeWithClearAll(specialCase: boolean = false) {
        await allureStep(`Remove filters with Clear All`, async () => {

            if (await this.clearAllLink.isPresent()) {
                await browser.waitForAngularEnabled(false);
                await w.waitUntilWorkingModalNotDisplayed();
                await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
                await w.waitUntilElementIsClickable(this.clearAllLink);
                await w.waitUntilWorkingModalNotDisplayed();
                await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
                await w.waitUntilElementIsDisplayed(this.clearAllLink);
                await browser.sleep(1000)
                await button.clickOnTheElement(this.clearAllLink);
                await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
                await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
                await w.waitUntilElementIsClickable(gridElements.gridWrapper);
                await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
                if (specialCase) {
                    await expect(await element.all(by.css('.svg-icon-x')).get(0).isPresent()).toBe(true);
                    await browser.sleep(2000);
                }
                else {
                    await expect(await element.all(by.css('.svg-icon-x')).get(0).isPresent()).toBe(false);
                    await browser.sleep(2000);
                }
            }
        });
    };

    private async columnHeaderForFiltering(columnNumber) {
        let headerTitleText;
        await this.columnFilterArrow.get(columnNumber).click();
        await w.waitUntilElementIsClickable(gridElements.sortingBox);
        if (await this.headerForIcon.isDisplayed()) {
            headerTitleText = await this.headerForIcon.getText();
            return headerTitleText
        }
        else if (await this.headerTitle.get(columnNumber).isPresent()) {
            headerTitleText = await this.headerTitle.get(columnNumber).getText();
            return headerTitleText
        }
    };

    public async displaySortValue(headerTitleText: string, sortIcon: string) {
        await this.columnFiltersLink.click();
        await w.waitUntilElementIsDisplayed(commonElements.popoverContent.first());
        await expect(this.filteringText.getText()).toEqual(headerTitleText + sortIcon);
    };

    private async sortColumn(sortLink, headerTitleText, sortIcon) {
        await browser.waitForAngularEnabled(false);
        await w.waitUntilWorkingModalNotDisplayed();
        await button.clickOnTheElement(sortLink);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilWorkingModalNotDisplayed();
        //await browser.waitForAngularEnabled(false);
        await  expect(this.columnFiltersLink.isDisplayed()).toBeTruthy('Column Filters');
        await this.columnFiltersLink.click();
        await w.waitUntilElementIsDisplayed(commonElements.popoverContentSort.first());
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(await this.filteringText.getText()).toEqual(headerTitleText + sortIcon);
        await this.filterTextHardcode.click();
        await w.waitUntilElementNotDisplayed(commonElements.popoverContent.first());
        await w.waitUntilWorkingModalNotDisplayed();
    };

    public async filterColumnUpSorting(columnNumber) {
        let headerTitleText = await this.columnHeaderForFiltering(columnNumber);
        if (await gridElements.sortAZ.isPresent()) {
            await this.sortColumn(gridElements.sortAZ, headerTitleText, this.upSortArrow);
        }
        else if (await gridElements.sortSmallToLargeLink.isPresent()) {
            await this.sortColumn(gridElements.sortSmallToLargeLink, headerTitleText, this.upSortArrow);
        }
        else if (await gridElements.sortOldToNewLink.isPresent()) {
            await this.sortColumn(gridElements.sortOldToNewLink, headerTitleText, this.upSortArrow);
        }
        else {
            await this.headerForIcon.click()
        }
    };

    private async filterColumnDownSorting(columnNumber) {
        const headerTitleText: string = await this.columnHeaderForFiltering(columnNumber);
        if (await gridElements.sortZaLink.isPresent()) {
            await this.sortColumn(gridElements.sortZaLink, headerTitleText, this.downSortArrow);
        }
        else if (await gridElements.sortLargeToSmallLink.isPresent()) {
            await this.sortColumn(gridElements.sortLargeToSmallLink, headerTitleText, this.downSortArrow);
        }
        else if (await gridElements.sortNewToOldLink.isPresent()) {
            await this.sortColumn(gridElements.sortNewToOldLink, headerTitleText, this.downSortArrow);
        }
        else {
            await this.headerForIcon.click()
        }
    };

    public async filterAllColumnsAZ() {
        const columnNumbers = await this.columnFilterArrow.count();
        for (let i = 0; i < columnNumbers; i++) {
            if (await this.columnFilterArrow.get(i).isDisplayed()) {
                await this.filterColumnUpSorting(i);
            }
        }
    };

    public async filterAllColumnsZA() {
        const columnNumbers = await this.columnFilterArrow.count();
        for (let i = 0; i < columnNumbers; i++) {
            if (await this.columnFilterArrow.get(i).isDisplayed()) {
                await w.waitUntilWorkingModalNotDisplayed();
                await this.filterColumnDownSorting(i);
            }
        }
    };

    public async clearFilteringWithClearAll() {
        // await w.waitUntilElementIsDisplayed(this.clearAllLink);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await browser.sleep(2000);
        await button.clickOnTheElement(this.clearAllLink);
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilWorkingModalNotDisplayed();
        await expect(this.columnFiltersLink.isPresent()).toBe(false);
        await browser.sleep(2000);
    };

    public async clearFilteringWithClearAllIfPresent() {
        // await w.waitUntilElementIsDisplayed(this.clearAllLink);
        await browser.sleep(2000);
        if (await this.clearAllLink.isPresent()) {
            await button.clickOnTheElement(this.clearAllLink);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await expect(this.columnFiltersLink.isPresent()).toBe(false);
            await browser.sleep(1000);
        }

    };

    public async clearFilteringWithX() {
        await w.waitUntilElementIsDisplayed(this.filterXButton);
        await button.clickOnTheElement(this.filterXButton);
        // await browser.executeScript("document.querySelectorAll('.svg-icon-x').click()");
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await expect(await this.columnFiltersLink.isPresent()).toBe(false)
    };

    public async switchLayout(layoutName) {
        await allureStep (`switch layout on ${layoutName}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.openToolbarDropdownByButtonName(buttonNames.layout);
            await w.waitUntilWorkingModalNotDisplayed();
            await button.clickOnTheElementAndWait(await link.returnElementByLinkName(layoutName), this.tagName.get(0));
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(this.layoutButton);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };

    public async verifyButtonIsEnabledInToolbar(layoutName) {
        await allureStep (`switch layout on ${layoutName}`, async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await this.openToolbarDropdownByButtonName(buttonNames.layout);
            await w.waitUntilWorkingModalNotDisplayed();
            await button.clickOnTheElementAndWait(await link.returnElementByLinkName(layoutName), this.tagName.get(0));
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(this.layoutButton);
            await w.waitUntilWorkingModalNotDisplayed();
        });
    };
}