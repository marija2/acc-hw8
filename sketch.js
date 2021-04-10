
var detector;
var video;
var objects = [];
var currGuessed;
var score = 0;
var totalGuessed = 0;
var imgCounter = 0;
var newList;

var canvas;
var sideNav;
var scoreLbl;
var guessBtn;
var msgLbl;
var listLbl;
var inputLbl;
var txtInput;
var addBtn;

function preload() { detector = ml5.objectDetector( "cocossd" ); }

function setup() {

  canvas = createCanvas( 640, 480 );

  sideNav = select( "#sideNav" );
  scoreLbl = select( "#scoreLbl" );
  guessBtn = select( "#guessBtn" );
  msgLbl = select ( "#msgLbl" );
  listLbl = select ( "#listLbl" );
  inputLbl = select ( "#inputLbl" );
  txtInput = select ( "#txtInput" );
  addBtn = select ( "#addBtn" );
  screenshot = select ( "#screenshot" );

  guessBtn.mousePressed ( getObjects );
  addBtn.mousePressed ( updateScore );

  video = createCapture( VIDEO, videoLoaded );
}

function updateScore() {

  if ( int( txtInput.value() ) > currGuessed ) return;  // can't add a number larger than the number of items guessed

  if ( score + int( txtInput.value() ) > totalGuessed ) return;

  score += int( txtInput.value() );
  scoreLbl.html( "Score: " + score + "/" + totalGuessed );
}

function getObjects() {

  guessBtn.html( "Guess again" );

  if ( totalGuessed == 0 ) {
    msgLbl.removeClass ( "hide" );
  }

  currGuessed = objects.length;
  totalGuessed += objects.length;
  scoreLbl.html( "Score: " + score + "/" + totalGuessed );

  newList = "";

  for( var i = 0; i < objects.length; ++i ) { newList += ( i + 1 ) + ". " + objects[i].label + "<br>"; }

  listLbl.html( newList );

  inputLbl.removeClass ( "hide" );
  txtInput.removeClass ( "hide" );
  addBtn.removeClass ( "hide" );
}

function videoLoaded() {

  video.size( 640, 480 );
  video.hide();
  detector.detect( video, foundObjects );
}

function foundObjects( error, results ) {

  if( error ) console.error( error );
  else {
    objects = results;
    detector.detect( video, foundObjects );
  }
}

function draw() {

  image( video, 0, 0 );

  for( var i = 0; i < objects.length; ++i ) {

    // draw rectangle
    stroke( 112, 179, 255 );
    strokeWeight( 7 );
    noFill();
    rect( objects[i].x, objects[i].y, objects[i].width, objects[i].height );

    // draw text
    stroke( 255 );
    textSize( 24 );
    strokeWeight( 1 );
    fill( 47, 2, 196 );
    text( objects[i].label, objects[i].x + 10, objects[i].y + 7 );
  }
}
