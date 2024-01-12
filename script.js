'use strict';

function answerChecking(){
    let guessedNumber = parseInt(document.getElementById('numberInput').value);
    if (!document.getElementById('numberInput').value){
        document.getElementById('answer').innerHTML = 'Write a number';
    } else{
        if (guessedNumber > 50 || guessedNumber < 1){
            document.getElementById('answer').innerHTML = 'number not in guessing range';
        } else {
            if (listOfGuessedNumbers.includes(guessedNumber)){
                document.getElementById('answer').innerHTML = `You've already tried number ${guessedNumber}`;
            } else{
                if (guessedNumber === generatedNumber){
                    document.getElementById('answer').innerHTML = 'correct!';
                    document.querySelector('body').setAttribute('style', 'background-color: #417836;');
                    listOfGuessedNumbers.length = 0;
                    lockInputs();
                    createPlayAgainButton();
                } else if (guessedNumber < generatedNumber) {
                    document.getElementById('answer').innerHTML = 'incorrect, try higher';
                    listOfGuessedNumbers.push(guessedNumber);
                } else if (guessedNumber > generatedNumber) {
                    document.getElementById('answer').innerHTML = 'incorrect, try lower';
                    listOfGuessedNumbers.push(guessedNumber);
                } else {
                    alert('Something unexpected happened! Please refresh the site.')
                }
                const numberInputField = document.getElementById('submitAnswer');
                numberInputField.addEventListener('click', function clearField(event) {
                    const numberGuessed = document.getElementById('numberInput');
                    numberGuessed.value = '';
                });
            }
        }
    }
    return;
}

function lockInputs(){
    document.getElementById('numberInput').setAttributeNode(document.createAttribute('disabled'));
    document.getElementById('submitAnswer').setAttributeNode(document.createAttribute('disabled'));
}

function createPlayAgainButton(){
    const createButton = document.createElement('input');
    const parentElement = document.getElementsByTagName('span')[1];
    const breakLine = document.createElement('br');
    createButton.setAttribute('type', 'submit');
    createButton.setAttribute('onclick', 'generatingNumber();');
    createButton.setAttribute('value', 'Play again!');
    createButton.setAttribute('id', 'playAgainButton');
    parentElement.append(breakLine);
    parentElement.append(createButton);
    const playAgain = document.getElementById('playAgainButton');
    playAgain.addEventListener('click', function ifClickedPlayAgain(event){
        playAgain.remove();
        document.getElementById('answer').innerHTML = '';
        document.getElementById('numberInput').removeAttribute('disabled');
        document.getElementById('submitAnswer').removeAttribute('disabled');
        document.querySelector('body').setAttribute('style', 'background-color: #708090;');
        globalThis.generatedNumber = generatingNumber();
    });
    return;
}

function onPressedEnter(){
    if (event.keyCode === 13 || event.key === "ENTER"){
        answerChecking();
        return;
    }
}

function playButton(){
    const playButtonListener = document.getElementById('playButton');
    playButtonListener.addEventListener('click', function ifClickedPlay(event){
        playButtonListener.remove();
        const parentElement = document.getElementById('answerBlock');
        const createAnswerTitle = document.createElement('span');
        const createAnswerPlaceholder = document.createElement('span');
        const createButtonDestination = document.createElement('span');
        const breakLine1 = document.createElement('br');
        const breakLine2 = document.createElement('br');
        createAnswerTitle.setAttribute('id', 'answerTitle');
        createAnswerPlaceholder.setAttribute('id', 'answer');
        createButtonDestination.setAttribute('id', 'buttonDestination');
        parentElement.append(createAnswerTitle);
        parentElement.append(breakLine1);
        parentElement.append(createAnswerPlaceholder);
        parentElement.append(breakLine2);
        parentElement.append(createButtonDestination);
        document.getElementById('answerTitle').innerHTML = 'Answer was...';
        document.getElementById('answer').innerHTML = '';
        document.getElementById('buttonDestination').innerHTML = '';
        document.getElementById('numberInput').removeAttribute('disabled');
        document.getElementById('submitAnswer').removeAttribute('disabled');
        globalThis.generatedNumber = generatingNumber();
    });
    return;
}

function generatingNumber(){
    let generatedNumber = Math.floor(Math.random() * 2)+1;
    globalThis.generatedNumber;
    return generatedNumber;
}

let listOfGuessedNumbers = [];

const siteWidth = 1280;
let scale = screen.width /siteWidth;
document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');


/* 
dodac wynik rozgrywki + hiScore
*/