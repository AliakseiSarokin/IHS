import {AddPartsToBomLogic} from "../../../../bussinesLayer/search/addPartsToBomLogic";
import {BomTreeFilterLogic} from "../../../../bussinesLayer/bomVault/bomTreeFilterLogic";
import {browser} from "protractor";
import {Button} from "../../../../components/simple/button";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {commonSearch} from "../../../../testData/search";
import {Grid} from "../../../../components/grid";
import {commonElements, gridElements, partDetailsElements, searchElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartsSearchLogic} from "../../../../bussinesLayer/search/partsSearchLogic";
import {Toolbar} from "../../../../components/toolbar";
import {WorkspaceBoms} from "../../../../api/logicLayer/workspaceBoms";
import {user} from "../../../../api/testData/global";
import {Actions} from "../../../../utils/actions";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {ViewAlternatesLogic} from "../../../../bussinesLayer/partDetails/viewAlternatesLogic";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";

const bomTreeLogic = new BomTreeLogic();
const viewAlternatesLogic: ViewAlternatesLogic = new ViewAlternatesLogic();
const partsDetailsLogic = new PartDetailsLogic();
const action = new Actions();
const addPartsToBomLogic: AddPartsToBomLogic = new AddPartsToBomLogic();
const bomTreeFilterLogic: BomTreeFilterLogic = new BomTreeFilterLogic();
const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();
let rowValue: number;

describe('Add Parts to BOM - Parts search', () => {

    beforeAll(async ()=> {
        await WorkspaceBoms.addABomToWorkspaceIfNotAdded(user.groupAdmin)
    });


    it('should open Add To BOM(s) modal', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        rowValue = await gridElements.checkboxSelector.count();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.checkCheckboxRange(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await expect(await modal.modalTitle.getText()).toEqual('Add Selected Parts to BOM(s)');
    });

    it('should be 3 sections - Add To BOM(s) modal', async () => {
        await expect(await searchElements.addPartsToBom.panelTitle.getText()).toEqual(['Select BOM(s) from Workspace:',
            'AND/OR Select BOM(s) from the BOM Tree:']);
        await expect(await searchElements.addPartsToBom.panelH4.getText()).toEqual(['You have selected 1 parts in the results list:',
            'Select the BOM(s) to add these parts to:']);
    });

    it('should be select from workspace section', async () => {
        await expect(await searchElements.addPartsToBom.workspaceCheckboxes.count())
            .toEqual((await WorkspaceBoms.getWorkspaceBomList(user.groupAdmin)).length);
    });

    it('should be collapse from workspace section', async () => {
        await addPartsToBomLogic.collapseSectionByNumber(0);
    });

    it('should be expand and/or select bom(s) workspace section', async () => {
        await addPartsToBomLogic.expandSectionByNumber(1);
    });

    it('should open BOM Tree Filter', async () => {
        await bomTreeFilterLogic.openBomTreeFilter();
    });

    it('should close BOM Tree Filter', async () => {
        await bomTreeFilterLogic.closeBomTreeFilter();
    });

    it('should be definition icon panel', async () => {
        await bomTreeFilterLogic.openBomTreeFilter();
        await bomTreeFilterLogic.iconDefenitionPanelChecking();
    });

    it('should be search panel', async () => {
        await bomTreeFilterLogic.searchPanelChecking();
    });

    it('should show no results for unexisted item', async () => {
        await bomTreeFilterLogic.searchUnexisctedItem();
    });

    it('should show  results for existed item', async () => {
        await bomTreeFilterLogic.searchExistedItem();
    });

    it('should highlight selected item in the search results and in the bom tree', async () => {
        await bomTreeFilterLogic.highlightItemInTheGrid();  //here bug on the application side
    });

    it('should leave search results after closing filter', async () => {
        await bomTreeFilterLogic.leaveSearchResultsAfterClosingSlider();
    });

    it('should highlight the same item after closing filter and performing search again', async () => {
        await bomTreeFilterLogic.searchExistedItem();
        await bomTreeFilterLogic.highlightItemInTheGrid();  //here bug on the application side
        await bomTreeFilterLogic.closeBomTreeFilter();
    });

    it('should select from 2 section a part from workspace and add button should be active', async () => {
        await addPartsToBomLogic.expandSectionByNumber(0);
        await grid.checkCheckboxRange(0, 1);
        await expect(await button.returnButtonByText(buttonNames.addAndReturnToResults).isEnabled()).toBeTruthy();
    });

    it('should close Add To BOM(s) modal', async () => {
        await modal.closeModalWithButton(buttonNames.cancelAndReturnToResults);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await modal.closeModalWithXButton();
    });
});


describe('Add Parts to BOM - Parts search, DE362700', () => {

    it('should open Add To BOM(s) modal, regular user', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        rowValue = await gridElements.checkboxSelector.count();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.checkCheckboxRange(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await expect(await modal.modalTitle.getText()).toEqual('Add Selected Parts to BOM(s)');
    });

    it('should be warning tooltip for not regular user BOMs', async () => {
        await action.mouseMoveToElementAndWaitForTooltip(await gridElements.newGridDisabledCheckboxSelector.get(1), await commonElements.popoverContent.get(0));
        await expect(await commonElements.popoverContent.get(0).getText()).toContain('arts cannot be added to BOMs that you do not own or have administrative rights to.');
    });
});

