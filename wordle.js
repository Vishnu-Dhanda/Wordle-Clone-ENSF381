
// creating dark mode 
var darkMode = document.getElementById('darkMode');
var body = document.getElementById('body');
var navButtons = document.getElementsByClassName('navButton');
var nav = document.getElementById('navbar');
var boxes = document.getElementsByClassName('box');
var rulesContainer = document.getElementById('rulesContainer');
var startOver = document.getElementsByClassName('startButton')

startOver[0].addEventListener('click', ()=> {
    wordAndHint()
    hintText[0].style.display = 'none';
    var mainSection = document.getElementById('congratulations');
    mainSection.style.display = 'none'
    document.getElementById('theGrid').style.display = 'block';
    
    for (k = 1; k<5; k++){
        for (j = 1; j<5; j++){
            var box = document.getElementById('box'+j+k);
            box.textContent = '' ;
            if (box.classList.contains('greenLetter')){
                box.classList.remove('greenLetter')
                box.classList.remove('animated')}
            if (box.classList.contains('yellowLetter')){
                box.classList.remove('yellowLetter')
                box.classList.remove('animated')}
            if (box.classList.contains('greyLetter')){
                box.classList.remove('greyLetter')
                box.classList.remove('animated')}     
        }
    }
    hintText[0].style.backgroundColor = '#ffe57e';
    hintText[0].style.color = '#000000';
    row = 1
    column = 1
})

darkMode.addEventListener('click',() =>{

    body.classList.remove('lightBody');
    body.classList.add('darkBody');
    nav.classList.remove('navLight');
    nav.classList.add('navDark');
    if(darkMode.classList.contains('lightButton')){
        // changing theme of buttons from light to dark
        for(var i=0; i< navButtons.length; i++ ){
            navButtons[i].classList.remove('lightButton');
            navButtons[i].classList.add('darkButton');
    }

    
    // console.log(boxes.length);
    for(var i=0; i< boxes.length; i++ ){
        boxes[i].classList.remove('boxLight');
        boxes[i].classList.add('boxDark');
    
    }
 

    }else{
        for(var i=0; i< navButtons.length; i++ ){
            navButtons[i].classList.remove('darkButton');
            navButtons[i].classList.add('lightButton');
    }
    for(var i=0; i< boxes.length; i++ ){
        boxes[i].classList.remove('boxDark');
        boxes[i].classList.add('boxLight');
    
    }
        body.classList.remove('darkBody');
        body.classList.add('lightBody');
        nav.classList.remove('navDark');
        nav.classList.add('navLight');        
    }

});

darkMode.addEventListener('click',() =>{
var hintSection = document.getElementById('hintSection')
if(hintSection.classList.contains('hintSectionLight')){
    hintSection.classList.remove('hintSectionLight');
    hintSection.classList.add('hintSectionDark');}
else if(hintSection.classList.contains('hintSectionDark')){
    hintSection.classList.remove('hintSectionDark');
    hintSection.classList.add('hintSectionLight');}}
)

var hintText = document.getElementsByClassName('hintText')
var hintButton = document.getElementById('hint')
hintButton.addEventListener('click', showHint)
function showHint(){
    hintText[0].style.display = 'flex';
}
darkMode.addEventListener('click',() =>{

    if(rulesContainer.classList.contains('containerLight')){
        rulesContainer.classList.remove('containerLight');
        rulesContainer.classList.add('containerDark');}
    else if(rulesContainer.classList.contains('containerDark')){
        rulesContainer.classList.remove('containerDark');
        rulesContainer.classList.add('containerLight');}}
    )

var infoButton = document.getElementById('information')
// var rulesContainer = document.getElementsByClassName('rulesContainer')
// console.log(rulesContainer.length)

infoButton.addEventListener('click',() =>{
    if (rulesContainer.style.display !== "flex") {
        rulesContainer.style.display = "flex";
    }
    else{
        rulesContainer.style.display = "none";
    }
    })

// backend

