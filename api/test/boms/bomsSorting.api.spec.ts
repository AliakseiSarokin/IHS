import {user} from "../../testData/global";
import {bomsModel, getDataFromBoms} from "../../models/boms/boms";
import {Boms} from "../../logicLayer/boms";

describe('view all boms, columns sorting', () => {

    it("should sort by BOM name asc", async () => {
        const boms = await Boms.getBomsList(user.userAdmin);
        await getDataFromBoms(boms);
        let bomsSortedByJS = bomsModel.BM_BOM_NAME.sort(function (a,b) {
            return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        const boms1 = await Boms.getBomsListSortedAsk(user.userAdmin);
        await getDataFromBoms(boms1);
        await expect(bomsSortedByJS).toEqual(bomsModel.BM_BOM_NAME);
    });

    it("should sort by BOM name desc", async () => {
        const boms = await Boms.getBomsList(user.userAdmin);
        await getDataFromBoms(boms);
        let bomsSortedByJS = bomsModel.BM_BOM_NAME.sort(function (a,b) {
            return b.toLowerCase().localeCompare(a.toLowerCase());
        });
        const boms1 = await Boms.getBomsListSortedDesc(user.userAdmin);
        await getDataFromBoms(boms1);
        await expect(bomsSortedByJS).toEqual(bomsModel.BM_BOM_NAME);
    });


});