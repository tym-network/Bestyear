/*
 * This file adapts the checks proceed to the register form. It goes with formHandler.js
 */

var nbStep = 5;

// When a user clicks on one of the bubble in the left
$('.stepLink').click(function() {
    id = parseInt($(this).attr('id').replace('link',''));
    if (id <= maximumStep) {
        loadStep(id);
    }
})

/*
 * ============================
 * Error treatment on fields
 * ============================
 */

// ********
// STEP 1 *
// ********

$('#usernameSpan input')
    .keyup(function() {checkUsername();})
    .blur(function() {checkUsername();});

$('#passwordSpan input')
    .keyup(function() {checkPassword();})
    .blur(function() {checkPassword();});

$('#password2Span input')
    .keyup(function() {checkPassword();})
    .blur(function() {checkPassword();});

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
    message = null;
    username = $('#usernameSpan input');
    if (!username.val()) {
        // If the field is empty
        error = true;
        message = "Champ vide";
    } else if (username.val().length != 8) {
        // If the username hasn't the right size (8char)
        error = true;
        message = "8 caractères exactement";
    }
    
    if (error) {
        username.parents('span').addClass('inputError');
        username.attr("title", message);
    } else {
        removeErrors(username);
    }
}

// Tests on the password
function checkPassword() {
    error1 = false;
    message1 = null;
    error2 = false;
    message2 = null;
    pass1 = $('#passwordSpan input');
    pass2 = $('#password2Span input');
    
    // Tests if the input is empty
    if (!pass1.val()) {
        error1 = true;
        message1 = "Champ vide";
    }
    
    // The password should be 6 char long at least
    if (pass1.val() && pass1.val().length < 6) {
        error1 = true;
        message1 = "6 caractères min.";
    }
    
    if (!pass2.val()) {
        error2 = true;
        message2 = "Champ vide";
    }

    // The password and its confirmation should be the same
    if (pass2.val() && pass1.val() != pass2.val()) {
        error2 = true;
        message2 = "Les mots de passe sont différents";
    }
    
    if (error1) {
        pass1.parents('span').addClass('inputError');
        pass1.attr("title", message1);
    } else {
        removeErrors(pass1);
    }
    
    if (error2) {
        pass2.parents('span').addClass('inputError');
        pass2.attr("title", message2);
    } else {
        removeErrors(pass2);
    }
}

function checkStep(id) {
    switch (id) {
        case 1:
            // Checking step 1
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
            // Checking step 2
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
            // Checking step 3
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
        case 4:
            // Checking step 4
            checkMail();
            checkURLFacebook();
            checkURLTwitter();
            if ($('#step4').find('.inputError').length > 0) {
                $('#bubble4').addClass('errorBubble');
                return false;
            }
            $('#bubble4').removeClass('errorBubble');
            return true;
            break;
        case 5:
            // Checking step 5
            checkTN05();
            checkTN07();
            checkTN09();
            checkTN10();
            if ($('#step5').find('.inputError').length > 0) {
                $('#bubble5').addClass('errorBubble');
                return false;
            }
            $('#bubble5').removeClass('errorBubble');
            return true;
            break;
    }
}

function focusFirstInput(id) {
    switch (id) {
        case 1:
            $("#usernameSpan input").focus(); 
            break;
        case 2:
            $("#givennameSpan input").focus(); 
            break;
        case 3:
            $("#streetnumber1").focus(); 
            break;
        case 4:
            $("#phone1").focus(); 
            break;
        case 5:
            $("#tn05_job").focus(); 
            break;
    }
}