import {Login} from "../../../../../components/login";
import {browser, element} from "protractor";
import {Meganav} from "../../../../../components/meganav";
import {
    buttonNames,
    columnHeaders,
    linksNames,
    meganavItems,
    modalTitles
} from "../../../../../testData/global";
import {
    gridElements,
    searchElements,
    shadeElements,
    toolbarElements,
    transposeElements
} from "../../../../../elements/elements";
import {Grid} from "../../../../../components/grid";
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
import {commonSearch} from "../../../../../testData/search";
import {Transpose} from "../../../../../components/grid";
import {Button} from "../../../../../components/simple/button";
import {Toolbar} from "../../../../../components/toolbar";
import {RadioButton} from "../../../../../components/simple/radioButton";
import {CheckBox} from "../../../../../components/simple/checkBox";
import {Shade} from "../../../../../components/shade";
import {Modal} from "../../../../../components/modal";
import {WorkspaceLogic} from "../../../../../bussinesLayer/worksapce/workspaceLogic";
import {QuickSearch} from "../../../../../components/quickSearch";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const grid: Grid = new Grid();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const transpose: Transpose = new Transpose();
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();
const radioButton: RadioButton = new RadioButton();
const checkbox: CheckBox = new CheckBox();
const modal: Modal = new Modal;
const quickSearch: QuickSearch = new QuickSearch();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();

describe('Parts Search Transpose', () => {

    it('should be enabled transpose button in transposed mode for great amount of parts, DE111575 ', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearchWithWait('111', gridElements.firstRowLink);
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.headerCheckbox.get(0));
        await expect((toolbarElements.transposeButton).isEnabled()).toBeTruthy();
    });

    it('should transpose pagination checking', async () => {
        await quickSearch.performQuickSearchWithWait(commonSearch.commonValue, gridElements.firstRowLink);
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.headerCheckbox.get(0));
        await grid.newGridPaginationChecking();
    });

    it('should check tooltip on transpose button', async () => {
        await expect(await transposeElements.buttonTooltip.getAttribute('title')).toEqual('Transpose results: swap rows and columns');
    });


    it('should filter column in  grid and compare columns', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.newGridOpenFilterBoxByName('Part Number');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.get(0));
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.headerCheckbox.get(0));
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should transpose grid and compare columns', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.headerCheckbox.get(0));
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should return on new grid and compare columns', async () => {
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should compare raw in new grid and column in transpose', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        const gridRawName: string[] = await gridElements.newGridRows.get(0).getText();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.headerCheckbox.get(0));
        const transposeHeaderNames:string[] = await transpose.transposeReturnCellValuesByColumnName(1,
            gridRawName[4] + ': ' + gridRawName[5]);
        await transpose.checkingArrayContainSecondArray(gridRawName, transposeHeaderNames);
    });

    it('should done filter, transpose grid and compare columns', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await Shade.openShadeWithButton(buttonNames.filters);
        await radioButton.checkRadioButton(searchElements.parts.filterShade.reachCompiliantRadioButtonLabels.get(1),
            searchElements.parts.filterShade.reachCompiliantRadioButtonInputs.get(1));
        await Shade.closeShadeWithElement(shadeElements.shadeButton(buttonNames.search));
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should return on new grid and check filter save', async () => {
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should hide column and compare columns', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.newGridHideColumnByName(columnHeaders.search.partsDefaultLayout[1]);
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should return on new grid and check hide column', async () => {
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should check Life Cycle layout in transpose', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await toolbar.closeToolbarDropdownByButtonName('Life Cycle');
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should return on new grid and check Life Cicle layout saved', async () => {
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should check Environmental layout in transpose', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await toolbar.closeToolbarDropdownByButtonName('Environmental');
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should return on new grid and check Environmental layout saved', async () => {
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should check Combined layout in transpose', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await toolbar.closeToolbarDropdownByButtonName('Combined');
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, transposeElements.unlockedColumnCellsWithContent.get(0));
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });

    it('should return on new grid and check Combined layout saved', async () => {
        let transposeHeaders: string[] = await transpose.transposeReturnCellValuesByColumnName(0,
            'Attributes');
        await button.clickOnTheElementAndWait(toolbarElements.transposeButton, gridElements.newGridOpenHeaderSortButton.get(0));
        let newGridHeaders: string[] = await gridElements.newGridHeaderNames.getText();
        await transpose.checkingArrayContainSecondArray(newGridHeaders, transposeHeaders);
    });
});