import {allureStep} from "../../helper/allure/allureSteps";
import {Button} from "../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, fieldStatuses, linksNames} from "../../testData/global";
import {commonElements, gridElements, searchElements} from "../../elements/elements";
import {commonSearch} from "../../testData/search";
import {Dropdown} from "../../components/dropdown";
import {ElementAttributes} from "../../utils/elementAttributes";
import {ElementFinder, protractor} from "protractor";
import {Input} from "../../components/simple/input";
import {Link} from "../../components/simple/link";
import {Modal} from "../../components/modal";
import {QuickSearch} from "../../components/quickSearch";
import {RadioButton} from "../../components/simple/radioButton";
import {SearchLogic} from "./searchLogic";
import {Toolbar} from "../../components/toolbar";
import {Waiters as w} from "../../helper/waiters";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const link: Link = new Link();
const modal = new Modal();
const quickSearch = new QuickSearch();
const radioButton: RadioButton = new RadioButton();
const searchLogic = new SearchLogic();
const toolbar: Toolbar = new Toolbar();

export class PartsSearchLogic {

    public async performPartsSearch(value: string) {
        await allureStep('Perform Parts search with' + value, async () => {
            await browser.waitForAngularEnabled(false);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementIsClickable(searchElements.searchField);
            await w.waitUntilWorkingModalNotDisplayed();
            await input.fillFieldWithValue(searchElements.searchField, value);
            await button.clickByButtonName(buttonNames.search);
            for (let i = 0; i < 3; i++) {
                await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
                await w.waitUntilWorkingModalNotDisplayed();
                await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckbox);
                await w.waitUntilElementIsDisplayed(gridElements.grid);
                await w.waitUntilElementIsClickable(gridElements.grid);
                await w.waitUntilElementNotDisplayed(gridElements.gridSpinner);
                await w.waitUntilDomIsReady();
            }
        });
    };

    public async checkPartNamberRadioButton(buttonName: string) {
        await allureStep(`Check "${buttonName}" radio button`, async () => {
            await searchElements.parts.partNymberRadioButtonTypeByName(buttonName).click();
        })
    };

    public async openLayoutListSelectOption(typeName: string) {
        await allureStep(`Open Layout list and select "${typeName}" option`, async () => {
            await w.waitUntilElementIsClickable(await toolbar.returnToolbarButton(buttonNames.layout));
            await Dropdown.openDropdownByClickOnElement(await toolbar.returnToolbarButton(buttonNames.layout));
            await Dropdown.selectValueInDropdownByValueName(typeName, gridElements.grid);
            await w.waitUntilWorkingModalNotDisplayed();
            await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckbox);
        })
    };

    public async checkKeywordRadioButton() {
        await allureStep(`Check Keyword radio button`, async () => {
            await searchElements.parts.keywordRadioButton.get(0).click();
        })
    }

    public async performPartsSearchWithRefine(value: string) {
        await allureStep('Perform Parts search with' + value + ' and click on the refine', async () => {
            await input.fillFieldWithValue(searchElements.searchField, value);
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementIsDisplayed(gridElements.gridWrapper);
            await w.waitUntilElementNotDisplayed(gridElements.gridSpinner);
            await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckbox);
            await link.clickOnTheLinkByNameAndWaitForElement(linksNames.refine, searchElements.searchField);
        });
    };

    public async performPartsSearchWithCustomWait(value: string, waitElement: ElementFinder) {
        await allureStep('Perform Parts search with' + value, async () => {
            await input.fillFieldWithValue(searchElements.searchField, value);
            await button.clickByButtonName(buttonNames.search);
            await w.waitUntilElementNotDisplayed(gridElements.gridSpinner);
            await w.waitUntilElementIsDisplayed(waitElement);
            await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckbox);
        });
    };

    public async labelsChecking() {
        const fieldLabels = ['Enter Part Number:', 'Additional Filters:'];
        const filterLabels = ['Manufacturer Name:', 'Part Status:', 'CPL:'];
        await expect(await searchElements.parts.partsSearchFieldsLabels.getText()).toEqual(fieldLabels);
        await expect(await searchElements.parts.partsSearchFiltersLabels.getText()).toEqual(filterLabels);
    };

    public async infoSectionChecking(radioButtonLabel: any, radioButtonInput: any, infoText: string) {
        await radioButton.checkRadioButton(radioButtonLabel, radioButtonInput);
        await expect(await searchElements.parts.infoSection.get(0).getText()).toEqual(infoText);
    };

    public async clearForRadioButtons() {
        await link.clickOnTheLinksByNameAndIndex(linksNames.clear, 0);
        await expect(await searchElements.parts.partsSearchRadioButtonsInputs.get(1).isSelected())
            .toBeTruthy()
    };

    async clearForMfrName() {
        await link.clickOnTheLinksByNameAndIndex(linksNames.clear, 1);
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual(fieldStatuses.emptyValue);
    };

    async clearForPartStatus() {
        await browser.executeScript("document.querySelectorAll('.filter-section')[3].scrollIntoView()");
        let result = await searchElements.parts.partStausCheckboxes.count();
        for (let i = 0; i < result; i += 1) {
            await searchElements.parts.partStausCheckboxes.get(i).click()
        }

        await link.clickOnTheLinksByNameAndIndex(linksNames.clear, 2);
        let value = await searchElements.parts.partStausCheckboxesInput.count();
        for (let i = 0; i < value; i += 1) {
            await expect(await searchElements.parts.partStausCheckboxesInput.get(i).isSelected())
                .toBeFalsy();
        }
    };

    private async _checkRadioButtonsAndClear(startRadioButton) {
        let result = await searchElements.parts.envRadionButtonsLabels.count();
        for (let i = startRadioButton; i < result; i += 3) {
            await searchElements.parts.envRadionButtonsLabels.get(i).click()
        }
        await link.clickOnTheLinksByNameAndIndex(linksNames.clear, 3);
        let value = await searchElements.parts.envRadionButtonsInput.count();
        for (let i = startRadioButton; i < value; i += 3) {
            await expect(await searchElements.parts.envRadionButtonsInput.get(i).isSelected()).toBeFalsy();
            await expect(await searchElements.parts.envRadionButtonsInput.get(2).isSelected()).toBeTruthy();
            await expect(await searchElements.parts.envRadionButtonsInput.get(5).isSelected()).toBeTruthy();
            await expect(await searchElements.parts.envRadionButtonsInput.get(8).isSelected()).toBeTruthy();
        }
    };

    public async clearForEnvRadioButtons() {
        await this._checkRadioButtonsAndClear(0);
        await this._checkRadioButtonsAndClear(1);
    };

    public async clearForCplCheckbox() {
        await searchElements.parts.cplCheckboxLabel.click();
        await link.clickOnTheLinksByNameAndIndex(linksNames.clear, 6);
        await expect(await searchElements.parts.cplCheckboxInput.isSelected())
            .toBeTruthy();
    };

    public async de72390() {
        await radioButton.checkRadioButton(searchElements.parts.partsSearchRadioButtonsLabels.get(1),
            searchElements.parts.partsSearchRadioButtonsInputs.get(1));
        const ignoreStatus = await elementAttributes.getElementAttribute(searchElements.parts.ignoreSpecCherInput, 'class');
        if (ignoreStatus.includes(fieldStatuses.emptyField)) {
            await radioButton.checkRadioButton(searchElements.parts.ignoreSpecCharLabel,
                searchElements.parts.ignoreSpecCherInput);
        }
        await browser.waitForAngularEnabled(false);
        await input.fillFieldWithValue(searchElements.searchField, 'LM101AH883NOPB');
        await button.clickByButtonName(buttonNames.search);
        await w.waitUntilElementIsClickable(gridElements.gridWrapper);
        await w.waitUntilElementNotDisplayed(modal.spinnerModalTitle);
        await expect(modal.modalTitle.isPresent()).toBeFalsy();
    };

    public async orSearchCheckingAdvancedSearch(firstSearchValue: string, secondSearchValue: string, delimiter: string) {
        await this.performPartsSearch(firstSearchValue);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1))
        let firstSearchResultCount: string = await gridElements.itemsCountInGrid.getText();
        await searchLogic.refineLinkChecking();
        await this.performPartsSearch(secondSearchValue);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1))
        let secondSearchResultCount: string = await gridElements.itemsCountInGrid.getText();
        await searchLogic.refineLinkChecking();
        let r1: string[] = firstSearchResultCount.split(' ');
        let r2: string[] = secondSearchResultCount.split(' ');
        await this.performPartsSearch(firstSearchValue + ' ' + delimiter + ' ' + secondSearchValue);
        await w.waitUntilElementIsClickable(gridElements.checkboxSelector.get(1))
        let thirdSearchResultCount: string = await gridElements.itemsCountInGrid.getText();
        let r3 = thirdSearchResultCount.split(' ');
        await expect(parseInt(r3[4])).toEqual(parseInt(r1[4]) + parseInt(r2[4]));
    };

    public async orSearchCheckingSimpleSearch(firstSearchValue, secondSearchValue, delimiter) {
        await quickSearch.performQuickSearch(firstSearchValue);
        await w.waitUntilElementIsClickable(gridElements.itemsCountInGrid);
        let firstSearchResultCount: string = await gridElements.itemsCountInGrid.getText();
        await searchLogic.refineLinkChecking();
        await quickSearch.performQuickSearch(secondSearchValue);
        await w.waitUntilElementIsClickable(gridElements.itemsCountInGrid);
        let secondSearchResultCount: string = await gridElements.itemsCountInGrid.getText();
        await searchLogic.refineLinkChecking();
        let r1: string[] = firstSearchResultCount.split(' ');
        let r2: string[] = secondSearchResultCount.split(' ');
        await quickSearch.performQuickSearch(firstSearchValue + ' ' + delimiter + ' ' + secondSearchValue);
        await w.waitUntilElementIsClickable(gridElements.itemsCountInGrid);
        let thirdSearchResultCount: string = await gridElements.itemsCountInGrid.getText();
        let r3 = thirdSearchResultCount.split(' ');
        await expect(parseInt(r3[4])).toEqual(parseInt(r1[4]) + parseInt(r2[4]));
    };
};

