const fs = require("fs");
const inquirer = require("inquirer");
const jsonfile = require("jsonfile");
const colors = require("colors");

const Words = require("./Words.js");
const Letters = require("./Letters.js");

function wordCreate(){      //create the word objects first
  
    word[0] = new Words('pizza');
    word[1] = new Words('nachos');
    word[2] = new Words('apple');
    word[3] = new Words('guacamole');
    word[4] = new Words('jellybean');

    for(var j=0; j<word.length; j++){
        var file = 'words.json'
        var obj = JSON.stringify(word[j])+',\n';

        
        fs.appendFile(file, obj, (err) => {
            if (err) throw err;
        });
    }
}

let displayWord = [];
const letters = ['a','b','c','d','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 

wordCreate();       //call the constructor function to create the word objects before beginning


inquirer.prompt(
{
    type: "list",
    message: "Would you like a new word?",
    choices: ["yes","no"],
    name: "ready",
}
).then(function(response){
    //console.log('then function');


    if(response.ready == 'yes'){
        console.log('\n');
        selectWord();
    }else{
        console.log('\n');
        console.log('have a nice day');
    }

})  //end of prompt for new word

//

let count = 0;
let letter =[];
var displayWord ='';

//this function does initial setup for word choice and display of blanks.  It does not get called again
//until a new word is needed

function selectWord(){
    const choices = ['a','b','c','d','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
    var currentWord = word[count]
   for(i=0; i<currentWord.length; i++){
       letter[i] = new Letters(currentWord[i]);     //set up letter object initial values here (blank and not guessed)
       displayWord += letter[i].letter;
   }

    displayWord.join(' ');      //displayWord is a temp holder.  go back to the letter objects each time after this.
    console.log(displayWord);

    return displayWord;
    wordDisplay();   //display the current word with guessed letters inserted
    count++;    //go to the next word when this is called again
}

//this function will be recursively called until the word is guessed.

function wordDisplay(){   
    
 console.log('the display word is: ',displayWord);


//ask the questions and score answers. Then call function again.
inquirer
.prompt ([
    {         
        type: "list",
        message: displayWord,
        choices: letters,
        name: "answer"
    }

]).then(function(response,error){
    if(error){
        throw error;
    };

    //here is where I will need to check the letter and call wordDisplay() again after updating
    //all the 'letter' object properties, using my letterGuess(letter) function

    console.log(response);
    letterGuess(response);
   

});  // end of then
   
}       //end of wordDisplay function

function letterGuess(letter){
    //code for guessing the letter
    console.log('letter guess');
    //properties to look at or reset:
    // the .letter property
    //the .guess property 
    //the .display property 
    //pass through the whole letters array
}

