import {browser} from "protractor";
import {buttonNames, linksNames, meganavItems, titles} from "../../../../testData/global";
import {commonElements, gridElements, pageTitles, viewMfrPref, cplElements} from "../../../../elements/elements";
import {CplAttributesLogic} from "../../../../bussinesLayer/cpl/cpl/cplAttributesLogic";
import {Dropdown} from "../../../../components/dropdown";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Toolbar} from "../../../../components/toolbar";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
const cplAttributeLogic: CplAttributesLogic = new CplAttributesLogic();
const dropdown: Dropdown = new Dropdown();
const instructionPanel: InstructionPanel = new InstructionPanel();
const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const partDetailsLogic = new PartDetailsLogic();
const helpLogic: HelpLogic = new HelpLogic();

describe('CPL Attributes', () => {


    it('should navigate to CPL Attribtes Tab',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.grid);
        await link.clickOnTheLinkByNameAndWaitForElement('Attributes', cplElements.attributes.attributesWait);
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('CPL Attributes');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('CPL Attributes');
    });

    it('should be cpl attribute blocks ',  async () => {
        await expect(await cplElements.attributes.blockTitles.getText())
            .toEqual([ 'CPL Information', 'CPL Import Options', 'CPL Part Alert Options' ])

    });

    it('should be options in CPL Information block',  async () => {
        await expect(await cplElements.attributes.cplInfoLabels.getText())
            .toEqual([ 'Import Filename:', 'Last Updated Date/Time:', 'Last Updated User:' ]);
        await expect(await cplElements.attributes.cplInfoLabelValues.get(0).getText()).toContain('.xls');
        await expect(await cplElements.attributes.cplInfoLabelValues.get(2).getText())
            .toEqual('BOM4 Test Group Admin (b4testadmin)');
        await expect(await cplElements.attributes.cplImportOptionsLabels.getText()).toEqual([ 'Matching Options:' ]);
    });


    it('should add email',  async () => {
        await cplAttributeLogic.addEmail();
    });

    it('should delete email',  async () => {
        await cplAttributeLogic.deleteEmail();
    });

    it('should work cancel for email',  async () => {
        await cplAttributeLogic.cancelEmailChecking();
    });

    it('should be email validation email',  async () => {
        await cplAttributeLogic.emailValidationChecking();
    });

    it('should be active save changes/reset button when edit End of Life Notice' ,  async () => {
        await cplAttributeLogic.matchingOptionActiveReset(0);
    });

    it('should reset End of Life Notice' ,  async () => {
        await cplAttributeLogic.resetChecking(0);
    });

    it('should be active save changes/reset button when edit Product Change Notice' ,  async () => {
        await cplAttributeLogic.matchingOptionActiveReset(1);
    });

    it('should reset Product Change Notice' ,  async () => {
        await cplAttributeLogic.resetChecking(1);
    });

    it('should be active save changes/reset button when edit Part Status Change' ,  async () => {
        await cplAttributeLogic.matchingOptionActiveReset(2);
    });

    it('should reset Part Status Change' ,  async () => {
        await cplAttributeLogic.resetChecking(2);
    });

    it('should be active save changes/reset button when edit Product Failure/Counterfeit Notice' ,  async () => {
        await cplAttributeLogic.matchingOptionActiveReset(3);
    });

    it('should reset Product Failure/Counterfeit Notice' ,  async () => {
        await cplAttributeLogic.resetChecking(3);
    });

    it('should work cancel for Email Alert Type',  async () => {
        await cplAttributeLogic.cancelAlertTypeChecking();
    });

    it('should change CPL Import Option',  async () => {
        await cplAttributeLogic.cplImportOptionChecking();
    });

    it('should open Reprocess CPL modal',  async () => {
        await cplAttributeLogic.reprocessModalChecking();
    });

    it('should work reset for CPL Import Option ',  async () => {
        await cplAttributeLogic.resetCheckingCplImportOption();
    });

    it('should work cancel for CPL Import Option ',  async () => {
        await cplAttributeLogic.cancelCplImportOptionChecking();
    });

});