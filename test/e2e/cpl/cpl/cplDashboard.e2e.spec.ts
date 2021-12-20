import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {bomElements, cplElements, dropdownElements, gridElements} from "../../../../elements/elements";
import {BomDashboardLogic} from "../../../../bussinesLayer/bomVault/bomDashboardLogic";
import {Dropdown} from "../../../../components/dropdown";
import {CplDashboardLogic} from "../../../../bussinesLayer/cpl/cpl/cplDashboardLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";

const bomDashboardLogic: BomDashboardLogic = new BomDashboardLogic();
const cplDashboardLogic: CplDashboardLogic = new CplDashboardLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const helpLogic: HelpLogic = new HelpLogic();

describe('CPL Dashboard', () => {

    it('should navigate to CPL Dashboard',  async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.manageCpl, gridElements.grid);
        await link.clickOnTheLinkByNameAndWaitForElement('Dashboard', cplElements.dashboard.waitElementDashboard)
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('CPL Dashboard');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('CPL Dashboard');
    });

    it('should have Dashboard Summary sections with titles and CPL Summary row labels ',  async () => {
        const expectedTitles:string[] = [ 'CPL Parts Summary', 'CPL Manufacturers Summary',
            'CPL Life Cycle Summary', 'CPL Life Cycle Risk Score', 'CPL Alerts' ];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(expectedTitles);
        await expect(await cplElements.dashboard.partsSummaryRowLabels.getText())
            .toEqual([ 'Parts', 'Matched Parts', 'Part Exceptions', 'UnMatched Parts' ]);

    });

    it('should match Parts in CPL Parts Summary ',  async () => {
        await cplDashboardLogic.cplSummaryPartCountChecking()
    });

    it('should match Matched Parts in CPL Parts Summary ',  async () => {
        await link.clickOnTheLinkByNameAndWaitForElement('Dashboard', cplElements.dashboard.waitElementDashboard);
        await cplDashboardLogic.cplSummaryMatchUnmatchPartCountCheckingLessThan(1,'CPL Details',
            buttonNames.filter,'CPL Parts with just 1 Mfr Part')
    });

    it('should match Part Exceptions in CPL Parts Summary ',  async () => {
        await link.clickOnTheLinkByNameAndWaitForElement('Dashboard', cplElements.dashboard.waitElementDashboard);
        await cplDashboardLogic.cplSummaryPartExceptionsCountChecking(cplElements.dashboard.partsSummaryRowCounts)
    });

    it('should match UnMatched Parts in CPL Parts Summary ',  async () => {
        await link.clickOnTheLinkByNameAndWaitForElement('Dashboard', cplElements.dashboard.waitElementDashboard);
        await cplDashboardLogic.cplSummaryMatchUnmatchPartCountChecking(3,4,
            buttonNames.filter,'Show all unmatched parts');
    });

    it('should have CPL Mfr Summary row labels',  async () => {
        await link.clickOnTheLinkByNameAndWaitForElement('Dashboard', await cplElements.dashboard.partsSummaryRowCounts.get(1));
        await expect(await cplElements.dashboard.mfrSummaryRowLabels.getText())
            .toEqual([ 'Manufacturers', 'Matched Manufacturers', 'Manufacturer Exceptions',
                'Parts Related to Mfr Exceptions', 'Parts Related to Unmatched Mfrs' ]);
    });

    it('should match Mfrs in CPL Mfrs Summary ',  async () => {
        await cplDashboardLogic.cplSummaryMatchUnmatchMfrCountChecking(0,3,buttonNames.filter,
           'Clear Filter' )
    });

    it('should match Matched Mfrs in CPL Mfrs Summary ',  async () => {
        await link.clickOnTheLinkByNameAndWaitForElement('Dashboard', await cplElements.dashboard.partsSummaryRowCounts.get(1));
        await cplDashboardLogic.cplSummaryMatchUnmatchMfrCountChecking(1,3,buttonNames.filter,
            'Show matched manufacturers')
    });

    it('should match Mfr Exceptions in CPL Mfrs Summary ',  async () => {
        await link.clickOnTheLinkByNameAndWaitForElement('Dashboard', cplElements.dashboard.waitElementDashboard);
        await cplDashboardLogic.cplSummaryManufacturersExceptionsCountChecking(cplElements.dashboard.mfrSummaryRowCounts)
    });

    it('should match UnMatched Mfrs in CPL Mfrs Summary ',  async () => {
        await cplDashboardLogic.cplSummaryMatchUnmatchMfrCountCheckingLessThan(3,3,buttonNames.filter,
            'Show manufacturers with no matches')
    });

    it('should have CPL Life Cycle Summary row labels',  async () => {
        await link.clickOnTheLinkByNameAndWaitForElement('Dashboard', await cplElements.dashboard.partsSummaryRowCounts.get(1));
        const rowLabels = [ 'Total Discontinued', 'Unique Discontinued', 'Discontinued with Alternates',
            'Discontinued without Alternates', 'End of Life / NRFND', 'Unique End of Life / NRFND',
            'Active', 'Unique Active', 'Active - Single Source', 'Active - Multiple Sources',
            'Contact Manufacturer', 'Unique Contact Manufacturer' ];
        await expect(await cplElements.dashboard.lifeCycleRowLabels.getText()).toEqual(rowLabels);
    });

    it('should go to part alerts from Discontinued and should match with ammount - today ',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(0);
    });

    it('should go to part alerts from End of Life  and should match with ammount - today',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(1);
    });

    it('should go to part alerts from PCN/PFN and should match with ammount - today',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(2);
    });

    it('should go to part alerts from Reinstated and should match with ammount - today',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(3);
    });

    it('should go to part alerts from Discontinued and should match with ammount - today - Last 7 Days',  async () => {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        await Dropdown.selectValueInDropdownByValueNameWithoutWait('Last 7 Days');
        await browser.sleep(2000); //"Discontinued" link value updates with delay
        await cplDashboardLogic.checkingPartAlertsLInks(0);
    });

    it('should go to part alerts from End of Life  and should match with ammount - Last 7 Days ',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(1);
    });

    it('should go to part alerts from PCN/PFN and should match with ammount - Last 7 Days',  async () => {
        await browser.executeScript("document.querySelectorAll('.col-md-2.part-alerts-link')[1].scrollIntoView()");
        await cplDashboardLogic.checkingPartAlertsLInks(2);
    });

    it('should go to part alerts from Reinstated and should match with ammount - Last 7 Days',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(3);
    });

    it('should go to part alerts from Discontinued and should match with ammount - today - Last 30 Days',  async () => {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        await Dropdown.selectValueInDropdownByValueName('Last 30 Days',  bomElements.dashboard.partsAlertsLinks.get(0));
        await cplDashboardLogic.checkingPartAlertsLInks(0);
    });

    it('should go to part alerts from End of Life  and should match with ammount - Last 30 Days ',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(1);
    });

    it('should go to part alerts from PCN/PFN and should match with ammount - Last 30 Days',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(2);
    });
    it('should go to part alerts from Reinstated and should match with ammount - Last 30 Days',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(3);
    });

    it('should go to part alerts from Discontinued and should match with ammount - today - Last 6 Months',  async () => {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        await Dropdown.selectValueInDropdownByValueName('Last 6 Months',  bomElements.dashboard.partsAlertsLinks.get(0));
        await browser.sleep(2000); //"Discontinued" link value updates with delay
        await cplDashboardLogic.checkingPartAlertsLInks(0);
    });

    it('should go to part alerts from End of Life  and should match with ammount - Last 6 Months ',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(1);
    });

    it('should go to part alerts from PCN/PFN and should match with ammount - Last 6 Months',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(2);
    });

    it('should go to part alerts from Reinstated and should match with ammount - Last 6 Months',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(3);
    });

    it('should go to part alerts from Discontinued and should match with ammount - today - Last Year',  async () => {
        await Dropdown.openDropdownByClickOnElement(dropdownElements.dropdownToggle.get(0));
        await Dropdown.selectValueInDropdownByValueName('Last Year',  bomElements.dashboard.partsAlertsLinks.get(0));
        await browser.sleep(2000); //"Discontinued" link value updates with delay
        await cplDashboardLogic.checkingPartAlertsLInks(0);
    });

    it('should go to part alerts from End of Life  and should match with ammount - Last Year ',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(1);
    });

    it('should go to part alerts from PCN/PFN and should match with ammount - Last Year',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(2);
    });

    it('should go to part alerts from Reinstated and should match with ammount - Last Year',  async () => {
        await cplDashboardLogic.checkingPartAlertsLInks(3);
    });

    it('should go to mfr prefs',  async () => {
        await cplDashboardLogic.goToSection('Mfr Prefs', cplElements.dashboard.mfrPrefSection,'CPL Dashboard: Manufacturer Preferences Summary');
    });

    it('should have mfr prefs sections ',  async () => {
        const expectedLifeCycleSections = ['CPL Manufacturer Preferences Summary'];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(expectedLifeCycleSections);
    });

    it('should have mfr prefs section labels ',  async () => {
        await cplDashboardLogic.mfrPrefLabelsChecking();
    });

    it('should go to matching',  async () => {
        await cplDashboardLogic.goToSection('Matching', cplElements.dashboard.matchingSection,'CPL Dashboard: Matching');
    });

    it('should have matching sections ',  async () => {
        const expectedLifeCycleSections = ['CPL Manufacturer Matching',
            'CPL Part Matching' ];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(expectedLifeCycleSections);
    });

    it('should not found for matching',  async () => {
       await bomDashboardLogic.notFoundChecking();
    });

    it('should display diagram for matching',  async () => {
        await cplDashboardLogic.diagramDisplaying(2)
    });

    it('should go to Life Cycle',  async () => {
        await cplDashboardLogic.goToSection('Life Cycle', cplElements.dashboard.lifeCycleSection,'CPL Dashboard: Life Cycle');
    });

    it('should have Life Cycle sections ',  async () => {
        const expectedLifeCycleSections = [ 'CPL Life Cycle Health Chart',
            'CPL Available Parts', 'CPL Discontinued Parts' ];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(expectedLifeCycleSections);
    });

    it('should not found for life cycle',  async () => {
        await bomDashboardLogic.notFoundChecking();
    });

    it('should display diagram for life cycle',  async () => {
        await cplDashboardLogic.diagramDisplaying(3)
    });

    it('should go to Environmental',  async () => {
        await cplDashboardLogic.goToSection('Environmental', cplElements.dashboard.enviromentalSection,'CPL Dashboard: Environmental');
    });

    it('should have Enviromental sections ',  async () => {
        const expectedLifeCycleSections = [ 'EU RoHS Compliance',
            'China RoHS Compliance', 'REACH Compliance' ];
        await expect(await cplElements.dashboard.summarySectionTitle.getText()).toEqual(expectedLifeCycleSections);

    });

    it('should not have found for enviromental',  async () => {
        await bomDashboardLogic.notFoundChecking();
    });

    it('should display diagram for enviromental',  async () => {
        await cplDashboardLogic.diagramDisplaying(3)
    });

    it('Select View as Single Page',  async () => {
        await cplDashboardLogic.viewAsSinglePage();
    });

});
