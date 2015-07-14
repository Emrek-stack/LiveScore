var request = require('request'),
    config = require('./global'),
    fs = require('fs');


function loadJSONFile(filename) {
    try {
        var encoding = 'utf8';
        var contents = fs.readFileSync(filename, encoding);
        return JSON.parse(contents);
    } catch (err) {
        throw err;
        console.log(err)
    }
}


function createFile() {
    request(config.LiveDataUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var currentData = loadJSONFile(config.DataFileName);
            if (JSON.stringify(currentData) != body) {
                fs.writeFile(config.DataFileName, body, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('%s ==> wrote on disk', config.DataFileName);
                    }
                });
            }
            else {
                console.log('%s has no changes', config.DataFileName);
            }
        }
    });

};

setInterval(createFile, config.FetchDataInterval);

exports.createFile = createFile;