import {Actions} from "../../../../../../utils/actions";
import {browser} from "protractor";
import {commonSearch} from "../../../../../../testData/search";
import {gridElements, quickSearchElements, searchElements} from "../../../../../../elements/elements";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {meganavItems} from "../../../../../../testData/global";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";

const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partsSearchLogic: PartsSearchLogic = new PartsSearchLogic();

describe('DE104539', () => {

    it('should be option to copy text from grid', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await partsSearchLogic.performPartsSearch(commonSearch.commonValue);
        await Actions.clearInputWithDelete(quickSearchElements.searchField);
        await Actions.mouseMoveToElementStatic(gridElements.newGridSimpleTextCell.get(0));
        await Actions.click(gridElements.newGridSimpleTextCell.get(0));
        await Actions.doubleClick(gridElements.newGridSimpleTextCell.get(0));
        await Actions.copyPaste();
        await Actions.pasteInInput(quickSearchElements.searchField);
        await expect((await quickSearchElements.searchField.getAttribute('value')).length).toBeGreaterThan(0)
    });
});
