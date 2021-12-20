import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements,searchElements} from "../../../../elements/elements";
import {meganavItems, commonData} from "../../../../testData/global";
import {commonSearch} from "../../../../testData/search";
import {DocumentsSearchLogic} from "../../../../bussinesLayer/search/documentsSearchLogic";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {QuickSearch} from "../../../../components/quickSearch";
const documentsSearchLogic = new DocumentsSearchLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
const quickSearch:QuickSearch = new QuickSearch();
describe('Part Details modal with links from Documents Search grid - Mfr Name', () => {


    it('should open Part details modal by clicking on mfr name link - Documents Search', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.searchField);
        await documentsSearchLogic.performDocumentsSearch('km311');
        await documentsSearchLogic.goToViewRelatedParts();
        await partDetailsLogic.newGridOpenPartDetModalFromMfrNameLinkInSearch();
    });

    it('should be active in the left nav - Mfr Name - Documents Search', async () => {
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual('Manufacturer Information')
    });


    it('should be Attribute and Value column headers - Mfr Name - Documents Search', async () => {
        const expectedColumnHeaders = [ 'Attribute', 'Value' ];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual(expectedColumnHeaders);
    });

    it('should not be sorting for Attribute column headers - Mfr Name - Documents Search',  async () => {
        await grid.notBeSortingPartDetails();
    });

    it('should be add button with dropdown list  - part number link - Documents Search', async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - part number link - Documents Search',   async () => {
        await partDetailsLogic.addToBomModal();
    });

    it(" should be export dropdown -  part number link - Documents Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should open view alternates modal  - part number link - Documents Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });


    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });


    it('should open  print preview all modal - part number link -  Documents Search', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - part number link - Documents Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - part number link - Documents Search', async () => {
        await partDetailsLogic.searchByExample();
    });

});