export class FuzzySearchLogic extends PartsSearchLogic {
    public async uncheckIgnoreSpec() {
        if (searchElements.parts.ignoreSpecCherInput.isSelected()) {
            await searchElements.parts.ignoreSpecCharLabel.click();
        }
    };

    public async fuzzySearchModal(type: string) {
        await allureStep('Check fuzzy search modal attributes', async () => {
            await expect(modal.modalBodyParag.get(0).getText()).toEqual('Search Criteria:');
            await expect(modal.modalBodyParag.get(1).getText()).toEqual('Part number (' + type + ') = ' + commonSearch.fuzzySearchValue);
            await expect(modal.modalBodyParag.get(2).getText()).toEqual(commonSearch.fuzzyInstrText);
            await expect(button.returnButtonByText(buttonNames.no).isDisplayed()).toBeTruthy();
            await expect(button.returnButtonByText(buttonNames.yes).isDisplayed()).toBeTruthy();
            await expect(modal.modalX.isDisplayed()).toBeTruthy();
        });
    };

    public async fuzzyQuickSearch(type: string) {
        await browser.waitForAngularEnabled(false);
        await quickSearch.setATypeAndPerformAQuickSearch(type, commonSearch.fuzzySearchValue, modal.modalTitle);
        await expect(await modal.modalTitle.getText()).toEqual(commonSearch.fuzzySearchModalTitle);
        await modal.closeModalWithXButton();
    };

