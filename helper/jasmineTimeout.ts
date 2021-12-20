import Jasmine = jasmine.Jasmine;
export class JasmineTimeout {

    public static async setJasmineTimeout(value: number) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = value
    }
}