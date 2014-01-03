/*
 * This .js is in charge of the switch between the different panel of the sign-up form.
 * Is deals with the left arrow (moving up and down), the color of the circles (throw different classes) and the display of the right content
 * It also checks the content of the inputs to avoid any errors (some checks are still made in PHP)
 */

var currentStep = 1;
var previousStep = null;
var maximumStep = 1;
var errors = 0;
var nbStep = 5;
var genderSwitch = 0;

/*
 * When enter is pressed, go to the next step
 */
 
$(document).keypress(function (e) {
    // If key "Enter" is pressed
    if (e.which == 13) {
        if (currentStep < nbStep) {
            nextStep();
        } else if (currentStep == nbStep) {
            submitForm();
        }
        
    }
});

$(".nextStep").keypress(function (e) {
    // If the user presses "Enter" while the focus is on the button
    if (e.which == 13) {
        nextStep();
        return false;
    }
});

$(".submit").keypress(function (e) {
    // If the user presses "Enter" while the focus is on the button
    if (e.which == 13) {
        submitForm();
        return false;
    }
});

/*
 * Set the focus on the first input 
 */
 
$(document).ready(function () {
    $("#usernameSpan input").focus(); 
});

/*
 * Handles the tooltips when there is an error
 */

function updateErrorMessage(obj) {
    var errorLogo = obj.parent().find(".error");
    obj.qtip({
        style: {
            classes: "qtip-bootstrap",
            tip: {
                corner: true,
                width: 8,
            },
        },
        position: {
            my: 'bottom center',
            at: 'top center',
            target: errorLogo
        },
        show: {
            event: false,
            ready: true
        },
        hide: {
            event: false
        }
    });
}

$("input").focus(function() {
    if(!('object' === typeof $(this).data('qtip'))) {
        updateErrorMessage($(this));
    }
});

$("input").keyup(function() {
    if(!('object' === typeof $(this).data('qtip'))) {
        updateErrorMessage($(this));
    }
});

$("input").blur(function() {
    $(this).qtip('destroy');
});



/*
 * ============================
 * Calendar support for the birthdate
 * ============================
 */

