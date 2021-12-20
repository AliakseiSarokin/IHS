import {Button} from "../../../../components/simple/button";
import {browser} from "protractor";
import {buttonNames, meganavItems} from "../../../../testData/global";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {commonSearch, mfrSearchConst} from "../../../../testData/search";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {TypeAhead} from "../../../../components/typeAhead";
import {commonElements, searchElements} from "../../../../elements/elements";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const helpLogic: HelpLogic = new HelpLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const meganav: Meganav = new Meganav();
const login: Login = new Login();
const searchLogic: SearchLogic = new SearchLogic();
const typeAhead: TypeAhead = new TypeAhead();

describe('TC66378 Manufacturer Search Page ', () => {

    it('should navigate to advanced Manufacturer Search from meganav - Search page', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.list[4],
            commonElements.commonTypeAheadInput);
        await expect(browser.getCurrentUrl()).toContain("/search/manufacturer");
        await expect(await commonElements.activeSearchLeftNav.getText()).toEqual('Manufacturer');
    });

    it('should check accordion title', async () => {
        await searchLogic.searchCriteriaChecking('Manufacturer Search Criteria');
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Manufacturer Search');
    });

    it('should open help panel and check title', async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Manufacturer search');
    });

    it('should check ghost text in type ahead field', async () => {
        await searchLogic.ghostTextSearchFieldChecking(commonElements.commonTypeAheadInput, 'Enter manufacturer name (type ahead)');
    });

    it('should be "X" button in type ahead field', async () => {
        await expect(await commonElements.commonTypeAheadInputsXbutton.get(0).isDisplayed()).toBeTruthy();
    });

    it('should be type ahead option and active search button', async () => {
        await typeAhead.typeAheadChecking(commonElements.commonTypeAheadInput, mfrSearchConst.searchCriteria);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy();
    });

    it('should clear type ahead with "X" and be inactive search button', async () => {
        await button.clickOnTheElement(commonElements.commonTypeAheadInputsXbutton.get(0));
        await expect((await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value')).length)
            .toEqual(0);
        await expect(await button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy();
    });

    it('should be info text ', async () => {
        const infoText: string =  'When searching for manufacturers, BOM Intelligence will display manufacturer name' +
            ' matches after you type one or more characters. Matches cease to appear in the drop-down list when you ' +
            'type manufacturer names that do not exist in the database. Click the desired manufacturer name in the drop-down' +
            ' list to select a manufacturer and then click the Search button to view manufacturer details.';
        await expect(await searchElements.parts.infoSection.get(0).getText()).toEqual(infoText);
    });


    it('should be recall searches dropdown', async () => {
        await searchLogic.recallSearchChecking()
    });

    it("search filter with type ahead should displays 'No matches found' under the input field," +
        " if search term contains special characters", async () => {
        await typeAhead.typeAheadNoMatchesFound(commonElements.commonTypeAheadInput, commonSearch.specialCharactersSearchValue);
    });

});