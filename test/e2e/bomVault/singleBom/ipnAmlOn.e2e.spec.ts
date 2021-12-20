import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {bomElements, commonElements, gridElements} from "../../../../elements/elements";
import {AddAPartLogic} from "../../../../bussinesLayer/bomVault/addAPartLogic";
import {AmlLogic} from "../../../../bussinesLayer/bomVault/amlLogic";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Shade} from "../../../../components/shade";
import {Waiters as w} from "../../../../helper/waiters";
import {user} from "../../../../api/testData/global";
import {WorkspaceBoms} from "../../../../api/logicLayer/workspaceBoms";

const addAPartLogic: AddAPartLogic = new AddAPartLogic();
const amlLogic: AmlLogic = new AmlLogic();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const singleBomLogic: SingleBomLogic = new SingleBomLogic();

describe(' BOM with checked "Use Internal Part Number to Build AML" option - DOM details', () => {

    it('should not have hyperlinks in IPN cells for NON AML BOM ', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.gridWrapper);
        await amlLogic.checkingBOmWithAmlOff();
    });

    it('should have hyperlinks in IPN cells AML BOM', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await amlLogic.checkingBOmWithAmlOn();
    });

    it('should open "AML for Internal Part" modal by click on Internal P/N link, Part Alerts tab, DE126586', async () => {
        await link.clickOnTheLinkByNameAndWaitForElement('Part Alerts', await gridElements.newGridCheckboxSelectorByIndex(0));
        const linkText: string = (await grid.newGridReturnCellValuesByColumnName(0, 'Internal P/N'))[0];
        await modal.openModalWithLinkName(linkText);
        await modal.checkModalTitleName('AML for Internal Part: ' + linkText);
        await modal.closeModalIfPresent();
    });

    it('should be active/inactive edit AML for IPN', async () => {
        await link.clickOnTheLinkByNameAndWaitForElement('BOM Details', await gridElements.newGridCheckboxSelectorByIndex(0));
        await amlLogic.checkingEditAmlButton();
    });

    it('should open AML Modal by clicking on the edit AML for IPN', async () => {
        await amlLogic.openAmlClickingOnEditAml();
    });

    it('should show All AML Parts using AML fiter - BOM Details', async () => {
        await amlLogic.amlFilter();
    });

    it('should show Preferred AML Parts using AML fiter - BOM Details', async () => {
        await amlLogic.preferedAmlSingleBOM();
    });

    it('should open AML modal by clicking on the IPN link - bom details', async () => {
        await amlLogic.openAmlModal();
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('AML records');
    });

    it('should be subtitle for AML modal - bom details', async () => {
        await amlLogic.amlModalSubtitle();
    });

    it('should have exect column headers for AML modal - bom details', async () => {
        await amlLogic.rightColumnHeaders();
    });

    it('should have tooltips for attributes AML modal - bom details', async () => {
        await amlLogic.tooltipsChecking();
    });

    it('should close AML modal - bom details ', async () => {
        await modal.closeModalWithXButton();
        await amlLogic.openAmlModal();
        await modal.closeModalWithButton(buttonNames.close);
    });

    it('should be values for preffered part - bom details ', async () => {
        await amlLogic.checkValueForPreferredPart()
    });

    it('should select a part and open Add Part Modal - bom details', async () => {
        await amlLogic.openAddAmlPartModal();
    });

    it('should be add part modal tabs - BOM Details', async () => {
        const tabs: string[] = ['Search for a Part', 'Enter Part Details', 'Select from Workspace'];
        await expect(await commonElements.modalNavTabs.getText()).toEqual(tabs);
    });

    it('should be option to perform search in add a part modal - BOM Details', async () => {
        await addAPartLogic.firstTabPerformSearch();
    });

    it('should save a state for the first tab in add a part modal - BOM Details', async () => {
        await addAPartLogic.saveStateSearchTab(bomElements.amlModal.amlSearchForAPartCheckboxes);
    });

    it('should be fields for enter part details tab - BOM Details', async () => {
        await addAPartLogic.fieldsForSecondTab();
    });

    it('should fill all fields for enter part details tab - BOM Details', async () => {
        await addAPartLogic.fillSecondTabFields(2);
    });

    it('should save a state for the second tab in add a part modal - BOM Details', async () => {
        await WorkspaceBoms.addAPartToWorkspaceIfNotAdded(user.groupAdmin);
        await addAPartLogic.saveStateSecondTab(2);
    });

    it('should save a state for the third tab in add a part modal - BOM Details', async () => {
        await addAPartLogic.saveStateThirdTab();
    });

    it('should be reset clear button and work properly - BOM Details', async () => {
        await addAPartLogic.resetButtonChecking(2);
    });

    it('should add a part for Add Part modal - AML', async () => {
        await amlLogic.addPartAml();
    });

    it('should set as prefered selected part for AML modal - bom details ', async () => {
        await amlLogic.setAsPrefAmlModal();
    });

    it('should remove selected part for AML modal - bom details', async () => {
        await amlLogic.removePartAmlModal();
    });

    it('should close add a part AML modal - BOM Details ', async () => {
        await amlLogic.openAddAmlPartModal();
        await Shade.closeShadeWithButton(buttonNames.cancel)
    });

    it('should close add a part AML modal through close modal - BOM Details ', async () => {
        await amlLogic.openAddAmlPartModal();
        await amlLogic.goToTab('Enter Part Details');
        await addAPartLogic.fillSecondTabFields(2);
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await expect(await modal.severalModalTitles.last().getText()).toEqual('Do not add part records?');
        await modal.closeModalWithElement(modal.modalX.get(1));
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await modal.closeModalWithButton(buttonNames.doNotCloseModal);
        await modal.openModalWithButtonByName(buttonNames.cancel);
        await Shade.closeShadeWithButton(buttonNames.closeDoNotAddPartRecordsToTheAml);
        await modal.closeModalWithXButton();
    });
});

describe(' Risk Columns in Part Alesrt for On or Off AML ', () => {

    it('should not be risk columns in Part Alerts tab for BOM with AML Off', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await singleBomLogic.openSingleBomByName('AML_IPN_OFF');
        await link.clickOnTheLinkByNameAndWaitForElement('Part Alerts', gridElements.grid);
        await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckbox);
        await amlLogic.checkingRiskColumnPresent(false);
    });

    it('should not be risk columns in Part Alerts tab for BOM with AML On', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await singleBomLogic.openSingleBomByName('AML_IPN_ON');
        await link.clickOnTheLinkByNameAndWaitForElement('Part Alerts', gridElements.grid);
        await w.waitUntilElementToBeUnselected(gridElements.selectAllCheckbox);
        await amlLogic.checkingRiskColumnPresent(true);
    });
});
