import {Login} from "../../../../../components/login";

const login = new Login();
import {Meganav} from "../../../../../components/meganav";
import {browser} from "protractor";
import {ElementAttributes} from "../../../../../utils/elementAttributes";

const elementAttributes: ElementAttributes = new ElementAttributes();
const meganav = new Meganav();
import {SearchLogic} from "../../../../../bussinesLayer/search/searchLogic";

const searchLogic: SearchLogic = new SearchLogic();
import {HaystackSearchLogic} from "../../../../../bussinesLayer/search/haystackSearchLogic";

const haystackSearchLogic = new HaystackSearchLogic();
import {buttonNames, fieldStatuses, meganavItems} from "../../../../../testData/global";
import {InstructionPanel} from "../../../../../components/instructionPanel";
import {commonElements, searchElements} from "../../../../../elements/elements";

const instructionPanel: InstructionPanel = new InstructionPanel();
import {commonSearch, haystackSearchConst} from "../../../../../testData/search";
import {Button} from "../../../../../components/simple/button";

const button: Button = new Button();
import {Input} from "../../../../../components/simple/input";

const input: Input = new Input();
import {Random} from "../../../../../utils/random";

const random: Random = new Random();
import {RadioButton} from "../../../../../components/simple/radioButton";

const radioButton: RadioButton = new RadioButton();
import {TypeAhead} from "../../../../../components/typeAhead";

const typeAhead: TypeAhead = new TypeAhead();
import {HelpLogic} from "../../../../../bussinesLayer/help/helpLogic";

