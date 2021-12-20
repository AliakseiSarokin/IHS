import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders, modalTitles} from "../../../../testData/global";
import {
    bomElements, commonElements, gridElements, modalElements,
    partDetailsElements
} from "../../../../elements/elements";
import {Button} from "../../../../components/simple/button";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartNotesLogic} from "../../../../bussinesLayer/bomVault/partNotesLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Toolbar} from "../../../../components/toolbar";
import {DateTime} from "../../../../utils/dateTime";

const button: Button = new Button();
const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partNoteLogic: PartNotesLogic = new PartNotesLogic();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const toolbar: Toolbar = new Toolbar();

describe('Part Notes from view single BOM', () => {

    it(" should have add/edit part note button", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.grid);
        await singleBomLogic.openSingleBomByName('AML_IPN_ON');
        await partNoteLogic.removePartNotesLinkIfIsPresent(); 
        await grid.newMechanismCheckboxRangeChecking(0, 1); 
        await toolbar.openToolbarDropdownByButtonName(buttonNames.add);
        await partNoteLogic.openPartNotesModal();
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Add part notes');
    });

    it(" should be export, email, copy, delete, save, reset buttons", async () => {
        await partNoteLogic.buttonsWithoutNotes();
    });

    it(" should add comment tab by default, should be status, previous comments tab", async () => {
        await partNoteLogic.partNotesModalTabs();
    });

    it(" should be 3830 characters limit for comment input field, DE117181", async () => {
        await partNoteLogic.checkCommentCharactersCounter();
    });

    it(" should be able to add a comment", async () => {
        await partNoteLogic.addCommentPartNotesModal();
    });

    it(" should go to previous comment tab and display saved comment", async () => {
        await partNoteLogic.goTOTabPartNotesModal('Previous Comments');
    });

    it(" should open copy modal ", async () => {
        await modal.openModalWithElement(toolbar.returnToolbarButtonByValue(buttonNames.copy));
        await expect(await modal.severalModalTitles.get(1).getText()).toEqual('Copy Part Note');
        const modalText: string[] = [ 'View and Edit Notes for this BOM Part.', 'Select options to copy this Part Note.',
            'Copying a Part Note creates a new record of the selected Part Note.' +
            ' The copied Part Note is not attached to the original Part Note and must be edited independently.',
            'Choose BOMs and Part Matching to receive Copied Part Note'  ];
        const buttonLabels: string[] = [ 'Copy Part Note and assign to all matching Parts on this BOM (AML_IPN_ON).',
            'Copy Part Note and assign to all matching Parts on all of my BOMs.', 'Match on Internal Part Number',
            'Match on Internal Part Number and Imported Manufacturer Part', 'Match on Imported Manufacturer Part' ];
        await expect(await modal.modalBodyPartNotesParag.getText()).toEqual(modalText);
        await expect(await commonElements.radioButtonLabel.getText()).toEqual(buttonLabels);
        await modal.closeModalWithXButton('Copy Part Note');
        await modal.openModalWithElement(toolbar.returnToolbarButtonByValue(buttonNames.copy));
        await modal.closeModalWithButton(buttonNames.cancelDoNotCopy);
    });

    it(" should open email modal ", async () => {
        await modal.openModalWithElement(toolbar.returnToolbarButtonByValue(buttonNames.email));
        await expect(await modal.severalModalTitles.get(1).getText()).toEqual('Email Part Note');
        const modalText: string[] = [ 'View and Edit Notes for this BOM Part.', 'Select options to Email this Part Note.', 'Emailing a Part Note will send an email notification ' +
        'to other users in your account that have an email address setup for the BOM based upon the Matching Part Options that you select.',
            'Choose a Matching Part option to determine how matching parts and BOMs are identified.' ];
        const buttonLabels: string[] = [ 'Match on Internal Part Number', 'Match on Internal Part Number and Imported Manufacturer Part',
            'Match on Imported Manufacturer Part' ];
        await expect(await modal.modalBodyPartNotesParag.getText()).toEqual(modalText);
        await expect(await commonElements.radioButtonLabel.getText()).toEqual(buttonLabels);
        await modal.closeModalWithXButton('Email Part Note');
        await modal.openModalWithElement(toolbar.returnToolbarButtonByValue(buttonNames.email));
        await modal.closeModalWithButton(buttonNames.cancelDoNotSendEmail);
    });

    it(" should able to go to status tab", async () => {
        await partNoteLogic.goTOTabPartNotesModal('Status');
    });

    it(" should be disabled 'Save' and 'Reset' buttons if all changes are saved, DE117256", async () => {
        await expect(await button.returnButtonByText('Save').isEnabled()).toBeFalsy();
        await expect(await button.returnButtonByText('Reset').isEnabled()).toBeFalsy();
    });

    it(" should retain default dropdown values after saving changes, DE117256", async () => {
        await partNoteLogic.applyTodaysDateInDataPicker(1);
        await button.clickOnTheElementAndWait(await button.returnButtonByText(buttonNames.save), await modalElements.modalTitleByName(modalTitles.working));
        await expect(await bomElements.partNotes.procurabilityDropdownInput.get(0).getAttribute('value')).toEqual('- Select Status -');
        await expect(await bomElements.partNotes.procurabilityDropdownInput.get(1).getAttribute('value')).toEqual('- Select Reason -');
    });

   it("should clear date field with reset button, DE117196", async () => {
        await expect(await bomElements.partNotes.dataPickerInputField.get(0).getText()).toEqual('');
        await partNoteLogic.applyTodaysDateInDataPicker(0);
        await expect(await bomElements.partNotes.dataPickerInputField.get(0).getAttribute('value')).toEqual(DateTime.getCurrentDateByFormat('DD-MMM-YYYY'));
        await modal.openModalWithButtonByName(buttonNames.reset);
        await modal.closeModalWithButton(buttonNames.yes);
        await expect(await bomElements.partNotes.dataPickerInputField.get(0).getAttribute('value')).toEqual('');
    });

    it(" should have fields labels", async () => {
        const labels: string[] = ['Case Number:','Procurability Status:', 'Procurability Reason:', 'Procurability Details:',
            'Expected Product Lifecycle', 'Quantity Required','Quantity in Stock',
            'Quantity Ordered', 'Date Ordered', 'Date Required By', 'Average Cost',
            'Redesign Planned Date', 'Replacement Part', 'Replacement Mfr', 'Note Create Date', 'Note Modified Date'  ]
        await expect(await bomElements.partNotes.statusLabels.getText()).toEqual(labels)
    });

    it(" should be Procurability Status with options", async () => {
        await partNoteLogic.proStatusOptions()
    });

    it(" should set default status and appropriate icon", async () => {
        await partNoteLogic.setDefaultStausPartNotes();
    });

    it(" should set procurable status and appropriate icon", async () => {
        await partNoteLogic.checkStatus(bomElements.partNotes.procurableStatus, 'Procurable');
    });

    it(" should set resolution status and appropriate icon", async () => {
        await partNoteLogic.checkStatus(bomElements.partNotes.resolutionStatus, 'Resolution in Process');
    });

    it(" should set resolved status and appropriate icon", async () => {
        await partNoteLogic.checkStatus(bomElements.partNotes.resolvedStatus,  'Resolved');
    });

    it(" should set unknown status and appropriate icon", async () => {
        await partNoteLogic.checkStatus(bomElements.partNotes.unknownStatus, 'Unknown');
    });

    it(" should set unprocurable status and appropriate icon", async () => {
        await partNoteLogic.checkStatus(bomElements.partNotes.unprocurableStatus, 'Unprocurable');
    });

    it(" should set unprocurable with alternates  status and appropriate icon", async () => {
        await partNoteLogic.checkStatus(bomElements.partNotes.unprocurableAltStatus, 'Unprocurable with Alternates');
    });

    it(" should be Procurability Reason with options", async () => {
        await partNoteLogic.proReasonOptions()
    });

    it(" should delete part note", async () => {
        await partNoteLogic.deletePartNote();
    });
})