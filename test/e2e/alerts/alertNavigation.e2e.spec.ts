import {browser} from "protractor";
import {dropdownElements, gridElements} from "../../../elements/elements";
import {buttonNames, meganavItems} from "../../../testData/global";
import {Login} from "../../../components/login";
import {Meganav} from "../../../components/meganav";
import {alertsData} from "../../../testData/alerts";
import {Toolbar} from "../../../components/toolbar";
import {HomeLogic} from "../../../bussinesLayer/home/homeLogic";

const homeLogic: HomeLogic = new HomeLogic();
const toolbar: Toolbar = new Toolbar();
const login: Login = new Login();
const meganav: Meganav = new Meganav();


describe("Alerts navigation", () => {

    it("should chosen 'Alert by BOM' be active in grid Filter dropdown", async () => {
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        for (let i=0; i<meganavItems.alertsSubItems.alertsByBom.length; i++) {
            await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
                meganavItems.alertsSubItems.alertsByBom[i], gridElements.gridWrapper);
            await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
            await expect(dropdownElements.dropdownActiveValue.getText()).toEqual(alertsData.alertsByBomFilterDropdownValues[i])
        }
    });

    it("should chosen 'Alert by ID' be active in grid Filter dropdown", async () => {
        for (let i=0; i<meganavItems.alertsSubItems.alertsById.length; i++) {
            await meganav.goToFeatureWithMeganavSubLinks(meganavItems.alerts,
                meganavItems.alertsSubItems.alertsById[i], gridElements.grid);
            await toolbar.openToolbarDropdownByButtonName(buttonNames.filterByDate);
            await expect(dropdownElements.dropdownActiveValue.getText()).toEqual(alertsData.alertsByIdFilterDropdownValues[i])
        }
    });

    it("should chosen home page 'Alert' be active in grid Filter dropdown", async () => {
        for (let i=0; i<meganavItems.alertsSubItems.homePageAlerts.length; i++) {
            await homeLogic.goToHome();
            await meganav.goToFeatureWithMeganav(meganavItems.alertsSubItems.homePageAlerts[i], gridElements.grid );
            await toolbar.openToolbarDropdownByButtonName(buttonNames.filter);
            await expect(dropdownElements.dropdownActiveValue.getText()).toEqual(alertsData.homePageAlertsFilterDropdownValues[i])
        }
    });
});