    public async fuzzyKeywordContain(type: string) {
        await radioButton.checkRadioButtonByLabelName(type);
        await this.performPartsSearch(commonSearch.fuzzySearchValue);
        await expect(modal.modalTitle.isPresent()).toBeFalsy();
    };

    public async fuzzyKeyword() {
        await radioButton.checkRadioButton(searchElements.parts.keywordRadioButton.get(0),
            searchElements.parts.keywordRadioButtonInput.get(0));
        await this.performPartsSearch(commonSearch.fuzzySearchValue);
        await expect(modal.modalTitle.isPresent()).toBeFalsy();
    };

    public async fuzzyExactStartsWith(type: string) {
        await allureStep('Perform fuzzy search with ' + type + ' type and check that fuzzy modal present', async () => {
            await this.uncheckIgnoreSpec();
            await radioButton.checkRadioButtonByLabelName(type);
            await input.fillFieldWithValue(searchElements.searchField, commonSearch.fuzzySearchValue);
            await modal.openModalWithButtonByName(buttonNames.search);
            await expect(await modal.modalTitle.getText()).toEqual(commonSearch.fuzzySearchModalTitle);
        });
    };

    public async closeFuzzyModal() {
        await allureStep("Close fuzzy search modal with 'No' or 'X' button", async () => {
            await modal.closeModalWithButton(buttonNames.no);
            await searchLogic.refineLinkChecking();
            await modal.openModalWithButtonByName(buttonNames.search);
            await modal.closeModalWithXButton();
            await searchLogic.refineLinkChecking();
            await modal.openModalWithButtonByName(buttonNames.search);
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
        });
    };

