import {browser, by, element} from "protractor";
import {Button} from "../../../../components/simple/button";
import {CheckBox} from "../../../../components/simple/checkBox";
import {columnHeaders} from "../../../../testData/global";
import {commonSearch, quickSearchData} from "../../../../testData/search";
import {Grid} from "../../../../components/grid";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {QuickSearch} from "../../../../components/quickSearch";
import {gridElements, partDetailsElements, toolbarElements} from "../../../../elements/elements";
import {StringArray} from "../../../../utils/stringArray";

const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const grid: Grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const link: Link = new Link();
const login: Login = new Login();
const modal: Modal = new Modal();
const partDetailsLogic: PartDetailsLogic = new PartDetailsLogic();
const stringArray: StringArray = new StringArray();
const quickSearch: QuickSearch = new QuickSearch();

describe('Part Details, Add Space and Radiation Hardened Data and Search Capabilities to Qualifications, US280596', () => {

    it('should be "Rad Hard" Qualification in part details', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearchWithWait('5962G0153401QXA', gridElements.newGridRows.first());
        await partDetailsLogic.newGridOpenPartDetModalFromIpnLinkInSearch();
        await link.clickOnTheLinkByNameAndWaitForElement('Basic', await partDetailsElements.cellLinks.get(0));
        await expect(await partDetailsElements.gridValues.getText()).toContain('Rad Hard');
    });

    it('should filter search results by "Rad Hard" Qualification', async () => {
        await modal.closeModalIfPresent();
        const columnsToHide: string [] = await columnHeaders.search.partsDefaultLayout.slice(7, 10);
        await grid.newGridHideColumnsRange(columnsToHide);
        await grid.newGridOpenFilterBoxByName('Qualifications');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomDetails.qualifications[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomDetails.qualifications[5]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await expect(stringArray.checkIfArrayOptionsContainOneValue(
            await grid.newGridReturnCellValuesByColumnName(1, 'Qualifications'),
            'Rad Hard')).toBeTruthy();
    });

    it('should be "Space" Qualification in part details', async () => {
        await quickSearch.performQuickSearchWithWait('5962-8601301VFX', gridElements.newGridRows.first());
        await partDetailsLogic.newGridOpenPartDetModalFromIpnLinkInSearch();
        await link.clickOnTheLinkByNameAndWaitForElement('Basic', await partDetailsElements.cellLinks.get(0));
        await expect(await partDetailsElements.gridValues.getText()).toContain('Space');
    });

    it('should filter search results by "Space" Qualification', async () => {
        await modal.closeModalIfPresent();
        const columnsToHide: string [] = await columnHeaders.search.partsDefaultLayout.slice(7, 10);
        await grid.newGridHideColumnsRange(columnsToHide);
        await grid.newGridOpenFilterBoxByName('Qualifications');
        await checkbox.uncheckGridColumnSortCheckByName(columnHeaders.bom.bomDetails.qualifications[0]);
        await checkbox.checkGridColumnSortCheckByName(columnHeaders.bom.bomDetails.qualifications[6]);
        await grid.peformSearchInColumnSort(gridElements.grid);
        await expect(stringArray.checkIfArrayOptionsContainOneValue(
            await grid.newGridReturnCellValuesByColumnName(1, 'Qualifications'),
            'Space')).toBeTruthy();
    });
});

