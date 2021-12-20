import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements,searchElements} from "../../../../../elements/elements";
import {meganavItems, commonData, modalTitles} from "../../../../../testData/global";
import {commonSearch} from "../../../../../testData/search";
import {BomTreePartsLogic} from "../../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Grid} from "../../../../../components/grid";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Modal} from "../../../../../components/modal";
import {ParametricSearchLogic} from "../../../../../bussinesLayer/search/parametricSearchLogic";
import {PartDetailsLogic} from "../../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../../bussinesLayer/bomVault/singleBomLogic";
import {partDetailsData} from "../../../../../testData/partDetails";
const bomTreePartsLogic = new BomTreePartsLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const parametricSearchLogic: ParametricSearchLogic = new ParametricSearchLogic();
describe('Part Details modal with links from Parametric Search grid  - Matched Part Number', () => {

    it('should open Part details modal by clicking on part number - Parametric Search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parametric, searchElements.parametric.commodities.get(0));
        await parametricSearchLogic.performParametricSearch();
        await partDetailsLogic.openPartDetModalLinkNewGrid(0,4);
    });

    it(" should be export dropdown - Matched Part Number - Parametric Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be active in the left nav - Matched Part Number Parametric Search ', async () => {
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual(partDetailsData.leftNav.activePartDetails)
    });

    it('should be Attribute and Value column headers -  Matched Part Number - Parametric Search', async () => {
        const expectedColumnHeaders = [ 'Attribute', 'Value' ];
        await grid.checkingColumnHeaders(0,expectedColumnHeaders);
    });

    it('should not be sorting for Attribute column headers - Matched Part Number - Parametric Search',  async () => {
        await grid.notBeSortingPartDetails();
    });

    it('should open view alternates modal  - Matched Part Number - Parametric Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });


    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - Matched Part Number -  Parametric Search', async () => {
        await partDetailsLogic.printModal(undefined, modalTitles.printPreviewPL);
    });

    it('should open specific print preview modals - Matched Part Number - Parametric Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Matched Part Number - Parametric Search', async () => {
        await partDetailsLogic.searchByExample();
    });

});









