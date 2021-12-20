import {administrationElements, gridElements} from "../../elements/elements";
import {buttonNames, fieldStatuses, linksNames} from "../../testData/global";
import {Button} from "../../components/simple/button";
import {CheckBox} from "../../components/simple/checkBox";
import {ElementAttributes} from "../../utils/elementAttributes";
import {Grid} from "../../components/grid";
import {Link} from "../../components/simple/link";
import {RadioButton} from "../../components/simple/radioButton";
import {Waiters as  w} from "../../helper/waiters";

const button: Button = new Button();
const checkbox: CheckBox = new CheckBox();
const elementAttributes: ElementAttributes = new ElementAttributes();
const grid: Grid = new Grid();
const link: Link = new Link();
const radioButton: RadioButton = new RadioButton();
export class ManageUsersLogic {

    public async allCheckboxChecking () {
        await checkbox.checkUnCheckCheckboxes(administrationElements.manageUsers.reassignItemsShade.checkAllLabel,
            administrationElements.manageUsers.reassignItemsShade.checkAllInput, fieldStatuses.fillField);
        const checkboxAmount: number = administrationElements.manageUsers.reassignItemsShade.itemsCheckboxInputs.count();
        for(let i:number = 0; i < checkboxAmount; i++) {
            await expect(await elementAttributes.getElementAttribute(administrationElements.manageUsers.reassignItemsShade.itemsCheckboxInputs.get(i),
                'class')).toContain(fieldStatuses.emptyField);
        }
        await checkbox.checkUnCheckCheckboxes(administrationElements.manageUsers.reassignItemsShade.checkAllLabel,
            administrationElements.manageUsers.reassignItemsShade.checkAllInput, fieldStatuses.fillField);
        for(let i:number = 0; i < checkboxAmount; i++) {
            await expect(await elementAttributes.getElementAttribute(administrationElements.manageUsers.reassignItemsShade.itemsCheckboxInputs.get(i),
                'class')).toContain(fieldStatuses.emptyField);
        }

    };

    public async reassignButtonChecking () {
        await checkbox.checkUnCheckCheckboxes(administrationElements.manageUsers.reassignItemsShade.itemsCheckboxLabels,
            administrationElements.manageUsers.reassignItemsShade.itemsCheckboxInputs, fieldStatuses.fillField);
        await expect(button.returnButtonByText(buttonNames.reassign).isEnabled()).toBeFalsy();
        await checkbox.checkUnCheckCheckboxes(administrationElements.manageUsers.reassignItemsShade.checkAllLabel,
            administrationElements.manageUsers.reassignItemsShade.checkAllInput, fieldStatuses.fillField);
        await checkbox.checkUnCheckCheckboxes(administrationElements.manageUsers.reassignItemsShade.checkAllLabel,
            administrationElements.manageUsers.reassignItemsShade.checkAllInput, fieldStatuses.emptyField);
        let userList: string[] = await administrationElements.manageUsers.reassignItemsShade.userRadioLabels.getText();
        await radioButton.checkRadioButtonByLabelName(userList[3]);
        await expect(button.returnButtonByText(buttonNames.reassign).isEnabled()).toBeFalsy();
        await checkbox.checkUnCheckCheckboxes(administrationElements.manageUsers.reassignItemsShade.itemsCheckboxLabels,
            administrationElements.manageUsers.reassignItemsShade.itemsCheckboxInputs, fieldStatuses.fillField);
        await expect(button.returnButtonByText(buttonNames.reassign).isEnabled()).toBeTruthy();
    };

    public async selectRowByUserName(userName: string) {
        const rowsAmount: number = await gridElements.newGridRows.count();
        for (let i: number = 0; i < rowsAmount; i++) {
            if(await gridElements.newGridUnlockedColumnRowCellsWithContent(i).get(0).getText() === userName) {
                await grid.newMechanismCheckboxRangeChecking(i, i+1);

            }
        }
    };

    public async makeUserActive(userName: string) {
        await link.clickOnTheLinkByNameAndWaitForElement(linksNames.activate, await gridElements.newGridCheckboxSelector.last());
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(gridElements.newGridRows.last());
        await w.waitUntilWorkingModalNotDisplayed();
        const rowsAmount: number = await gridElements.newGridRows.count();
        const userNameList: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'User Name');
        const userIndex: number = userNameList.findIndex(item => item === userName);
        const activeStatus: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Active Status');
        await expect(activeStatus[userIndex]).toEqual('Active');
    };

    public async makeUserInactive(userName: string) {
        await w.waitUntilWorkingModalNotDisplayed();
        await link.clickOnTheLinkByNameAndWaitForElement(linksNames.inactivate, await gridElements.newGridCheckboxSelector.last());
        await w.waitUntilWorkingModalNotDisplayed();
        await w.waitUntilElementIsDisplayed(gridElements.newGridRows.last());
        await w.waitUntilWorkingModalNotDisplayed();
        const rowsAmount: number = await gridElements.newGridRows.count();
        const userNameList: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'User Name');
        const userIndex: number = userNameList.findIndex(item => item === userName);
        const activeStatus: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Active Status');
        await expect(activeStatus[userIndex]).toEqual('Inactive');
        await w.waitUntilWorkingModalNotDisplayed();
    }
}