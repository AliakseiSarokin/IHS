import {browser} from "protractor";
import {linksNames, meganavItems, titles} from "../../../../testData/global";
import {pageTitles, viewMfrPref} from "../../../../elements/elements";
import {viewMfrPrefData} from "../../../../testData/cpl";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {ImportMfrPredLogic} from "../../../../bussinesLayer/cpl/viewMfrPref/importMfrPredLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Growlers} from "../../../../components/growlers";
const importLogic: ImportLogic = new ImportLogic();
const importMfrPrefLogic: ImportMfrPredLogic = new ImportMfrPredLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const helpLogic: HelpLogic = new HelpLogic();
describe('Import Manufacturer Preferences', () => {

    it('should go to Import Manufacturer Preferences from Meganav',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.importMfr, viewMfrPref.import.importWait);
        await expect(await pageTitles.importMfrTitle.getText()).toEqual(titles.importMfrPref);
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Import Manufacturer Status');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Manufacturer Preferences');
    });

    it('should open help panel and check opened subitem',  async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Import Manufacturer Preferences');
    });

    it('should be View a sample file link with option to open modal',  async () => {
        await modal.openModalWithLinkName(linksNames.viewASampleFile);
        await expect(await modal.modalTitle.getText()).toEqual('Sample Manufacturer Preferences Import File');
        await modal.closeModalWithXButton();
    });

    it('should open help panel and check opened subitem',  async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Import Manufacturer Preferences');
    });

    it('should be drag and drop container',  async () => {
        const dragDropText = 'Drag and drop a list of manufacturers file here or browse your computer';
        await importLogic.dragAndDropBoxChecking(dragDropText);
    });

    it('should be disabled all elements when file is not uploaded',  async () => {
        await importMfrPrefLogic.disableElementsChecking('true','true');
    });

    it(" should be warning modal when upload empty files ", async () => {
        await importLogic.uploadEmptyFiles();
    });

    it(" should be warning modal when upload header only files ", async () => {
        await importLogic.uploadHeaderOnlyFiles();
    });

    it(" should be warning modal when upload  header only not first row files ", async () => {
        await importLogic.uploadHeaderOnlyNotFirstRowFiles();
    });

    it('should upload a file',  async () => {
        await importMfrPrefLogic.uploadAValidFileToImportMfrPref();
    });

    it('should be correct dropdown labels',  async () => {
        await expect(await viewMfrPref.import.dropdownLabels.getText()).toEqual( [ '* Manufacturer Name:', 'Manufacturer ID:',
            'Manufacturer Preference:', 'Comments:' ])
    });

    it('should be correct Imported Manufacturer Name dropdown options',  async () => {
        await importMfrPrefLogic.dropdownOptions(0, viewMfrPrefData.import.columnMappingOptions);
    });

    it('should be correct  Manufacturer ID Name dropdown options',  async () => {

        await importMfrPrefLogic.dropdownOptions(1, viewMfrPrefData.import.columnMappingOptions);
    });

    it('should be correct Manufacturer Preference dropdown options',  async () => {

        await importMfrPrefLogic.dropdownOptions(2, viewMfrPrefData.import.columnMappingOptions);
    });

    it('should be correct Comments dropdown options',  async () => {
        await importMfrPrefLogic.dropdownOptions(3, viewMfrPrefData.import.columnMappingOptions)
    });

    it('should be enable all elements when file is  uploaded',  async () => {
        await importMfrPrefLogic.disableElementsChecking(null, 'true');
    });

    it('should import mfr pref',  async () => {
        await importMfrPrefLogic.importMfrPref();
    });

    it('Import Manufacturer Preference Status Growler',  async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.importMfr, viewMfrPref.import.importWait);
        await Growlers.muteGrowlersNotifications(false);
        await importMfrPrefLogic.uploadAValidFileToImportMfrPref();
        await importMfrPrefLogic.importMfrPref();
        await importMfrPrefLogic.checkGrowlerStatusIsCompleted();
        await importMfrPrefLogic.clickOnLinkInGrowler();
        await Growlers.muteGrowlersNotifications(true);
    });

    it('should be warning message on leaving page without saving changes',  async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.importMfr, viewMfrPref.import.importWait);
        await importMfrPrefLogic.uploadAValidFileToImportMfrPref();
        await meganav.goToFeatureWithMeganav(meganavItems.home, modal.modalBody);
        await expect(await modal.modalTitle.getText()).toEqual('Leave this page?');
        await expect(await modal.modalBody.getText()).toEqual('Are you sure you want to leave without importing your Manufacturer Preferences?');
    });



});