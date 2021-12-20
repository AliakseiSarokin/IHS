import {browser} from "protractor";
import {gridElements, partDetailsElements} from "../../../../elements/elements";
import {meganavItems, commonData} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {partDetailsData} from "../../../../testData/partDetails";

const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();

describe('Part Details modal with links from BOM Details grid - Matched Part Number', () => {

    it('should open Part details modal by clicking on part number - BOM Details', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBonLogic.openSingleBomByName(commonData.bomNameWithIcons);
        await partDetailsLogic.newGridOpenPartDetModalFromMatchedPNLinkInSearch();
    });

    it(" should be export dropdown - Matched Part Number - BOM Details", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be active in the left nav - Matched Part Number BOM Details ', async () => {
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual(partDetailsData.leftNav.activePartDetails)
    });

    it('should be basic section in the left nav - Matched Part Number BOM Details ', async () => {
        await partDetailsLogic.checkBasicSection()
    });

    it('should be Life Cycle section in the left nav - Matched Part Number BOM Details ', async () => {
        await partDetailsLogic.checkLifeCycleSection()
    });

    it('should be Compliance section in the left nav - Matched Part Number BOM Details ', async () => {
        await partDetailsLogic.checkComplianceSection()
    });

    it('should be Attribute and Value column headers -  Matched Part Number - BOM Details', async () => {
        const expectedColumnHeaders = [ 'Attribute', 'Value' ];
        await expect(await grid.newGridGetVisibleColumnHeadersInModal()).toEqual(expectedColumnHeaders);
    });

    it('should not be sorting for Attribute column headers - Matched Part Number - BOM Details',  async () => {
        await grid.notBeSortingPartDetails();
    });

    it('should be add button with dropdown list  - Matched Part Number - BOM Details',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - Matched Part Number - BOM Details',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - Matched Part Number - BOM Details',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it('should open res request modal and be pre populated values', async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open print preview all modal - Matched Part Number -  BOM Details', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - Matched Part Number - BOM Details', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - Matched Part Number - BOM Details', async () => {
        await partDetailsLogic.searchByExample();
    });

});









