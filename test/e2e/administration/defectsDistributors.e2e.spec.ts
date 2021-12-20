import {
    buttonNames, meganavItems, titles, exportOptions, modalTitles, columnHeaders,
    headerItems
} from "../../../testData/global";
import {
    pageTitles, gridElements, commonElements, administrationElements,
    dropdownElements, headerElements
} from "../../../elements/elements";
import {browser} from "protractor";
import {Grid} from "../../../components/grid";
import {InstructionPanel} from "../../../components/instructionPanel";
import {Header} from "../../../components/header";
import {Login} from "../../../components/login";
import {columnIdByColumnName} from "../../../testData/columnIdByColumnName";

const grid:Grid = new Grid();
const instructionPanel:InstructionPanel = new InstructionPanel();
const login: Login = new Login();

describe('Distributors page defects', () => {

    it("should go to Distributors page", async () => {
            await login.loginWithDirectLink(browser.params.groupAdminUrl);
            await Header.hoverOnHeaderItemAndClickOnDisplayedLink(headerElements.settingsIcon, headerItems.settingsMenuLinks[7],
                administrationElements.distributors.grid);
    });

    it("should match page title", async () => {
        await expect(await administrationElements.distributors.title.getText()).toEqual('Hide Selected Distributors');
    });

    it('should be unique Distributor Names records', async () => {
        await instructionPanel.hideIntructionPanel();
        const values: any[] = await grid.getCellValuesByCellId(columnIdByColumnName.distributors["Distributor Name"]);
        const uniqueValues: any[] = await [... await new Set(values)];
        await expect(values).toEqual(uniqueValues);
    });

});