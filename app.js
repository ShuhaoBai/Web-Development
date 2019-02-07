const dic = require("./dic");
const readLineSync = require('readline-sync');
let value = readLineSync.question("Please enter your input value: ");

function lookupDefinition(value){
    try{
        console.log(dic.lookupDefinition(value));
    }catch(error){
        console.log(error);
    }
}

function getWord(value){
    try{
        console.log(dic.getWord(value));
    }catch (error){
        console.log(error);
    }
}

lookupDefinition(value);
getWord(value);