var pickerOpts = {
    dateFormat: "yy-mm-dd",
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
$('#birthdateSpan input').datepicker(pickerOpts);

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

// ********
// STEP 2 *
// ********

$('#givennameSpan input')
    .keyup(function() {checkGivenName();})
    .blur(function() {checkGivenName();});
    
$('#familynameSpan input')
    .keyup(function() {checkFamilyName();})
    .blur(function() {checkFamilyName();});
    
$('#birthdateSpan input')
    .blur(function() {checkBirthdate();});

// ********
// STEP 3 *
// ********

$('#postcode1Span input')
    .keyup(function() {checkPostcode1();})
    .blur(function() {checkPostcode1();});
    
$('#postcode2Span input')
    .keyup(function() {checkPostcode2();})
    .blur(function() {checkPostcode2();});

// ********
// STEP 4 *
// ********
    
$('#emailSpan input')
    .keyup(function() {checkMail();})
    .blur(function() {checkMail();});
    
$('#facebookSpan input')
    .keyup(function() {checkURLFacebook();})
    .blur(function() {checkURLFacebook();});
    
$('#twitterSpan input')
    .keyup(function() {checkURLTwitter();})
    .blur(function() {checkURLTwitter();});

/*
 * ============================
 * Error treatment on submit
 * ============================
 */
 
function removeErrors(obj) {
    if ('object' === typeof obj.data('qtip')) {
        obj.qtip('destroy');
    }
    obj.parents('span').removeClass('inputError');
    obj.attr("title", "");
}
 
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

// ********
// STEP 2 *
// ********

function checkGivenName() {
    error = false;
    message = null;
    givenname = $('#givennameSpan input');
    
    // Check if not empty
    if (!givenname.val()) {
        message = "Champ vide";
        error = true;
    }
    
    if (error) {
        givenname.parents('span').addClass('inputError');
        givenname.attr("title", message);
    } else {
        removeErrors(givenname);
    }
}

function checkFamilyName() {
    error = false;
    message = null;
    familyname = $('#familynameSpan input');
    
    // Check if not empty
    if (!familyname.val()) {
        message = "Champ vide";
        error = true;
    }
    
    if (error) {
        familyname.parents('span').addClass('inputError');
        familyname.attr("title", message);
    } else {
        removeErrors(familyname);
    }
}

function checkBirthdate() {
    error = false;
    message = null;
    birthdate = $('#birthdateSpan input');
   
    // Correct format
    var matches = birthdate.val().match('^((19|20)[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$')
    if (!matches) {
        message = "Format invalide (Année-Mois-Jour)";
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
        message = "Il faut avoir plus de 10 ans";
        error = true;
    }
    if (birthYear == curr_year-10 && birthMonth > curr_month) {
        message = "Il faut avoir plus de 10 ans";
        error = true;
    }
    if (birthYear == curr_year-10 && birthMonth == curr_month && birthDay >= curr_date) {
        message = "Il faut avoir plus de 10 ans";
        error = true;
    }
    
    if (error) {
        birthdate.parents('span').addClass('inputError');
        birthdate.attr("title", message);
    } else {
        removeErrors(birthdate);
    }
}

// ********
// STEP 3 *
// ********

function checkPostcode1() {
    postcode1 = $('#postcode1Span input');
    message = null;
    
    if (postcode1.val() && !postcode1.val().match('^[0-9]{5}$')) {
        message = "Format incorrect (5 chiffres)";
        postcode1.parents('span').addClass('inputError');
        postcode1.attr("title", message);
    } else if (postcode1.val() && postcode1.val().match('^[0-9]{5}$')) {
        postcode1.parents('span').removeClass('inputError');
        postcode1.attr("title", "");
    }
}

function checkPostcode2() {
    postcode2 = $('#postcode2Span input');
     message = null;
    
    if (postcode2.val() && !postcode2.val().match('^[0-9]{5}$')) {
        message = "Format incorrect (5 chiffres)";
        postcode2.parents('span').addClass('inputError');
        postcode2.attr("title", message);
    } else if (postcode2.val() && postcode2.val().match('^[0-9]{5}$')) {
        postcode2.parents('span').removeClass('inputError');
        postcode2.attr("title", "");
    }
}

function checkAddress1onSubmit() {
    streetnumber1 = $('#streetnumber1Span input');
    street1 = $('#street1Span input');
    postcode1 = $('#postcode1Span input');
    city1 = $('#city1Span input');
    addressmore1 = $('#addressmore1Span input');
    
    // If one input is filled, they should all be filled
    if ((streetnumber1.val() || street1.val() || postcode1.val() || city1.val() || addressmore1.val()) && !(streetnumber1.val() && street1.val() && postcode1.val() && city1.val() && addressmore1.val())) {
        if (!streetnumber1.val()) {
            streetnumber1.parents('span').addClass('inputError');
            streetnumber1.attr("title", "Champ vide");
        }
        if (!street1.val()) {
            street1.parents('span').addClass('inputError');
            street1.attr("title", "Champ vide");
        }
        if (!postcode1.val()) {
            postcode1.parents('span').addClass('inputError');
            postcode1.attr("title", "Champ vide");
        }
        if (!city1.val()) {
            city1.parents('span').addClass('inputError');
            city1.attr("title", "Champ vide");
        }
        if (!addressmore1.val()) {
            addressmore1.parents('span').addClass('inputError');
            addressmore1.attr("title", "Champ vide");
        }
    } else {
        removeErrors(streetnumber1);
        removeErrors(street1);
        removeErrors(postcode1);
        removeErrors(city1);
        removeErrors(addressmore1);
    }
}

function checkAddress2onSubmit() {
    streetnumber2 = $('#streetnumber2Span input');
    street2 = $('#street2Span input');
    postcode2 = $('#postcode2Span input');
    city2 = $('#city2Span input');
    addressmore2 = $('#addressmore2Span input');
    
    // If one input is filled, they should all be filled
    if ((streetnumber2.val() || street2.val() || (postcode2.val() && postcode2.val() != "60200" || addressmore2.val()) || (city2.val()) && city2.val() != "Compiègne") && !(streetnumber2.val() && street2.val() && postcode2.val() && city2.val() && addressmore2.val())) {
        if (!streetnumber2.val()) {
            streetnumber2.parents('span').addClass('inputError');
            streetnumber2.attr("title", "Champ vide");
        }
        if (!street2.val()) {
            street2.parents('span').addClass('inputError');
            street2.attr("title", "Champ vide");
        }
        if (!postcode2.val()) {
            postcode2.parents('span').addClass('inputError');
            postcode2.attr("title", "Champ vide");
        }
        if (!city2.val()) {
            city2.parents('span').addClass('inputError');
            city2.attr("title", "Champ vide");
        }
        if (!addressmore2.val()) {
            addressmore2.parents('span').addClass('inputError');
            addressmore2.attr("title", "Champ vide");
        }
    } else {
        removeErrors(streetnumber2);
        removeErrors(street2);
        removeErrors(postcode2);
        removeErrors(city2);
        removeErrors(addressmore2);
    }
}

// ********
// STEP 4 *
// ********

function checkMail() {
    error = false;
    message = null;
    email = $('#emailSpan input');
   
    // Correct format
    if (email.val() && !email.val().match('^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$')) {
        message = "Fomat incorrect";
        error = true;
    }
    
    if (error) {
        email.parents('span').addClass('inputError');
        email.attr("title", message);
    } else {
        removeErrors(email);
    }
}

function checkURLFacebook() {
    error = false;
    message = null;
    urlFacebook = $('#facebookSpan input');
   
    if (urlFacebook.val() && !urlFacebook.val().match('^(https?:\/\/)?(www\.)?facebook\.com/[a-z.-1-9_]+$')) {
        message = "URL invalide (ex: www.facebook.com/mon.profil)";
        error = true;
    }
    if (error) {
        urlFacebook.parents('span').addClass('inputError');
        urlFacebook.attr("title", message);
    } else {
        removeErrors(urlFacebook);
    }
}

function checkURLTwitter() {
    error = false;
    message = null;
    urlTwitter = $('#twitterSpan input');
   
    if (urlTwitter.val() && !urlTwitter.val().match('^(https?:\/\/)?(www\.)?twitter\.com/[a-zA-Z.-1-9_]+$')) {
        message = "URL invalide (ex: www.twitter.com/tym-network)";
        error = true;
    }
    if (error) {
        urlTwitter.parents('span').addClass('inputError');
        urlTwitter.attr("title", message);
    } else {
        removeErrors(urlTwitter);
    }
}

function checkTN05() {
    message = null;
    tn05_job = $('#tn05_jobSpan input');
    tn05_place = $("#tn05_placeSpan input");
    
    // If only one of the two inputs isn't filled
    if ((!tn05_job.val() || !tn05_place.val()) && !(!tn05_job.val() && !tn05_place.val())) {
        message = "Champ vide";
        if (!tn05_job.val()) {
            tn05_job.parents('span').addClass('inputError');
            tn05_job.attr("title", message);
        } else if (!tn05_place.val()) {
            tn05_place.parents('span').addClass('inputError');
            tn05_place.attr("title", message);
        }
    } else {
        removeErrors(tn05_job);
        removeErrors(tn05_place);
    }
}

function checkTN07() {
    message = null;
    tn07_job = $('#tn07_jobSpan input');
    tn07_place = $("#tn07_placeSpan input");
    
    // If only one of the two inputs isn't filled
    if ((!tn07_job.val() || !tn07_place.val()) && !(!tn07_job.val() && !tn07_place.val())) {
        message = "Champ vide";
        if (!tn07_job.val()) {
            tn07_job.parents('span').addClass('inputError');
            tn07_job.attr("title", message);
        } else if (!tn07_place.val()) {
            tn07_place.parents('span').addClass('inputError');
            tn07_place.attr("title", message);
        }
    } else {
        removeErrors(tn07_job);
        removeErrors(tn07_place);
    }
}

function checkTN09() {
    message = null;
    tn09_job = $('#tn09_jobSpan input');
    tn09_place = $("#tn09_placeSpan input");
    
    // If only one of the two inputs isn't filled
    if ((!tn09_job.val() || !tn09_place.val()) && !(!tn09_job.val() && !tn09_place.val())) {
        message = "Champ vide";
        if (!tn09_job.val()) {
            tn09_job.parents('span').addClass('inputError');
            tn09_job.attr("title", message);
        } else if (!tn09_place.val()) {
            tn09_place.parents('span').addClass('inputError');
            tn09_place.attr("title", message);
        }
    } else {
        removeErrors(tn09_job);
        removeErrors(tn09_place);
    }
}

function checkTN10() {
    message = null;
    tn10_job = $('#tn10_jobSpan input');
    tn10_place = $("#tn10_placeSpan input");
    
    // If only one of the two inputs isn't filled
    if ((!tn10_job.val() || !tn10_place.val()) && !(!tn10_job.val() && !tn10_place.val())) {
        message = "Champ vide";
        if (!tn10_job.val()) {
            tn10_job.parents('span').addClass('inputError');
            tn10_job.attr("title", message);
        } else if (!tn10_place.val()) {
            tn10_place.parents('span').addClass('inputError');
            tn10_place.attr("title", message);
        }
    } else {
        removeErrors(tn10_job);
        removeErrors(tn10_place);
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

/*
 * ============================
 * Managing the different steps
 * ============================
 */

$('.nextStep').click(function() {
    nextStep();
});

$('.submit').click(function() {
    submitForm();
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

function submitForm() {
    for (i=1; i<=nbStep; i++) {
        checkStep(i);
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
                .stop()
                .show()
                .animate({"opacity": 1}, "slow", function() {focusFirstInput(id);});
        });
}

function changeGender() {
    //Change the switch to the other position
    var genderButton = $("#genderButton");
    var genderBar = $("#genderBar");
    var genderInput = $("#fos_user_registration_form_gender");
    if (genderSwitch === 0) {
        genderInput.val('f');
        genderButton.css("left", "87px");
        genderBar.addClass("femaleSwitch");
        genderBar.removeClass("maleSwitch");
        $("#femaleSymbol").addClass("active");
        $("#maleSymbol").removeClass("active");
        genderSwitch = 1;
    } else {
        genderInput.val('m');
        genderButton.css("left", "3px");
        genderBar.addClass("maleSwitch");
        genderBar.removeClass("femaleSwitch");
        $("#maleSymbol").addClass("active");
        $("#femaleSymbol").removeClass("active");
        genderSwitch = 0;
    }
}

$("#genderBar").click(function() {
    changeGender();
});