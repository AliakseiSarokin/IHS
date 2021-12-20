import {browser} from "protractor";
import {meganavItems} from "../../../../../testData/global";
import {Login} from "../../../../../components/login";
import {Meganav} from "../../../../../components/meganav"
import {searchElements,videoSliderElements} from "../../../../../elements/elements";
import {TypeAhead} from "../../../../../components/typeAhead";
import {VideoSliderLogic} from "../../../../../bussinesLayer/home/videoSliderLogic";
import {videoLinks} from "../../../../../testData/video";
import {Button} from "../../../../../components/simple/button";

const button:Button = new Button();
const login:Login = new Login();
const typeAhead:TypeAhead = new TypeAhead();
const meganav:Meganav = new Meganav();

describe('Verify video tab in search page',()=>{

    it('should verify video in parts result page', async ()=>{
        await login.loginWithDirectLink(browser.params.groupAdminUrl);
        await meganav.goToFeatureWithMeganavSubLinks(meganavItems.search,meganavItems.searchSubItem.parts,searchElements.searchField)
        await typeAhead.typeAheadChecking(searchElements.searchField, '1234');
        await button.clickByButtonName('Search')
        await VideoSliderLogic.openVideoSlider();
        await expect(await videoSliderElements.videoTitles.getText()).toEqual(videoLinks.partSearchResultPageBI);
        await VideoSliderLogic.closeVideoSlider();
    });


});