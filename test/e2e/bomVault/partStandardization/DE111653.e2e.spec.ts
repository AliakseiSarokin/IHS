import {Button} from "../../../../components/simple/button";
import {
    gridElements,
    partStandardization,
} from "../../../../elements/elements";
import {browser} from "protractor";
import {
    buttonNames,
    meganavItems,
} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {PartStandardizationLogic} from "../../../../bussinesLayer/bomVault/partStandardizationLogic";
import {TypeAhead} from "../../../../components/typeAhead";
import {Random} from "../../../../utils/random";

const button: Button = new Button;
const grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const partStandardizationLogic: PartStandardizationLogic = new PartStandardizationLogic();
const random: Random = new Random();
const typeAhead: TypeAhead = new TypeAhead();
const name: string = 'DE111653' + + random.randomTextGenerator(5);

describe('Part Standardization, DE111653', ()=> {
    afterAll(async() =>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.deleteViewByName(name);
    });

    it(`should display correct result after Matched Mfr Name column filtered`, async() => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.partStandardization, gridElements.gridWrapper);
        await partStandardizationLogic.createNewReprocessedView(name, 3);
        await partStandardizationLogic.filteredOnlyOwnPartStandartization();
        await grid.mechanismCheckCheckboxByName('Name', name);
        await partStandardizationLogic.goToSummaryTab();
        await grid.newGridOpenFilterBoxByName('Matched Mfr Name');
        await typeAhead.typeAheadCheckingForSort(partStandardization.filterInputInMatchMfrNameColumn, 'texas photonics');
        await button.clickByButtonNameAndWait(buttonNames.applyFilter, gridElements.newGridNoRowsToShowText.get(0));
        await expect(await gridElements.newGridNoRowsToShowText.get(0).getText()).toEqual('No Rows To Show');
    });
});
