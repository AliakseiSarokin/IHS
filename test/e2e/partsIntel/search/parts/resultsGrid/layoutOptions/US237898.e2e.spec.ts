import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems} from "../../../../../../../testData/global";
import {commonSearch, quickSearchData} from "../../../../../../../testData/search";
import {CustomLayoutLogic} from "../../../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {Grid} from "../../../../../../../components/grid";
import {Login} from "../../../../../../../components/login";
import {Meganav} from "../../../../../../../components/meganav";
import {Toolbar} from "../../../../../../../components/toolbar";
import {PartsSearchLogic} from "../../../../../../../bussinesLayer/search/partsSearchLogic";
import {QuickSearch} from "../../../../../../../components/quickSearch";
import {gridElements, searchElements} from "../../../../../../../elements/elements";
import {Shade} from "../../../../../../../components/shade";
import {expectToContain} from "../../../../../../../helper/allure/allureSteps";
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();
describe('US237898  Enable Low Halogen Attribute in BOM/Parts Intel', () => {

    it('TC68405 - enviromental layout', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await partsSearchLogic.openLayoutListSelectOption(commonSearch.partsLayout[2]);
        await grid.newGridHideColumnsRange(['Mfr Name', 'Part Status', 'Description',  'EU RoHS Compliant',
            'EU RoHS Version',
            'EU RoHS5 Flag', 'REACH Compliant', 'REACH Candidate List', 'China RoHS Compliant','Prop65 Presence']);
        await expectToContain(gridElements.newGridColumnHeaderNamesLockUnlock(1).getText,
            ['Prop65 CAS Numbers', 'Low Halogen', 'FMD Information Exist', 'DRC Status' ])
    });

    it(`should be Substance of Very High Concern Over Maximum Concentration Value title in SVHC Over MCV`, async() =>{
        await expect(await gridElements.newGridReturnHeaderTitleElementByName('SVHC Over MCV').getAttribute('title'))
            .toEqual('Substance of Very High Concern Over Maximum Concentration Value');
    });

    it('TC68405 - combined layout', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearch(commonSearch.commonValue);
        await partsSearchLogic.openLayoutListSelectOption(commonSearch.partsLayout[3]);
        await grid.newGridHideColumnsRange(['Mfr Name', 'Part Status', 'Description', 'Estimated YTEOL', 'Availability (YTEOL)',
            'Life Cycle Stage', 'Life Cycle Code', 'LTB Date', 'LTD Date',
        'Life Cycle Comments', 'Alert/Prediction Date', 'Date of Intro', 'Life Cycle Information',
            'Manufacturer Support Status','EU RoHS Compliant', 'EU RoHS Version', 'EU RoHS5 Flag', 'REACH Compliant',
            'REACH Candidate List', 'China RoHS Compliant','Prop65 Presence']);
        await expectToContain(gridElements.newGridColumnHeaderNamesLockUnlock(1).getText,
            ['Prop65 CAS Numbers', 'Low Halogen', 'FMD Information Exist'])
    });


    it('TC68405 - should be Low Haloge column sort options', async () => {
        await grid.newGridOpenFilterBoxByName('Low Halogen');
        await expect(await gridElements.newGridColumnFilterOptions.getText())
            .toEqual([ 'Hide this column', 'Sort Ascending', 'Sort Descending', 'Autosize This Column', 'Autosize All Columns', 'Reset Columns' ]);
    });

    it('TC68408 - should be Low Haloge attribute in custom layout', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByName('Low Haloge');
        await customLayoutLogic.saveNewCustomLayout();
        await expect(await gridElements.newGridColumnHeaderNamesLockUnlock(1).getText()).toEqual(['Low Halogen'])
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });


});
