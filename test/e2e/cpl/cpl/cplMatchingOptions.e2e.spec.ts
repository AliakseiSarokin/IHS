import {browser} from "protractor";
import {buttonNames, headerItems, meganavItems, titles} from "../../../../testData/global";
import {bomElements, gridElements, headerElements, importElements, settings} from "../../../../elements/elements";
import {importItems} from "../../../../testData/import";
import {Dropdown} from "../../../../components/dropdown";
import {Header} from "../../../../components/header";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SetCplMatchingOptionsLogic} from "../../../../bussinesLayer/cpl/cpl/setCplMatchingOptionsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";

const helpLogic: HelpLogic = new HelpLogic();
const importLogic: ImportLogic = new ImportLogic();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const setCplMatchingOptionsLogic: SetCplMatchingOptionsLogic = new SetCplMatchingOptionsLogic();
const toolbar: Toolbar = new Toolbar();
describe('CPL Matching Preferences', () => {

    it('should open CPL Matching Options modal ', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.clickOnTheMeganavItemByName(meganavItems.cpl);
        await modal.openModalWithLinkName(meganavItems.cplSublinks.setBomImportCplMatchingOptions);
        await expect(await modal.modalTitle.getText()).toEqual(titles.setBomImportCplMatchingOptions);
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Administer CPL details');
    });

    it("should open help panel and check opened subitem", async () => {
        await helpLogic.openHelpPanelAndCheckOpenedSubitem('Set BOM Import Matching options');
    });

    it('should close CPL Matching Options modal', async () => {
        await modal.closeModalWithXButton();
        await meganav.clickOnTheMeganavItemByName(meganavItems.cpl);
        await modal.openModalWithLinkName(meganavItems.cplSublinks.setBomImportCplMatchingOptions);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('should uncheck all Matching Options modal and be alert', async () => {
        await meganav.clickOnTheMeganavItemByName(meganavItems.cpl);
        await modal.openModalWithLinkName(meganavItems.cplSublinks.setBomImportCplMatchingOptions);
        await setCplMatchingOptionsLogic.uncheckAllMAtching()
    });

    it('should check all Matching Options modal and be alert', async () => {
        await setCplMatchingOptionsLogic.checkAllMatching();
    });

    it('should be logic for default options', async () => {
        await setCplMatchingOptionsLogic.defaultOptionChecking();
    });

    it('should save options', async () => {
        await modal.closeModalWithButton(buttonNames.save);
        await meganav.clickOnTheMeganavItemByName(meganavItems.cpl);
        await modal.openModalWithLinkName(meganavItems.cplSublinks.setBomImportCplMatchingOptions);
        await setCplMatchingOptionsLogic.saveOptionsToCheck();
        await modal.closeModalWithXButton();
    });

    it('should be options in import', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganav(meganavItems.import, importElements.aboutImport);
        await importLogic.goToStep1();
        await importLogic.uploadAValidFileToImport();
        await importLogic.openOptionModalByTitle(importItems.optionTitles.bomImport.optionTitles[2]);
        await setCplMatchingOptionsLogic.checkingOptionsInImport();
        await importLogic.closeOptionModalWithX();
        await importLogic.leaveImportWitLeaveModal();
    });

    it('should be options in settings', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await setCplMatchingOptionsLogic.checkingOptionsInSettings();
    });

    it('should open help panel and check title', async () => {
        await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[1],
            settings.module);
        await helpLogic.openAndCheckHelpPanelTitle('BOM import settings: Default Options');
    });


    it('should be options in attributes', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
        await Dropdown.selectValueInDropdownByValueName('View Only My BOMs');
        await singleBomLogic.openFirstSingleBom();
        await link.clickOnTheLinkByNameAndWaitForElement('Attributes', bomElements.attributes.attributesWait);
        await setCplMatchingOptionsLogic.checkingOptionsInBomAttributes();
    });
});