import {Actions} from "../../../../../../utils/actions";
import {Button} from "../../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, fieldStatuses, meganavItems} from "../../../../../../testData/global";
import {CheckBox} from "../../../../../../components/simple/checkBox";
import {CustomLayoutLogic} from "../../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {commonSearch, quickSearchData} from "../../../../../../testData/search";
import {Dropdown} from "../../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";
import {Grid} from "../../../../../../components/grid";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {gridElements, quickSearchElements, searchElements} from "../../../../../../elements/elements";
import {SearchLogic} from "../../../../../../bussinesLayer/search/searchLogic";
import {Shade} from "../../../../../../components/shade";
import {Toolbar} from "../../../../../../components/toolbar";

const button: Button = new Button();
const checkBox: CheckBox = new CheckBox();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const quickSearch: QuickSearch = new QuickSearch();
const searchLogic: SearchLogic = new SearchLogic();
const toolbar: Toolbar = new Toolbar();

describe('TC67375 UI: Keyword search behavior tweaks', () => {
    const columns: string[] = ['Description', 'Manufacturer Part Description', 'Manufacturer Package Description'];

    beforeAll(async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByRangeNames(columns);
        await customLayoutLogic.saveNewCustomLayout();
    });

    afterAll(async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it('should perform keyword search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.keywordMathTypeLabels.get(0),
            quickSearchElements.keywordMathTypeInputs.get(0), fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait('1234', gridElements.grid);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName(commonSearch.manageLayout.newCustomLayoutName);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', false);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[0], true);
    });

    it('should be description sort options', async () => {
        await grid.newGridOpenFilterBoxByName(columns[0]);
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.keywordInput, 'value'))
            .toEqual('1234');
        await expect(await gridElements.columnsSort.descroptionRadioButtonInputs.get(0).isSelected()).toBeTruthy();
        await expect(await gridElements.columnsSort.descroptionRadioButtonInputs.get(1).isSelected()).toBeFalsy();
        await expect(await gridElements.columnsSort.descroptionRadioButtonInputs.get(2).isSelected()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should perform search from description sort box - any radio button', async () => {
        await checkBox.checkUnCheckSingleCheckbox(gridElements.columnsSort.descroptionRadioButtonLabels.get(1),
            gridElements.columnsSort.descroptionRadioButtonInputs.get(1), fieldStatuses.fillField);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[0], true);
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('1234');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual(quickSearchData.typeLabels[3]);
        await quickSearch.openQuickSearchDropdwon();
        await expect(await quickSearchElements.keywordMathTypeInputs.get(1).isSelected()).toBeTruthy('any readio button');

    });

    it('should be sort be sort filter options after search through sort - any', async () => {
        await grid.newGridOpenFilterBoxByName(columns[0]);
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.keywordInput, 'value'))
            .toEqual('1234');
        await expect(await gridElements.columnsSort.descroptionRadioButtonInputs.get(1).isSelected()).toBeTruthy();
        await expect(await gridElements.columnsSort.descroptionRadioButtonInputs.get(0).isSelected()).toBeFalsy();
        await expect(await gridElements.columnsSort.descroptionRadioButtonInputs.get(2).isSelected()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should perform search from description sort box - exact radio button', async () => {
        await checkBox.checkUnCheckSingleCheckbox(gridElements.columnsSort.descroptionRadioButtonLabels.get(2),
            gridElements.columnsSort.descroptionRadioButtonInputs.get(2), fieldStatuses.fillField);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[0], true);
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('1234');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual(quickSearchData.typeLabels[3]);
        await quickSearch.openQuickSearchDropdwon();
        await expect(await quickSearchElements.keywordMathTypeInputs.get(2).isSelected())
            .toBeTruthy('exact radio button');
        await quickSearch.closeQuickSearchDropdwon();

    });

    it('should be sort be sort filter options after search through sort - exact', async () => {
        await grid.newGridOpenFilterBoxByName(columns[0]);
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.keywordInput, 'value'))
            .toEqual('1234');
        await expect(await gridElements.columnsSort.descroptionRadioButtonInputs.get(2).isSelected()).toBeTruthy();
        await expect(await gridElements.columnsSort.descroptionRadioButtonInputs.get(0).isSelected()).toBeFalsy();
        await expect(await gridElements.columnsSort.descroptionRadioButtonInputs.get(1).isSelected()).toBeFalsy();
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
    });

    it('should be not option to search with empty value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.keywordInput);
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });


    it('should be not option to search with space as a value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.keywordInput);
        await Actions.sendKeys(gridElements.columnsSort.keywordInput, ' ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });

    it('should be not option to search with 1 char as a value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.keywordInput);
        await Actions.sendKeys(gridElements.columnsSort.keywordInput, '1');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });

    it('should be not option to search with 3 chars as a value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.keywordInput);
        await Actions.sendKeys(gridElements.columnsSort.keywordInput, '123');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });

    it('should be not option to search with 4 spaces as a value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.keywordInput);
        await Actions.sendKeys(gridElements.columnsSort.keywordInput, '    ');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });

    it('should be option to search with 4 chars as a value', async () => {
        await Actions.clearInputWithDelete(gridElements.columnsSort.keywordInput);
        await Actions.sendKeys(gridElements.columnsSort.keywordInput, 'wwww');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeTruthy();
        await grid.peformSearchInColumnSort(gridElements.grid);
        await expect(await gridElements.newGridSimpleTextCell.get(0).isPresent()).toBeFalsy();
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[0], true);
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('wwww');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual(quickSearchData.typeLabels[3]);
        await quickSearch.openQuickSearchDropdwon();
        await expect(await quickSearchElements.keywordMathTypeInputs.get(2).isSelected()).toBeTruthy();
        await quickSearch.closeQuickSearchDropdwon();
    });

    it('should be the same search criteria in advanced parts search', async () => {
        await searchLogic.refineLinkChecking();
        await expect(await elementAttributes.getElementAttribute(searchElements.searchField, 'value'))
            .toEqual('wwww');
        await expect(await searchElements.parts.keywordRadioButtonInput.get(0).isSelected()).toBeTruthy();
        await expect(await searchElements.parts.keywordMatchRadioButtonInput.get(2).isSelected()).toBeTruthy();
    });
});
