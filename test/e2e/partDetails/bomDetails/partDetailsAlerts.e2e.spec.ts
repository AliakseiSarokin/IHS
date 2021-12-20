import {browser} from "protractor";
import {gridElements, partDetailsElements} from "../../../../elements/elements";
import {meganavItems, commonData} from "../../../../testData/global";
import {partDetailsData} from "../../../../testData/partDetails";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";

import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
const helpLogic: HelpLogic = new HelpLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const singleBonLogic: SingleBomLogic = new SingleBomLogic();
//need to find test data
describe('Part Details - Alerts - BOM Details', () => {

    it('should be documents icon in the BOM Details grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBonLogic.openSingleBomByName(commonData.bomNameWithIcons);
        await expect(await partDetailsElements.alertsIcon.first().isDisplayed()).toBe(true);
    });

    it('should be tooltip for the alerts icon - BOM Details', async () => {
        await partDetailsLogic.iconTooltip(partDetailsElements.alertsIcon, partDetailsData.tooltips.alerts);
    });

    it('should open part details modal by clicking on the alerts icon - BOM Details', async () => {
        await modal.openModalWithElement(partDetailsElements.alertsIcon.first());
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('View part details');
    });

    it('should open Video slider, play video and close',  async () => {
        await VideoSliderLogic.openVideoSlider();
        await VideoSliderLogic.playingVideoChecking();
        await VideoSliderLogic.closeVideoSlider();
    });

    it(" should be export dropdown - alerts - BOM Details", async () => {
        await partDetailsLogic.exportDropdown();
    });

    it('should be add button with dropdown list  - alerts - BOM Details',  async () => {
        await partDetailsLogic.addDropdown();
    });

    it('should open Add to BOM(s) modal  - alerts - BOM Details ',  async () => {
        await partDetailsLogic.addToBomModal();
    });

    it('should open view alternates modal  - alerts - BOM Details',  async () => {
        await partDetailsLogic.goToViewAlternatesFromPartDetailsBoms();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await partDetailsLogic.researchRequestModalChecking();
    });

    it('should open  print preview all modal - alerts -  BOM Details', async () => {
        await partDetailsLogic.printModal();
    });

    it('should open specific print preview modals - alerts - BOM Details', async () => {
        await partDetailsLogic.checkingPrintPreviewModals();
    });

    it('should go to parametric by clicking on the search by example - alerts', async () => {
        await partDetailsLogic.searchByExample();
    });

});

