/*
 * This .js is in charge of the switch between the different panel of the sign-up form.
 * Is deals with the left arrow (moving up and down), the color of the circles (throw different classes) and the display of the right content
 * It also checks the content of the inputs to avoid any errors (some checks are still made in PHP)
 */

var currentStep = 1;
var previousStep = null;
var maximumStep = 1;
var errors = 0;
nbStep = 4;

/*
 * ============================
 * Error treatment on fields
 * ============================
 */

// ********
// STEP 1 *
// ********

$('#username')
    .keyup(function() {checkUsername();})
    .blur(function() {checkUsername();});

$('#password')
    .keyup(function() {checkPassword();})
    .blur(function() {checkPassword();});

$('#password2')
    .keyup(function() {checkPassword();})
    .blur(function() {checkPassword();});

$('#givenname')
    .keyup(function() {checkGivenName();})
    .blur(function() {checkGivenName();});
    
$('#familyname')
    .keyup(function() {checkFamilyName();})
    .blur(function() {checkFamilyName();});

/*
 * ============================
 * Error treatment on submit
 * ============================
 */
 
// ********
// STEP 1 *
// ********

// Check the length of the username input
function checkUsername() {
    error = false;
    username = $('#username');
    if (!username.val()) {
        // If the field is empty
        error = true;
    } else if (username.val().length != 8) {
        // If the username hasn't the right size (8char)
        error = true;
    }
    
    if (error) {
        username.parents('span').addClass('inputError');
    } else {
        username.parents('span').removeClass('inputError');
    }
}

// Tests on the password
function checkPassword() {
    error1 = false;
    error2 = false;
    pass1 = $('#password');
    pass2 = $('#password2');
    
    // Test if the input is empty
    if (!pass1.val()) {
        error1 = true;
    }
    
    // The password should be 6 char long at least
    if (pass1.val() && pass1.val().length < 6) {
        error1 = true;
    }

    // The password and its confirmation should be the same
    if (pass2.val() && pass1.val() != pass2.val()) {
        error2 = true;
    }
    
    if (error1) {
        pass1.parents('span').addClass('inputError');
    } else {
        pass1.parents('span').removeClass('inputError');
    }
    
    if (error2) {
        pass2.parents('span').addClass('inputError');
    } else {
        pass2.parents('span').removeClass('inputError');
    }
}

// ********
// STEP 2 *
// ********

function checkGivenName() {
    error = false;
    givenname = $('#givenname');
    
    // Check if not empty
    if (!givenname.val()) {
        error = true;
    }
    
    if (error) {
        givenname.parents('span').addClass('inputError');
    } else {
        givenname.parents('span').removeClass('inputError');
    }
}

function checkFamilyName() {
    error = false;
    familyname = $('#familyname');
    
    // Check if not empty
    if (!familyname.val()) {
        error = true;
    }
    
    if (error) {
        familyname.parents('span').addClass('inputError');
    } else {
        familyname.parents('span').removeClass('inputError');
    }
}

function checkStep(id) {
    switch (id) {
        case 1:
            // Checking step1
            checkUsername();
            checkPassword();
            if ($('#step1').find('.inputError').length > 0) {
                $('#bubble1').addClass('errorBubble');
                return false;
            }
            $('#bubble1').removeClass('errorBubble');
            return true;
            break;
        case 2:
            // Checking step2
            checkGivenName();
            if ($('#step2').find('.inputError').length > 0) {
                $('#bubble2').addClass('errorBubble');
                return false;
            }
            $('#bubble2').removeClass('errorBubble');
            return true;
            break;
    }
}

/*
 * ============================
 * Managing the different steps
 * ============================
 */

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
        if (checkStep(currentStep)) {
            newStep = currentStep+1;
            loadStep(newStep);
            if (previousStep != null) {
                previousBubble = $('#bubble'+previousStep);
                previousBubble.addClass('complete');
                previousBubble.removeClass('current');
            }
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