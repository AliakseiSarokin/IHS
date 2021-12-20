import {browser} from "protractor";
import {buttonNames, meganavItems, modalTitles, exportOptions} from "../../../../testData/global";
import {searchElements, gridElements} from "../../../../elements/elements";
import {commonSearch} from "../../../../testData/search";
import {AddPartsToBomLogic} from "../../../../bussinesLayer/search/addPartsToBomLogic";
import {BomTreeFilterLogic} from "../../../../bussinesLayer/bomVault/bomTreeFilterLogic";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {ParametricSearchLogic} from "../../../../bussinesLayer/search/parametricSearchLogic";
import {Toolbar} from "../../../../components/toolbar";
import {WorkspaceBoms} from "../../../../api/logicLayer/workspaceBoms";
import {user} from "../../../../api/testData/global";
import {JasmineTimeout} from "../../../../helper/jasmineTimeout";
const addPartsToBomLogic: AddPartsToBomLogic = new AddPartsToBomLogic();
const bomTreeFilterLogic: BomTreeFilterLogic = new BomTreeFilterLogic();
const button: Button = new Button();
const grid:Grid = new Grid();
const modal:Modal = new Modal();
const meganav:Meganav = new Meganav();
const login: Login = new Login();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
const toolbar: Toolbar = new Toolbar();
let rowValue:number;


describe('Add Parts to BOM - Parts search', () => {

    beforeAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.maxElementWaitTime;
        await WorkspaceBoms.addABomToWorkspaceIfNotAdded(user.groupAdmin);
    });

    afterAll(async ()=> {
        browser.params.waitWebElementMaxTimeout = browser.params.defaultElementWaitTime;
    });

    it('should open Add To BOM(s) modal - Parts search ',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parametric,
            searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await grid.newMechanismCheckboxRangeChecking(0,1);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await expect(await modal.modalTitle.getText()).toEqual('Add Selected Parts to BOM(s)');
    });

    it('should be 3 sections - Add To BOM(s) modal - Parts search',  async() => {
        await expect(await searchElements.addPartsToBom.panelTitle.getText()).toEqual(['Select BOM(s) from Workspace:',
            'AND/OR Select BOM(s) from the BOM Tree:']);
        await expect(await searchElements.addPartsToBom.panelH4.getText()).toEqual(['You have selected 1 parts in the results list:',
            'Select the BOM(s) to add these parts to:' ]);
    });

    it('should be select from workspace section - Parts search',  async () => {
        await expect(await searchElements.addPartsToBom.workspaceCheckboxes.count())
            .toEqual((await WorkspaceBoms.getWorkspaceBomList(user.groupAdmin)).length);
    });

    it('should be colapse from workspace section - Parts search',  async () => {
        await addPartsToBomLogic.collapseSectionByNumber(0);
    });

    it('should be expand and/or select bom(s) workspace section - Parts search',  async () => {
        await addPartsToBomLogic.expandSectionByNumber(1);
    });

    it(" should open BOM Tree Filter ", async () => {
        await bomTreeFilterLogic.openBomTreeFilter();
    });

    it('should close BOM Tree Filter',  async () => {
        await bomTreeFilterLogic.closeBomTreeFilter();
    });

    it('should be definition icon panel ',  async () => {
        await bomTreeFilterLogic.openBomTreeFilter();
        await bomTreeFilterLogic.iconDefenitionPanelChecking();
    });

    it('should be search panel',  async () => {
        await bomTreeFilterLogic.searchPanelChecking();
    });

    it('should show no results for unexisted item',  async () => {
        await bomTreeFilterLogic.searchUnexisctedItem();
    });

    it('should show  results for existed item',  async () => {
        await bomTreeFilterLogic.searchExistedItem();
    });

    it('should highlight selected item in the search results and in the bom tree',  async () => {
        await bomTreeFilterLogic.highlightItemInTheGrid();
    });

    it('should leave search results after closing filter',  async () => {
        await bomTreeFilterLogic.leaveSearchResultsAfterClosingSlider();
    });

    it('should highlight the same item after colsing filter and performing search again',  async () => {
        await bomTreeFilterLogic.searchExistedItem();
        await bomTreeFilterLogic.highlightItemInTheGrid();
        await bomTreeFilterLogic.closeBomTreeFilter();
    });

    it('should select from 2 section a part from workspace and add button should be actove - Parts search',  async () => {
        await addPartsToBomLogic.expandSectionByNumber(0);
        await grid.checkCheckboxRange(0,1);
        await expect(await button.returnButtonByText(buttonNames.addAndReturnToResults).isEnabled()).toBeTruthy();
    });

    it('should close Add To BOM(s) modal - Parts search',  async () => {
        await modal.closeModalWithButton(buttonNames.cancelAndReturnToResults);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await modal.openModalWithButtonByName(buttonNames.addToBoms);
        await modal.closeModalWithXButton();
    });
});