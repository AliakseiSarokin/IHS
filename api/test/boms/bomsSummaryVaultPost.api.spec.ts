import {user} from "../../testData/global";
import {Boms} from "../../logicLayer/boms";
import {IResponse} from "../../../utils/httpMethods";

describe('{API] boms/summary/vault endpoint POST', () => {

    it("should show Vault list", async () => {
        const vaultSummary:IResponse = await Boms.getVaultSummaryWithPost(user.userAdmin);
        await expect(vaultSummary.status).toEqual(200);
    });

    it("should show Vault list for group admin", async () => {
        const vaultSummary:IResponse = await Boms.getVaultSummaryWithPost(user.groupAdmin);
        await expect(vaultSummary.status).toEqual(200);
    });

    it("should show Vault list for kb admin admin", async () => {
        const vaultSummary:IResponse = await Boms.getVaultSummaryWithPost(user.kbAdmin);
        await expect(vaultSummary.status).toEqual(200);
    });

    it("should show Vault list for regular user", async () => {
        const vaultSummary:IResponse = await Boms.getVaultSummaryWithPost(user.regural);
        await expect(vaultSummary.status).toEqual(200);
    });

    it("should not show Vault list for read only user", async () => {
        const vaultSummary:IResponse = await Boms.getVaultSummaryWithPost(user.readonly);
        await expect(vaultSummary.body).toEqual({});
        await expect(vaultSummary.body)
            .toEqual({ errorMessage: 'Access Denied : Read only user does not have sufficient privileges.',
                returnUrl: 'https://loginsqa.ihserc.com/login/erc' });
        await expect(vaultSummary.status).toEqual(401);
    });

    it("should not show Vault list for restricted user", async () => {
        const vaultSummary:IResponse = await Boms.getVaultSummaryWithPost(user.restricted);
        await expect(vaultSummary.body)
            .toEqual({ errorMessage: 'Access Denied : Restricted user does not have sufficient privileges.',
                returnUrl: 'https://loginsqa.ihserc.com/login/erc' });
        await expect(vaultSummary.status).toEqual(401);
    })

});