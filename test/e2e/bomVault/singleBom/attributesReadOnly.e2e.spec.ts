import {browser} from "protractor";
import {buttonNames, meganavItems, columnHeaders} from "../../../../testData/global";
import {gridElements, bomElements} from "../../../../elements/elements";
import {AttributesLogic} from "../../../../bussinesLayer/bomVault/attributesLogic";
import {Button} from "../../../../components/simple/button";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SingleBomLogic} from "../../../../bussinesLayer/bomVault/singleBomLogic";
const attributesLogic: AttributesLogic = new AttributesLogic();
const button: Button = new Button();
const login: Login = new Login();
const link: Link = new Link();
const meganav: Meganav = new Meganav();
const singleBomLogic: SingleBomLogic = new SingleBomLogic();


describe('BOM Attributes - Read OnlyUser', () => {

    it('should go to BOM attributes and be disabled Edit Attributes button',  async () => {
        await login.loginWithDirectLink(browser.params.readOnlyUserUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms,
            meganavItems.bomsSubItems.viewAllBoms, gridElements.checkboxSelector.get(1));
        await singleBomLogic.openFirstSingleBom();
        await link.clickOnTheLinkByNameAndWaitForElement('Attributes', bomElements.attributes.attributesWait);
        await expect(button.returnButtonByText(buttonNames.editAttributes).isEnabled()).toBeFalsy();
    });
});