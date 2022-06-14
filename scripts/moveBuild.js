const fs = require("fs");
const ncp = require("ncp").ncp;

const appFrontEndBasePath = "../app/frontend/static";
const frontEndBuildPath = "../frontend/build";

function removeStaticFolder() {
    if (fs.existsSync(appFrontEndBasePath)) {
        fs.rmSync(appFrontEndBasePath, { recursive: true });
        console.log(`✅ Removed ${appFrontEndBasePath}`);
    }
}

function restructureIndexHtml() {

    function updateHtmlFile() {
        const source = `${appFrontEndBasePath}/index.html`;
        const data = fs.readFileSync(source).toString();
        let result = data.replace('href="/manifest.json"', 'href="/static/manifest.json"');
        result = result.replace('href="/logo192.png"', 'href="/static/logo192.png"')
        result = result.replace('href="/favicon.ico"', 'href="/static/favicon.ico"')
        fs.writeFileSync(source, result);
        console.log(`✅ Updated ${source} static file paths`);
    }

    updateHtmlFile();
    const source = `${appFrontEndBasePath}/index.html`;
    const destination = "../app/frontend/templates/index.html";

    fs.rename(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }

        console.log("✅ Restructured index.html");
        console.log("========================================================");
        console.log("✅ Finished moving web build folder");
        console.log("========================================================");
    });
}

function restructureJs() {
    const source = `${appFrontEndBasePath}/static/js`;
    const destination = `${appFrontEndBasePath}/js`;

    ncp(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        fs.rmSync(source, { recursive: true });
        console.log("✅ Restructured js files");
        restructureIndexHtml();
    });
}

function restructureCss() {
    const source = `${appFrontEndBasePath}/static/css`;
    const destination = `${appFrontEndBasePath}/css`;

    ncp(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        fs.rmSync(source, { recursive: true });
        console.log("✅ Restructured css files");
        restructureJs();
    });
}

function moveWebBuild() {
    ncp(frontEndBuildPath, appFrontEndBasePath, function (err) {
        console.log(`✅ Copied files from ${frontEndBuildPath} to ${appFrontEndBasePath}`);
        restructureCss();
    });
}

function main() {
    console.log("========================================================");
    console.log("Begin Moving Front End Files to Django app");
    console.log("========================================================");
    removeStaticFolder();
    moveWebBuild();
}

main();
