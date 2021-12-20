import {browser} from "protractor";
import {buttonNames, linksNames, meganavItems} from "../../../../testData/global";
import {gridElements, cplElements, bomElements, dropdownElements, commonElements} from "../../../../elements/elements";
import {CplDashboardLogic} from "../../../../bussinesLayer/cpl/cpl/cplDashboardLogic";
import {BomDashboardLogic} from "../../../../bussinesLayer/bomVault/bomDashboardLogic";
import {Dropdown} from "../../../../components/dropdown";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";

const bomDashboardLogic: BomDashboardLogic = new BomDashboardLogic();
const cplDashboardLogic: CplDashboardLogic = new CplDashboardLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal;
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const helpLogic: HelpLogic = new HelpLogic();

describe('BOM Vault Dashboard',  () => {

    it('should navigate to Single Bom Dashboard',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openSingleBomByName('Automation_BOM');
        await browser.waitForAngularEnabled(false);
        await link.clickOnTheLinkByNameAndWaitForElement('Dashboard', bomElements.dashboard.bomSummary);
        await browser.waitForAngularEnabled(false);
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Dashboard');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Dashboard');
    });

    it("should be Assembly Life Cycle Risk Score Graphic", async () => {
        await expect(await cplElements.dashboard.triangleInBar.isDisplayed()).toBeTruthy();
        await expect((await commonElements.popoverContent.get(0).getText()).length).toBeGreaterThan(0);
        await helpLogic.openAndCheckHelpPanelTitle('Dashboard');
    });

    it('should have Dashboard Summary ',  async () => {
        const expectedTitles:string[] = [ 'Parts Summary', 'Manufacturers Summary',
            'Life Cycle Summary', 'Assembly Life Cycle Risk Score', 'Part Alerts' ];
        const summaryLabels: string[] =  [ 'Parts', 'Matched Parts', 'Part Exceptions',
            'UnMatched Parts', 'Parts with No Life Cycle Info', 'Sub-Assemblies' ];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(expectedTitles);
        await expect(await cplElements.dashboard.partsSummaryRowLabels.getText()).toEqual(summaryLabels);
        await expect(await bomElements.dashboard.sectionFields.count()).toEqual(23)
    });

    it('should go to BOM Details - Parts Filter',  async () => {
        await bomDashboardLogic.checkingPartSummaryLInks(0);
    });

    it('should go to BOM Details - Matched Parts Filter',  async () => {
        await bomDashboardLogic.checkingPartSummaryLInksByFilterValue(1, 'Matched Parts');
    });

    it('should go to BOM Details - Part Exceptions Filter',  async () => {
        await bomDashboardLogic.checkingPartSummaryLInksByFilterValue(2,'Show all unmatched parts');
    });

    it('should go to BOM Details - UnMatched Parts Filter',  async () => {
        await bomDashboardLogic.checkingPartSummaryLInks(3);
    });

    it('should go to part alerts from Discontinued and should match with ammount - today',  async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(0);
    });

    it('should go to part alerts from End of Life  and should match with ammount - today', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(1);
    });

    it('should go to part alerts from PCN/PFN and should match with ammount - today', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(2);
    });

    it('should go to part alerts from Reinstated and should match with ammount - today', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(3);
    });

    it('should go to part alerts from Discontinued and should match with ammount - Last 7 Days',  async () => {
        await browser.sleep(1000);
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        await Dropdown.selectValueInDropdownByValueName('Last 7 Days',  bomElements.dashboard.partsAlertsLinks.get(0));
        await bomDashboardLogic.checkingPartAlertsLinks(0);
    });

    it('should go to part alerts from End of Life  and should match with ammount - Last 7 Days', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(1);
    });

    it('should go to part alerts from PCN/PFN and should match with ammount - Last 7 Days', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(2);
    });

    it('should go to part alerts from Reinstated and should match with ammount - Last 7 Days', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(3);
    });

    it('should go to part alerts from Discontinued and should match with ammount - today - Last 30 Days',  async () => {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        await Dropdown.selectValueInDropdownByValueName('Last 30 Days', bomElements.dashboard.partsAlertsLinks.get(0));
        await bomDashboardLogic.checkingPartAlertsLinks(0);
    });

    it('should go to part alerts from End of Life  and should match with ammount - Last 30 Days', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(1);
    });

    it('should go to part alerts from PCN/PFN and should match with ammount - Last 30 Days', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(2);
    });
    it('should go to part alerts from Reinstated and should match with ammount - Last 30 Days', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(3);
    });

    it('should go to part alerts from Discontinued and should match with ammount - Last 6 Months', async () => {
        await browser.sleep(1000);
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        await Dropdown.selectValueInDropdownByValueName('Last 6 Months', bomElements.dashboard.partsAlertsLinks.get(0));
        //temporary desigion
        await browser.sleep(7000);
        await bomDashboardLogic.checkingPartAlertsLinks(0);
    });

    it('should go to part alerts from End of Life  and should match with ammount - Last 6 Months', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(1);
    });

    it('should go to part alerts from PCN/PFN and should match with ammount - Last 6 Months', async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(2);
    });

    it('should go to part alerts from Reinstated and should match with ammount - Last 6 Months',  async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(3);
    });

    it('should go to part alerts from Discontinued and should match with ammount - today - Last Year',  async () => {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        await Dropdown.selectValueInDropdownByValueName('Last Year', bomElements.dashboard.partsAlertsLinks.get(0));
        await bomDashboardLogic.checkingPartAlertsLinks(0);
    });

    it('should go to part alerts from End of Life  and should match with ammount - Last Year',  async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(1);
    });

    it('should go to part alerts from PCN/PFN and should match with ammount - Last Year',  async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(2);
    });

    it('should go to part alerts from Reinstated and should match with ammount - Last Year',  async () => {
        await bomDashboardLogic.checkingPartAlertsLinks(3);
    });

    it('should go to Mfr Prefs',  async () => {
        await cplDashboardLogic.goToSection('Mfr Prefs', cplElements.dashboard.partsSummaryRowLabels.last(),
            'BOM Dashboard: Manufacturer Preferences Summary');
    });

    it('should have Mfr Prefs sections ',  async () => {
        const expectedLifeCycleSections:string[] = ['Manufacturer Preferences Summary'];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(expectedLifeCycleSections);
        const labels: string[] = [ 'Total Parts with Preferred Manufacturers', 'Parts with Manufacturer Approved Status',
            'Parts with Manufacturer Approval Required Status', 'Parts with Manufacturer Not Approved Status',
            'Parts with Manufacturer Do Not Use Status', 'Parts with Manufacturer Other Status',
            'Parts with No Manufacturer Preference Status' ];
        await expect(await cplElements.dashboard.partsSummaryRowLabels.getText()).toEqual(labels);
    });

    it('should not be found for Mfr Prefs',  async () => {
        await bomDashboardLogic.notFoundChecking();
    });

    it('should go to Matching',  async () => {
        await cplDashboardLogic.goToSection('Matching', bomElements.dashboard.matchingSection,
            'BOM Dashboard: Matching');
    });

    it('should have Matching sections ',  async () => {
        const expectedLifeCycleSections:string[] = [ 'Manufacturer Matching', 'Part Matching' ];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(expectedLifeCycleSections);
    });

    it('should not be found for Matching',  async () => {
        await bomDashboardLogic.notFoundChecking();
    });

    it('should go to Life Cycle',  async () => {
        await cplDashboardLogic.goToSection('Life Cycle', bomElements.dashboard.lifeCycleSection,
            'BOM Dashboard: Life Cycle');
    });

    it('should have Life Cycle sections ',  async () => {
        const expectedLifeCycleSections:string[] = ['BOM Life Cycle Health Chart', 'Available Parts', 'Discontinued Parts'];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(expectedLifeCycleSections);
    });

    it('should not be found for Life Cycle',  async () => {
        await bomDashboardLogic.notFoundChecking();
    });

    it('should go to Environmental',  async () => {
        await cplDashboardLogic.goToSection('Environmental', cplElements.dashboard.summarySectionTitle.get(1),
            'BOM Dashboard: Environmental');
    });

    it('should have Environmentalv sections ',  async () => {
        const expectedLifeCycleSections:string[] = ['EU RoHS Compliance', 'China RoHS Compliance', 'REACH Compliance' ];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(expectedLifeCycleSections);
    });

    it('should not be found for Environmental',  async () => {
        await bomDashboardLogic.notFoundChecking();
    });

    it('should open create report modal',  async () => {
        await modal.openModalWithButtonByName(buttonNames.createReport);
        await expect(await modal.modalTitle.getText()).toEqual('Create Single BOM Dashboard Report.');
        await modal.closeModalWithXButton();
        await modal.openModalWithButtonByName(buttonNames.createReport);
        await modal.closeModalWithButton(buttonNames.cancel);
    });

    it('Select View as Single Page',  async () => {
        await bomDashboardLogic.viewAsSinglePage();
        await login.logout();
    });

});
