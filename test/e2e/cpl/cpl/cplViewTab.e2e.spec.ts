import {browser} from "protractor";
import {columnHeaders, meganavItems} from "../../../../testData/global";
import {partDetailsElements, searchElements} from "../../../../elements/elements";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {cplSearchConst} from "../../../../testData/search";
import {CplSearchLogic} from "../../../../bussinesLayer/search/cplSearchLogic";

const grid: Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const cplSearchLogic: CplSearchLogic = new CplSearchLogic();

 describe(' CPL View tab ', () => {

    it('should go to view CPL tab - cpl view', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.cpl,
            searchElements.cplSearchField);
        await cplSearchLogic.performCplSearch(cplSearchConst.searchCriteria);
    });

    it('should check that "Matched P/N" is a hyperlink', async () => {
        let partsLinks: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.cpl[4]);
        await link.clickOnTheLinkByNameAndWaitForElement(partsLinks[1], partDetailsElements.activeLeftNav);
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual('Technical Characteristics');
    });

    it('should check that "Matched Mfr" is a hyperlink', async () => {
        await modal.closeModalIfPresent();
        let manufacturersLinks: string[] = await grid.newGridReturnCellValuesByColumnName(1, columnHeaders.search.cpl[5]);
        await link.clickOnTheLinkByNameAndWaitForElement(manufacturersLinks[1], partDetailsElements.activeLeftNav);
        await expect(await partDetailsElements.activeLeftNav.getText()).toEqual('Manufacturer Information');
    });

});