let row = 1
let column = 1

function populateWord(key){

    var box = document.getElementById('box'+row+column);    
    box.textContent = key;
    column+=1;
    
}


function keyPress(key, eventKeyCode){
    
    if (key === 'Enter' && column == 5){
        getWord()
        row = row+1;
        column = 1
    }
    
    else if(key === 'Enter' && column !== 5){
        window.alert('You must complete the word first.')
    }

    else if (key=== 'Backspace' && column !=1){
        column = column-1;
        var box = document.getElementById('box'+row+column);
        box.textContent = '';
    }
    else if (key !== 'Backspace' && column!= 5 && ((eventKeyCode>=65 && eventKeyCode <= 90) || (eventKeyCode>=97 && eventKeyCode <=122))){
        populateWord(key.toUpperCase())
    }
}

window.addEventListener('keydown', (event) =>{
    // console.log(event)
    keyPress(event['key'],event['keyCode']);
});



function getWord(apiWord){
    word =''
    column=1
    for(row; column<5; column++){
        letter = document.getElementById('box'+row+column)
        word = word+(letter.innerHTML)
    }
    // console.log(word)
    checkWord(word)

}

function checkWord(word){
    for (i=0; i<word.length; i++){
        if (apiWord[i] == word[i]){
            columnref = i+1
            greenLetter = document.getElementById('box'+row+columnref)
            // console.log(greenLetter)
            greenLetter.classList.add('greenLetter')
            greenLetter.classList.add('animated')
        }
        else if(apiWord.includes(word[i])){
            columnref = i+1
            yellowLetter = document.getElementById('box'+row+columnref)
            // console.log(yellowLetter)
            yellowLetter.classList.add('yellowLetter')
            yellowLetter.classList.add('animated')
        }
        else if (apiWord.includes(word[i]) == false){
            columnref = i+1
            greyLetter = document.getElementById('box'+row+columnref)
            // console.log(greyLetter)
            greyLetter.classList.add('greyLetter')
            greyLetter.classList.add('animated')
        }
    }

    if (row == 4 && columnref == 4 && apiWord != word){
        hintText[0].innerHTML = 'You missed the word&nbsp;<b>' + apiWord +'</b> &nbsp;and lost!';
    
        hintText[0].style.display = 'flex';
        // note to self - change this color later
        hintText[0].style.backgroundColor = '#E78587';
        hintText[0].style.color = 'white';
    }
    if(word == apiWord){
        setInterval(checkWin ,700);
    }

}

function checkWin(){
    if(word == apiWord){
        var mainSection = document.getElementById('congratulations');
        mainSection.style.display = 'flex'
        hintText[0].innerHTML = 'You guessed the word&nbsp;<b>' + apiWord +'</b> &nbsp;correctly';
    
        hintText[0].style.display = 'flex';
        // note to self - change this color later
        hintText[0].style.backgroundColor = '#e5e5e5';
        document.getElementById('theGrid').style.display = 'none';
    }
}

var dict = null; 
var startOver = document.getElementsByClassName('startButton')
async function getWordAndHintAPI(){
    if (dict == null){
        startOver[0].disabled = true;
        startOver[0].innerHTML = 'Loading...'
    const res = await fetch("https://api.masoudkf.com/v1/wordle", {
      headers: {
        "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
      },
    });
    const data = await res.json();
    dict = (data);
    startOver[0].disabled = false;
    startOver[0].innerHTML = 'Start Over'
    }}
    // console.log(apiWordAndHint)
;
  

async function wordAndHint(){
    getWordAndHintAPI().then(() =>{
apiWordAndHint = dict['dictionary'][Number.parseInt(Math.random() * dict['dictionary'].length)]
apiWord = apiWordAndHint['word'].toUpperCase()
console.log(apiWord)
apiHint = apiWordAndHint['hint']
hintText[0].innerHTML = '<b><i>Hint:&nbsp;</i></b>' + apiHint; 
})}

window.onload = () => {
    wordAndHint()
}