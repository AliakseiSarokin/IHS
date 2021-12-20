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
import {commonElements, searchElements, sliderElements} from "../../../../elements/elements";
import {MfrSearchLogic} from "../../../../bussinesLayer/search/mfrSearchLogic";
import {Toolbar} from "../../../../components/toolbar";
import {Modal} from "../../../../components/modal";
import {Input} from "../../../../components/simple/input";
import {Slider} from "../../../../components/slider";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const helpLogic: HelpLogic = new HelpLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const meganav: Meganav = new Meganav();
const login: Login = new Login();
const searchLogic: SearchLogic = new SearchLogic();
const typeAhead: TypeAhead = new TypeAhead();
const toolbar: Toolbar = new Toolbar();
const modal: Modal = new Modal();
const input: Input = new Input();

describe('Manufacturer Search Page defects, DE114850', () => {

    it('Save this Search modal: special characters in the Name field', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.list[4],
            commonElements.commonTypeAheadInput);
        await MfrSearchLogic.performMfrSearch(commonSearch.mfrSearchArray[0]);
        await button.clickOnTheElementAndWait(await toolbar.returnToolbarButtonByValue(buttonNames.saveSearch),
            modal.modalTitle);
        await input.fillFieldWithValue(searchElements.saveSearchNameField, '////////******');
        await expect(await searchElements.saveSearchNameField.getAttribute('value')).toBe('');
        await modal.closeModalIfPresent();
        await Slider.closeSlider(sliderElements.closeSliderTab, button.returnButtonByText(buttonNames.search));
    });
});