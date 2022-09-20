const fs = require('fs');

function getJson(file, value) {
    fetch(`../${file}.json`)
        .then((response) => response.json())
        .then((json) => {
            const parsed = JSON.parse(json);
            return parsed[value];
        }).catch(err => console.log(err));
}

/*function setJson(file, value, data) {
}*/

module.exports = { getJson };