/*jslint node: true */
"use strict";

let Path   = require('path');

let pathArray = __dirname.split(/\/|\\/);
let depth = 0;
let packageInfo;
let path;

while (depth++ < pathArray.length) {
    path = pathArray.slice(0, depth).join(Path.sep);

    try {

        // try to load package.json
        packageInfo = require(path + '/package.json');

        // root found: stopping the loop
        break;
    }
    catch (ex) {
        if (ex.code !== 'MODULE_NOT_FOUND')  {
            // package.json was found but reading it raised an error
            // pass on the error
            throw ex;
        }

        // no package.json found at this depth
        // do nothing and load next path depth
    }
}

// create root package info Object
let rootPackageInfo = {
    name        : packageInfo.name,
    directory   : Path.basename(path),
    deployPath  : Path.dirname(path),
    path        : path,
    package     : packageInfo
};

module.exports = rootPackageInfo;
