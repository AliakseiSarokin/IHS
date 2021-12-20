import {browser} from "protractor";
import {buttonNames, fieldStatuses, meganavItems} from "../../../../../../testData/global";
import {CheckBox} from "../../../../../../components/simple/checkBox";
import {CustomLayoutLogic} from "../../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {commonSearch, quickSearchData} from "../../../../../../testData/search";
import {Dropdown} from "../../../../../../components/dropdown";
import {Grid} from "../../../../../../components/grid";
import {gridElements, quickSearchElements, searchElements} from "../../../../../../elements/elements";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {Shade} from "../../../../../../components/shade";
import {Toolbar} from "../../../../../../components/toolbar";

const checkBox: CheckBox = new CheckBox();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const quickSearch: QuickSearch = new QuickSearch();
const toolbar: Toolbar = new Toolbar();

describe('TC67426 - "Keyword" option of part search', () => {

    const columns: string[] = ['Description', 'Manufacturer Part Description', 'Manufacturer Package Description'];

    beforeAll(async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearchWithCustomWait(commonSearch.commonValue,
            gridElements.newGridCellByRowIndex(0).get(0));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByRangeNames(columns);
        await customLayoutLogic.saveNewCustomLayout();
    });

    beforeEach(async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
    });

    afterAll(async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearchWithCustomWait(commonSearch.commonValue,
            gridElements.newGridCellByRowIndex(0).get(0));
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it('should be option to search with all option and entered 4 symbols', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.keywordMathTypeLabels.get(0),
            quickSearchElements.keywordMathTypeInputs.get(0), fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait('sheets',gridElements.newGridCellByRowIndex(0).get(0));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName(commonSearch.manageLayout.newCustomLayoutName);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[0], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[1], true);
    });

    it('should be option to search with all option - sheet&!@paper', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.keywordMathTypeLabels.get(0),
            quickSearchElements.keywordMathTypeInputs.get(0), fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearch('sheet&!@paper');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName(commonSearch.manageLayout.newCustomLayoutName);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[0], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[1], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[2], true);
    });

    it('should be option to search with any option - white paper', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.keywordMathTypeLabels.get(1),
            quickSearchElements.keywordMathTypeInputs.get(1), fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait('white paper', gridElements.selectAllCheckbox);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName(commonSearch.manageLayout.newCustomLayoutName);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[0], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[1], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[2], true);
    });

    it('should be option to search with any option - white->()><:!$"^+;[]*?%{}~|&=-\'123paper', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.keywordMathTypeLabels.get(1),
            quickSearchElements.keywordMathTypeInputs.get(1), fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait('white->()><:!$"^+;[]*?%{}~|&=-\'123paper', gridElements.selectAllCheckbox);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName(commonSearch.manageLayout.newCustomLayoutName);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[0], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[1], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[2], true);
    });

    it('should be option to search with exact option - supervisor', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.keywordMathTypeLabels.get(2),
            quickSearchElements.keywordMathTypeInputs.get(2), fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait('supervisor', gridElements.selectAllCheckbox);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName(commonSearch.manageLayout.newCustomLayoutName);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[0], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[1], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[2], true);
    });

    it('should be no results for  exact option - supervisor ggfhjvj', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.keywordMathTypeLabels.get(2),
            quickSearchElements.keywordMathTypeInputs.get(2), fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait('supervisor ggfhjvj', gridElements.newGridNoRowsToShowText.get(0));
        await expect(await gridElements.newGridNoRowsToShowText.get(0).isPresent()).toBeTruthy();
    });

    it('should be option to search with exact option - supervisor->()><:!$"^+;[]*?%{}~|&=-', async () => {
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[3]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.keywordMathTypeLabels.get(2),
            quickSearchElements.keywordMathTypeInputs.get(2), fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearch('supervisor->()><:!$"^+;[]*?%{}~|&=-');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName(commonSearch.manageLayout.newCustomLayoutName,
            gridElements.newGridCellByRowIndex(0).get(0));
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[0], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[1], true);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(1,
            columns[2], true);
    });
});
