import {AmlLogic} from "../../../../bussinesLayer/bomVault/amlLogic";
import {browser} from 'protractor';
import {buttonNames, columnHeaders, meganavItems} from "../../../../testData/global";
import {Grid} from "../../../../components/grid";
import {gridElements} from "../../../../elements/elements";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {user} from "../../../../api/testData/global";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
import {Button} from "../../../../components/simple/button";
import {Toolbar} from "../../../../components/toolbar";
import {Modal} from "../../../../components/modal";

const amlLogic: AmlLogic = new AmlLogic();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();
const button: Button = new Button();
const toolbar: Toolbar = new Toolbar();
const modal: Modal = new Modal();

describe("BOM Vault - DE109026", () => {

    it("should not have access to modify another's bom ReadOnlyUser", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.viewAllBoms,
            gridElements.newGridRows.get(3));
        await grid.newGridSelectRawWithNotMatchValue(1, columnHeaders.columnHeaderNames.newGrid[3],
            user.readonly.username);
        await amlLogic.checkingAmlToolbar(buttonNames.setBestPartToPreffered, false);
    });

    it("should not have access to modify another's bom RegularUser", async () => {
        await login.loginWithDirectLink(browser.params.regularUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.viewAllBoms,
            gridElements.newGridRows.get(3));
        await grid.newGridSelectRawWithNotMatchValue(1, columnHeaders.columnHeaderNames.newGrid[3],
            user.regural.username);
        await amlLogic.checkingAmlToolbar(buttonNames.setBestPartToPreffered, false);
    });

    it("should not have access to modify another's bom KBAdminUser", async () => {
        await login.loginWithDirectLink(browser.params.kbAdminUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.viewAllBoms,
            gridElements.newGridRows.get(3));
        await grid.newGridSelectRawWithNotMatchValue(1, columnHeaders.columnHeaderNames.newGrid[3],
            user.kbAdmin.username);
        await amlLogic.checkingAmlToolbar(buttonNames.setBestPartToPreffered, false);
    });
});

describe("BOM Vault - DE112177", () => {

    it("should not be error notification after click reset button in bom details", async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.viewAllBoms,
            gridElements.newGridRows.last());
        await singleBomLogic.openFirstSingleBom();
        await button.clickOnTheElementAndWait(toolbar.returnToolbarButtonByValue(buttonNames.reset),
            gridElements.newGridRows.last());
        await expect(await modal.severalModalBodies.get(0).isPresent()).toBeFalsy();
    });
});