console.log("Cloze Cards");

var ClozeCard =function(text,cloze){
    //still need to create 'partial' & error detection method
    this.text = text;
    this.cloze= cloze;

//error detection        

    if (this.text.indexOf(this.cloze)==-1){
        console.log("Your cloze text needs to match part of the original");
    }

//create partial text 
     this.partial = function(){

        var partText = this.text;
        partText = partText.replace(this.cloze,"...");

    //     var clozeIndex = this.text.indexOf(this.cloze)     
    //     var clozeLen   = this.cloze.length; 
    //     var partText   = this.text;
    
    //     console.log(partText, clozeLen, clozeIndex);

    //     //create partial text here
    //     partText.splice(clozeIndex,clozeLen,'...');
    
         return partText;
         //console.log("Finish this statement: "+partText);
     }
    
}


module.exports = ClozeCard;