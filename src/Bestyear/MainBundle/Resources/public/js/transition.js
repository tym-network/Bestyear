/*
 * This code is used to animate the white arrow of the left menu.
 * When the user clicks on an item of the menu, the arrow moves next to the item
 * The current content changes (fades away to let the new one appears)
*/

leftArrow = $("#leftWhiteArrow");
currentDiv = $('#welcome');

function displayHome() {
    // Move the arrow
    leftArrow
        .stop()
        .animate({"marginTop": 20 + "px"},"slow");
    // Hide the current div
    currentDiv
        .stop()
        .animate({"opacity": 0},"slow", function() {
            currentDiv.hide();
            currentDiv = $('#welcome');
            // Display the new one
            $('#welcome')
                .show()
                .stop()
                .animate({"opacity": 1},"slow");
        });
}

function displayList() {
    // Move the arrow
    leftArrow
        .stop()
        .animate({"marginTop": 100 + "px"},"slow");
    // Hide the current div
    currentDiv
        .stop()
        .animate({"opacity": 0},"slow", function() {
            currentDiv.hide();
            currentDiv = $('#userList');
            // Display the new one
            $('#userList')
                .show()
                .stop()
                .animate({"opacity": 1}, "slow");
        });
}

function displayUserPanel() {
    // Move the arrow
    leftArrow
        .stop()
        .animate({"marginTop": 180 + "px"},"slow");
    // Hide the current div
    currentDiv
        .stop()
        .animate({"opacity": 0},"slow", function() {
            currentDiv.hide();
            currentDiv = $('#userProfile');
            // Display the new one
            $('#userProfile')
                .show()
                .stop()
                .animate({"opacity": 1},"slow");
        });

}

$('#homeLeftBar').click(function() {
    displayHome();
});

$('#listLeftBar').click(function () {
    displayList();
});

$('#searchUserLeftBar').click(function () {
    displayUserPanel();
});