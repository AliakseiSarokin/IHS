import {browser, by, element} from "protractor";
import {commonSearch, quickSearchData} from "../../../../testData/search";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Modal} from "../../../../components/modal";
import {QuickSearch} from "../../../../components/quickSearch";
import {partDetailsElements} from "../../../../elements/elements";
import {Waiters} from "../../../../helper/waiters";

const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const modal: Modal = new Modal();
const quickSearch: QuickSearch = new QuickSearch();

describe('DE112551', () => {

    it('should be displayed Complient alternate number in EU Rohs grid', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.openDropdownAndSetAType(quickSearchData.typeLabels[2]);
        await quickSearch.performQuickSearchWithWait('507-3917-1471-600', partDetailsElements.eurohsIconGray.get(0));
        await modal.openModalWithLink(partDetailsElements.eurohsIconGray.get(0));
        await Waiters.waitUntilElementIsClickable(partDetailsElements.cell.get(0));
        const cellValues: any = await partDetailsElements.cell.getText();
        await expect(await grid.checkIfOnlyAllowedDataIsInValues(['Compliant Alternate', '507-3917-1471-600F'], cellValues)).toBeTruthy();
    });

    it('should be Complient alternate hyperlink for specific part - "2N2221ADCSM"', async () => {
        await modal.closeModalIfPresent();
        await quickSearch.performQuickSearchWithWait('2N2221ADCSMCECC', partDetailsElements.eurohsIconGray.get(0));
        await modal.openModalWithLink(partDetailsElements.eurohsIconGray.get(0));
        await modal.openModalWithLink(link.returnElementByPartialLinkNameAndIndex('2N2221ADCSM', 0));
        await expect(await modal.modalTitle.getText()).toContain('2N2221ADCSM');
    });
});

