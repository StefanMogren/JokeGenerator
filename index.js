console.log(``);
console.log(`############################`);
console.log(`Welcome to the joke factory!`);
console.log(``);
console.log(`Let me tell you something about programming:`);
console.log(``);

const programmingJokes = [
    {
        ID: 1,
        Question: `Why don't programmers like nature?`,
        Answer: `It has too many bugs.`,    
    },
    {
        ID: 2,
        Question: `Why did the CSS developer go to therapy?`,
        Answer: `To get rid of his margins.`,    
    },
    {
        ID: 3,
        Question: `How do you comfort a JavaScript developer?`,
        Answer: `You console them.`,    
    },
    {
        ID: 4,
        Question: `Why did the CSS developer leave the restaurant?`,
        Answer: `Because it had no class.`,    
    },
    {
        ID: 5,
        Question: `Why did the JavaScript developer go missing?`,
        Answer: `Because he didn't know when to return.`,    
    },
    {
        ID: 6,
        Question: `Why did the HTML tag go to the party?`,
        Answer: `Because it wanted to break the line.`,    
    },
    {
        ID: 7,
        Question: `Why do JavaScript developers wear glasses?`,
        Answer: `Because they don't C#.`,    
    },
    {
        ID: 8,
        Question: `Why don't programmers like to use inline styles?`,
        Answer: `Because they want to be classy.`,    
    },
    {
        ID: 9,
        Question: `Why did the CSS selector break up with the HTML element?`,
        Answer: `It found someone more specific.`,    
    },
    {
        ID: 10,
        Question: `Why did the CSS developer apply for a job?`,
        Answer: `They wanted to get a position.`,    
    },
];
//En array fylld med objects.
//Innehåller alla tio programmeringsskämt.



function randomNumber(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
};
//Funktion för att få ett slumpmässigt nummer mellan två valda tal.

import readline from 'node:readline/promises';
//Importering av det som krävs för att kunna använda sig av kommandon som tillåter att skriva svar i konsolen.

async function askUser(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    //Kommandon för att göra det möjligt att kunna skriva in svar i konsolen. 
    //Är en `async function` då det krävs när man utnyttjar sådana kommandon. 


    console.log(``);
    console.log(``);
    const answer = await rl.question(`Do you want another joke? (Y/N) `)
    console.log(``);
    //Ställer en fråga i konsolen. Man måste skriva in ett svar före koden fortsätter.
    //`const answer` kommer innehålla värdet på svaret som fylls i.
    
    if (answer === `y` || answer ===`Y` ){
        //Föregående frågan kräver `y` eller `Y` som svar för att fortsätta koden.

        let input = await rl.question(`How many jokes do you want? `)
        //Ny fråga. Kräver ett nummervärde som svar.

        console.log(``);
        console.log(``);
        console.log(``);
        input = Number(input)
        if (isNaN(input) ) {
            console.log(`Please write a number, try again...`)
            //Om svaret på antal skämt är något annat än nummer.
            //Kör om koden med att fråga ifall du vill ha ett till skämt.
        }
        rl.close()
        //`rl.close` krävs för att stänga möjligheten att kunna skriva svar.
        
        giveJokes(input);
        //`input` här är det värde man svarade på frågan hur många skämt man vill ha.
        //`giveJokes` är funktionen som ger skämt. Tillåter nummervärden.
    }
    else {
        console.log(`Okay. Hope you had a good laugh!`)
        rl.close()
        //Om man svarar något annat än `y` eller `Y` på första frågan så körs detta.
        //Koden avslutas då.
    }
}


let alreadyTakenJokes = [];
//En behållare för att hålla koll på alla skämt som används.

giveJokes(1)
//Koden börjar med denna funktion.
//Ger ett skämt före man blir tillfrågad ifall man vill ha fler.

function giveJokes(numberOfJokes){
    if (numberOfJokes >10 || numberOfJokes <1) {
        console.log(`I can't give ${numberOfJokes} jokes. Try again with a value between 1 and 10.`)
        askUser();
        return;
        //Om man frågar efter fler än 10 skämt så får man veta att det inte går.
        //Kör då om koden med att fråga ifall du vill ha ett till skämt. 
    }

    let jokeNumber = 0;
    //Behållare för det slumpmässiga nummer som används.

    let chosenJoke = [];
    //Behållare för det skämt som används.

    for(let i = 0; i < numberOfJokes;){
        jokeNumber = randomNumber(0, 9)
        if (alreadyTakenJokes.length === 10){
            console.log(`That's all the jokes I got! Hope you had a good laugh!`);
            console.log(``);
            return;
            //`alreadyTakenJokes` fylls upp med indexnumret från varje skämt som väljs. Max är 10 indexnummer.
            //När den fylls upp med alla 10 nummer så betyder det att alla skämten är tagna.
            //Programmet avbryts då.

        }
        else if(alreadyTakenJokes.includes(jokeNumber) != true){
            //Kollar för att se ifall det slumpmässiga nummer man får matchar mot något av de redan befintliga numren inuti arrayen `alreadyTakenJokes`.
            //Finns numret INTE i arrayen så körs koden nedan.

            chosenJoke = programmingJokes.find(joke => joke.ID === (jokeNumber + 1))
            //`chosenJoke` får objektet som har ID-numret som matchar det slumpmässiga numret.
            //En kopia av skämtet läggs in i `chosenJoke`

            alreadyTakenJokes.push(jokeNumber);
            //Det slumpmässiga indexnummer som väljs läggs även in i arrayen.
            
            console.log(`Question : ${chosenJoke.Question}`);
            console.log(`Answer : ${chosenJoke.Answer}`);
            //Skämtets fråga och svar loggas ut i konsolen.

            console.log(``);
            i++
            //Inkrementeringen av for-loopen sker enbart efter ett skämt ges. 
        };
    };
    askUser()
    //Efter att man fått ett antal skämt så tillfrågas man igen ifall man vill ha fler skämt.
};