const words ={
    programming: "The action or process of writing computer programs.",

    charisma: "A personal magic of leadership arousing special popular loyalty or enthusiasm for a public figure (such as a political leader)",

    sleuth: "To act as a detective : search for information",

    foray: "A sudden or irregular invasion or attack for war or spoils : raid",

    adjudicate: "to make an official decision about who is right in (a dispute) : to settle judicially"
}

function checkInput(input){
    if(typeof input == 'string'){
        return input;
    } else {
        throw "error";
    }
}

function lookupDefinition(inputVal){
    checkInput(inputVal);
    if(words[inputVal] != undefined){
        return words[inputVal];
    } else {
        throw "error";
    }
}

function getWord(definition){
    checkInput(definition);
    let findingKey = Object.keys(words).find(function(key){
        if(words[key] == definition){
            return key;
        }else{
            return undefined;
        }
    })
    if(findingKey == undefined){
        throw "Word not found";
    } else {
        return findingKey;
    }
}

module.exports = {
    lookupDefinition,
    getWord
}