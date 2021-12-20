import {gridElements, pageTitles} from "../../elements/elements";
import {Link} from "../../components/simple/link";
import {Waiters} from "../../helper/waiters";
const link: Link = new Link();
export class AlertsByBomLogic {

    public async goToSingleBom() {
        await Waiters.waitUntilElementIsClickable(gridElements.newGridUnlockLinkByRowIndex(0).get(1));
        let bomName: string = await gridElements.newGridUnlockLinkByRowIndex(0).get(0).getText();
        await link.clickOnTheLinkByNameAndWaitForElement(bomName, gridElements.grid);
        await expect(await pageTitles.singleBomPageTitle.getText()).toContain(bomName);



    }


}