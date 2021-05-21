const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progresstext = document.getElementById("progresstext");
const scoretext = document.getElementById('score');
const progressbarfull = document.getElementById('progressbarfull');
let currentquestion ={};
let acceptinganswers = false;
let score = 0;
let questioncounter = 0;
let availablequestions =[];

let questions = [
  {
    question:"The metal whose salts are sensitive to light is?",
    choice1:"zinc",
    choice2:"silver",
    choice3:"copper",
    choice4:"aliminium",
    answer: 2
},
{
    question:"Chambal river is a part of –",
    choice1:"Sabarmati basin",
    choice2:"Ganga basin",
    choice3:"Narmada basin",
    choice4:"Godavari basin",
    answer: 3
},
{
    question:"The hottest planet in the solar system?",
    choice1:"mercury",
    choice2:"venus",
    choice3:"Mars",
    choice4:"jupiter",
    answer:2
},
{
  question:"Which of the following is not a nuclear power center?",
  choice1:"Narora",
  choice2:"Kota",
  choice3:"Chamera",
  choice4:"Kakrapara",
  answer:3
},
{
  question:"Glass is a-",
  choice1:"superheated solid",
  choice2:"supercooled liquid",
  choice3:"supercooled gas",
  choice4:"superheated liquid",
  answer:2
}


];

    


   const CORRECT_BONUS =10;
   const MAX_QUESTIONS =5;

   startGame = () => {
          questioncounter = 0;
          score =0;
          availablequestions = [...questions];
          console.log(availablequestions);
          getquestion();
     };
   getquestion = () => {
       if(availablequestions.length == 0 || questioncounter >= MAX_QUESTIONS){
        localStorage.setItem("mostrecentscore",score);  
       return window.location.assign("end.html");
       }
       questioncounter++;
       progresstext.innerText = `Question ${questioncounter}/${MAX_QUESTIONS}`;
       progressbarfull.style.width = `${(questioncounter / MAX_QUESTIONS) * 100}%`;
       const questionindex = Math.floor(Math.random()*availablequestions.length);
       currentquestion = availablequestions[questionindex];
       question.innerText = currentquestion.question;
       choices.forEach( choice => {
          const number = choice.dataset['number'];
          choice.innerText = currentquestion['choice'+number];
      });
      availablequestions.splice(questionindex,1);
      console.log(availablequestions);
      acceptinganswers = true;
    };
    choices.forEach( choice => {
        choice.addEventListener("click", e => {
           if(!acceptinganswers) return;
           acceptinganswers = false;
           const selectedchoice = e.target;
           const selectedanswer = selectedchoice.dataset["number"];

           const classtoapply = selectedanswer == currentquestion.answer ? 'correct' : 'incorrect';
           if (classtoapply === "correct") {
            incrementScore(CORRECT_BONUS);
          }
           
           selectedchoice.parentElement.classList.add(classtoapply);
            setTimeout(() => {
                selectedchoice.parentElement.classList.remove(classtoapply);
           getquestion();
            },1000);
         });
    });
    incrementScore = num => {
        score += num;
        scoretext.innerText = score;
      };
   startGame();