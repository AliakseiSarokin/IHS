import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements, searchElements} from "../../../../../elements/elements";
import {meganavItems, commonData, modalTitles} from "../../../../../testData/global";
import {partDetailsData} from "../../../../../testData/partDetails";
import {commonSearch} from "../../../../../testData/search";
import {BomTreePartsLogic} from "../../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Grid} from "../../../../../components/grid";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Modal} from "../../../../../components/modal";
import {PartDetailsLogic} from "../../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../../bussinesLayer/bomVault/singleBomLogic";
import {QuickSearch} from "../../../../../components/quickSearch";
const bomTreePartsLogic = new BomTreePartsLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
const quickSearch:QuickSearch = new QuickSearch();
describe('Part Details modal with links from Parts Search grid - Mfr Name', () => {


    it('should open Part details modal by clicking on mfr name link - Parts Search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await partDetailsLogic.newGridOpenPartDetModalFromMfrNameLinkInSearch();
    });

    it(" should be export dropdown -  part number link - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be active in the left nav - Mfr Name - Parts Search', async () => {
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual('Manufacturer Information')
    });


    it('should be Attribute and Value column headers - Mfr Name - Parts Search', async () => {
        const expectedColumnHeaders = [ 'Attribute', 'Value' ];
        await grid.checkingColumnHeaders(0,expectedColumnHeaders);
    });

    it('should not be sorting for Attribute column headers - Mfr Name - Parts Search',  async () => {
        await grid.notBeSortingPartDetails();
    });

    it('should open view alternates modal  - part number link - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });


    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });


    it('should open  print preview all modal - part number link -  Parts Search', async () => {
        await partDetailsLogic.printModal(undefined, modalTitles.printPreviewPL);
    });

    it('should open specific print preview modals - part number link - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - part number link - Parts Search', async () => {
        await partDetailsLogic.searchByExample();
    });

});
