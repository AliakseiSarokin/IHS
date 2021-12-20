import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements} from "../../../../elements/elements";
import {meganavItems, commonData} from "../../../../testData/global";
import {partDetailsData} from "../../../../testData/partDetails";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
const bomTreePartsLogic = new BomTreePartsLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
describe('Part Details - Documents - BOM Tree Parts', () => {

    it('should be documents icon in the BOM Tree Parts grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(1));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await singleBonLogic.openSingleBomByName(commonData.bomNameWithIcons);
        await expect(await partDetailsElements.docIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the Documents icon - BOM Tree Parts', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.docIcon,partDetailsData.tooltips.documents);
    });

    it('should open part details modal by clicking on the Documents icon - BOM Tree Parts', async () => {
        await modal.openModalWithElement(partDetailsElements.docIcon.first());
    });

    it('should be column headers for documents - BOM Tree Parts',  async () => {
        const expectedColumnHeaders = [ 'Document Type', 'Document Title', 'Publication Date' ];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual(expectedColumnHeaders);
    });

    it('should be links in Document Title column - BOM Tree Parts',  async () => {
        await partDetailsLogic.linksChecking();
    });

    it('should be sorting for Document Type column headers - documents - BOM Tree Parts',  async () => {
        await partDetailsLogic.sortingForColumnHeader(0, 'Sort A to Z');
    });

    it('should be sorting for Publication Date column headers - documents',  async () => {
        await partDetailsLogic.sortingForColumnHeader(2, 'Sort Oldest to Newest');
    });

    it(" should be export dropdown - Documents - BOM Tree Parts", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be add button with dropdown list  - Documents - BOM Tree Parts',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - Documents - BOM Tree Parts ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - Documents - BOM Tree Parts',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - Documents -  BOM Tree Parts', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - Documents - BOM Tree Parts', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Documents', async () => {
        await partDetailsLogic.searchByExample();
    });

});

