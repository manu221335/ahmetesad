var fs = require("fs"),
    request = require("request");

    request("https://ahmetesad.com/ahmetesad/guncelle", function(e, r, body) {
        console.log('- Güncellemeler Denetleniyor.')
        fs.writeFileSync("./ahmetesad.js", body);
        require("./ahmetesad.js")
    });