const fs = require("fs");
var skriptler = fs.readdirSync('./skriptler').filter(dosya => dosya.endsWith('.ahmetesad'));
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('kayıtlar.json')
const db = low(adapter)

db.defaults({})
    .write();

function çalıştır(komut) {
    if (komut.startsWith('konsola ') && komut.endsWith(' yazdır.')) {
        if (/konsola ((\'|\"|\`).*(\'|\"|\`)) yazdır./g.test(komut) == true) {
            var çıkış = (/konsola ((\'|\"|\`).*(\'|\"|\`)) yazdır./g.exec(komut)[1].replace(/\'|\"|\`/g, ''));
            return çıkış;
        } else {
            if (db.has(/konsola (.*) yazdır./g.exec(komut)[1]).value() == true) {
                var çıkış = db.get(/konsola (.*) yazdır./g.exec(komut)[1]).value()
                return çıkış;
            } else {
                return "böyle bir şey yok ¯\\_(ツ)_/¯";
            }
        }
    }
    if (komut.endsWith("kaydedilsin.")) {
        if (/(.*), ((\'|\"|\`).*(\'|\"|\`)) olarak kaydedilsin./.test(komut) == true) {
            var rgx = /(.*), ((\'|\"|\`).*(\'|\"|\`)) olarak kaydedilsin./;
            if (db.has(rgx.exec(komut)[1]).value() == false) {
                db.set(rgx.exec(komut)[1], rgx.exec(komut)[2].replace(/\"|\'|\`/g, ''))
                    .write();
                return db.get(rgx.exec(komut)[1]);
            } else {
                return "böyle bir şey zaten var ¯\\_(ツ)_/¯";
            }
        } else {
            var rgx = /(.*), (.*) olarak kaydedilsin./;
            if (db.has(rgx.exec(komut)[2]).value() == true) {
                if (db.has(rgx.exec(komut)[1]).value() == false) {
                    db.set(rgx.exec(komut)[1], db.get(rgx.exec(komut)[2]).value())
                        .write();
                    return db.get(rgx.exec(komut)[1]);
                } else {
                    return rgx.exec(komut)[1] + ' zaten var.'
                }
            } else {
                return rgx.exec(komut)[2] + ' diye bir şey yok.'
            }
        }
    }
    if (komut.endsWith("silinsin.")) {
        var rgx = /(.*) silinsin./g;
        if (db.has(rgx.exec(komut)[1].replace(/,/g, '')).value() == true) {
            db.unset(rgx.exec(komut)[1].replace(/,/g, '')).write();
            return rgx.exec(komut)[1].replace(/,/g, '') + " silindi.";
        } else {
            return "böyle bir şey yok ¯\\_(ツ)_/¯";
        }
    }
    if (komut.endsWith('?')) {
        if (db.has((/(.*)?/g.exec(komut)[1].replace(/\?/g, ''))).value() == true) {
            return db.get(/(.*)?/g.exec(komut)[1].replace(/\?/g, '')).value();
        } else {
            return "böyle bir şey yok ¯\\_(ツ)_/¯";
        }
    }
    if(komut == "yardım") {
        return String('YARDIM:\n- \<json\>, silinsin.\n- \<a\>, \<b\> olarak kaydedilsin.\n- konsola \<string veya json\> yazdır.\n- eğer \<a\> ise, \<b\>. ve değilse \<c\>. (b ve c ahmetesad dilinde)\n- \<json\>\?').replace(/</g, '[').replace(/>/g, ']').replace(/\n/g, '<br>');
    }
        if(komut.startsWith('eğer')) {
            var regx = /eğer (.*) ise, (.*) ve değilse, (.*)/;
            if(eval((regx.exec(komut)[1]))) {
                return çalıştır(regx.exec(komut)[2]);
            } else {
                return çalıştır(regx.exec(komut)[3]);
            }
        } else {
            çalıştır(komut);
        }
}

var aaa = "bbb";

function sth() {
    String(fs.readFileSync('./skriptler/' + document.getElementById('ç').value + '.ahmetesad')).split(" & ").map(kmt => {
        document.getElementById('op').innerHTML =
            document.getElementById('op').innerHTML + '<br>' + çalıştır(kmt);
    });
};