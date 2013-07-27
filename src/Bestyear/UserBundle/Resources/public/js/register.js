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
 * Calendar support for the birthdate
 * ============================
 */

var pickerOpts = {
    dateFormat:"yy-mm-dd",
    changeMonth: true,
    changeYear: true,
    yearRange: "-30:-14",
    showButtonPanel: true,
    constrainInput: false,
    defaultDate: "-18y",
    onSelect: function() {checkBirthdate();},
    onClose: function() {checkBirthdate();},
};
$.datepicker.setDefaults( $.datepicker.regional[ "fr" ] );
$('#birthdate').datepicker(pickerOpts);

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

// ********
// STEP 2 *
// ********

$('#givenname')
    .keyup(function() {checkGivenName();})
    .blur(function() {checkGivenName();});
    
$('#familyname')
    .keyup(function() {checkFamilyName();})
    .blur(function() {checkFamilyName();});
    
$('#birthdate')
    .blur(function() {checkBirthdate();});

// ********
// STEP 3 *
// ********

$('#postcode1')
    .keyup(function() {checkPostcode1();})
    .blur(function() {checkPostcode1();});
    
$('#postcode2')
    .keyup(function() {checkPostcode2();})
    .blur(function() {checkPostcode2();});

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

function checkBirthdate() {
    error = false;
    birthdate = $('#birthdate');
   
    // Correct format
    var matches = birthdate.val().match('^((19|20)[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$')
    if (!matches) {
        error = true;
    } else {
        var birthDay = parseInt(matches[4]);
        var birthMonth = parseInt(matches[3]);
        var birthYear = parseInt(matches[1]);
    }
    
    // Compare to current date (minimum age = 10 years old)
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth()+1;
    var curr_year = d.getFullYear();
    if (birthYear > curr_year-10) {
        error = true;
    }
    if (birthYear == curr_year-10 && birthMonth > curr_month) {
        error = true;
    }
    if (birthYear == curr_year-10 && birthMonth == curr_month && birthDay >= curr_date) {
        error = true;
    }
    
    if (error) {
        birthdate.parents('span').addClass('inputError');
    } else {
        birthdate.parents('span').removeClass('inputError');
    }
}

// ********
// STEP 3 *
// ********

function checkPostcode1() {
    postcode1 = $('#postcode1');
    
    if (postcode1.val() && !postcode1.val().match('^[0-9]{5}$')) {
        postcode1.parents('span').addClass('inputError');
    } else if (postcode1.val() && postcode1.val().match('^[0-9]{5}$')) {
        postcode1.parents('span').removeClass('inputError');
    }
}

function checkPostcode2() {
    postcode1 = $('#postcode2');
    
    if (postcode2.val() && !postcode1.val().match('^[0-9]{5}$')) {
        postcode2.parents('span').addClass('inputError');
    } else if (postcode2.val() && postcode2.val().match('^[0-9]{5}$')) {
        postcode2.parents('span').removeClass('inputError');
    }
}

function checkAddress1onSubmit() {
    streetnumber1 = $('#streetnumber1');
    street1 = $('#street1');
    postcode1 = $('#postcode1');
    city1 = $('#city1');
    
    // If one input is filled, they should all be filled
    if ((streetnumber1.val() || street1.val() || postcode1.val() || city1.val()) && !(streetnumber1.val() && street1.val() && postcode1.val() && city1.val())) {
        if (!streetnumber1.val()) {
            streetnumber1.parents('span').addClass('inputError');
        }
        if (!street1.val()) {
            street1.parents('span').addClass('inputError');
        }
        if (!postcode1.val()) {
            postcode1.parents('span').addClass('inputError');
        }
        if (!city1.val()) {
            city1.parents('span').addClass('inputError');
        }
    } else {
        streetnumber1.parents('span').removeClass('inputError');
        street1.parents('span').removeClass('inputError');
        postcode1.parents('span').removeClass('inputError');
        city1.parents('span').removeClass('inputError');
    }
}

function checkAddress2onSubmit() {
    streetnumber2 = $('#streetnumber2');
    street2 = $('#street2');
    postcode2 = $('#postcode2');
    city2 = $('#city2');
    
    // If one input is filled, they should all be filled
    if ((streetnumber2.val() || street2.val() || (postcode2.val() && postcode2.val() != "60200") || (city2.val()) && city2.val() != "Compiègne") && !(streetnumber2.val() && street2.val() && postcode2.val() && city2.val())) {
        if (!streetnumber2.val()) {
            streetnumber2.parents('span').addClass('inputError');
        }
        if (!street2.val()) {
            street2.parents('span').addClass('inputError');
        }
        if (!postcode2.val()) {
            postcode2.parents('span').addClass('inputError');
        }
        if (!city2.val()) {
            city2.parents('span').addClass('inputError');
        }
    } else {
        streetnumber2.parents('span').removeClass('inputError');
        street2.parents('span').removeClass('inputError');
        postcode2.parents('span').removeClass('inputError');
        city2.parents('span').removeClass('inputError');
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
            checkFamilyName();
            checkBirthdate();
            if ($('#step2').find('.inputError').length > 0) {
                $('#bubble2').addClass('errorBubble');
                return false;
            }
            $('#bubble2').removeClass('errorBubble');
            return true;
            break;
        case 3:
            // Checking step3
            checkAddress1onSubmit();
            checkAddress2onSubmit();
            checkPostcode1();
            checkPostcode2();
            if ($('#step3').find('.inputError').length > 0) {
                $('#bubble3').addClass('errorBubble');
                return false;
            }
            $('#bubble3').removeClass('errorBubble');
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