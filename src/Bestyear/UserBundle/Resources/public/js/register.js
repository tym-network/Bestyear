/*
 * This .js is in charge of the switch between the different panel of the sign-up form.
 * Is deals with the left arrow (moving up and down), the color of the circles (throw different classes) and the display of the right content
 * It also checks the content of the inputs to avoid any errors (some checks are still made in PHP)
 */

var currentStep = 1;
var previousStep = null;
var maximumStep = 1;

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

$('#nextStep').click(function() {
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
    newStep = currentStep+1;
    loadStep(newStep);
    if (previousStep != null) {
        previousBubble = $('#bubble'+previousStep);
        previousBubble.addClass('complete');
        previousBubble.removeClass('current');
    }
}

function loadStep(id) {
    if (id != currentStep) {
        previousStep = currentStep;
    }
    currentStep=id;
    if (currentStep > maximumStep) {
        maximumStep = currentStep;
        maximumBubble = $('#bubble'+id);
        maximumBubble.addClass('current');
    }
    newArrowpos = 16+(id-1)*64;
    $('#leftWhiteArrow')
        .stop()
        .animate({"marginTop": newArrowpos + "px"}, 400);
}