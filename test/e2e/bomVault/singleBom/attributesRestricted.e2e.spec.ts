import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {gridElements, bomElements} from "../../../../elements/elements";
import {AttributesLogic} from "../../../../bussinesLayer/bomVault/attributesLogic";
import {Dropdown} from "../../../../components/dropdown";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";

const attributesLogic: AttributesLogic = new AttributesLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();
const helpLogic: HelpLogic = new HelpLogic();

describe('BOM Attributes - Restricted', () => {

    it('should go to BOM attributes',  async () => {
        await login.loginWithDirectLink(browser.params.restrictedUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(0));
        await toolbar.openToolbarDropdownByButtonName(buttonNames.filters);
        await Dropdown.selectValueInDropdownByValueName("View Only My BOMs");
        await singleBomLogic.openFirstProcessedSingleBom();
        await attributesLogic.rememberInitialValues();
        await link.clickOnTheLinkByNameAndWaitForElement('Attributes', bomElements.attributes.attributesWait)
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('BOM attributes');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Attributes');
    });

    it('should have correct BOM name and labels -  attributes',  async () => {
        await expect(await bomElements.attributes.leftSideSections.getText()).toEqual(['Import Attributes', 'Custom Attributes']);
        await expect(await bomElements.attributes.rightSideSections.getText()).toEqual(['BOM Import Configuration']);
        await expect(await bomElements.attributes.rightSideSectionLabels.getText()).toEqual( [ 'Alert Notifications:',
            'Email Alert Type:', 'Matching Options:', 'CPL Matching Options:', 'Optional Attributes:' ]);
    });

    it('should not be Vault name for BOM',  async () => {
        await attributesLogic.vaultNameChecking();
    });

    it('should active save changes/reset button when edit BOM name field',  async () => {
        await attributesLogic.activeSaveResetButtonsWhenEditFieldAndReset(bomElements.attributes.bomNameField)
    });

    it('should display new saved BOM name ',  async () => {
        await attributesLogic.editBomName();
    });

    it('should be active save changes/reset button when edit description field',  async () => {
        await attributesLogic.activeSaveResetButtonsWhenEditFieldAndReset(bomElements.attributes.descField);
    });

    it('should display new saved description ',  async () => {
        await attributesLogic.editDescription();
    });

    it('should add email',  async () => {
        await attributesLogic.addEmail();
    });

    it('should delete email',  async () => {
        await attributesLogic.deleteEmail();
    });

    it('should be active save changes/reset button when edit contact field',  async () => {
        await attributesLogic.activeSaveResetButtonsWhenEditFieldAndReset(bomElements.attributes.contactField);
    });

    it('should add contacts',  async () => {
        await attributesLogic.addEmailOrContact(bomElements.attributes.contactField, 0,50);
    });

    it('should delete contact',  async () => {
        await attributesLogic.deleteEmailOrContact(bomElements.attributes.contactField,2);
    });

    it('should be active save changes/reset button when edit phone field',  async () => {
        await attributesLogic.activeSaveResetButtonsWhenEditFieldAndReset(bomElements.attributes.phoneField);
    });

    it('should add phone',  async () => {
        await attributesLogic.addEmailOrContact(bomElements.attributes.phoneField,  1,16);
    });

    it('should delete phone',  async () => {
        await attributesLogic.deleteEmailOrContact(bomElements.attributes.phoneField,3);
    });

    it('should be active save changes/reset button when edit ipn field',  async () => {
        await attributesLogic.activeSaveResetButtonsWhenEditFieldAndReset(bomElements.attributes.ipnField);
    });

    it('should add IPN',  async () => {
        await attributesLogic.addEmailOrContact(bomElements.attributes.ipnField, 2,42);
    });

    it('should delete IPN',  async () => {
        await attributesLogic.deleteEmailOrContact(bomElements.attributes.ipnField,4);
    });

    it('should be active save changes/reset button when edit assembly field',  async () => {
        await attributesLogic.activeSaveResetButtonsWhenEditFieldAndReset(bomElements.attributes.assemblyField);
    });

    it('should add Assembly',  async () => {
        await attributesLogic.addEmailOrContact(bomElements.attributes.assemblyField,  3,50);
    });

    it('should delete Assembly',  async () => {
        await attributesLogic.deleteEmailOrContact(bomElements.attributes.assemblyField,5);
    });

    it('should be active save changes/reset button when edit quantity field',  async () => {
        await attributesLogic.activeSaveResetButtonsWhenEditFieldAndReset(bomElements.attributes.quantityField);
    });

    it('should add Quantity',  async () => {
        await attributesLogic.addEmailOrContact(bomElements.attributes.quantityField, 4,10);
    });

    it('should delete quantity',  async () => {
        await attributesLogic.deleteEmailOrContact(bomElements.attributes.quantityField,6);
    });

    it('should be active save changes/reset button when edit Use Internal Part Number to build AML' ,  async () => {
        await attributesLogic.checkingSaveChangesButton(0);
    });

    it('should open reporcess modal when edit Use Internal Part Number to build AML' ,  async () => {
        await attributesLogic.reprocessChecking();
    });

    it('should be active save changes/reset button when edit Match All Manufacturer Parts' ,  async () => {
        await attributesLogic.checkingSaveChangesButton(1);
    });

    it('should open reporcess modal when edit Match All Manufacturer Parts' ,  async () => {
        await attributesLogic.reprocessChecking();
    });

    it('should be active save changes/reset button when edit Auto Part Match' ,  async () => {
        await attributesLogic.checkingSaveChangesButton(2);
    });

    it('should open reporcess modal when edit Auto Part Match' ,  async () => {
        await attributesLogic.reprocessChecking();
    });

    it('should be at least one cpl matching option checked to save attributes' ,  async () => {
        await attributesLogic.uncheckAllCplOptionChecking();
    });

    it('should return to old attributes',  async () => {
        await attributesLogic.returnToOldAttributes();
    });

});