describe('Add Parts to BOM - US350463, Add Parts to a BOM from BOM Tree - Add Tooltip When Users Do Not Have Permissions to Add to a BOM - Regular User', () => {

    it('should select part and verify Add Parts to a BOM throws a tooltip error message ', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        rowValue = await gridElements.checkboxSelector.count();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.checkCheckboxRange(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await action.mouseMoveToElementAndWaitForTooltip(searchElements.addPartsToBom.bomsCheckboxesDisabled.get(1),commonElements.popoverDiv.get(0))
        await expect(await commonElements.popoverDiv.get(0).getText()).toEqual('Parts cannot be added to BOMs that you do not own or have administrative rights to.');
        await button.clickByButtonName(buttonNames.cancelAndReturnToResults);
    });

    it('verify Add Parts to a BOM throws a tooltip error message inside part details modal', async () => {
        await partsDetailsLogic.newGridOpenPartDetModalFromIpnLinkInSearch();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await action.mouseMoveToElementAndWaitForTooltip(searchElements.addPartsToBom.bomsCheckboxesDisabled.get(1),commonElements.popoverDiv.get(0))
        await expect(await commonElements.popoverDiv.get(0).getText()).toEqual('Parts cannot be added to BOMs that you do not own or have administrative rights to.');
        await button.clickByButtonName(buttonNames.cancelAndReturnToResults);
        await button.clickByButtonName(buttonNames.okayThanks);
    });

    it('verify Add Parts to a BOM throws a tooltip error message inside Alternates modal', async () => {
        await viewAlternatesLogic.waitForIcon(partDetailsElements.viewAltIcon.first());
        await viewAlternatesLogic.openViewAlternatesModal(0, 'Part Number');
        await grid.checkCheckboxRange(0, 1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await action.mouseMoveToElementAndWaitForTooltip(searchElements.addPartsToBom.bomsCheckboxesDisabled.get(1),commonElements.popoverDiv.get(0))
        await expect(await commonElements.popoverDiv.get(0).getText()).toEqual('Parts cannot be added to BOMs that you do not own or have administrative rights to.');
        await button.clickByButtonName(buttonNames.cancelAndReturnToResults);
        await button.clickByButtonName(buttonNames.okayThanks);
    });

});

describe('Add Parts to BOM - US350463, Add Parts to a BOM from BOM Tree - Add Tooltip When Users Do Not Have Permissions to Add to a BOM - KBAdmin', () => {

    it('should select part and verify Add Parts to a BOM throws a tooltip error message ', async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        rowValue = await gridElements.checkboxSelector.count();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.checkCheckboxRange(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await action.mouseMoveToElementAndWaitForTooltip(searchElements.addPartsToBom.bomsCheckboxesDisabled.get(1),commonElements.popoverDiv.get(0))
        await expect(await commonElements.popoverDiv.get(0).getText()).toEqual('Parts cannot be added to BOMs that you do not own or have administrative rights to.');
        await button.clickByButtonName(buttonNames.cancelAndReturnToResults);
    });

    it('verify Add Parts to a BOM throws a tooltip error message inside part details modal', async () => {
        await partsDetailsLogic.newGridOpenPartDetModalFromIpnLinkInSearch();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await action.mouseMoveToElementAndWaitForTooltip(searchElements.addPartsToBom.bomsCheckboxesDisabled.get(1),commonElements.popoverDiv.get(0))
        await expect(await commonElements.popoverDiv.get(0).getText()).toEqual('Parts cannot be added to BOMs that you do not own or have administrative rights to.');
        await button.clickByButtonName(buttonNames.cancelAndReturnToResults);
        await button.clickByButtonName(buttonNames.okayThanks);
    });

    it('verify Add Parts to a BOM throws a tooltip error message inside Alternates modal', async () => {
        await viewAlternatesLogic.waitForIcon(partDetailsElements.viewAltIcon.first());
        await viewAlternatesLogic.openViewAlternatesModal(0, 'Part Number');
        await grid.checkCheckboxRange(0, 1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await action.mouseMoveToElementAndWaitForTooltip(searchElements.addPartsToBom.bomsCheckboxesDisabled.get(1),commonElements.popoverDiv.get(0))
        await expect(await commonElements.popoverDiv.get(0).getText()).toEqual('Parts cannot be added to BOMs that you do not own or have administrative rights to.');
        await button.clickByButtonName(buttonNames.cancelAndReturnToResults);
        await button.clickByButtonName(buttonNames.okayThanks);
    });

});

describe('Def 362730, Verify Add and return to BOM button behaving properly ', () => {

    it('Add and return to BOM button should not get enabled when multiple BOM folders are selected', async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        rowValue = await gridElements.checkboxSelector.count();
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.checkCheckboxRange(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await bomTreeLogic.checkFolderNewGridRowByName('Automation_US275549');
        await expect(await button.returnButtonByText(buttonNames.addAndReturnToResults).isEnabled()).toBeFalsy();
        await bomTreeLogic.checkFolderNewGridRowByName('b4testrestricted');
        await expect(await button.returnButtonByText(buttonNames.addAndReturnToResults).isEnabled()).toBeFalsy();
        await button.clickByButtonName(buttonNames.cancelAndReturnToResults);
    });
});