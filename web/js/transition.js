/*
 * This code is used to animate the white arrow of the left menu.
 * When the user clicks on an item of the menu, the arrow moves next to the item
 * The current content changes (fades away to let the new one appears)
*/

var leftArrow = $("#leftWhiteArrow");

// By default, the current div shown is the first one
var currentDiv = $(".mainDiv");
var currentId= currentDiv.attr("id");
var currentNum = currentId.substring(3, currentId.length);

// Height of the rectangles in the leftBar
var leftHeight = 80;

// Hide the current div, show the new one and annimate the arrow
function displayDiv(leftButton) {
    // Determines the div's number from the id.
    var newNum = leftButton.attr("id");
    var newNum = newNum.substring(4, newNum.length);
    var marginTop = 20 + (newNum-1)*leftHeight;
    
    // General variables
    var currentDiv = $("#div" + currentNum);
    var newDiv = $("#div" + newNum);

    // Move the arrow
    leftArrow
        .stop()
        .animate({"marginTop": marginTop + "px"}, "slow");
    
    // Hide the current div
    currentDiv
        .stop()
        .animate({"opacity": 0}, "slow", function() {
            currentDiv.hide();
            currentNum = newNum;
            // Display the new one
            newDiv
                .show()
                .stop()
                .animate({"opacity": 1},"slow");
        });
}

$(".leftButton").click(function() {
    displayDiv($(this));
})