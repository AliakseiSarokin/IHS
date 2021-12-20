import {browser} from "protractor";
import {commonSearch, quickSearchData} from "../../../../../testData/search";
import {Button} from "../../../../../components/simple/button";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {Dropdown} from "../../../../../components/dropdown";
import {ElementAttributes} from "../../../../../utils/elementAttributes";
import {Grid} from "../../../../../components/grid";
import {Input} from "../../../../../components/simple/input";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Modal} from "../../../../../components/modal";
import {buttonNames, columnHeaders, fieldStatuses, meganavItems} from "../../../../../testData/global";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";
import {Toolbar} from "../../../../../components/toolbar";
import {QuickSearch} from "../../../../../components/quickSearch";
import {gridElements, quickSearchElements, searchElements} from "../../../../../elements/elements";
import {Actions} from "../../../../../utils/actions";
import {sortOptions} from "../../../../../testData/columnHheaders";
const button: Button = new Button();
const checkBox: CheckBox= new CheckBox();
const grid: Grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input =new Input();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const searchLogic: SearchLogic = new SearchLogic();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();
describe('TC67373 UI: Fuzzy search behavior tweaks', () => {

    it('should perform fuzzy search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[0]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel, quickSearchElements.ignoreSpecCharInput,
            fieldStatuses.fillField);
        await quickSearch.closeQuickSearchDropdwon();
        await quickSearch.performQuickSearchWithWait('lm320DC', modal.modalBody);
        await modal.closeModalWithButton(buttonNames.yes);
        await grid.newGridOpenFilterBoxByName('Part Number');
        await expect(await gridElements.columnsSort.ignoreSpecCharInput.isSelected()).toBeFalsy();
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.input, 'value'))
            .toEqual('lm320DC');
        await expect(await elementAttributes.getElementAttribute(gridElements.columnsSort.dropdownInput, 'value'))
            .toEqual('');
        await expect(await button.returnButtonByText(buttonNames.applyFilter).isEnabled()).toBeFalsy();
    });

    it('should be fuzzy search modal from sort search - Equals', async () => {
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait('Exact');
        await checkBox.checkUnCheckSingleCheckbox(gridElements.columnsSort.ignoreSpecCharLabel,
            gridElements.columnsSort.ignoreSpecCharInput, fieldStatuses.fillField);
        await grid.peformSearchInColumnSort(modal.modalBody);
        await modal.closeModalWithButton(buttonNames.yes);
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('lm320DC');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual(quickSearchData.typeLabels[2]);
        await quickSearch.openQuickSearchDropdwon();
        await expect(await quickSearchElements.ignoreSpecCharInput.isSelected()).toBeTruthy()
    });

    it('should not be fuzzy search modal from sort search - Contains', async () => {
        await grid.newGridOpenFilterBoxByName('Part Number');
        await Dropdown.openDropdownByClickOnElement(gridElements.columnsSort.dropdown);
        await Dropdown.selectValueInDropdownByValueNameWithoutWait('Contains');
        await grid.peformSearchInColumnSort(gridElements.gridWrapper);
        await expect(await elementAttributes.getElementAttribute(quickSearchElements.searchField, 'value'))
            .toEqual('lm320DC');
        await expect(await quickSearchElements.typeLabel.getText()).toEqual(quickSearchData.typeLabels[1]);
        await expect(await gridElements.newGridSimpleTextCell.get(0).isPresent()).toBeFalsy()
    });


});

