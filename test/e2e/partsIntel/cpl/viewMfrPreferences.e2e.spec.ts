import {browser} from "protractor";
import {buttonNames, linksNames, meganavItems, titles} from "../../../../testData/global";
import {commonElements, gridElements, pageTitles, viewMfrPref} from "../../../../elements/elements";
import {viewMfrPrefData} from "../../../../testData/cpl";
import {Dropdown} from "../../../../components/dropdown";
import {ImportLogic} from "../../../../bussinesLayer/import/importLogic";
import {ImportMfrPredLogic} from "../../../../bussinesLayer/cpl/viewMfrPref/importMfrPredLogic";
import {InstructionPanel} from "../../../../components/instructionPanel";
import {Header} from "../../../../components/header";
import {Grid} from "../../../../components/grid";
import {Login} from "../../../../components/login";
import {Meganav} from "../../../../components/meganav";
import {Modal} from "../../../../components/modal";
import {Toolbar} from "../../../../components/toolbar";
import {TypeAhead} from "../../../../components/typeAhead";
import {Shade} from "../../../../components/shade";
import {ViewMfrPrefLogic} from "../../../../bussinesLayer/cpl/viewMfrPref/viewMfrPrefLogic";
import {Waiters as w} from "../../../../helper/waiters";
import {HelpLogic} from "../../../../bussinesLayer/help/helpLogic";

const dropdown: Dropdown = new Dropdown();
const importLogic: ImportLogic = new ImportLogic();
const importMfrPrefLogic: ImportMfrPredLogic = new ImportMfrPredLogic();
const instructionPanel: InstructionPanel = new InstructionPanel();
const header: Header = new Header();
const grid: Grid = new Grid();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const typeAhead: TypeAhead = new TypeAhead();
const shade: Shade = new Shade();
const viewMfrPrefLogic:ViewMfrPrefLogic = new ViewMfrPrefLogic();
const helpLogic: HelpLogic = new HelpLogic();
describe('View Manufacturer Preferences', () => {

    it('should go to View Manufacturer Preferences from Meganav',  async () => {
        await login.loginWithDirectLinkPI(browser.params.groupAdminUrlPI);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.cpl,
            meganavItems.cplSublinks.viewMfrPref, gridElements.checkboxSelector.get(1));
        expect(await pageTitles.pageTitleShim2.getText()).toEqual(titles.viewMfrPref);
    });

    it('should be instruction panel with option to hide/unhide',  async () => {
        await instructionPanel.instrPanelHidingUnhidingChecking('View Manufacturer Preferences');
    });

    it("should open help panel and check title", async () => {
        await helpLogic.openAndCheckHelpPanelTitle('Manufacturer Preferences');
    });

    it('should be tag label for columns filtering - sort A to Z ',  async () => {
        await toolbar.filterAllColumnsAZ();
    });

    it('should remove filtering with clear all',  async () => {
        await toolbar.clearFilteringWithClearAll();
    });

    it('should be tag label for columns filtering - sort Z to A',  async () => {
        await toolbar.filterAllColumnsZA();
    });

    it('should remove filtering with clear all X',  async () => {
        await toolbar.clearFilteringWithX();
    });

    it('should have unhide button with dropdown list  - View Manufacturer Preferences',  async () => {
        await toolbar.unhideDropdown();
    });

    it('should hide the column - View Manufacturer Preferences',  async () => {
        await toolbar.hideColumn();
    });

    it('should unhide the column with Unhide All -  View Manufacturer Preferences',  async () => {
        await toolbar.unhideColumn();
    });
});