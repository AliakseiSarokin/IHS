import {browser, by, element} from "protractor";
import {commonSearch, quickSearchData} from "../../../../testData/search";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Modal} from "../../../../components/modal";
import {QuickSearch} from "../../../../components/quickSearch";
import {gridElements, partDetailsElements} from "../../../../elements/elements";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {Toolbar} from "../../../../components/toolbar";
import {linksNames} from "../../../../testData/global";
import {SpecificToolbarButtons} from "../../../../bussinesLayer/specificToolbarButtons";

const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const modal: Modal = new Modal();
const partDetailsLogic: PartDetailsLogic = new PartDetailsLogic();
const toolbar: Toolbar = new Toolbar();
const quickSearch: QuickSearch = new QuickSearch();

describe('Part Details, Parts Search, US249008,View Mfr Suggested Alternates Toolbar Button', () => {

    it('should be active "Mfr Suggested Alternates Toolbar Button" for the part with Mfr Suggested Alternates', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[2]);
        await quickSearch.performQuickSearchWithWait(commonSearch.partWithMfrSuggestedAlternates, gridElements.firstRowLink);
        await modal.openModalWithElementAndWait(gridElements.firstRowLink, link.returnElementByLinkName('Manufacturer'));
        await browser.sleep(2000);
        await SpecificToolbarButtons.checkMfrSuggestedAlternatesButton(true);
    });

    it('should be disabled "Mfr Suggested Alternates Toolbar Button" for the part without Mfr Suggested Alternates', async () => {
        await modal.closeModalIfPresent();
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[0]);
        await quickSearch.performQuickSearchWithWait(commonSearch.commonValue, gridElements.firstRowLink);
        await modal.openModalWithElementAndWait(gridElements.firstRowLink, link.returnElementByLinkName('Manufacturer'));
        await browser.sleep(2000);
        await SpecificToolbarButtons.checkMfrSuggestedAlternatesButton(false);
    });
});

