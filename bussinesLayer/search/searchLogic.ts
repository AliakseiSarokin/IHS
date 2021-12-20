import {Actions} from "../../utils/actions";
import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {browser, ElementArrayFinder, ElementFinder} from "protractor";
import {buttonNames, modalTitles, linksNames, headerItems, fieldStatuses} from "../../testData/global";
import {CheckBox} from "../../components/simple/checkBox";
import {
    commonElements, gridElements, headerElements, importElements, modalElements, searchElements,
    settings
} from "../../elements/elements";
import {commonSearch} from "../../testData/search";
import {Dropdown} from "../../components/dropdown";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Grid} from "../../components/grid";
import {Header} from "../../components/header";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {TypeAhead} from "../../components/typeAhead";
import {Waiters as w} from "../../helper/waiters";
import {typeAheadOption} from "./mfrSearchLogic";

const actions: Actions = new Actions();
const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const input: Input = new Input();
const link = new Link();
const modal: Modal = new Modal();
const typeAhead: TypeAhead = new TypeAhead();

export class SearchLogic {

    public async openSaveSearchModal() {
        await allureStep('Open and check save search modal', async () => {
            await modal.openModalWithButtonByName(buttonNames.saveSearch);
            await expect(await modal.modalTitle.getText()).toEqual(modalTitles.saveThisSearch);
            const expectedStatmentText = ['Complete the following to save the search for repeated use.',
                'Searches can contain any combination of A-Z (upper or lowercase), 0-9 and _ , -'];
            await expect(await searchElements.saveModalFiledLabels.getText()).toEqual(['Name:', 'Description:']);
            await expect(await searchElements.saveModalStatmentForInputs.getText()).toEqual(expectedStatmentText);
            await expect(button.returnButtonByText(buttonNames.saveAndReturnToResults).isDisplayed()).toBeTruthy();
            await expect(button.returnButtonByText(buttonNames.cancelDoNotSave).isDisplayed()).toBeTruthy();
        });
    };

    public async saveSearch() {
        await allureStep('Save search', async () => {
            await w.waitUntilWorkingModalNotDisplayed();
            await input.fillFieldWithValue(searchElements.saveSearchNameField, commonSearch.savedSearchName);
            await w.waitUntilWorkingModalNotDisplayed();
            await button.clickByButtonName(buttonNames.saveAndReturnToResults);
            await w.waitUntilElementNotDisplayed(modal.modalBody);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
            await browser.sleep(2000);
        });
    };

    public async displaySaveSearchInRecall() {
        await link.clickOnTheLinkByName(linksNames.refine);
        await this.recallSearchChecking(commonSearch.savedSearchName);
    };

