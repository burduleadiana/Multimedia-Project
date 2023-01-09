var canvas=document.getElementById('canvas');
context=canvas.getContext("2d");

var defaultColor= "#000000"
var strokeColor=document.getElementById('strokeColor');
var snap;
var startLoc;
var clicking=false;
var stroke=document.getElementById('stroke');
var fill=document.getElementById('fill');

window.addEventListener("load", startup, false);
function startup(){
    stroke.value=defaultColor;
    fill.value=defaultColor;
    stroke.addEventListener("change", stroke, false);
    fill.addEventListener("change", fill, false);
}


//function for starting the line
function start(event){
    clicking=true;
    startLoc=getCanvas(event);
    snap=context.getImageData(0,0, canvas.width, canvas.height);
}

//function for dragging the line
function draw(event){
    var pos;
    if(clicking===true){
        context.strokeStyle=strokeColor;
        context.putImageData(snap,0,0);
        pos=getCanvas(event);
        line(pos);
    }
}

//dragging stops=line ends
function stop(event){
    clicking=false;
    context.putImageData(snap,0,0);
    var pos;
    pos=getCanvas(event);
    line(pos);
}        

//function for creating the line
function line(position){
    context.beginPath();
    context.moveTo(startLoc.x, startLoc.y);
    context.lineTo(position.x, position.y);
    context.stroke();
}

//function for obtaining the surrounding coordinates of the canvas 
function getCanvas(event){
    var x=event.clientX - canvas.getBoundingClientRect().left,
    y=event.clientY - canvas.getBoundingClientRect().top;
    return {x: x, y: y};
}


//function for drawing the line
function drawingLine(){
    canvas.addEventListener('mousedown', start, false);
    canvas.addEventListener('mousemove', draw, false);
    canvas.addEventListener('mouseup', stop, false);
}

//function for linking the button to the drawing
function clickedLine(){
            
    window.addEventListener('click',drawingLine(), false);

}

//function for downloading the image from the canvas and save it as a PNG
var save=document.getElementById("saveBtn");
save.addEventListener('click', function(ev){
    const a=document.createElement("a");
    a.href=canvas.toDataURL();
    a.download="drawing.png";
    a.click();
});

//function for refreshing the canvas
var refresh=document.getElementById('refreshBtn');
refresh.addEventListener('click',function(ev){
    context.clearRect(0,0,canvas.width, canvas.height);
});