    public async fuzzyNoResults() {
        await allureStep("Check 'No Results Found' modal attributes", async () => {
            await searchLogic.refineLinkChecking();
            await modal.openModalWithButtonByName(buttonNames.search);
            await modal.openModalWithButtonByName(buttonNames.yes);
            // await button.clickByButtonName(buttonNames.yes);
            // await w.waitUntilElementIsClickable(modal.modalBody);
            await expect(await modal.modalTitle.getText()).toEqual(commonSearch.fuzzySearchModalTitle);
            await expect(await modal.modalBody.getText()).toEqual(commonSearch.fuzzyInstrText2);
            await expect(await button.returnButtonByText(buttonNames.close).isDisplayed()).toBeTruthy();
        });
    };
    public async fuzzyNoResultsByDefault() {
        await allureStep("Check 'No Results Found' modal attributes", async () => {
            await expect(await modal.modalTitle.getText()).toEqual(commonSearch.fuzzySearchModalTitle);
            await expect(await modal.modalBody.getText()).toEqual(commonSearch.fuzzyInstrText2);
            await expect(await button.returnButtonByText(buttonNames.close).isDisplayed()).toBeTruthy();
        });
    };

    public async noFoundLabel() {
        await modal.openModalWithButtonByName(buttonNames.search);
        await button.clickByButtonName(buttonNames.yes);
        await w.waitUntilElementIsClickable(gridElements.grid);
        await expect(await gridElements.noResultsFound.isDisplayed()).toBeFalsy();
    };

    async performFuzzySearch(value: string) {
        await allureStep('Perform fuzzy search with ' + value + ' value', async () => {
            await modal.closeModalWithButton(buttonNames.close);
            await searchLogic.refineLinkChecking();
            await input.fillFieldWithValue(searchElements.searchField, value);
            await modal.openModalWithButtonByName(buttonNames.search);
            await button.clickByButtonName(buttonNames.yes);
            // await w.waitUntilElementIsDisplayed(gridElements.newGridRows.get(0));
            // await w.waitUntilElementIsClickable(gridElements.newGridRows.get(0));
        });
    };
}

export class FilterShade {
    public async checkCheckboxes(checkboxInput: any, checkboxLabels: any) {
        let count: number = await checkboxLabels.count();
        for (let i = 0; i < count; i++) {
            await checkboxLabels.get(i).click();
            await expect(await elementAttributes.getElementAttribute(checkboxInput.get(i), 'class'))
                .toContain(fieldStatuses.dirtyField)
        }
    };

    async checkRadioButtons(radioButtonInput: any, radioButtonLabels: any) {
        let count = await radioButtonInput.count();
        for (let i = 0; i < count - 1; i++) {
            await radioButtonLabels.get(i).click();
            await expect(await elementAttributes.getElementAttribute(radioButtonInput.get(i), 'class'))
                .toContain(fieldStatuses.dirtyField)
        }
    };

    public async checkFilterOnSearchPage() {
        await searchElements.parts.partStausCheckboxes.get(0).click();
        await searchElements.parts.envRadionButtonsLabels.get(0).click();
        await searchElements.parts.envRadionButtonsLabels.get(3).click();
        await searchElements.parts.envRadionButtonsLabels.get(6).click();
    };

    public async setOptionsInShade() {
        await searchElements.parts.filterShade.partStatusCheckboxLabels.get(0).click();
        await searchElements.parts.filterShade.reachCompiliantRadioButtonLabels.get(0).click();
        await searchElements.parts.filterShade.chinaRochsRadioButtonLabels.get(0).click();
        await searchElements.parts.filterShade.euRochsRadioButtonLabels.get(0).click();
        await searchElements.parts.filterShade.qualificationsCheckboxLabels.get(0).click();
        await searchElements.parts.filterShade.temperatureGradeCheckboxLabels.get(0).click();
    };
}