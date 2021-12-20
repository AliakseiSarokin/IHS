import {browser, by} from "protractor";
import {commonSearch, quickSearchData} from "../../../../testData/search";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Modal} from "../../../../components/modal";
import {QuickSearch} from "../../../../components/quickSearch";
import {gridElements} from "../../../../elements/elements";
import {SpecificToolbarButtons} from "../../../../bussinesLayer/specificToolbarButtons";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
const partDetailsLogic:PartDetailsLogic = new PartDetailsLogic();
const link: Link = new Link();
const login: Login = new Login();
const modal: Modal = new Modal();
const quickSearch: QuickSearch = new QuickSearch();

describe('ESD - Show ESD Values in an Expanded Tooltip, US302456 - BI', () => {

    it('should search for a part with ESD attributes', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearchWithWait("W0805R-01-549RDI", gridElements.firstRowLink);
        await modal.openModalWithElementAndWait(gridElements.firstRowLink, link.returnElementByLinkName('Manufacturer'));
        await partDetailsLogic.verifyESDModalToolTipDisplayed();
        await modal.closeModalWithXButton();
    });

    it('should search for a part with ESD attributes and verify the contents of the ESD pop up', async () => {
        await quickSearch.performQuickSearchWithWait("W0805R-01-549RDI", gridElements.firstRowLink);
        await modal.openModalWithElementAndWait(gridElements.firstRowLink, link.returnElementByLinkName('Manufacturer'));
        await partDetailsLogic.verifyESDModalToolTipDisplayed();
        await partDetailsLogic.verifyESDModalToolTipContent();
        await modal.closeModalWithXButton();
    });
});

