import {browser} from "protractor";
import {commonSearch, mfrSearchConst} from "../../../../testData/search";
import {buttonNames, meganavItems, modalTitles} from "../../../../testData/global";
import {commonElements, gridElements, searchElements, sliderElements} from "../../../../elements/elements";
import {Button} from "../../../../components/simple/button";
import {Dropdown} from "../../../../components/dropdown";
import {ElementAttributes} from "../../../../utils/elementAttributes";
import {Input} from "../../../../components/simple/input";
import {Grid} from "../../../../components/grid";
import {Link} from "../../../../components/simple/link";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {MfrSearchLogic, typeAheadOption, typeAheadValue} from "../../../../bussinesLayer/search/mfrSearchLogic";
import {NewBrowserTab} from "../../../../utils/newBrowserTab";
import {PartDetailsLogic} from "../../../../bussinesLayer/partDetails/partDetailsLogic";
import {SearchLogic} from "../../../../bussinesLayer/search/searchLogic";
import {Slider} from "../../../../components/slider";
import {Toolbar} from "../../../../components/toolbar";

const button: Button = new Button();
const elementAttributes: ElementAttributes = new ElementAttributes();
const input: Input = new Input();
const grid:Grid = new Grid();
const link: Link = new Link();
const login: Login = new Login();
const meganav:Meganav = new Meganav();
const modal: Modal = new Modal();
const newBrowserTab: NewBrowserTab = new NewBrowserTab();
const partDetailsLogic: PartDetailsLogic = new PartDetailsLogic();
const searchLogic: SearchLogic = new SearchLogic();

const toolbar: Toolbar  = new Toolbar();
describe('TC66534 Check for the Manufacturer Modal Toolbar Print and Export functionality for users with access to authorized distributors ', () => {

    it('should be export options', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search, meganavItems.searchSubItem.list[4],
            commonElements.commonTypeAheadInput);
        await MfrSearchLogic.performMfrSearch(commonSearch.mfrSearchArray[0]);
        await Dropdown.openDropdownByClickOnElement(toolbar.returnToolbarButton(buttonNames.export));
        await expect(await elementAttributes.getElementAttribute(toolbar.openSliderToolbarList, 'value'))
            .toEqual(mfrSearchConst.sliderExportDropdownOptions);
    });

    it('should open  print preview all modal ', async () => {
        await partDetailsLogic.printModal(buttonNames.printPreviewAll, modalTitles.printPreviewMnf, 0);
    });

    it('should open specific print preview modals', async () => {
        await MfrSearchLogic.openSpecificPrintPreviewModals();
    });

    it(" should open res request modal and be prepopulated values ", async () => {
        await MfrSearchLogic.researchRequestModalChecking();
    });

    it('should open save search modal, should be save search modal attributes - Mfr Search results', async () => {
        await searchLogic.openSaveSearchModal();
    });

    it('should not be active save button when fill name filed with spaces - Mfr Search results', async () => {
        await input.fillFieldWithValue(searchElements.saveSearchNameField, commonSearch.spacesValue);
        await expect(button.returnButtonByText(buttonNames.saveAndReturnToResults).isEnabled()).toBeFalsy()
    });

    it('should save cpl search', async () => {
        await searchLogic.saveSearch();
        await Slider.closeSlider(sliderElements.closeSliderTab, button.returnButtonByText(buttonNames.search));
    });

    it('should display saved search in recall searches dropdown - Mfr Search', async () => {
        await searchLogic.recallSearchChecking(commonSearch.savedSearchName);
    });

    it('should display saved Mfr Search in saved searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
    });

    it('should go to search result grid from saved searches - Mfr Search', async () => {
        await searchLogic.goToSearchFromSavedSearches();
        await expect(sliderElements.openSliderBox.isDisplayed()).toBeTruthy();
    });


    it('should display saved search in recall searches dropdown and should apply saved value in search field ', async () => {
        await Slider.closeSlider(sliderElements.closeSliderTab, button.returnButtonByText(buttonNames.search));
        await expect(await elementAttributes.getElementAttribute(commonElements.commonTypeAheadInput, 'value'))
            .toEqual(typeAheadValue);
        await expect(await elementAttributes.getElementAttribute(searchElements.recallSearchesDropdown, 'value'))
            .toEqual(commonSearch.savedSearchName);
    });

    it('should delete saved Mfr searches', async () => {
        await searchLogic.displaySaveSearchInSavedSearches();
        await searchLogic.deleteSaveSearch();
    });




});