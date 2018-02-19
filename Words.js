console.log("Words");

var Words =function(word){
    //still need to create 'partial' & error detection method
    this.name = word;
    this.length = word.length;
    this.misses = 10;
    this.guessed = false;

//decrement misses remaining if an incorrect guess was made 
     this.countdown = function(){
        //this assumes an incorrect guess.  Add logic if that evaluation needs to be made here
        var misses = this.misses;
        misses--;
        console.log('You have %s misses remaining \n',misses);   
        return misses;    
     }  
}

module.exports = Words;