const path = require('path');
const fs = require('fs-extra');
const merge = require('merge');
const configName = 'daacs/config/environment';
const configContentPattern = new RegExp(`<meta name="${configName}" content="([^"]+)" />`);
const cssLinkPlaceholder = '<!-- CSS_OVERRIDE_LINK -->';

module.exports = function applyRuntimeConfig(distPath) {
    const indexPath = path.join(__dirname, distPath, '/index.html');
    const pkgPath = path.join(__dirname, distPath, '/package.json');
    const configuredIndexPath = path.join(__dirname, distPath, '/index-configured.html');
    const cssOverridePath = path.join(__dirname, distPath, '/assets/override.css');
    let indexContents = fs.readFileSync(indexPath, {encoding: 'utf-8'});

    if(process.env.CLIENT_CONFIG_PATH) {
        //if the file does not exist, is not readable, or is not valid JSON, an error will be thrown and the process will exit
        let fileContents = fs.readFileSync(process.env.CLIENT_CONFIG_PATH, {encoding: 'utf-8'});
        let parsedFileContents = JSON.parse(fileContents);
        let origConfig = JSON.parse(unescape(indexContents.match(configContentPattern)[1]));
        let mergedConfig = merge.recursive(true, origConfig, parsedFileContents);
        let serializedConfig = escape(JSON.stringify(mergedConfig));
        indexContents = indexContents.replace(configContentPattern, `<meta name="${configName}" content="${serializedConfig}" />`);

        //apply the same config changes to the package.json's appConfig object, so that the changes will be used in fastboot
        let pkgContents = fs.readFileSync(pkgPath, {encoding: 'utf-8'});
        let pkgJSON = JSON.parse(pkgContents);
        let mergedPkgConfig = merge.recursive(true, pkgJSON, {fastboot: {appConfig: parsedFileContents}});
        pkgContents = JSON.stringify(mergedPkgConfig, null, '  ');
        fs.writeFileSync(pkgPath, pkgContents);
    }

    if(process.env.CLIENT_CSS_PATH) {
        //if the file does not exist or is not readable, an error will be thrown and the process will exit
        fs.copySync(process.env.CLIENT_CSS_PATH, cssOverridePath, {clobber: true});
        indexContents = indexContents.replace(cssLinkPlaceholder, '<link rel="stylesheet" href="assets/override.css">');
    }

    console.log('Creating new index-configured.html file with all runtime configurations applied...');
    fs.writeFileSync(configuredIndexPath, indexContents);
}
