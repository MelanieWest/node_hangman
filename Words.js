//console.log("Words");

var Words =function(word){
    //still need to create 'partial' & error detection method
    this.name = word;
    this.length = word.length;
    this.misses = 10;
    this.guessed = false;

//decrement misses remaining if an incorrect guess was made 
     this.countdown = function(){
        this.misses--;
        console.log('You have %s misses remaining \n',this.misses);   
        return this.misses;    
     }  
}

module.exports = Words;