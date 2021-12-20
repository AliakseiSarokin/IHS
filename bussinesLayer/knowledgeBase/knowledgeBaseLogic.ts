import {gridElements} from "../../elements/elements";
import {browser} from "protractor";
import {Modal} from "../../components/modal";
import {Grid} from "../../components/grid";
import {Waiters as w} from "../../helper/waiters";
import {allureStep} from "../../helper/allure/allureSteps";

const modal:Modal = new Modal();
const grid:Grid = new Grid();

export class KnowledgeBaseLogic {

    public async checkingLinksInColumn (startNumber:number) {
        const rows: number = await gridElements.newGridRows.count();
        for(let i:number = 0; i <  rows; i++){
            await expect(await gridElements.newGridUnlockedColumnLinksByRowAndCellNumbers(i, startNumber).get(0).isPresent()).toBe(true);
        }
    };

    public async openAcceptedPN(title:string) {
        const acceptPNText: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Accepted P/N');

        for (let i:number = 0; i < acceptPNText.length; i++) {
            if (await acceptPNText[i].length>1) {
                await modal.openModalWithLinkName(acceptPNText[i]);
                await browser.sleep(5000);
                await w.waitUntilElementIsClickable(modal.modalTitle);
                await expect(modal.modalTitle.getText()).toContain(title);
                await modal.closeModalWithXButton();
                break;
            }
        }
    };

    public async openAcceptedMfr(title) {
        const mfrText: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Accepted Mfr');
        for (let i=1;i<mfrText.length;i=i+3) {
            if (await mfrText[i].length>1) {
                await modal.openModalWithLinkName(mfrText[i]);
                await modal.closeModalWithXButton();
                break;
            }
        }
    };

    public async openAcceptedMfrNameColumnLinkByName(mfrName?: string) {
        await allureStep(`Open Mfr Name Column Link by Mfr name, or the first link if name is not privided`, async () => {
            const mfrText: string[] = await grid.newGridReturnCellValuesByColumnName(1, 'Accepted Mfr Name');
            if (mfrName) {
                for (let i:number = 1; i < mfrText.length; i = i + 3) {
                    if (await mfrText[i].length > 1) {
                        await modal.openModalWithElement(gridElements.newGridCellLinkByRowIndexAndCellNumber(i,1));
                        break;
                    }
                }

            } else {
                await modal.openModalWithLinkName(mfrText[0]);
            }

        });
    }
}