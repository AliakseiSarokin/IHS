import {JasmineTimeout} from "../../../../helper/jasmineTimeout";
import {browser} from "protractor";
import {meganavItems} from "../../../../testData/global";
import {bomVaultElements, gridElements, pageTitles, reportElements} from "../../../../elements/elements";
import {HttpMethods, IResponse} from "../../../../utils/httpMethods";
import {user} from "../../../../api/testData/global";
import {endpoints} from "../../../../api/testData/endpointList";
import {Waiters as w} from "../../../../helper/waiters";
import {ReportsLogic} from "../../../../bussinesLayer/reports/reportsLogic";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {BomTreeLogic} from "../../../../bussinesLayer/bomVault/bomTreeLogic";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";

const reportsLogic = new ReportsLogic();
const singleBomLogic = new SingleBomLogic();
const bomTreeLogic: BomTreeLogic = new BomTreeLogic();
const login: Login = new Login();
const meganav: Meganav = new Meganav();

describe('Indentured BOMs child levels should not be displayed as BOMs in Recently viewed BOMs in Left Navigation, 363934', () => {

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(300000);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });
    let BOMNamesOpened: string[];
    BOMNamesOpened = ['AUTOMATION_Indentured'];
    let BOMNamesIsOpened: string[];
    BOMNamesIsOpened = ['AUTOMATION_Indentured...A3-L1'];

    it('Verify if user clicks on expand all for indentured BOMS opens all the child nodes.', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.checkboxSelector.get(1));
        await bomTreeLogic.expandFolderBomTreeWithName(BOMNamesOpened[0]);
        await singleBomLogic.openSingleBomByName('A3-L1');
        await reportsLogic.verifyBOMNamesPresentInLeftNav(BOMNamesIsOpened);
    });

    it('Verify if indentured BOM names are displayed in the left navigation. in generate reports page.', async () => {
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.reports,
            meganavItems.reportsSubItems.generateReport, reportElements.reports.standardReports.get(1));
        await reportsLogic.verifyBOMNamesPresentInLeftNav(BOMNamesIsOpened);
    });

});

//here the BOM id taken is for dev environment and need to changed in sqa for Automation_indentured BOM
describe('Indentured BOMs Expand All button, 365749', () => {
    let levelName: string[] = [''];
    beforeAll(async () => {

        let response: IResponse = (await HttpMethods.get(user.userAdmin, endpoints.bomsTree.bomAllChildrenById('15241885897')));
        for (let i = 0; i < response.body.length; i++) {
            levelName[i] = response.body[i].BM_BOM_NAME;
        }
    });
    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });
    it('Verify if user clicks on child levels for indentured BOMS opened from BOM Tree are displayed as BOM Names in the left navigation.', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.checkboxSelector.get(1));
        await bomTreeLogic.expandAllIndenturedBomTreeWithName(0);
        await browser.sleep(3000);
        await bomTreeLogic.checkExpandAllOpensAllChildNodes(levelName);
    });
});

//here the BOM ID is taken for dev environment and need to changed in sqa for Automation_indentured BOM  (dev - 15313877597)
describe('Indentured BOMs View Single BOM - Page Title and BOMs name displayed in the left panel for recently opened BOM links for Indentured BOMs, 275135, 369204', () => {
    let levelName: string[] = [''];
    let NHA: string[] = [''];

    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(300000);
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    it('Get all details for the AUTOMATION_Indentured BOM with all child nodes data', async () => {
        let response: IResponse = (await HttpMethods.get(user.userAdmin, endpoints.bomsTree.bomAllChildrenById('15241885897')));
        for (let i = 0; i < response.body.length; i++) {
            await console.dir(response.body[i]);
            levelName[i] = response.body[i].BM_BOM_NAME;
            NHA[i] = response.body[i].BM_NHA;
        }
    });

    it('Verify the page title is displayed properly, when a child node is selected in indentured BOMs', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.bomTree, gridElements.checkboxSelector.get(1));
        await bomTreeLogic.expandAllIndenturedBomTreeWithName(0);
        await browser.sleep(3000);
        await singleBomLogic.openSingleBomByName(levelName[(levelName.length - 1)]);
        await w.waitUntilWorkingModalNotDisplayed();
        await browser.sleep(3000);
        expect(await pageTitles.singleBomPageTitle.getAttribute('title')).toEqual(NHA[(NHA.length - 1)]);
        expect(await pageTitles.singleBomPageTitle.getText()).toEqual('View Single BOM: AUTOMATION_Indentured...' + levelName[(levelName.length - 1)]);
    });

    it('Verify the Left navigation label is displayed properly, when a child node is selected in indentured BOMs, 369204', async () => {
        expect(await bomVaultElements.bomTree.vaultLeftNav.last().getAttribute('title')).toEqual(NHA[(NHA.length - 1)]);
        expect(await bomVaultElements.bomTree.vaultLeftNav.last().getText()).toEqual('AUTOMATION_Indentured...' + levelName[(levelName.length - 1)]);
    });
});