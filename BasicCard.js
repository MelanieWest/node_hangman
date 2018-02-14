var BasicCard =function(front,back){
    //object definition here - not a quiz-  elim choices?
    this.front = front;
    this.choices  = ["Mercury","Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto"];
    this.back   = back;
}
console.log("Basic Cards");

module.exports = BasicCard;