
MAX_NUMBER_OF_LETTERS=6;
TIME_OF_GAME=60*10;
timeToLive = TIME_OF_GAME; 
currentWord = null;
score=-1;

function processWord(element, event, index){
	var wholeWord = "";
	
	 var keyCode = ('which' in event) ? event.which : event.keyCode;
	 
	 if(keyCode==8 && index>0){
		document.getElementById('inp'+(index-1)).focus();
	 }
	
	if(keyCode < 65 || keyCode > 90 ){
		return false;
	}
		
	element.value=String.fromCharCode(keyCode).toLowerCase();
	
	for(var i=0;i<MAX_NUMBER_OF_LETTERS;i++){
		var currElem = document.getElementById('inp'+i);
		if(currElem.style.display != 'none'){
			wholeWord+=currElem.value;
		}
	}
	
	
	if(index<currentWord.word.length-1){
		document.getElementById('inp'+(index+1)).focus();
	}
	else{
		document.getElementById('inp0').focus();
	}
	
	//document.getElementById('scrumble').innerHTML=wholeWord;
	checkWord(wholeWord);
}

function checkWord(word){
	if(word.length == currentWord.word.length){
		if(currentWord.word==word){
			document.getElementById('badImg').style.display="none";
			document.getElementById('okImg').style.display="";
			setTimeout("nextWord()",1000);
		}
		else{
			document.getElementById('badImg').style.display="";
		}
	}
}


function nextWord(){
	document.getElementById('okImg').style.display="none";

	var index = Math.floor(Math.random()*wordsObjects.length);
	currentWord = wordsObjects[index];
	
	if(score < wordsObjects.length-1 && currentWord.wasSelected==true){
		return nextWord();
	}
	
	wordsObjects[index].wasSelected=true;

	document.getElementById('wordImage').src="";
	document.getElementById('badImg').style.display="none";
	
	document.getElementById('wordImage').src="images/"+currentWord.word+".jpg";
	
	var scrum="";
	for(var j=0;j<currentWord.scrummbled.length;j++){
		scrum+=currentWord.scrummbled.charAt(j)+" ";
	}
	
	document.getElementById('scrumble').innerHTML=scrum.substring(0,scrum.length-1);
	
	for(var i=0;i<MAX_NUMBER_OF_LETTERS;i++){
		document.getElementById('inp'+i).value='';
		if(i<currentWord.word.length){
			document.getElementById('inp'+i).style.display="";
		}
		else{
			document.getElementById('inp'+i).style.display="none";
		}
	}
	document.getElementById('score').innerHTML="Score: "+ (++score);
	document.getElementById('inp0').focus();
} 


function runTimer(){	
	if((--timeToLive) >= (TIME_OF_GAME/100)){
		updateTimerGraph();
		setTimeout("runTimer()",100);
	}
	else{
		gameOver();
	}
}

function gameOver(){
	alert("Time is up, your score is "+score);
	window.location='index.html';
}

function updateTimerGraph(){
	var percent = timeToLive * 100 / TIME_OF_GAME;
	var elem = document.getElementById('timerLeft');
	elem.width=percent+"%";	
	
	if(percent<35){
		elem.style.backgroundColor='red';
	}
	else{
		elem.style.backgroundColor='#66FF66';
	}
}



