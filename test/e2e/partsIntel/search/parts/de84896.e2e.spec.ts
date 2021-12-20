import {Login} from "../../../../../components/login";
const login: Login = new Login();
import {Meganav} from "../../../../../components/meganav";
const meganav:Meganav = new Meganav();
import {RadioButton} from "../../../../../components/simple/radioButton";
const radioButton:RadioButton = new RadioButton();
import {PartsSearchLogic} from "../../../../../bussinesLayer/search/partsSearchLogic";
const partsSearchLogic:PartsSearchLogic = new PartsSearchLogic();
import {commonSearch} from "../../../../../testData/search";
import {meganavItems} from "../../../../../testData/global";
import {searchElements, gridElements} from "../../../../../elements/elements";
import {browser} from "protractor";


describe('DE84896', () => {

    it('should show no result for part starts with', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await radioButton.checkRadioButton(searchElements.parts.partsSearchRadioButtonsLabels.get(1),
            searchElements.parts.partsSearchRadioButtonsInputs.get(1));
        await partsSearchLogic.performPartsSearch(commonSearch.de84896searchCriteria);
        await browser.sleep(2000);
        await expect(gridElements.newGridLockedColumnCellsWithContent.get(0).isPresent()).toBeFalsy();
    });

    it('should show no result for exact part', async() => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await radioButton.checkRadioButton(searchElements.parts.partsSearchRadioButtonsLabels.get(0),
            searchElements.parts.partsSearchRadioButtonsInputs.get(0));
        await partsSearchLogic.performPartsSearch(commonSearch.de84896searchCriteria);
        await browser.sleep(2000);
        await expect(gridElements.newGridLockedColumnCellsWithContent.get(0).isPresent()).toBeFalsy();
    })
})