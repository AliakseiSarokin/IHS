import {browser, by, element} from "protractor";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Modal} from "../../../../components/modal";
import {QuickSearch} from "../../../../components/quickSearch";
import {gridElements, modalElements, partDetailsElements} from "../../../../elements/elements";

const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const modal: Modal = new Modal();
const quickSearch: QuickSearch = new QuickSearch();

describe('Part details, SamacSys - Additional URL References in Part Details, US273539', () => {

    it('should be "SamacSys" link in additional info, US273539', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearch('LPC1113FBD48/302,1');
        await grid.clickOnCellLinkAndWaitForElement(0, 0, 4, await gridElements.newGridInModalUnlockedColumnCellsWithContent.last());
        await modal.openModalWithElementAndWait(await modalElements.modalClickElement(5),modalElements.additionaInfoLink);
        await expect(await gridElements.newGridInModalUnlockedColumnCellsWithContent.getText()).toEqual([ 'CAD Model', 'CAD Model', 'CAD Model', 'Device Image' ]);
        await expect(await modalElements.additionaInfoLinks.getText()).toEqual([ 'SamacSys', 'Octopart', 'SnapEDA', 'Thumbnail' ]);
    });
});

