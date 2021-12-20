import {browser} from "protractor";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {fieldStatuses} from "../../../../../testData/global";
import {Grid} from "../../../../../components/grid";
import {gridElements, modalElements, quickSearchElements} from "../../../../../elements/elements";
import {Login} from "../../../../../components/login";
import {Modal} from "../../../../../components/modal";
import {QuickSearch} from "../../../../../components/quickSearch";
import {quickSearchData} from "../../../../../testData/search";

const checkBox: CheckBox = new CheckBox();
const grid: Grid = new Grid();
const login: Login = new Login();
const modal: Modal = new Modal();
const quickSearch: QuickSearch = new QuickSearch();

describe('TC67400 - "Exact Part#" option of part search', () => {

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.clickOnX();
    });

    it('should be option to search with entered more than 1 symbols', async () => {
        await quickSearch.setATypeAndPerformAQuickSearch(quickSearchData.typeLabels[2],
            '1', gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', true);

        const partNumberActualAscCells: string [] = await grid.newGridReturnCellValuesByColumnName(0,
            'Part Number');
        const partNumberExpectAscCells: string[] = await grid.compareAscNumberValues(partNumberActualAscCells.slice());
        await expect(partNumberExpectAscCells).toEqual(partNumberActualAscCells);
    });

    it('should be option to search with entered  special chars - 1345$1)', async () => {
        await quickSearch.setATypeAndPerformAQuickSearch(quickSearchData.typeLabels[2],
            '1345$1', gridElements.grid);
        await grid.newGridCheckFilterIconPresentInColumnHeaderByColumnName(0,
            'Part Number', true);

        const partNumberActualAscCells: string [] = await grid.newGridReturnCellValuesByColumnName(0,
            'Part Number');
        const partNumberExpectAscCells: string[] = await grid.compareAscNumberValues(partNumberActualAscCells.slice());
        await expect(partNumberExpectAscCells).toEqual(partNumberActualAscCells);
    });

    it('should be option to search with unchecked ignore spec chars and entered  special chars - 123@12', async () => {
        await quickSearch.clickOnX();
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[2]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel,
            quickSearchElements.ignoreSpecCharInput, fieldStatuses.emptyField);
        await quickSearch.performQuickSearch('1345$1');
        await expect(await gridElements.newGridSimpleTextCell.get(0).isPresent()).toBeFalsy();
    });

    it('should be option to search with unchecked ignore spec chars and entered one spec char - @', async () => {
        await quickSearch.clickOnX();
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[2]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel,
            quickSearchElements.ignoreSpecCharInput, fieldStatuses.emptyField);
        await quickSearch.performQuickSearchWithWait('@', modalElements.modalTitleByName('Error Notification'));
        await modal.closeModalIfPresent();
        await expect(await gridElements.newGridSimpleTextCell.get(0).isPresent()).toBeFalsy();
    });

    it('should be option to search with unchecked ignore spec chars and entered spec chars - ~$`\'@%^&()-_={}\\[]:;<>/|"?.', async () => {
        await quickSearch.clickOnX();
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[2]);
        await checkBox.checkUnCheckSingleCheckbox(quickSearchElements.ignoreSpecCharLabel,
            quickSearchElements.ignoreSpecCharInput, fieldStatuses.emptyField);
        await quickSearch.performQuickSearchWithWait('~$`\'@%^&()-_={}\\[]:;<>/|"?.',
            modal.returnModalTitleByName('Error Notification'));
        await expect(await modalElements.text.getText())
            .toEqual('Please enter at least one alphanumeric character to perform Exact Part# search.');
        await modal.closeModalIfPresent();
    });
});
