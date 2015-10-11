'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите
/*
 Функция добавления записи в телефонную книгу.
 На вход может прийти что угодно, будьте осторожны.
 */
module.exports.add = function add(name, phone, email) {
    var regexpPhone = /^((\+\d+|\d+)[\- ]?)?(\(\d{3}\)[\- ]?|\d{3}[\- ]?)[\d\- ]{7,10}$/;
    var regexpEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Zа-яА-Я0-9-]+(\.[a-zA-Zа-яА-Я0-9-.]+)+$/;
    if (regexpPhone.test(phone) && regexpEmail.test(email)) {
        var member =
        {
            name: name,
            phone: phone,
            email: email
        };
        phoneBook.push(member);
        return true;
    }
    else {
        return false;
    }
};
/*
 Функция поиска записи в телефонную книгу.
 Поиск ведется по всем полям.
 */
module.exports.find = function find(query) {
    for (var i = 0; i < phoneBook.length; i++) {
        var regexpSearch = new RegExp(query);
        var bookKeys = Object.keys(phoneBook[i]);
        for (var el in phoneBook[i]) {
            if (phoneBook[i][el].indexOf(query) + 1) {
                console.log([
                    phoneBook[i].name,
                    phoneBook[i].phone,
                    phoneBook[i].email
                ].join(', '));
                break;
            }

        }

    }

};

/*
 Функция удаления записи в телефонной книге.
 */
module.exports.remove = function remove(query) {
    for (var i = 0; i < phoneBook.length; i++)
    {
        if (phoneBook[i].name.indexOf(query) > -1 || phoneBook[i].phone.indexOf(query) > -1 || phoneBook[i].email.indexOf(query) > -1)
            phoneBook.slice(0,i).concat(phoneBook.slice(i + 1));
    }
};

/*
 Функция импорта записей из файла (задача со звёздочкой!).
 */
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    var stringsVCS= data.split('\n');
    var params = [];
    for (var i = 0;i < stringsVCS.length;i++)
    {
        params = stringsVCS[i].split(';');
        module.exports.add(params[0], params[1], params[2]);
    }
};
/*
 Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
 */
module.exports.showTable = function showTable() {

    var maxLengthNames = 0;
    var maxLengthPhones = 0;
    var maxLengthEmails = 0;
    for (var i = 0;i < phoneBook.length; i++)
    {
        if (phoneBook[i].name.length > maxLengthNames)
            maxLengthNames = phoneBook[i].name.length;
        if (phoneBook[i].phone.length > maxLengthPhones)
            maxLengthPhones = phoneBook[i].phone.length;
        if (phoneBook[i].email.length > maxLengthEmails)
            maxLengthEmails = phoneBook[i].email.length;
    }
    if (maxLengthNames < 4)
        maxLengthNames = 4
    if (maxLengthPhones < 8)
        maxLengthPhones = 8
    if (maxLengthEmails < 4)
        maxLengthEmails = 4
    var firstString = "┌";
    var lastString = "└";
    var endTitleString = "├";
    for (var i = 0;i< maxLengthNames + 1; i++)
    {
        firstString += "─";
        lastString += "─";
        endTitleString += "─";
    }
    firstString += "┬";
    lastString += "┴";
    endTitleString += "┼";
    for (var i = 0;i< maxLengthPhones + 1; i++)
    {
        firstString += "─";
        lastString += "─";
        endTitleString += "─";
    }
    firstString += "╥";
    lastString += "╨";
    endTitleString += "╫";
    for (var i = 0;i< maxLengthEmails  +1; i++)
    {
        firstString += "─";
        lastString += "─";
        endTitleString += "─";
    }
    firstString += "┐";
    lastString += "┘";
    endTitleString += "┤";
    console.log(firstString);
    var titleString = "│";
    titleString += " Имя";
    for (var i = 0; i <= maxLengthNames - 5 + 1;i++)
        titleString += " ";
    titleString += "│";
    titleString += " Телефон";
    for (var i = 0; i <= maxLengthPhones - 9 + 1;i++)
        titleString += " ";
    titleString += "║";
    titleString += " Почта";
    for (var i = 0; i <= maxLengthPhones - 5 + 1;i++)
        titleString += " ";
    titleString += "│";
    console.log(titleString);
    console.log(endTitleString);
    for (var i = 0;i < phoneBook.length; i++)
    {
        var nowPrintString = "│";
        nowPrintString += " ";
        nowPrintString += phoneBook[i].name;
        for (var j = 0; j <= maxLengthNames - phoneBook[i].name.length - 1;j++)
            nowPrintString += " ";
        nowPrintString += "│";
        nowPrintString += " ";
        nowPrintString += phoneBook[i].phone;
        for (var j = 0; j <= maxLengthPhones - phoneBook[i].phone.length - 1;j++)
            nowPrintString += " ";
        nowPrintString += "║";
        nowPrintString += " ";
        nowPrintString += phoneBook[i].email;
        for (var j = 0; j <= maxLengthPhones - phoneBook[i].email.length + 1;j++)
            nowPrintString += " ";
        nowPrintString += "│";
        console.log(nowPrintString);
    }
    console.log(lastString);

};
