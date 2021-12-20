import {browser} from "protractor";
import {gridElements, partDetailsElements, bomVaultElements} from "../../../../elements/elements";
import {meganavItems, commonData} from "../../../../testData/global";
import {commonSearch} from "../../../../testData/search";
import {partDetailsData} from "../../../../testData/partDetails";
import {BomTreePartsLogic} from "../../../../bussinesLayer/bomVault/bomTreePartsLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
const bomTreePartsLogic = new BomTreePartsLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
describe('Part Details - Alerts - BOM Tree Parts', () => {

    it('should be alerts icon in the BOM Tree Parts grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTreeParts, bomVaultElements.bomTreeParts.bomTreePartsWait.get(1));
        await bomTreePartsLogic.expandFolderBomTreeParts();
        await singleBonLogic.openSingleBomByName(commonData.bomNameWithIcons);
        await expect(await partDetailsElements.alertsIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the alerts icon - BOM Tree Parts', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.alertsIcon, partDetailsData.tooltips.alerts);
    });

    it('should open part details modal by clicking on the alerts icon - BOM Tree Parts', async () => {
        await modal.openModalWithElement(partDetailsElements.alertsIcon.first());
    });

    it(" should be export dropdown - alerts - BOM Tree Parts", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be add button with dropdown list  - alerts - BOM Tree Parts',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - alerts - BOM Tree Parts ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - alerts - BOM Tree Parts',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - alerts -  BOM Tree Parts', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - alerts - BOM Tree Parts', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - alerts', async () => {
        await partDetailsLogic.searchByExample();
    });

});
