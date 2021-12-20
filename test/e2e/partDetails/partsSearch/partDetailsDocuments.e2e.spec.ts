import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements, searchElements} from "../../../../elements/elements";
import {meganavItems, commonData} from "../../../../testData/global";
import {partDetailsData} from "../../../../testData/partDetails";
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
describe('Part Details - Documents - Parts Search', () => {

    it('should be documents icon in the Parts Search grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearchWithWait(commonSearch.commonValue,
            gridElements.newGridCellByRowIndex(0).get(0));
        await expect(await partDetailsElements.docIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the Documents icon - Parts Search', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.docIcon,partDetailsData.tooltips.documents);
    });

    it('should open part details modal by clicking on the Documents icon - Parts Search', async () => {
        await modal.openModalWithElement(partDetailsElements.docIcon.first());
    });

    it('should be column headers for documents - Parts Search',  async () => {
        const expectedColumnHeaders = [ 'Document Type', 'Document Title', 'Publication Date' ];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual( expectedColumnHeaders);
    });

    it('should be links in Document Title column - Parts Search',  async () => {
        await partDetailsLogic.linksChecking();
    });

    it('should be sorting for Document Type column headers - documents - Parts Search',  async () => {
        await partDetailsLogic.sortingForColumnHeader(0, 'Sort A to Z');
    });

    it('should be sorting for Publication Date column headers - documents',  async () => {
        await partDetailsLogic.sortingForColumnHeader(2, 'Sort Oldest to Newest');
    });

    it(" should be export dropdown - Documents - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be add button with dropdown list  - Documents - Parts Search',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - Documents - Parts Search ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - Documents - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - Documents -  Parts Search', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - Documents - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Documents', async () => {
        await partDetailsLogic.searchByExample();
    });

});

