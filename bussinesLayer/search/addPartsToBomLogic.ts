import {browser} from "protractor";
import {searchElements} from "../../elements/elements";
import {Waiters as w} from "../../helper/waiters";

export class AddPartsToBomLogic {

    public async collapseSectionByNumber(sectionNumber: number) {
        const startGridCount: number = await searchElements.addPartsToBom.gridWrapper.count();
        await searchElements.addPartsToBom.panelTitle.get(sectionNumber).click();
        await expect(searchElements.addPartsToBom.workspaceCheckboxes.get(0).isPresent()).toBeFalsy();
        await expect(searchElements.addPartsToBom.bomsCheckboxes.get(0).isPresent()).toBeFalsy();
    };

    public async expandSectionByNumber(sectionNumber: number) {
        await searchElements.addPartsToBom.panelTitle.get(sectionNumber).click();
        await w.waitUntilElementIsClickable(searchElements.addPartsToBom.chekboxes.get(1));
        await browser.sleep(1000)
    };
}
