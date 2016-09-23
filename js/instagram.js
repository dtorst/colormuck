$(document).ready(function () {
  var token;

  if (window.location.hash.indexOf('access_token') !== -1) {
      token = window.location.hash.split('#access_token=')[1];
      console.log(token);
      $('#load-instagram').hide();
      $('#load-progress').show();
      loadStream();
  };

  var percent = 0;
  $('#load-progress').val(percent);


  function loadStream() {
    var num_photos = 20,
        earliestDate;
     
    $.ajax({
      url: 'https://api.instagram.com/v1/users/self/media/recent',
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: token, count: num_photos},
      success: function(data){
        for( var x = 0; x < data.data.length; x++ ){
          var currentImage = data.data[x].images.low_resolution.url;
          $("#instagram-photo").attr('src', currentImage).fadeIn(600).delay(2000*x).fadeOut(600);
          console.log(x);
          percent = ((x + 1) / 20) * 100;
          $('#load-progress').val(percent);
        };

        var itemNum = data.data.length;
        console.log(itemNum);
        var imgHeight = 320;
        var square = Math.floor(Math.sqrt(itemNum));
        var allRowCount = Math.ceil((itemNum / square));

        var row = 0;
        var c = document.getElementById("ig-canvas");
        var ctx = c.getContext("2d");
        c.height = imgHeight * allRowCount;
        c.width = imgHeight * square;
        ctx.clearRect( 0, 0, c.width, c.height);
        console.log(c.width, c.height);
        var imgArray = [];
        //console.log(data);
        earliestDate = new Date((data.data[num_photos - 1].created_time) * 1000).toISOString();
        for (var i = 0; i < data.data.length; i++) {
          imgArray[i] = [];
          var rowcount = (i % square);
              if (rowcount == 0) { row++ };
          (function (i) {
              var xPos = ((i % square) * imgHeight);
              var yPos = (row * imgHeight) - imgHeight;
              imgArray[i] = new Image();
              imgArray[i].crossOrigin = "anonymous";
              imgArray[i].src =  data.data[i].images.low_resolution.url;
              imgArray[i].onload = function () {
                ctx.drawImage(imgArray[i], xPos, yPos);
                var dataUrl = c.toDataURL('image/png');
                var newImage = document.getElementById("mirror");
                newImage.src = dataUrl;
                $('.run-functions-button').css('display','block');
              };
          })(i);
        };

      },
      error: function(data){
        console.log(data);
      }
    }).done(function() {
    //  console.log("hooray! finished this ish.");
        $('#instagram').css('display','block');
        console.log(earliestDate);
        $('.timea').html(earliestDate);
    });
  };
});