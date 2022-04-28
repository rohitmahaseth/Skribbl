const users3 = [];

function Joinword(word){
    users3.push(word);
    return word
}
function getword(){
    return users3
}

module.exports={
    Joinword,
    getword
}