const fs = require("fs");
const path = require("path");
console.log(`__dirname`, __dirname);
const components = fs.readdirSync(path.join(__dirname, "../../src/components"));

function componentExists(comp) {
    console.log(`components`, components);
    console.log(`comp`, comp);
    const idx = components.indexOf(comp);
    console.log(`idx`, idx);
    console.log(`components.indexOf(comp) >= 0`, components.indexOf(comp) >= 0);
    return components.indexOf(comp) >= 0;
}

module.exports = componentExists;
