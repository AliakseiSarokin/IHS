const fse = require('fs-extra');
const fs = require('fs');
const pathToDownloads = __dirname + '.\\..\\output\\downloads\\';
beforeEach( async () => {
    if (!await fse.existsSync(pathToDownloads)){
        await fse.mkdirSync(pathToDownloads);
    }
    await fse.emptyDirSync(pathToDownloads);
});