const helpLogic: HelpLogic = new HelpLogic();
describe('Haystack Search - Search page   ', () => {

    it('should navigate to Haystack Search - Search page', async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await expect(browser.getCurrentUrl()).toContain("/search/haystack");
    });

    it('should be instruction panel with option to hide/unhide', async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('Haystack Search');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Haystack search');
    });

    it('should be select by default Part Number radio button and be ghost text for field and inactive search button ', async () => {
        await expect(await searchElements.haystack.partNumberRadioButtonInput.isSelected())
            .toBeTruthy();
        await expect(await elementAttributes.getElementAttribute(searchElements.haystack.partNumberOrNsnField, 'placeholder'))
            .toEqual(haystackSearchConst.partNumberInputGhostText);
        await expect(button.returnButtonByText(buttonNames.search).isEnabled())
            .toBeFalsy('search button is active, but should not be');
    });

    it('should be active search button when one or more characters are entered to Part Number Filed', async () => {
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(1));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy();
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(10));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy();
    });

    it('should clear Part Number Filed with X', async () => {
        await haystackSearchLogic.clearFieldWithX(searchElements.haystack.partNumberOrNsnX,
            searchElements.haystack.partNumberOrNsnField);

    });

    it('should switch to NSN radio and be ghost text for field ', async () => {
        await radioButton.checkRadioButton(searchElements.haystack.nsnRadioButtonLabel, searchElements.haystack.nsnRadioButtonInput);
        await expect(await elementAttributes.getElementAttribute(searchElements.haystack.partNumberOrNsnField, 'placeholder'))
            .toEqual(haystackSearchConst.nsnInputGhostText);
    });

    it('should be disabled Vendor when NSN is selected ', async () => {
        await expect(await elementAttributes.getElementAttribute(searchElements.haystack.vendorNameField, 'disabled'))
            .toEqual('true');
    });

    it('should be limitation on 16 chars for NSN field ', async () => {
        await haystackSearchLogic.nsnFieldLimitationChecking();
    });

    it('should be active/inactive search button when filling NSN field', async () => {
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomNumberGenerator(8));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('8 numbers');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomNumberGenerator(9));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy('9 numbers');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomNumberGenerator(16));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('16 numbers');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextWithoutNumbersGenerator(9));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy('9 alpha');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(9));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy('9 alphanumeric');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(9) + '-');
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('9 chars + dash');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(6) + '-' +
            random.randomTextGenerator(2) + '-' + random.randomTextGenerator(1));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy('9 alphanumeric + 2 dash');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(6) + '-' +
            random.randomTextGenerator(2) + '-' + '-' + random.randomTextGenerator(1));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('9 alphanumeric + 3 dash');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(10) + '-' +
            random.randomTextGenerator(2) + '-' + random.randomTextGenerator(1));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('10 alphanumeric');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(10) + '-');
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('10 alphanumeric + 1 dash');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(11));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('11 alphanumeric');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(12));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('12 alphanumeric');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(13));
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy('13 alphanumeric');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(13) + '-');
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('13 alphanumeric + 1 dash');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(13) + '--');
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('13 alphanumeric + 2 dash');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(13) + '---');
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy('13 alphanumeric + 3 dash');
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(12) + '----');
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy('12 alphanumeric + 4 dash');
    });

    it('should clear NSN field with X', async () => {
        await haystackSearchLogic.clearFieldWithX(searchElements.haystack.partNumberOrNsnX,
            searchElements.haystack.partNumberOrNsnField);
    });

    it('should be Vendor field with title and ghost text', async () => {
        await radioButton.checkRadioButton(searchElements.haystack.partNumberRadioButtonLabel,
            searchElements.haystack.partNumberRadioButtonInput);
        await expect(await searchElements.haystack.vendorFieldLabel.getText()).toEqual(haystackSearchConst.vendorFieldLabel);
        await expect(await elementAttributes.getElementAttribute(searchElements.haystack.vendorNameField, 'placeholder'))
            .toEqual(haystackSearchConst.vendorInputGhostText);
    });

    it('should be type ahead for Vendor field and be active Search button when value in Vendor is selected ', async () => {
        await typeAhead.typeAheadChecking(searchElements.haystack.vendorNameField, '123');
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy('search button is not active')
    });

    it('should clear Vendor field with X', async () => {
        await haystackSearchLogic.clearFieldWithX(searchElements.haystack.vendorX, searchElements.haystack.vendorNameField);
    });

    it('should be active search button when Part Number and Vendor fields are filled', async () => {
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(5));
        await typeAhead.typeAheadChecking(searchElements.haystack.vendorNameField, '123');
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeTruthy();
    });

    it('should be instruction panel for searches', async () => {
        await radioButton.checkRadioButton(searchElements.haystack.partNumberRadioButtonLabel,
            searchElements.haystack.partNumberRadioButtonInput);
        await expect(await searchElements.parts.infoSection.get(0).getText()).toEqual(haystackSearchConst.partNumberIntrText);
        await radioButton.checkRadioButton(searchElements.haystack.nsnRadioButtonLabel,
            searchElements.haystack.nsnRadioButtonInput);
        await expect(await searchElements.parts.infoSection.get(0).getText()).toEqual(haystackSearchConst.nsnInstrText);
    });

    it('should be clear link logic', async () => {
        await radioButton.checkRadioButton(searchElements.haystack.nsnRadioButtonLabel,
            searchElements.haystack.nsnRadioButtonInput);
        await haystackSearchLogic.clearLinkChecking();
        await typeAhead.typeAheadChecking(searchElements.haystack.vendorNameField, '123');
        await haystackSearchLogic.clearLinkChecking();
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(5));
        await haystackSearchLogic.clearLinkChecking();
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(5));
        await typeAhead.typeAheadChecking(searchElements.haystack.vendorNameField, '123');
        await haystackSearchLogic.clearLinkChecking();
    });

    it('should be clear all button logic', async () => {
        await radioButton.checkRadioButton(searchElements.haystack.nsnRadioButtonLabel, searchElements.haystack.nsnRadioButtonInput);
        await haystackSearchLogic.clearAllButtonChecking();
        await typeAhead.typeAheadChecking(searchElements.haystack.vendorNameField, '123');
        await haystackSearchLogic.clearAllButtonChecking();
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(5));
        await haystackSearchLogic.clearAllButtonChecking();
        await input.fillFieldWithValue(searchElements.haystack.partNumberOrNsnField, random.randomTextGenerator(5));
        await typeAhead.typeAheadChecking(searchElements.haystack.vendorNameField, '123');
        await haystackSearchLogic.clearAllButtonChecking();
    });

    it('should be recall searches dropdown', async () => {
        await searchLogic.recallSearchChecking();
    });

    it("should be dialog window 'No Results Found' if search term contains special characters and 'Part Number' option is chosen", async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await searchLogic.performSearchWithoutWaitResultPage(searchElements.haystack.partNumberOrNsnField, commonSearch.specialCharactersSearchValue);
        await searchLogic.verifyCompositeModalAttributes(commonSearch.modalTitleText_1,
            `${commonSearch.modalBodyCritariaText_3}${commonSearch.specialCharactersSearchValue}`,
            commonSearch.modalBodyQuestionText_2, buttonNames.cancel, buttonNames.searchHaystack);
    });

    it("'Vendor Name or CAGE Code' filter with type ahead should displays 'No matches found' under the input field," +
        " if search term contains special characters", async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await typeAhead.typeAheadNoMatchesFound(commonElements.commonTypeAheadInput, commonSearch.specialCharactersSearchValue);
    });

    it("should be dialog window 'No Results Found' if search term and 'Vendor Name or CAGE Code' contains special characters", async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await typeAhead.typeAheadNoMatchesFound(commonElements.commonTypeAheadInput, commonSearch.specialCharactersSearchValue);
        await searchLogic.performSearchWithoutWaitResultPage(searchElements.haystack.partNumberOrNsnField, commonSearch.specialCharactersSearchValue);
        await searchLogic.verifyCompositeModalAttributes(commonSearch.modalTitleText_1,
            commonSearch.modalBodyCritariaText_3 + commonSearch.specialCharactersSearchValue,
            commonSearch.modalBodyQuestionText_2, buttonNames.cancel, buttonNames.searchHaystack);
    });

    it("should inactive search button if search term contains special characters and 'NSN or NIIN' option is chosen", async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.haystack,
            searchElements.haystack.partNumberOrNsnX);
        await radioButton.checkRadioButton(searchElements.haystack.nsnRadioButtonLabel, searchElements.haystack.nsnRadioButtonInput);
        await searchLogic.fillSearchFieldWithValue(searchElements.haystack.partNumberOrNsnField, commonSearch.specialCharactersSearchValue);
        await expect(button.returnButtonByText(buttonNames.search).isEnabled()).toBeFalsy();
    });
});
