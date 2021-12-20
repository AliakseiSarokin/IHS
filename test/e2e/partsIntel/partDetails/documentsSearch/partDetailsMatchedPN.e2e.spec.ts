import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements, searchElements} from "../../../../../elements/elements";
import {meganavItems, commonData, modalTitles} from "../../../../../testData/global";
import {commonSearch} from "../../../../../testData/search";
import {partDetailsData} from "../../../../../testData/partDetails";
import {DocumentsSearchLogic} from "../../../../../bussinesLayer/search/documentsSearchLogic";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Grid} from "../../../../../components/grid";
import {Modal} from "../../../../../components/modal";
import {PartDetailsLogic} from "../../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../../bussinesLayer/bomVault/singleBomLogic";
import {QuickSearch} from "../../../../../components/quickSearch";
const documentsSearchLogic = new DocumentsSearchLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
const quickSearch = new QuickSearch();
describe('Part Details modal with links from Parts Search grid  - Matched Part Number', () => {

    it('should open Part details modal by clicking on part number - Parts Search', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.documents.docSearchFieldLabels.get(0));
        await documentsSearchLogic.performDocumentsSearch('km311');
        await documentsSearchLogic.goToViewRelatedParts();
        await partDetailsLogic.openPartDetModalLinkNewGrid(0,4);
    });

    it(" should be export dropdown - Matched Part Number - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be active in the left nav - Matched Part Number Parts Search ', async () => {
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual(partDetailsData.leftNav.activePartDetails)
    });

    it('should be Attribute and Value column headers -  Matched Part Number - Parts Search', async () => {
        const expectedColumnHeaders = [ 'Attribute', 'Value' ];
        await grid.checkingColumnHeaders(0,expectedColumnHeaders);
    });

    it('should not be sorting for Attribute column headers - Matched Part Number - Parts Search',  async () => {
        await grid.notBeSortingPartDetails();
    });

    it('should open view alternates modal  - Matched Part Number - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });


    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - Matched Part Number -  Parts Search', async () => {
        await partDetailsLogic.printModal(undefined, modalTitles.printPreviewPL);
    });

    it('should open specific print preview modals - Matched Part Number - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Matched Part Number - Parts Search', async () => {
        await partDetailsLogic.searchByExample();
    });

});









