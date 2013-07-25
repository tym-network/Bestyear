/*
 * This .js is in charge of the switch between the different panel of the sign-up form.
 * Is deals with the left arrow (moving up and down), the color of the circles (throw different classes) and the display of the right content
 * It also checks the content of the inputs to avoid any errors (some checks are still made in PHP)
 */

var currentStep = 1;
var previousStep = null;
var maximumStep = 1;
nbStep = 3;

function checkEmpty(obj) {
    if(!obj.val()) {
        obj.parents('span').addClass('inputError');
    } else {
        obj.parents('span').removeClass('inputError');
    } 
}

function checkFormOnSubmit () {
    checkEmpty($('.required'));
}

$('.required').keyup(function() {
    checkEmpty($(this));
});

$('.required').blur(function() {
    checkEmpty($(this));
});

$('.nextStep').click(function() {
    nextStep();
});

// When a user clicks on one of the bubble in the left
$('.stepLink').click(function() {
    id = parseInt($(this).attr('id').replace('link',''));
    if (id <= maximumStep) {
        loadStep(id);
    }
})

function nextStep() {
    if (currentStep+1 <= nbStep) {
        newStep = currentStep+1;
        loadStep(newStep);
        if (previousStep != null) {
            previousBubble = $('#bubble'+previousStep);
            previousBubble.addClass('complete');
            previousBubble.removeClass('current');
        }
    }
}

function loadStep(id) {
    // Set the new currentStep
    if (id != currentStep) {
        previousStep = currentStep;
    }
    currentStep=id;
    if (currentStep > maximumStep) {
        // Change the class of the div according to its state
        maximumStep = currentStep;
        maximumBubble = $('#bubble'+id);
        maximumBubble.addClass('current');
    }
    // Move the arrow
    newArrowpos = 16+(id-1)*64;
    $('#leftWhiteArrow')
        .stop()
        .animate({"marginTop": newArrowpos + "px"}, 400);
    // Hide the previous div and show the correct one
    previousDiv = $('#step' + previousStep);
    previousDiv
        .stop()
        .animate({"opacity": 0},"slow", function() { 
            previousDiv.hide();
            currentDiv = $('#step' + id);
            // Display the new one
            currentDiv
                .show()
                .stop()
                .animate({"opacity": 1}, "slow");
        });
}