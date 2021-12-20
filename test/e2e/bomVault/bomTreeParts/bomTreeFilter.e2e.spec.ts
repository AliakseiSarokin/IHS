import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles, exportOptions} from "../../../../testData/global";
import {bomElements, commonElements, gridElements, partDetailsElements, bomVaultElements} from "../../../../elements/elements";
import {cplData} from "../../../../testData/cpl";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {BomTreeFilterLogic} from "../../../../bussinesLayer/bomVault/bomTreeFilterLogic";
import {Dropdown} from "../../../../components/dropdown";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
const bomTreePartsLogic: BomTreePartsLogic = new BomTreePartsLogic();
const bomTreeFilterLogic: BomTreeFilterLogic = new BomTreeFilterLogic();
const dropdown: Dropdown = new Dropdown();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const singleBomLogic: SingleBomLogic = new SingleBomLogic();

describe(' BOM Tree Filter in BOM Tree Parts', () => {

    it(" should open BOM Tree Filter ", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomNameLink.get(0));
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
        await bomTreeFilterLogic.highlightItemInTheBomTreePartsGrid();
    });

    it('should leave search results after closing filter',  async () => {
        await bomTreeFilterLogic.leaveSearchResultsAfterClosingSlider();
    });

    it('should highlight the same item after colsing filter and performing search again',  async () => {
        await bomTreeFilterLogic.searchExistedItem();
        await bomTreeFilterLogic.highlightItemInTheBomTreePartsGrid();
    });

    it('should be option to interract with toolbar when filter is opened ',  async () => {
        await bomTreeFilterLogic.toolbarOptionsWithOpenFilterBomTreeParts();
    });

});
