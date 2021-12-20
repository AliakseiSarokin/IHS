import {browser} from "protractor";
import {columnHeaders, meganavItems} from "../../../../../../testData/global";
import {commonSearch} from "../../../../../../testData/search";
import {Grid} from "../../../../../../components/grid";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {searchElements} from "../../../../../../elements/elements";
import {JasmineTimeout} from "../../../../../../helper/jasmineTimeout";

const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();

describe('Part Search by Part # Contains type - Result grid ', () => {


    beforeAll(async () => {
        await JasmineTimeout.setJasmineTimeout(200000)
    });

    afterAll(async () => {
        await JasmineTimeout.setJasmineTimeout(browser.params.defaultElementWaitTime);
    });

    beforeEach(async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.parts,
            searchElements.searchField);
        await partsSearchLogic.checkPartNamberRadioButton('Part Number Contains');
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
    });

    it('should be column headers for Default layout', async () => {
        await partsSearchLogic.openLayoutListSelectOption(commonSearch.partsLayout[0]);
        await grid.newGridCheckingColumnHeaders(columnHeaders.search.partsDefaultLayout);
    });

    it('should be column headers for Life Cycle layout', async () => {
        await partsSearchLogic.openLayoutListSelectOption(commonSearch.partsLayout[1]);
        await grid.newGridCheckingColumnHeaders(columnHeaders.search.partsLifeCycleLayout);
    });

    it('should be column headers for Environmental layout', async () => {
        await partsSearchLogic.openLayoutListSelectOption(commonSearch.partsLayout[2]);
        await grid.newGridCheckingColumnHeaders(columnHeaders.search.partsEnvironmentalLayout);
    });

    it('should be column headers for Combined layout', async () => {
        await partsSearchLogic.openLayoutListSelectOption(commonSearch.partsLayout[3]);
        await grid.newGridCheckingColumnHeaders(columnHeaders.search.partsCombinedLayout);
    });
});
