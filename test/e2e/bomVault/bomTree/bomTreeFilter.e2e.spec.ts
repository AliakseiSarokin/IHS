import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles, exportOptions} from "../../../../testData/global";
import {bomElements, commonElements, gridElements, partDetailsElements, bomVaultElements} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {BomTreeFilterLogic} from "../../../../bussinesLayer/bomVault/bomTreeFilterLogic";
import {Grid} from "../../../../components/grid";
import {Dropdown} from "../../../../components/dropdown";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Shade} from "../../../../components/shade";
import {BomTreeLogic} from "./../../../../bussinesLayer/bomVault/bomTreeLogic";

const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const bomTreeFilterLogic: BomTreeFilterLogic = new BomTreeFilterLogic();
const dropdown: Dropdown = new Dropdown();
const grid: Grid = new Grid();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();
const bomTreeLogic:BomTreeLogic = new BomTreeLogic();
describe(' BOM Tree Filter in BOM Tree',  () => {

    it(" should open BOM Tree Filter ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(3));
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
    });

    it('should be option to interract with toolbar when filter is opened ',  async () => {
        await bomTreeFilterLogic.toolbarOptionsWithOpenFilterBomTree();
    });

});


describe(' BOM Tree Filter in Move Folder Shade', () => {

    it(" should open BOM Tree Filter ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.newGridCheckboxSelector.get(3));
        await grid.newMechanismCheckboxRangeChecking(1, 2);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.modify);
        await Shade.openShadeWithButton(buttonNames.moveBoms);
        await bomTreeFilterLogic.openBomTreeFilter();
    });

    it('should close BOM Tree Filter', async () => {
        await bomTreeFilterLogic.closeBomTreeFilter();
    });

    it('should be definition icon panel ', async () => {
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
        await bomTreeFilterLogic.highlightItemInTheGrid();
    });

    it('should leave search results after closing filter', async () => {
        await bomTreeFilterLogic.leaveSearchResultsAfterClosingSlider();
    });

    it('should highlight the same item after colsing filter and performing search again', async () => {
        await bomTreeFilterLogic.searchExistedItem();
        await bomTreeFilterLogic.highlightItemInTheGrid();
    });


});
