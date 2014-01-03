/*
 * Submit the search to a PHP script and display the results properly
 * It relies on transition.js
 */

var num = 0;
var numResults = -1;
var searchPanelActivated = false;
var userPanelActivated = false;
var currentSearch = "";

/*
 * Handles the DSL script
 */
function send(sUrl, oParams) {
    // Get the "basic" URL (find a proper way to do it)
    Url = $("#home").attr("href") + sUrl;
    
    for (sName  in oParams) {
        if (Url.indexOf("?")  != -1) {
                Url  += "&";
        }  else {
                Url  += "?";
        }
        Url  += encodeURIComponent(sName) + "=" +  encodeURIComponent(oParams[sName]);
    }

    var DSLScript  = document.createElement("script");
    DSLScript.src  = Url;
    DSLScript.type = "text/javascript";
    document.body.appendChild(DSLScript);
    document.body.removeChild(DSLScript);
}

/*
 * Handles the search results (from a json)
 */
function handleResults(json) {
    // Updates the string researched
    $("#searchContent").text(currentSearch);
    
    // Display the icon in the left bar if not already shown
    if (!searchPanelActivated) {
        $(".listLeft")
            .show()
            .stop()
            .animate({"opacity": 1}, 100);
        searchPanelActivated = true;
    }
    
    // Display the results
    if (!$('.userList').is(":visible")) {
        // transition.js
        displayDiv($(".listLeft"));
    }
    
    // No previous search
    if (numResults == -1) {
        showResults(json);
    } else if (numResults == 0) {
        // Delete "No Result" if there were a previous search
        $("#noresult").animate({"opacity": 0}, 200, function() {
            $("#noresult").remove();
            showResults(json);
        });  
    } else if (numResults >= 1) {
        // Cleaning the tab (if there was a previous search)
        $("#leftTable").animate({"opacity": 0}, 200);
        $("#rightTable").animate({"opacity": 0}, 200, function() {
            $("#rightTable").children().remove();
            $("#leftTable").children().remove();
            showResults(json);
        });
    } else {
        showResults(json);
    }
    
    
}

function showResults(json) {
    var num = 0;
    if (json.length == 0) {
        numResults = 0;
        htmlUser = "<p id=\"noresult\">Aucun résultat</p>";
        $(htmlUser).appendTo('.userList');
    } else {
        numResults = 1;
        $("#leftTable").animate({"opacity": 1}, 400);
        $("#rightTable").animate({"opacity": 1}, 400);
        $.each(json, function () {
            // Add the support of a picture when it will be implemented
            htmlUser = '<tr id="' + this.id + '" class="userPreview"><td><div class="circle ' + this.gender + '"><div class="userBigIcon"></div></div></div></div></td>';
            htmlUser += '<td><div class="infosSummary"><div class="name">' + this.fullname + '</div><div class="other">' + this.studies + ' - ' +  this.age + ' ans</div></div></td></tr>';
            
            if (num%2 == 0) {
                $(htmlUser).appendTo('#leftTable');
            } else {
                $(htmlUser).appendTo('#rightTable');
            }
            num++;
        });
        
        // Click on a user displays its full profile
        $('.userPreview').click(function () {
            id = $(this).attr('id');
            searchUser(id);
        });
    }
}

/*
 * Display a specific user 
 */
