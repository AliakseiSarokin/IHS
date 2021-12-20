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
describe('Part Details - Alerts - Parts Search', () => {

    it('should be documents icon in the Parts Search grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await expect(await partDetailsElements.alertsIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the alerts icon - Parts Search', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.alertsIcon, partDetailsData.tooltips.alerts);
    });

    it('should open part details modal by clicking on the alerts icon - Parts Search', async () => {
        await modal.openModalWithElement(partDetailsElements.alertsIcon.first());
    });

    it(" should be export dropdown - alerts - Parts Search", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should open view alternates modal  - alerts - Parts Search',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - alerts -  Parts Search', async () => {
        await partDetailsLogic.printModal(undefined, modalTitles.printPreviewPL);
    });

    it('should open specific print preview modals - alerts - Parts Search', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - alerts', async () => {
        await partDetailsLogic.searchByExample();
    });

});

