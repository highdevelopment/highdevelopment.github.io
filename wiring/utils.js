"use strict";

// fn isTouch
function isTouch() {
    return !!('ontouchstart' in window);
    //return !! window.ontouchstart;
}

// modified
function checkModified(modified) {
    if(modified) {
        $('.modified').html('*');
        return;
    }
    $('.modified').html('');
}

/*------------------ PLUGIN FUNCION -------------------*/
// replace all a character in string
String.prototype.replaceAll = function(strTarget, strSubString) {
    return this.split(strTarget).join(strSubString);
}


/**
 * This method takes a given string and writes it to a text file on the
 * clients computer.  It does this for both firefox and chrome.  In Chrome
 * It creates a download link in the DOM and clicks on it.  In firefox the
 * user needs to click download.
 *
 * @param {string} text_to_write The text to write to a txt file
 * @param {string} file_name The name of the file that we want to save
 */
function saveTextAsFile(text_to_write, file_name)
    {
        var text_file_blob = new Blob([text_to_write], {type:'text/plain'});

        var download_link = document.createElement("a");
        download_link.download = file_name;
        download_link.innerHTML = "Download File";
        if (window.webkitURL != null)
        {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            download_link.href = window.webkitURL.createObjectURL(text_file_blob);
        }
        else
        {
            // Firefox requires the link to be added to the DOM
            // before it can be clicked.
            download_link.href = window.URL.createObjectURL(text_file_blob);
            download_link.onclick = destroyClickedElement;
            download_link.style.display = "none";
            document.body.appendChild(download_link);
        }

        download_link.click();
    }
