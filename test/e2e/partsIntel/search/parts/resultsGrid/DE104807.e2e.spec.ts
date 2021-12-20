import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../../../testData/global";
import {CustomLayoutLogic} from "../../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {commonSearch} from "../../../../../../testData/search";
import {Grid} from "../../../../../../components/grid";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {Shade} from "../../../../../../components/shade";
import {searchElements} from "../../../../../../elements/elements";
import {Toolbar} from "../../../../../../components/toolbar";

const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();

describe('DE104807', () => {

    const columns: string[] = ['LTB Date'];

    afterEach(async () => {
        await customLayoutLogic.openCreatedCustomLayout(commonSearch.manageLayout.defaultValues.length);
        await customLayoutLogic.deleteLayout();
    });

    it('should be available date picker in column sorting', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Shade.openShadeWithButton(buttonNames.manageLayouts);
        await customLayoutLogic.selectCreateNewCustomLayout();
        await customLayoutLogic.addAttributeByRangeNames(columns);
        await customLayoutLogic.saveNewCustomLayout();
        await grid.newGridOpenFilterBoxByName(columns[0]);
        await grid.newGridOpenCalendar();
    });
});
