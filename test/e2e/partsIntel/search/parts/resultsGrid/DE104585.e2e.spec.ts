import {browser} from "protractor";
import {commonSearch} from "../../../../../../testData/search";
import {Grid} from "../../../../../../components/grid";
import {gridElements, searchElements} from "../../../../../../elements/elements";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {meganavItems} from "../../../../../../testData/global";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {TypeAhead} from "../../../../../../components/typeAhead";

const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const typeAhead: TypeAhead = new TypeAhead();

describe('DE104585', () => {

    it('should be Apply Filter and Clear Filter buttons for Risk Columns ', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.newGridOpenFilterBoxByName('Mfr Name');
        await typeAhead.typeAheadCheckingForSort(gridElements.columnsSort.mfrTypeAhead, 'NXP ');
        await grid.peformSearchInColumnSort(gridElements.newGridCellByRowIndex(0).get(0));
        await expect(await gridElements.newGridSimpleTextCell.get(0).isDisplayed()).toBeTruthy();
    });
});
