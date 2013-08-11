/*
 * Submit the search to a PHP script and display the results properly
 * It relies on transition.js
 */

var num = 0;
var panelActivated = false;

function send(sUrl, oParams) {
    for (sName  in oParams) {
            if (sUrl.indexOf("?")  != -1) {
                    sUrl  += "&";
            }  else {
                    sUrl  += "?";
            }
            sUrl  += encodeURIComponent(sName) + "=" +  encodeURIComponent(oParams[sName]);
    }

    var DSLScript  = document.createElement("script");
    DSLScript.src  = sUrl;
    DSLScript.type = "text/javascript";
    document.body.appendChild(DSLScript);
    document.body.removeChild(DSLScript);
}

function handleResults(json) {
    // Display the icon in the left bar if not already shown
    if (!panelActivated) {
        $("#listLeftBar")
            .show()
            .stop()
            .animate({"opacity": 1}, 100);
        panelActivated = true;
    }
    
    // Display the results
    if (!$('#userList').is(":visible")) {
        displayList();
    }

    $.each(json, function () {
        // Add the case with a picture when it will be implemented
        htmlUser = '<tr><td><div class="circle male"><div class="userBigIcon"></div></div></div></div></td>';
        htmlUser += '<td><div class="infosSummary"><div class="name">' + this.fullname + '</div><div class="other">' + this.studies + ' - ' +  this.age + ' ans</div></div></td></tr>';
        
        if (num%2 == 0) {
            $(htmlUser).appendTo('#leftTable');
        } else {
            $(htmlUser).appendTo('#rightTable');
        }
        num += 1;
    });
}

$('#searchUser').keypress(function (e) {
    // If key "Enter" is pressed
    if (e.which == 13) {
        if ($('#searchUser').val()) {
            var params = {
                "input": $('#searchUser').val(),
                "callback": "handleResults"
            };
            send("./search",params);
        }
    }
});