leftArrow = $("#leftWhiteArrow");


$('#homeLeftBar').click(function() {
    leftArrow
        .stop()
        .animate({"marginTop": 20 + "px"},"slow");
});

$('#listLeftBar').click(function() {
    leftArrow
        .stop()
        .animate({"marginTop": 100 + "px"},"slow");
});

$('#searchUserLeftBar').click(function() {
    leftArrow
        .stop()
        .animate({"marginTop": 180 + "px"},"slow");
});