function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function totalAmtToBePaid(amt){
    
    return amt;
}

function getReturnAmount(amt, ratio){
    return amt * ratio;
}
  
module.exports={randomNumber, totalAmtToBePaid, getReturnAmount};