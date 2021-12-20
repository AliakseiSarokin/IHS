import {browser} from "protractor";
import {columnHeaders, meganavItems} from "../../../../testData/global";
import {gridElements} from "../../../../elements/elements";
import {partStandardData} from "../../../../testData/partStandard";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {Random} from "../../../../utils/random";

const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const random: Random = new Random();

describe('Part Standardization, slider tests', ()=> {
    it('should open slider after in # of BOMs', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView('AutomationTestSummarySlider', 2);
        await grid.mechanismCheckCheckboxByName('Name', 'AutomationTestSummarySlider');
        await partStandardizationLogic.goToSummaryTab();
        await partStandardizationLogic.openSliderByFirstLinkInColumnById(partStandardData.summaryTabColumnNamesContent.sameMfrPart['# of BOMs'],
            'Part Standardization Details Used in BOMs');
        await grid.newGridHideColumnsRange(['Imported Mfr P/N', 'Imported Mfr Name', 'Matched Mfr P/N', 'Matched Mfr Name']);
    });

    it(`should check slider after click on link in column # of IPNs`, async() => {
        await grid.newGridOpenFilterBoxByName('# of IPNs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.descSort, gridElements.newGridRows.last());
        await partStandardizationLogic.openSliderByFirstLinkInColumnById(partStandardData.summaryTabColumnNamesContent.sameMfrPart['# of IPNs'],
            'Part Standardization Details IPNs Slider');
    });

    it(`should check slider after click on link in column Active FFFs`, async() => {
        await grid.newGridHideColumnsRange(['# of BOMs', '# of IPNs', 'Avg Price', 'Avg LT', 'Total Quantity']);
        await grid.newGridOpenFilterBoxByName('Active FFFs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await partStandardizationLogic.openSliderByFirstLinkInColumnById(partStandardData.summaryTabColumnNamesContent.usedOnBoms['Active FFFs'],
            'Part Standardization Additional Info Slider');
    });

    it(`should check slider after click on link in column Best Avg Price`, async() => {
        await grid.newGridOpenFilterBoxByName('Active FFFs');
        await grid.clickOnHideThisColumn();
        await grid.newGridOpenFilterBoxByName('Best Avg Price');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await partStandardizationLogic.openSliderByFirstLinkInColumnById(partStandardData.summaryTabColumnNamesContent.usedOnBoms['Best Avg Price'],
            'Part Standardization Additional Info Slider');
    });

    it(`should check slider after click on link in column Best Avg LT`, async() => {
        await grid.newGridOpenFilterBoxByName('Best Avg Price');
        await grid.clickOnHideThisColumn();
        await grid.newGridOpenFilterBoxByName('Best Avg LT');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await partStandardizationLogic.openSliderByFirstLinkInColumnById(partStandardData.summaryTabColumnNamesContent.usedOnBoms['Best Avg LT'],
            'Part Standardization Additional Info Slider');
    });

    it(`should check slider after click on link in column Active FFFs`, async() => {
        await grid.newGridOpenFilterBoxByName('Best Avg LT');
        await grid.clickOnHideThisColumn();
        await grid.newGridOpenFilterBoxByName('Active FFFs');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await partStandardizationLogic.openSliderByFirstLinkInColumnById(partStandardData.summaryTabColumnNamesContent.acrossTheCatalog['Active FFFs'],
            'Part Standardization Additional Info Slider');
    });

    it(`should check slider after click on link in column Best Avg Price`, async() => {
        await grid.newGridHideColumnByName('Active FFFs');
        await grid.newGridOpenFilterBoxByName('Best Avg Price');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await partStandardizationLogic.openSliderByFirstLinkInColumnById(partStandardData.summaryTabColumnNamesContent.acrossTheCatalog['Best Avg Price'],
            'Part Standardization Additional Info Slider');
    });

    it(`should check slider after click on link in column Best Avg LT`, async() => {
        await grid.newGridHideColumnByName('Best Avg Price');
        await grid.newGridOpenFilterBoxByName('Best Avg LT');
        await grid.switchToSortColumnMenu();
        await grid.selectOptionInColumnFilter(columnHeaders.commonColumnSortOptions.ascSort, gridElements.newGridRows.last());
        await partStandardizationLogic.openSliderByFirstLinkInColumnById(partStandardData.summaryTabColumnNamesContent.acrossTheCatalog['Best Avg LT'],
            'Part Standardization Additional Info Slider');
    });

    it(`should delete all created view`, async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await partStandardizationLogic.deleteViewByName('AutomationTestSummarySlider');
    });
});


let PSNameXSS:string = 'XSSInjectionTestPS'+ random.randomTextGenerator(3);

describe('Parts Standardisation, Create new parts standardisation description field with xss injection text, US277194', () => {

    it('Parts Standardisation description field must be resistant for any XSS injection malicious text', async () => {
        let xssInjection:string = "This is a <img src=x onerror=alert(4) /> test";
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.addNewPartStandardizationViewWithDescription(PSNameXSS,xssInjection);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await partStandardizationLogic.verifyDescriptionForXSS();
        await partStandardizationLogic.deleteViewByName(PSNameXSS);
    });
});