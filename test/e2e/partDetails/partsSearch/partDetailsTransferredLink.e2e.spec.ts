import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements,searchElements} from "../../../../elements/elements";
import {meganavItems, commonData} from "../../../../testData/global";
import {commonSearch} from "../../../../testData/search";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {QuickSearch} from "../../../../components/quickSearch";
const bomTreePartsLogic = new BomTreePartsLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
const quickSearch:QuickSearch = new QuickSearch();

describe('Part Details modal with links from search results grid - Transferred link', () => {

    it('should open Part details modal by clicking on Transferred link link', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await partDetailsLogic.openTransferredLink();
    });

    it('should be Attribute and Value column headers - Transferred link', async () => {
        const expectedColumnHeaders = [ 'Attribute', 'Value' ];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual( expectedColumnHeaders);
    });

    it('should not be sorting for Attribute column headers - Transferred link - Parts Search',  async () => {
        await grid.notBeSortingPartDetails();
    });


    it('should be add button with dropdown list  -  Transferred link',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  -  Transferred link ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - Transferred link - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it(" should be export dropdown -  Transferred link - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should open  print preview all modal - alerts - Transferred link', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - alerts - Transferred link', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example -  Transferred link', async () => {
        await partDetailsLogic.searchByExample();
    });

});

