function Child (firstName, lastInit, age, city){
  this.firstName = firstName;
  this.lastInit = lastInit;
  this.age = age;
}
  
var firstNames = ["Aiden","Jackson","Ethan","Liam","Mason","Noah","Lucas","Jacob","Jayden","Jack","Logan","Ryan","Caleb","Benjamin","William","Michael","Alexander","Elijah","Matthew","Dylan","James","Owen","Connor","Brayden","Carter","Landon","Joshua","Luke","Daniel","Gabriel","Nicholas","Nathan","Oliver","Henry","Andrew","Gavin","Cameron","Eli","Max","Isaac","Evan","Samuel","Grayson","Tyler","Zachary","Wyatt","Joseph","Charlie","Hunter","David","Anthony","Christian","Colton","Thomas","Dominic","Austin","John","Sebastian","Cooper","Levi","Parker","Isaiah","Chase","Blake","Aaron","Alex","Adam","Tristan","Julian","Jonathan","Christopher","Jace","Nolan","Miles","Jordan","Carson","Colin","Ian","Riley","Xavier","Hudson","Adrian","Cole","Brody","Leo","Jake","Bentley","Sean","Jeremiah","Asher","Nathaniel","Micah","Jason","Ryder","Declan","Hayden","Brandon","Easton","Lincoln","Harrison","Sophia","Emma","Olivia","Isabella","Ava","Lily","Zoe","Chloe","Mia","Madison","Emily","Ella","Madelyn","Abigail","Aubrey","Addison","Avery","Layla","Hailey","Amelia","Hannah","Charlotte","Kaitlyn","Harper","Kaylee","Sophie","Mackenzie","Peyton","Riley","Grace","Brooklyn","Sarah","Aaliyah","Anna","Arianna","Ellie","Natalie","Isabelle","Lillian","Evelyn","Elizabeth","Lyla","Lucy","Claire","Makayla","Kylie","Audrey","Maya","Leah","Gabriella","Annabelle","Savannah","Nora","Reagan","Scarlett","Samantha","Alyssa","Allison","Elena","Stella","Alexis","Victoria","Aria","Molly","Maria","Bailey","Sydney","Bella","Mila","Taylor","Kayla","Eva","Jasmine","Gianna","Alexandra","Julia","Eliana","Kennedy","Brianna","Ruby","Lauren","Alice","Violet","Kendall","Morgan","Caroline","Piper","Brooke","Elise","Alexa","Sienna","Reese","Clara","Paige","Kate","Nevaeh","Sadie","Quinn","Isla","Eleanor"];

function randomFirst(){
  var randNum = Math.floor(Math.random() * firstNames.length);
  return firstNames[randNum];
}
function randomLetter() {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var randNum = Math.floor(Math.random() * letters.length);
  return letters.substring(randNum, randNum+1);
}
function randomAge(){
  return Math.floor(Math.random() * 3 + 8);
}

children = [];
for(i=0;i<50;i++){
  children.push(new Child(randomFirst(),randomLetter(),randomAge()));
}