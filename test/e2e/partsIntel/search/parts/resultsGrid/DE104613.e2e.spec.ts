import {Button} from "../../../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../../../testData/global";
import {commonSearch} from "../../../../../../testData/search";
import {Dropdown} from "../../../../../../components/dropdown";
import {Grid} from "../../../../../../components/grid";
import {gridElements, searchElements} from "../../../../../../elements/elements";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {Toolbar} from "../../../../../../components/toolbar";

const button: Button = new Button();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();
const toolbar: Toolbar = new Toolbar();

describe('DE104613', () => {

    it('should be Apply Filter and Clear Filter buttons for Risk Columns ', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await grid.newGridHideColumnByName('Rel Info');
        await toolbar.displayHiddenColumnInDropdonwToolbar('Rel Info');
        await toolbar.openToolbarDropdownByButtonName(buttonNames.layout);
        await Dropdown.selectValueInDropdownByValueName('Combined');
        await expect(await gridElements.newGridHeaderByName('Rel Info').isDisplayed()).toBeTruthy();
        await toolbar.openToolbarDropdownByButtonName(buttonNames.unhide);
        await expect(button.returnButtonByText('Rel Info').isPresent()).toBeFalsy();
    });
});
