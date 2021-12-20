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
describe('Part Details - Reference Design',  () => {

    it('should be reference design icon in the part search result grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearchWithWait('LM5001MA', partDetailsElements.referDesignIcon.first());
    });

    it('should be tooltip for the reference design icon', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.referDesignIcon,'View Reference Designs for this part');
    });

    it('should open part details modal by clicking on the reference design icon', async () => {
        await modal.openModalWithElement(partDetailsElements.referDesignIcon.first());
    });


    it('should be links in Reference Design URL column',  async () => {
        await partDetailsLogic.refDesignUrlLinks();
    });

    it('should be column headers for reference design',  async () => {
        const expectedColumnHeaders = ['Part Number', 'Manufacturer Part Description',
            'Reference Design URL', 'Commodity', 'Mfr Name' ];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual( expectedColumnHeaders);
    });

    it('should be add button with dropdown list  - Reference Design',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - Reference Design ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - Reference Design - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it(" should be export dropdown - Reference Design - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should open  print preview all modal - Reference Design', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - Reference Design', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Reference Design', async () => {
        await partDetailsLogic.searchByExample();
    });

});

describe('Part Details - Reference Design Parts', () => {

    it('should be reference design parts icon in the part search result grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,
            meganavItems.searchSubItem.parts, searchElements.searchField);
        await quickSearch.performQuickSearchWithWait('PMP10531', partDetailsElements.referDesignIcon.first());
        await expect(await partDetailsElements.referDesignIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the reference design icon', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.referDesignIcon,'View Parts for this Reference Design');
    });

    it('should open part details modal by clicking on the reference design icon', async () => {
        await modal.openModalWithElement(partDetailsElements.referDesignIcon.first());
    });

    it('should be links in part number column',  async () => {
        await partDetailsLogic.linksChecking();
    });

    it('should be column heraders for reference design',  async () => {
        const expectedColumnHeaders = ['Part Number', 'Description', 'Mfr Name'];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual( expectedColumnHeaders);
    });

    it('should be add button with dropdown list  - Reference Design Parts',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - Reference Design Parts ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it(" should be export dropdown - Reference Design Parts - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should open  print preview all modal - Reference Design Parts', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - Reference Design Parts', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Reference Design Parts', async () => {
        await partDetailsLogic.searchByExample();
    });
});