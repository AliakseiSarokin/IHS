import {Login} from "../../../../../components/login";
import {browser} from "protractor";
import {Meganav} from "../../../../../components/meganav";
import {buttonNames, columnHeaders, meganavItems, modalTitles} from "../../../../../testData/global";
import {gridElements, searchElements, toolbarElements, transposeElements} from "../../../../../elements/elements";
import {Grid} from "../../../../../components/grid";
import {Transpose} from "../../../../../components/grid";
import {Button} from "../../../../../components/simple/button";
import {Toolbar} from "../../../../../components/toolbar";
import {ParametricSearchLogic} from "../../../../../bussinesLayer/search/parametricSearchLogic";
import {Modal} from "../../../../../components/modal";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const grid: Grid = new Grid();
const transpose: Transpose = new Transpose();
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
const modal: Modal = new Modal();

describe('Parametric Search Transpose', () => {
    it('should transpose grid and compare columns', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        const newGridHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();

        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });


    it('should compare raw in new grid and column in transpose', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        let gridRawName: string[] = await gridElements.newGridRows.getText();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        let transposeHeaderNames = await transpose.transposeReturnCellValuesByColumnName(1,
            gridRawName[4] +': '+ gridRawName[5]);
        await transpose.checkingArrayContainSecondArray(gridRawName, transposeHeaderNames);
    });

    it ('should hide column and compare grid and transpose', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await grid.newGridHideColumnByName(columnHeaders.search.partsDefaultLayout[1]);
        const newGridHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        const transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should return on new grid and check hide column', async () => {
        const transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
        const newGridHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it ('should check Add Risk Attributes layout in transpose', async  () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await toolbar.closeToolbarDropdownByButtonName('Add Risk Attributes');
        const newGridHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        const transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should return on new grid and check Add Risk Attributes layout saved', async () => {
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
        const newGridHeaders: string[] = await grid.newGridGetVisibleColumnHeaders();
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });
});