const fs = require("fs");
const inquirer = require("inquirer");
const jsonfile = require("jsonfile");
const colors = require("colors");

const Words = require("./Words.js");
const Letters = require("./Letters.js");
const word = [];        //it will be an array of objects

let count = 0;          //this is used to increment the selected word
let wins = 0;
let losses = 0;

let  letter =[];         //it will be an array of objects
var displayWord ='';
var currentWord = '';
var guessedLetters = [];    //set up an array to check for duplicate guesses

//I didn't want to use regex, so I just have a super-long list of choices
const choices = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 


//get the program started with these two calls.  'newWordPrompt()' will begin to call other functions needed

wordCreate();       //call the constructor function to create the word objects before beginning
newWordPrompt();    //prompt for the first word



//this creates the word objects with initial properties and a countdown method.
//it also writes the word objects to a .json file, just because I like to do that.
//no other (local) functions are called from here.

function wordCreate(){ 
  
    word[0] = new Words('flower');
    word[1] = new Words('dove');
    word[2] = new Words('unicorn');
    word[3] = new Words('smiley');
    word[4] = new Words('rainbow');

    for(var j=0; j<word.length; j++){
        var file = 'words.json'
        var obj = JSON.stringify(word[j])+',\n';
    
        fs.appendFile(file, obj, (err) => {
            if (err) throw err;
        });
    }
}





//this is called before each new word.  The player can choose to play a new word or exit the game.
//it calls the function selectWord() if 'yes' is selected

function newWordPrompt(){

//do we have any more words?

if(count === word.length){
    //if no more words, end the game
    console.log("Good game!".red);

}else{
//if there are more words, give the option to continue

inquirer.prompt(
{
    type: "list",
    message: "Would you like a new word?",
    choices: ["Yes, please.","No, thank you."],
    name: "ready",
}
).then(function(response){
    //console.log('then function');


    if(response.ready == 'Yes, please.'){
        console.log('\n');
        selectWord();   //this selects the next word in the array and calls the needed functions for guessing

    }else{
        console.log('\n');
        console.log('have a nice day');
    }

})
}   //end of if-else block
}  //end of newWordPrompt

  


//this function does initial setup for word choice and creates letter objects.  It does not get called again
//until a new word is needed

function selectWord(){
    currentWord = word[count];
    //console.log(currentWord.name);

    for(i=0; i<currentWord.length; i++){

       //create letter objects
       letter[i] = new Letters(currentWord.name[i]);     //set up letter object initial values here (blank and not guessed)
       //store letter data in a file
       var file = 'letters.json'
       var obj = JSON.stringify(letter[i])+',\n';

       fs.appendFile(file, obj, (err) => {
           if (err) throw err;
       });

    }

    count++;

    // //test if they have used up all the words
    //(for now, move this decision to before the prompt)
    // if(count===word.length){
    //     console.log("Good game!".red);
    // }else{
    //     wordDisplay();   //this uses letter properties to display the guessed letters or blanks
    // }

    wordDisplay();
    return currentWord;
}



//this function will be recursively called until the word is guessed.

function wordDisplay(){   

 displayWord = '';       //reset each time

    for(i=0; i<currentWord.length; i++){
        displayWord += letter[i].display+' ';   
    }

    console.log('\n',displayWord.blue,'\n');

    //prompt for a new guess if the word is not complete

    if(!currentWord.guessed){letterPrompt();}

}       //end of wordDisplay function




function letterPrompt(){

//ask the questions and score answers. Then call function again.
inquirer
.prompt ([
    {         
        type: "list",
        message: 'Guess a letter: ',
        choices: choices,
        name: "answer"
    }

]).then(function(response,error){
    if(error){
        throw error;
    };

    //here is where I will need to check the letter and call wordDisplay() again after updating
    //all the 'letter' object properties, using my letterGuess(letter) function

    //console.log(response);



    for(k=0;k<guessedLetters.length;k++){       //I got in trouble with this.  remove for now
        var duplicate = false;

        //test for a duplicate guess before proceeding
        if(response.answer === guessedLetters[k]){
            console.log('You have already guessed the letter ',response.answer);
            wordDisplay();
            duplicate = true;
        }

    }


    //if it's not a duplicate, add it to the list and proceed with evaluating the guess
    if(!duplicate){
        guessedLetters.push(response.answer);
        console.log(guessedLetters);
        letterGuess(response.answer);
    }
    


});  // end of then
   
}       //end of letterPrompt function




//this is the workhorse.  It evaluates whether a guess was correct and calls the next functions that are needed
function letterGuess(ans){      
    //code for guessing the letter
    //console.log('letter guess');

    //set to true until proven false
    currentWord.guessed = true;

    //set to 1 meaning incorrect guess assumed
    let flag = 1;

    for(i=0; i<currentWord.length; i++){
        if(!letter[i].guessed && ans === letter[i].char){
            letter[i].display = ans;
            letter[i].guessed = true;
            flag = 0;       //flag to indicate correct guess somewhere in the word
        }
        else if(!letter[i].guessed){
            currentWord.guessed=false
            //if any letters still aren't guessed, then the word isn't guessed
        }
    }

    //if the flag=1 still, then the letter wasn't a good guess

    if(flag){       //incorrect guess
        currentWord.countdown();
        if(currentWord.misses==0){  //count as a loss and restart

            console.log("Sorry!  You're out of guesses.  The word was: ");
            console.log(currentWord.name);
            losses++;
            console.log("Wins: ",wins,'\n',"Losses: ",losses);
            newWordPrompt();

        }else{
            wordDisplay();
        }
    }else if(currentWord.guessed){  //all correctly guessed
        //count as a win and restart

        //console.log('word: '+currentWord.name);      //display the answer
        wordDisplay();      //display the completed word
        console.log('Good job! You guessed it!');
        wins++;

        guessedLetters=[];      //reset the array of guessed letters
        console.log("Wins: ",wins,'\n',"Losses: ",losses);
        newWordPrompt();     //offer a new word
        
    }else{      //correct guess but incomplete word
        wordDisplay();      //display the updated word
    }


}       //end of function letterGuess