function displayUser(json) {
    var num = 0;
    var numCouronne = 0;
    var column = "leftColumn";
    
    // Cleaning the tab (if there was a previous user)
    $(".userProfile").children().remove();
    
    // Display the icon in the left bar if not already shown
    if (!userPanelActivated) {
        $(".userLeft")
            .show()
            .stop()
            .animate({"opacity": 1}, 100);
        userPanelActivated = true;
    }
    
    // Display the user
    if (!$('.userProfile').is(":visible")) {
        // transition.js
        displayDiv($(".userLeft"));
    }
    
    // Picture and basic info
    htmlCode = '<div id="userNoPicture" class="';
    htmlCode += json.gender;
    htmlCode += '"><div id="userNoPictureIcon"></div></div><div id="identity"><span id="name">';
    htmlCode += json.fullname;
    htmlCode += '</span><br/><span id="birthdate">';
    htmlCode += json.age;
    htmlCode += '</span><br/><span id="level">';
    htmlCode += json.studies;
    htmlCode += '</span></div>';
    
    // Social networks
    htmlCode += '<div id="socialNetworks">';
    if (json.facebook != null) {
        htmlCode += '<a href="' + json.facebook + '">';
        htmlCode += '<div id="facebook" class="socialBubble"><div id="facebookIcon"></div></div></a>';
    }
    if (json.twitter != null) {
        htmlCode += '<a href="' + json.twitter + '">';
        htmlCode += '<div id="twitter" class="socialBubble"><div id="twitterIcon"></div></div></a>';
    } 
    htmlCode += '</div>';
    
    // Details (Phone numbers, email addresses, ...)
    htmlCode += '<div id="details">';
    // Phones
    var nbPhones = 0;
    var phones = new Array();
    if (json.phone1 != null) {
        nbPhones++;
        var phone1 = new Object();
        phone1.icon = 'home';
        phone1.num = json.phone1;
        phones.push(phone1);
    }
    if (json.phone2 != null) {
        nbPhones++;
        var phone2 = new Object();
        phone2.icon = 'school';
        phone2.num = json.phone2;
        phones.push(phone2);
    }
    if (json.cellphone != null) {
        nbPhones++;
        var cellphone = new Object();
        cellphone.icon = 'smartphone';
        cellphone.num = json.cellphone;
        phones.push(cellphone);
    }
    if (nbPhones > 0) {
        if (numCouronne%2 == 0) {
            column = "leftColumn";
        } else {
            column = "rightColumn";
        }
        htmlCode += '<div class="row '  + column + '">';
        htmlCode += '<div id="couronne' + nbPhones + '" class="couronne">';
        htmlCode += '<div id="phoneBigIcon"></div></div><div class="line">';
        num = 1;
        $.each(phones, function () {
            htmlCode += '<div class="line' + nbPhones + '-' + num + '">';
            htmlCode += '<div class="' + this.icon + 'Icon"></div>';
            htmlCode += '<div class="info">' + this.num + '</div></div>';
            num++;
        });
        htmlCode += '</div></div>';
        numCouronne++;
    }
    // Email addresses
    var nbEmails = 1;
    var emails = new Array();
    var email1 = new Object();
        email1.icon = 'school';
        email1.address = json.email;
        emails.push(email1);
    if (json.emailOptional != null) {
        nbEmails++;
        var email2 = new Object();
        email2.icon = 'home';
        email2.address = json.emailOptional;
        emails.push(email2);
    }
    if (nbEmails > 0) {
        if (numCouronne%2 == 0) {
            column = "leftColumn";
        } else {
            column = "rightColumn";
        }
        htmlCode += '<div class="row '  + column + '">';
        htmlCode += '<div id="couronne' + nbEmails + '" class="couronne">';
        htmlCode += '<div id="mailBigIcon"></div></div><div class="line">';
        num = 1;
        $.each(emails, function () {
            htmlCode += '<div class="line' + nbEmails + '-' + num + '">';
            htmlCode += '<div class="' + this.icon + 'Icon"></div>';
            htmlCode += '<div class="info"><a href="mailto:' + this.address + '" target="_blank" class="link">' + this.address + '</a></div></div>';
            num++;
        });
        htmlCode += '</div></div>';
        numCouronne++;
    }
    // Addresses
    var nbAddresses = 0;
    var addresses = new Array();
    if (json.address1_1 != null) {
        nbAddresses++;
        var address1 = new Object();
        address1.icon = 'home';
        address1.address1 = json.address1_1;
        address1.address2 = json.address1_2;
        addresses.push(address1);
    }
    if (json.address2_1 != null) {
        nbAddresses++;
        var address2 = new Object();
        address2.icon = 'school';
        address2.address1 = json.address2_1;
        address2.address2 = json.address2_2;
        addresses.push(address2);
    }
    if (nbAddresses > 0) {
        if (numCouronne%2 == 0) {
            column = "leftColumn";
        } else {
            column = "rightColumn";
        }
        htmlCode += '<div class="row '  + column + '">';
        htmlCode += '<div id="couronne' + nbAddresses + '" class="couronne">';
        htmlCode += '<div id="compassBigIcon"></div></div><div class="line address">';
        num = 1;
        $.each(addresses, function () {
            htmlCode += '<div class="line' + nbAddresses + '-' + num + '">';
            htmlCode += '<div class="' + this.icon + 'Icon"></div>';
            htmlCode += '<div class="info"><a href="https://maps.google.fr/?q=' + this.address1 + ' ' + this.address2 +'" class="link" target="_blank">' + this.address1 + '<br/>' + this.address2 + '</a></div></div>';
            num++;
        });
        htmlCode += '</div></div>';
        numCouronne++;
    }    
    
    // Internship
    if (json.tn05_job || json.tn07_job || json.tn09_job || json.tn10_job) {
        htmlCode += '<div id="TN"><h2>STAGES</h2>';
        if (json.tn05_job) {
            htmlCode += '<h3>TN05</h3><span class="icon job icon-grey icon-24"></span> ' + json.tn05_job;
            htmlCode += '<br/><span class="icon pin icon-grey icon-24"></span> ' + json.tn05_place;
        }
        if (json.tn07_job) {
            htmlCode += '<h3>TN07</h3><span class="icon job icon-grey icon-24"></span> ' + json.tn07_job;
            htmlCode += '<br/><span class="icon pin icon-grey icon-24"></span> ' + json.tn07_place;
        }
        if (json.tn09_job) {
            htmlCode += '<h3>TN09</h3><span class="icon job icon-grey icon-24"></span> ' + json.tn09_job;
            htmlCode += '<br/><span class="icon pin icon-grey icon-24"></span> ' + json.tn09_place;
        }
        if (json.tn10_job) {
            htmlCode += '<h3>TN10</h3><span class="icon job icon-grey icon-24"></span> ' + json.tn10_job;
            htmlCode += '<br/><span class="icon pin icon-grey icon-24"></span> ' + json.tn10_place;
        }
        htmlCode += '</div></div>';
    }
    
    $(htmlCode).appendTo('.userProfile');
}

function search() {
    if ($('#searchUser').val()) {
        var params = {
            "input": $('#searchUser').val(),
            "callback": "handleResults"
        };
        currentSearch = $('#searchUser').val().replace(/</gi, '');
        currentSearch = currentSearch.replace(/>/gi, '');
        currentSearch = currentSearch.replace(/\(/gi, '');
        currentSearch = currentSearch.replace(/\)/gi, '');
        send("search",params);
    }
}

$('#searchUser').keypress(function (e) {
    // If key "Enter" is pressed
    if (e.which == 13) {
        search();
    }
});

function searchUser(id) {
    var params = {
        "callback": "displayUser"
    };
    send("searchUser/"+id,params);
}

/**
 * Add function to the button
 */ 

$('#searchIcon').click(function () {
    search();
});