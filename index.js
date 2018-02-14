const fs = require("fs");
const inquirer = require("inquirer");
const jsonfile = require("jsonfile");
const colors = require("colors");

const BasicCard = require("./Words.js");
const ClozeCard = require("./Letters.js");

var count = 0;
var correct = 0;
var answer;
var card = [];
var partial = [];

inquirer.prompt(
{
    type: "list",
    message: "Which review method do you prefer?",
    choices: ["cloze","basic"],
    name: "whichCard",
}
).then(function(response){
    //console.log('then function');


    if(response.whichCard == 'basic'){
        console.log('\n');
        basicCardReview();
    }else{
        console.log('\n');
        clozeCardReview();
    }

})  //end of prompt for card choice

function basicCardReview(){
    BasicCard.choices = ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto"];
    //console.log(BasicCard.choices); 
    basicCardCreate();   //create the question cards
    basicQuestions();   //ask questions

}


function basicQuestions(){   //this is recursive.  Only needs one call.
    
//console.log("questions has been called\n");

//ask the questions and score answers. Then call function again.
inquirer
.prompt ([
    {         
        type: "list",
        message: "Front of flashcard:\n "+card[count].front+"\n",
        choices: card[count].choices,
        name: "answer"
    }

]).then(function(response,error){
    if(error){
        throw error;
    };

    //write out the back of the card
    console.log("Back of flashcard: "+ card[count].back);

    if(response.answer == card[count].back){correct ++;}
    count ++;
    
    if (count < card.length){     //reset the # for how many questions
        console.log("The count is: "+count+'\n');
        console.log('You have %s correct answers'.inverse,correct,'\n');
        basicQuestions();
    }
    else if(count === card.length){
        console.log(' You have %s correct answers '.inverse,correct,'\n');            
        console.log("Good game!");
    }

});  // end of then
   
}       //end of basicQuestion function




function clozeCardReview(){
  clozeCardCreate();
  clozeQuestions();
};

clozeCardCreate();   // create question cards for cloze


function clozeQuestions(){   //this is recursive.  Only needs one call.

    console.log("(Capitalize any planet names)\n");

    //ask the questions and score answers. Then call function again.
    inquirer
    .prompt ([

        {
            type: "input",
            message: "Finish this message:\n "+ card[count].partial()+"\n",
            name: "answer"
        }

 

   ]).then(function(response,error){

        if(error){
            throw error;
        };

        //write out the correct answer
        console.log("Completed text: "+card[count].text);

        if(response.answer == card[count].cloze){correct ++;}
        count ++;
        
        if (count < card.length){     //reset the # for how many questions
            console.log("The count is: "+count+'\n');
            console.log(' You have %s correct answers '.inverse,correct,'\n');            
            clozeQuestions();
        }else if(count === card.length){
            console.log(' You have %s correct answers '.inverse,correct,'\n');            
            console.log("Good game!");
        }
 
    });           //end 'then'


}       //end of question function

function basicCardCreate(){

    card[0] = new BasicCard("Which planet do you live on?","Earth");
    card[1] = new BasicCard("Which planet isn't a planet anymore?","Pluto")
    card[2] = new BasicCard("Which planet has rings?","Saturn")
    card[3] = new BasicCard("Which planet is the largest in our solar system?","Jupiter")
    card[4] = new BasicCard("Which planet is named for a mythical Sea God?","Neptune")

  
    for(var j=0; j<card.length; j++){
        var file = 'basicCards.json'
        var obj = JSON.stringify(card[j])+',\n';

        
        fs.appendFile(file, obj, (err) => {
            if (err) throw err;
        });
    }

}       //end of basic card create function

function clozeCardCreate(){
    card[0] = new ClozeCard("Most of earth's energy comes from the sun","the sun");
    card[1] = new ClozeCard("Planets discovered outside our solar system are called exoplanets","exoplanets");
    card[2] = new ClozeCard("For the planet Mercury, one day is the same as one year","Mercury");
    card[3] = new ClozeCard("Jupiter has more moons than any other planet in our solar system","Jupiter");
    card[4] = new ClozeCard("The planet Venus rotates in the opposite direction from all the other planets","Venus");

     
    for(var j=0; j<card.length; j++){
        var file = 'clozeCards.json'
        var obj = JSON.stringify(card[j])+',\n';

        fs.appendFile(file, obj, (err) => {
            if (err) throw err;
        });
    }
}       //end of cloze card create function