
var player1 = {naam:'Player 1',score:'0',kleur:'#fff028'}
var player2 = {naam:'Player 2',score:'0',kleur:'#f71713'}
// var player2 = 'Player 2'
// var score1 = 0;
// var score2 = 0;

var currentPlayer = 1;
var currentName = player1['naam'];
var currentColor = player1['kleur']

var game_on = true;
var table = $('table tr');

// nodig voor gameplay
function changeColor(rowIndex,colIndex,color){ // de gevraagde positie in gevraagde kleur veranderen
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color)
}

function returnColor(rowIndex,colIndex){ // de kleur checken van de gevraagde positie
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}

function checkBottom(colIndex){ // de laagste lege positie kiezen in gevraagde kolom
  for (var i = 5; i > -1; i--) {
    var colorReport = returnColor((i),colIndex);
    // console.log('rij '+i+': '+colorReport);
    if (colorReport == 'rgb(221, 221, 221)') {
      return i
    }
  }
}

function reportWin(rowNum,colNum){ // loggen hoe gewonnen
  console.log('Gewonnen met move op rij '+rowNum+' en kolom '+colNum);
}

// checken voor winst
function colorMatchCheck(one,two,three,four){ // checken of vier ingegeven posities dezelfde kleur hebben + != leeg
  return (one === two && one === three && one === four && one !== 'rgb(221, 221, 221)' && one !== undefined )
}

function horizontalWinCheck(){ // horizontaal checken op vier op een rij
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
      console.log('Horizontaal')
      reportWin(row,col);
      return true;
    }else{
      continue;
    }
  }
}
}

function verticalWinCheck() { // verticaal checken op vier op een rij
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function diagonalWinCheck() { // diagonaal checken op vier op een rij
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

// gameplay start: user klikt op een vakje
$('.board button').on('click',function(){
  if (game_on) {
    $(".color").prop('disabled', true); // kleuren mogen niet meer veranderen

    var col = $(this).closest('td').index(); // kolomindex bepalen van gekozen vakje
    var availRow = checkBottom(col) // opzoeken op welke hoogte de kleur moet veranderen in deze kolom
    changeColor(availRow,col,currentColor) // de kleur van de juiste chip veranderen (laagste vrije)

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) { // indien speler nu gewonnen:
      $('#win').text(currentName+' is gewonnen!') // zeggen wie gewonnen
      if (currentPlayer == 1) { player1['score'] ++ } else { player2['score'] ++ }
      $('#score').text(player1['score']+' - '+player2['score'])
      game_on = false // hierdoor kunnen er geen zetten meer gedaan worden

    }else{ // indien nog niemand gewonnen: beurt naar andere speler
      if(availRow != undefined){ // indien user volle kolom had gekozen: niets doen. Wachten tot hij ergens anders klikt
        if (currentPlayer == 1) {
        //   currentPlayer = 2;
        //   currentName = player2;
        //   currentColor = player2Color;
          switchSpeler(player2,2)
        }else{
        //   currentPlayer = 1;
        //   currentName = player1;
        //   currentColor = player1Color;
          switchSpeler(player1,1)
        }

      }
    }



    }

  })


$('#inputState').on('change',function(){
  if (this.value == 'Speler 2') {
    switchSpeler(player2,2)
    console.log(this.value);

  }
})

function switchSpeler(speler,nieuweCurrentPlayer){
  currentName = speler['naam'];
  currentColor = speler['kleur'];
  currentPlayer = nieuweCurrentPlayer;
  $('#win').text('Het is aan '+currentName)
}



  // color pickers
  var colorWell1;
  var player1Color = player1['kleur'];
  var player2Color = player2['kleur'];

  window.addEventListener("load", startup, false);

  function startup() {
    colorWell1 = document.querySelector("#colorWell1");
    colorWell1.value = player1['kleur'];
    colorWell1.addEventListener("change", updateC1, false);

    colorWell2 = document.querySelector("#colorWell2");
    colorWell2.value = player2['kleur'];
    colorWell2.addEventListener("change", updateC2, false);
    // colorWell1.select();


  }

$('#naam1').on('change',function(){
	console.log(this.value);
  player1['naam'] = this.value;
  currentName = player1['naam'];
})

$('#naam2').on('change',function(){
	console.log(this.value);
  player2['naam'] = this.value;
})

  function updateC1(event) {player1['kleur'] = event.target.value; currentColor = player1['kleur']} // TODO: niet automatisch player 1 = current nemen
  function updateC2(event) {player2['kleur'] = event.target.value;}


$("#colorWell1").mouseover(function(){
  // $("p").css("background-color", "yellow");
});

$('#opnieuw').click(function(){
  console.log('opnieuw');
  game_on = true;
  switchSpeler(player1,1)
  // currentPlayer = 1;
  // currentName = player1;
  // currentColor = player1Color;
  $('#win').text('Het is aan '+currentName)

  $(".color").prop('disabled', false);
  // $("#colorWell2").prop('disabled', false)



  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
        changeColor(row,col,'rgb(221, 221, 221)')

}}})
