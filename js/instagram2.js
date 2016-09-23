var data = [1,2,3,4,5,6,7,8,9];
var imgHeight = 30;

var c = document.getElementById("ig-canvas");
var ctx = c.getContext("2d");
var imgArray = [];
var itemNum = data.length;
var square = Math.floor(Math.sqrt(itemNum));
var allRowCount = Math.ceil((itemNum / square));
c.height = imgHeight * allRowCount;
c.width = imgHeight * square;
ctx.clearRect( 0, 0, c.width, c.height);
console.log(c.width, c.height);

// start here //

    var row = 0;
for (var i = 0; i < data.length; i++) {
    imgArray[i] = [];
    var rowcount = (i % square);
        if (rowcount == 0) { row++ };
    (function (i) {
        var xPos = ((i % square) * imgHeight);
        var yPos = (row * imgHeight) - imgHeight;
        imgArray[i] = new Image();
        imgArray[i].src =  'examples/img/new' + i + '.png';
        imgArray[i].onload = function () {
            ctx.drawImage(imgArray[i], xPos, yPos);
        };
    })(i);
}
