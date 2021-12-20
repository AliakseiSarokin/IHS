import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../../../testData/global";
import {CustomLayoutLogic} from "../../../../../../bussinesLayer/bomVault/customLayoutLogic";
import {commonSearch} from "../../../../../../testData/search";
import {Grid} from "../../../../../../components/grid";
import {Login} from "../../../../../../components/login";
import {Meganav} from "../../../../../../components/meganav";
import {PartsSearchLogic} from "../../../../../../bussinesLayer/search/partsSearchLogic";
import {Shade} from "../../../../../../components/shade";
import {modalElements, resReqElements, searchElements} from "../../../../../../elements/elements";
import {Toolbar} from "../../../../../../components/toolbar";
import {QuickSearch} from "../../../../../../components/quickSearch";
import {Modal} from "../../../../../../components/modal";
import {Button} from "../../../../../../components/simple/button";
import {Link} from "../../../../../../components/simple/link";
import {ElementAttributes} from "../../../../../../utils/elementAttributes";

const button: Button = new Button();
const customLayoutLogic: CustomLayoutLogic = new CustomLayoutLogic();
const grid: Grid = new Grid();
const elementAttributes: ElementAttributes = new ElementAttributes();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();

describe('Parts search, US26087', () => {

    it('should be displayed research request modal if fuzzy search returns no results', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await quickSearch.performQuickSearchWithWait('1234567890',
            modalElements.modalTitleByName('No Results Found'));
        await expect(await modalElements.text.getText()).toContain('Part number (starts with) = 1234567890');
        await button.clickOnTheElementAndWait(await button.returnButtonByText('Yes'),
            await button.returnButtonByText('Close'));
        await expect(await modalElements.text.getText()).toContain('If you feel your part number search was correct ' +
            'and would like to add this part to the database, create a Research Request');
        await link.clickOnTheLinkByNameAndWaitForElement('create a Research Request',
            await resReqElements.firstStepInputs.first());
        await expect(await elementAttributes.getElementAttribute(await resReqElements.firstStepInputs.get(0),
            'value')).toEqual('New Part Addition');
        await expect(await elementAttributes.getElementAttribute(await resReqElements.firstStepInputs.get(1),
            'value')).toEqual('1234567890');
    });
});