    public async displaySaveSearchInSavedSearches() {
        await w.waitUntilElementIsDisplayed(headerElements.settingsIcon);
        await w.waitUntilElementIsClickable(headerElements.settingsIcon);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[3],
            settings.module);
        await w.waitUntilElementIsClickable(settings.savedSearches);
        await button.clickOnTheElement(settings.savedSearches);
        await browser.sleep(2000);
        await w.waitUntilElementIsClickable(await link.returnElementByLinkName(commonSearch.savedSearchName));
        await expect(await link.returnElementByLinkName(commonSearch.savedSearchName).isDisplayed()).toBeTruthy();
    };

    public async goToSearchFromSavedSearches() {
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByName(commonSearch.savedSearchName);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
    };

    public async verifyCompositeModalAttributes(titleText: string, bodyText1: string, bodyText2: string, buttonYes: string, buttonNo: string) {
        await allureStep('Verify composite dialog window attributes', async () => {
            await w.waitUntilElementIsDisplayed(importElements.cancelModalText.get(0));
            await expect(await modal.modalTitle.getText()).toEqual(titleText);
            await w.waitUntilElementIsClickable(importElements.cancelModalTextP);
            //temporary desigion
            await browser.sleep(500);
            await expect(await importElements.cancelModalTextP.getText()).toEqual(bodyText1);
            await expect(await importElements.cancelModalText.get(1).getText()).toEqual(bodyText2);
            await expect(button.returnButtonByText(buttonYes).isDisplayed()).toBeTruthy();
            await expect(button.returnButtonByText(buttonNo).isDisplayed()).toBeTruthy();
            await modal.closeModalIfPresent();
        });
    };

    public async verifySimpleModalAttributes(titleText: string, bodyText: string, buttonOk: string) {
        await allureStep('Verify simple dialog window attributes', async () => {
            await browser.sleep(3000);
            await expect(await modal.modalTitle.getText()).toEqual(titleText);
            await expect(await modal.modalBody.getText()).toEqual(bodyText);
            await expect(button.returnButtonByText(buttonOk).isDisplayed()).toBeTruthy();
        });
    };

    public async makeSaveSearchShared() {
        await checkbox.checkUnCheckCheckboxes(searchElements.saveSearchSharedCheckboxInput,
            searchElements.saveSearchSharedCheckboxInput, fieldStatuses.fillField)

    };

    public async fillSearchFieldWithValue(inputField: ElementFinder, value: string) {                                                              //only for recallSearches, it should be deleted
        await allureStep('Fill search field with ' + value, async () => {
            await input.fillFieldWithValue(inputField, value);
        });
    };

    public async performSearchWithoutWaitResultPage(inputField: ElementFinder, value: string) {
        await this.fillSearchFieldWithValue(inputField, value);
        await button.clickByButtonName(buttonNames.search);
    };

    public async performSearch() {
        await button.clickByButtonName(buttonNames.search);
        await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilElementIsDisplayed(gridElements.grid);
    };

    public async deleteSaveSearch() {
        await grid.newGridSelectRowWithMatchValue(0, 'Saved Search Name', commonSearch.savedSearchName)
        // await grid.selectRowByCellNameAndColumnNumber(commonSearch.savedSearchName, 0, 0);
        await modal.openModalWithButtonByName(buttonNames.delete);
        await browser.waitForAngularEnabled(false);
        await button.clickByButtonName(buttonNames.yesDeleteSelectedItems);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilElementNotDisplayed(await link.returnElementByLinkName(commonSearch.savedSearchName));
        await expect(await link.returnElementByLinkName(commonSearch.savedSearchName).isPresent()).toBeFalsy();
    };

    public async clearAllSavedSearch() {
        await allureStep('Clear all saved search', async () => {
            await grid.checkCheckboxRange(0, 1);
            await modal.openModalWithButtonByName(buttonNames.delete);
            await button.clickByButtonName(buttonNames.yesDeleteSelectedItems);
            await w.waitUntilElementIsClickable(gridElements.gridWrapper);
            await expect(await link.returnElementByLinkName(commonSearch.savedSearchName).isPresent()).toBeFalsy();
        });
    };

    private async _performSearch(array, search) {
        await allureStep('Perform ' + array.length + ' searches', async () => {
            for (let i: number = 0; i < array.length; i++) {
                await search(array[i]);
            }
        });
    };

    public async perform5Searches(array, searchOption, search, expectedSearchArray = array) {
        await this._performSearch(array, search);
        await button.clickOnTheElement(searchElements.searchExpandItem.get(searchOption));
        let newArr: any [] = [];
        for (let i: number = 0; i < array.length; i++) {
            newArr[i] = expectedSearchArray[i] + '...'
        }
        await expect(await searchElements.subMenuItems.getText()).toEqual(newArr.reverse());
    };

    async toolTipChecking(searchType) {
        let newArr = [];
        if (searchType === "Where Used") {
            for (let i: number = 0; i < commonSearch.searchArray.length; i += 1) {
                newArr[i] = 'Exact: ' + commonSearch.searchArray[i]
            }

            const itemsText = await searchElements.subMenuItems.getText();
            const itemTextLength = itemsText.length;
            for (let i: number = 0; i < itemTextLength; i += 1) {
                await actions.mouseMoveToElementAndWaitForTooltip(searchElements.subMenuItems.get(i),
                    searchElements.viewSearchCriteriaContent.first());
                await w.waitUntilElementIsClickable(searchElements.viewSearchCriteriaContent.first());
                await expect(await searchElements.viewSearchCriteriaContent.first().getText())
                    .toEqual(newArr[commonSearch.searchArray.length - 1 - i]);
            }
        }
        else if (searchType === "CPL") {
            for (let i: number = 0; i < commonSearch.searchArray.length; i += 1) {
                newArr[i] = 'keyword: ' + commonSearch.searchArray[i]
            }
            const itemsText = await searchElements.subMenuItems.getText();
            const itemTextLength = itemsText.length;
            for (let i: number = 0; i < itemTextLength; i += 1) {
                await actions.mouseMoveToElementAndWaitForTooltip(searchElements.subMenuItems.get(i),
                    commonElements.popoverB.first());
                await w.waitUntilElementIsClickable(commonElements.popoverB.first());
                await expect('keyword: ' + (await commonElements.popoverB.first().getText()))
                    .toEqual(newArr[commonSearch.searchArray.length - 1 - i]);
            }
        }
        else if (searchType === 'Haystack') {
            for (let i: number = 0; i < commonSearch.haystackSearchArray.length; i += 1) {
                newArr[i] = 'Query: ' + commonSearch.haystackSearchArray[i]
            }
            const itemsText = await searchElements.subMenuItems.getText();
            const itemTextLength = itemsText.length;
            for (let i: number = 0; i < itemTextLength; i += 1) {
                await actions.mouseMoveToElementAndWaitForTooltip(searchElements.subMenuItems.get(i),
                    commonElements.popoverContentParagP.first());
                await w.waitUntilElementIsClickable(commonElements.popoverContentParagP.first());
                await expect(await commonElements.popoverContentParagP.first().getText())
                    .toEqual(newArr[commonSearch.haystackSearchArray.length - 1 - i]);
            }
        }
        else if (searchType === "Mfr") {
            for (let i: number = 0; i < typeAheadOption.length; i += 1) {
                newArr[i] = typeAheadOption[i]
            }
            const itemsText = await searchElements.subMenuItems.getText();
            const itemTextLength = itemsText.length;
            for (let i: number = 0; i < itemTextLength; i += 1) {
                await actions.mouseMoveToElementAndWaitForTooltip(searchElements.subMenuItems.get(i),
                    commonElements.popoverStrong.first());
                await w.waitUntilElementIsClickable(commonElements.popoverStrong.first());
                await expect((await commonElements.popoverDiv.first().getText()))
                    .toContain(newArr[typeAheadOption.length - 1 - i]);
            }
        }
        else {
            let itemsText = await searchElements.subMenuItems.getText();
            const itemTextLength = itemsText.length;
            for (let i: number = 0; i < itemTextLength; i += 1) {
                await actions.mouseMoveToElementAndWaitForTooltip(searchElements.subMenuItems.get(i),
                    searchElements.viewSearchCriteriaContent.first());
                await browser.sleep(300)
                await expect(await searchElements.viewSearchCriteriaContent.first().getText())
                    .toEqual(commonSearch.searchArray[commonSearch.searchArray.length - 1 - i]);
            }
        }
    }

    public async goBySearchesInTheLeftNav(array) {
        let itemsText = await searchElements.subMenuItems.getText();
        const textLength = itemsText.length;
        for (let i: number = 0; i < textLength; i++) {
            await browser.sleep(500)
            await button.clickOnTheElement(searchElements.subMenuItems.get(i));
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await link.clickOnTheLinkByName(linksNames.viewSearchCriteria);
            await w.waitUntilElementIsDisplayed(commonElements.popoverContent.first());
        }
        let newArr = [];
        for (let i: number = 0; i < array.length; i += 1) {
            newArr[i] = array[i] + '...'
        }
        let text = await searchElements.subMenuItems.getText();
        await expect(text).toEqual(newArr)
    };

    public async searchCriteriaChecking(title: string) {
        await expect(await commonElements.accordionElements.get(0).getText()).toEqual(title);
    };

    public async searchCriteriaOnResultsPageChecking(title: string) {
        await expect(await commonElements.accordionElementsOnResultPage.get(0).getText()).toEqual(title);
    };

    async viewSearchCriteriaChecking() {
        await link.clickOnTheLinkByNameAndWaitForElement(linksNames.viewSearchCriteria, commonElements.popoverContent.first());
    };
    async heatShrinkViewSearchCriteriaChecking() {
        await w.waitUntilElementIsDisplayed(searchElements.parametric.attribute.get(0));
        await button.clickByButtonName(buttonNames.search);
        await link.clickOnTheLinkByNameAndWaitForElement(linksNames.viewSearchCriteria, commonElements.popoverContent.first());
    };

    async ghostTextSearchFieldChecking(input: ElementFinder, text: string) {
        await expect(await elementAttributes.getElementAttribute(input, 'placeholder')).toEqual(text);
    };

    async refineLinkChecking() {
        await link.clickOnTheLinkByNameAndWaitForElement(linksNames.refine, button.returnButtonByText(buttonNames.search));
        await expect(gridElements.gridWrapper.isPresent()).toBeFalsy();
    };

    async applyRecallSearch(recallSearchOption: string) {
        browser.sleep(2000);
        await Dropdown.openDropdownByClickOnElement(searchElements.recallSearchesDropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait(recallSearchOption);
        await w.waitUntilElementIsClickable(button.returnButtonByText(buttonNames.search));
    };

    async addTypeAheadFieldsByArray(fields: ElementArrayFinder, values: string[]) {
        for (let i: number = 0; i < values.length; i++) {
            if (i === 8) {
                await typeAhead.typeAheadChecking(fields.get(i), values[i]);
                await expect(await fields.get(i + 1).isPresent()).toBe(false);
                break;
            }
            await typeAhead.typeAheadChecking(fields.get(i), values[i]);
            await expect(await button.returnButtonByText(buttonNames.addCapLet).isEnabled()).toBe(true);
            await button.clickByButtonName(buttonNames.addCapLet);
            await w.waitUntilElementIsClickable(fields.get(i + 1));
            await this.ghostTextSearchFieldChecking(commonElements.commonTypeAheadInput, 'Enter manufacturer name (type ahead)');
        }
    };

    async selectTypeAheadFieldsByArray() {
        const count: number = await commonElements.commonTypeAheadInputsXbutton.count();
        for (let i: number = count; i > 0; i--) {
            if (i === 0) {
                await button.clickOnTheElement(commonElements.commonTypeAheadInputsXbutton.get(i));
                await expect(await commonElements.commonTypeAheadInput.get(0).isSelected()).toBe(true);
                break;
            }
            await button.clickOnTheElement(commonElements.commonTypeAheadInputsXbutton.get(i - 1));
            await w.waitUntilElementNotDisplayed(commonElements.commonTypeAheadInputsXbutton.get(i));
            await expect(await commonElements.commonTypeAheadInputs.get(i).isPresent()).toBe(false);
            await this.ghostTextSearchFieldChecking(commonElements.commonTypeAheadInputs.get(i - 1), 'Enter manufacturer name (type ahead)');
        }
    };

    async doNotShowOptionToSearchByClickingOnSearchCriteria() {
        await searchElements.accordioRow.click();
        if (await button.returnButtonByText(buttonNames.findMatchingValues).isPresent()) {
            await expect(button.returnButtonByText(buttonNames.findMatchingValues).isEnabled()).toBeFalsy();
        }
        else {
            await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy();
        }
    };

    public async recallSearchChecking(value: string = '- Recall Searches -') {
        await w.waitUntilElementIsDisplayed(searchElements.recallSearchesDropdown);
        await w.waitUntilElementIsClickable(searchElements.recallSearchesDropdown);
        while((await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))==='-retreiving data-'
        || (await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))===''){
            await browser.sleep(100)
        }
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))
            .toEqual(value);
    };

    public async emptyRecallSearchChecking() {
        await w.waitUntilElementIsDisplayed(searchElements.recallSearchesDropdown);
        await w.waitUntilElementIsClickable(searchElements.recallSearchesDropdown);
        while((await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))==='[]'
            || (await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))==='-retreiving data-'
            || (await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))===''
            || (await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))===' '
            || (await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))==='[ ]'
            ){
            await browser.sleep(100)
        }
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))
            .not.toEqual('');
    };


}