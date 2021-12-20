import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav"
import {browser, element} from "protractor";
import {buttonNames, meganavItems} from "../../../testData/global";
import {Grid} from "../../../components/grid"
import {gridElements, pageTitles,resReqElements} from "../../../elements/elements";
import {MatchPartsLogic} from "../../../bussinesLayer/bomVault/matchPartsLogic";
import {Modal} from "../../../components/modal"

const login: Login = new Login();
const meganav:Meganav = new Meganav();
const grid:Grid = new Grid();
const partsmatch:MatchPartsLogic = new MatchPartsLogic();
const modal:Modal = new Modal();

describe('To verify details are displayed correctly in research request window',()=>{

    it('should display imported manufacture part number and imported manufacture details correctly', async ()=> {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);

        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.newGridUnlockedColumnRowCellsWithContent(0).get(0));

        await partsmatch.goToMatchParts();
        await grid.checkCheckboxRange(1,3);
        await modal.openModalWithButtonByName(buttonNames.resRequest);

        await expect(await resReqElements.mfrPartNumberAndNamefieldInput.count()).toBeGreaterThan(1);

    });

})