import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements, searchElements} from "../../../../../elements/elements";
import {meganavItems, commonData, modalTitles} from "../../../../../testData/global";
import {commonSearch} from "../../../../../testData/search";
import {partDetailsData} from "../../../../../testData/partDetails";
import {DocumentsSearchLogic} from "../../../../../bussinesLayer/search/documentsSearchLogic";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav";
import {Modal} from "../../../../../components/modal";
import {PartDetailsLogic} from "../../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../../bussinesLayer/bomVault/singleBomLogic";
import {QuickSearch} from "../../../../../components/quickSearch";
const documentsSearchLogic = new DocumentsSearchLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
const quickSearch = new QuickSearch();
describe('Part Details - Alerts - Documents Search', () => {

    it('should be documents icon in the Documents Search grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.documents,
            searchElements.documents.docSearchFieldLabels.get(0));
        await documentsSearchLogic.performDocumentsSearch('texas');
        await documentsSearchLogic.goToViewRelatedParts();
        await expect(await partDetailsElements.alertsIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the alerts icon - Documents Search', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.alertsIcon, partDetailsData.tooltips.alerts);
    });

    it('should open part details modal by clicking on the alerts icon - Documents Search', async () => {
        await modal.openModalWithElement(partDetailsElements.alertsIcon.first());
    });

    it(" should be export dropdown - alerts - Documents Search", async () => {
        await partDetailsLogic.exportDropdown();
    });


    it('should open view alternates modal  - alerts - Documents Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - alerts -  Documents Search', async () => {
        await partDetailsLogic.printModal(undefined, modalTitles.printPreviewPL);
    });

    it('should open specific print preview modals - alerts - Documents Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - alerts', async () => {
        await partDetailsLogic.searchByExample();
    });

});

