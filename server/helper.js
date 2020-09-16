

module.exports = function (string) { 
    if(string.includes('https://')){
        return 1;
    }
    else if(string.includes('http://')){
        return 2;
    } 
        return 0;  
};