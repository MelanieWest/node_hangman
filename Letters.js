var Letters =function(letter,guess,display){
    //object definition here - not a quiz-  elim choices?
    this.letter = letter;
    this.guess = guess;
    this.choices  = ['a','b','c','d','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    this.display   = '_';
    this.guessed = false;
    if(this.letter === this.guess){
        this.display = this.letter;
        this.guessed = true;
    }
}
console.log("Letters");

module.exports = Letters;