import {browser, element} from "protractor";
import {Login} from "../../../../components/login";
import {QuickSearch} from "../../../../components/quickSearch";
import {Grid} from "../../../../components/grid"
import {gridElements} from "../../../../elements/elements";
import {Modal} from "../../../../components/modal";
import {modalElements} from "../../../../elements/elements";
import {Waiters as w} from '../../../../helper/waiters'

const login:Login = new Login();
const quickSearch:QuickSearch = new QuickSearch();
const grid: Grid = new Grid();
const modal:Modal = new Modal();

describe("DE120181-Verify additional info details",()=> {

    it('should navigate to parts modal and verify additional information are shown as link', async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        const searchValue:string[] = ['89HPES22H16ZABCI','2-5176264-1','cpf0402b205re1'];
        const expectValue:string[] = ['BSDL Info','SamacSys','SamacSys'];
        for(let i:number=0;i<searchValue.length;i++) {
            await quickSearch.performQuickSearch(searchValue[i]);
            await grid.clickOnCellLinkAndWaitForElement(0, 0, 4, gridElements.gridWrapper);
            await modal.openModalWithLink(await modalElements.modalClickElement(5));
            await w.waitUntilElementIsClickable(modalElements.additionaInfoLink);
            await expect(await modalElements.additionaInfoLink.getText()).toEqual(expectValue[i]);
            await modal.closeModalWithXButton()
        }
    });
});