export class Random {

    public randomNumberGenerator(charsAmount){
        let text = '';
        let possible = "0123456789";
        for (let i = 0; i < charsAmount; i+=1) {
            text +=  possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return   text ;
    }

    public randomTextGenerator(charsAmount){
        let text = '';
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < charsAmount; i+=1) {
            text +=  possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return   text ;
    };

    public randomTextWithoutNumbersGenerator(charsAmount){
        let text = '';
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < charsAmount; i+=1) {
            text +=  possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return   text ;
    };
}