import {browser} from "protractor";
import {gridElements, modalElements, partDetailsElements, searchElements} from "../../../../elements/elements";
import {buttonNames, meganavItems, modalTitles} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {partDetailsData} from "../../../../testData/partDetails";
import {QuickSearch} from "../../../../components/quickSearch";
import {VideoSliderLogic} from "../../../../bussinesLayer/home/videoSliderLogic";
import {Toolbar} from "../../../../components/toolbar";
import {commonSearch} from "../../../../testData/search";

const grid: Grid = new Grid();
const helpLogic: HelpLogic = new HelpLogic();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const partDetailsLogic = new PartDetailsLogic();
const quickSearch:QuickSearch = new QuickSearch();
const toolbar: Toolbar = new Toolbar();

describe('Part Details - Environmental - Parts Search', () => {

    it('should be Compliant alternate link if ROHS_IDENTIFIER: "PART NUMBER", DE120442', async () => {
        const partWithAlernates: string = 'TAZA155J015CAMZ0H24';
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await quickSearch.performQuickSearchWithWait(partWithAlernates,
            await partDetailsElements.eurohsIconGray.first());
        await modal.openModalWithElementAndWait(await partDetailsElements.eurohsIconGray.first(), await partDetailsElements.cell.last());
        await modal.openModalWithElement(await link.returnElementByLinkName('TAZA155J015CAMZ0724'))
        await expect(await modalElements.modalTitle.getText()).toContain('TAZA155J015CAMZ0724')
    });

    it('should be Compliant alternate text if ROHS_IDENTIFIER: is NOT a "PART NUMBER", DE120442', async () => {
        const partWithoutAlernates: string = 'TRJB156M010S600';
        await modal.closeModalIfPresent();
        await quickSearch.performQuickSearchWithWait(partWithoutAlernates,
            await partDetailsElements.eurohsIconGreen.first());
        await modal.openModalWithElementAndWait(await partDetailsElements.eurohsIconGreen.first(), await partDetailsElements.cell.last());
        await expect(await partDetailsElements.cellLinks.get(0).isPresent()).toBeFalsy;
    });

});

