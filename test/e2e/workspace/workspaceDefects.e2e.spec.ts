import {browser} from "protractor";
import {buttonNames, columnHeaders, meganavItems, titles} from "../../../testData/global";
import {Button} from "../../../components/simple/button";
import {Grid} from "../../../components/grid";
import {gridElements} from "../../../elements/elements";
import {InstructionPanel} from "../../../components/instructionPanel";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {Modal} from "../../../components/modal";
import {Toolbar} from "../../../components/toolbar";
import {WorkspaceLogic} from "../../../bussinesLayer/worksapce/workspaceLogic";
import {GetPerformanceLogs} from "../../../utils/getPerformanceLogs";
import {IRequestInfoType} from "../../../testData/getPerformLogsInterfaces";
import {endpoints} from "../../../api/testData/endpointList";
import {StringArray} from "../../../utils/stringArray";
import {requestBody} from "../../../api/testData/bodyList";
const button: Button = new Button();
const grid: Grid = new Grid();
const instructionPanel = new InstructionPanel();
const login: Login = new Login();
const meganav: Meganav = new Meganav();
const modal: Modal = new Modal();
const toolbar: Toolbar = new Toolbar();
const workspaceLogic: WorkspaceLogic = new WorkspaceLogic();

describe('My Workspace defect, DE114728', () => {

    it('Workspace comment is not being updated', async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.boms, meganavItems.bomsSubItems.viewAllBoms,
            gridElements.newGridRows.get(0));
        await workspaceLogic.addToWorkspaceBoms();
        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.newGridRows.get(0));
        await workspaceLogic.addComment();

        await meganav.goToFeatureWithMeganav(meganavItems.myWorkspace, gridElements.gridWrapper);
        await grid.checkCheckboxRangeNewGrid(0, 1);
        await workspaceLogic.removeItemFromWorkspace();
    });
});