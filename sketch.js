
var detector;
var video;
var objects = [];
var buttons = [];
var num;
var score = 0;

var label;
var scoreLabel;
var foundLabel;
var guessBtn;
var totalGuessed = 0;

function preload() { detector = ml5.objectDetector( "cocossd" ); }

function setup() {

  createCanvas( windowWidth, windowHeight );

  label = createElement( "h4", "Score:" );
  label.position( 800, 30 );
  label.addClass ( "lblClass" );

  scoreLabel = createElement( "h4", "0/0" );
  scoreLabel.id( "scoreLabel" );
  scoreLabel.position( 900, 30 );
  scoreLabel.addClass ( "lblClass" );

  guessBtn = createButton ( "Guess" );
  guessBtn.mousePressed ( getObjects );
  guessBtn.position ( 800, 80 );
  guessBtn.addClass ( "btnClass" );

  video = createCapture( VIDEO, videoLoaded );
}

function getObjects() {

  guessBtn.html( "Guess again" );

  if ( totalGuessed == 0 ) {
    foundLabel = createElement( "h5", "Here are the objects I found: <br> Click on the ones that are correct!" );
    foundLabel.position( 800, 110 );
    foundLabel.addClass ( "lblClass" );
  }

  for ( var i = 0; i < num; ++i ) { buttons[i].addClass( "remove" ); }

  totalGuessed += objects.length;
  scoreLabel.html( score + "/" + totalGuessed );
  num = objects.length;

  for( var i = 0; i < num; ++i ) {

    // create button
    buttons[i] = createButton( ( i + 1 ) + ". " + objects[i].label );
    buttons[i].position ( 800, 170 + 30 * i );
    buttons[i].mousePressed ( vote );
    buttons[i].addClass ( "smallBtn" );
  }
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

function vote() { scoreLabel.html( ++score + "/" + totalGuessed ); }

function draw() {

  // clear background and draw image again
  background ( 100, 100, 100 );
  image( video, 0, 0 );

  for( var i = 0; i < objects.length; ++i ) {

    // draw rectangle
    stroke( 255, 58, 107 );
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
