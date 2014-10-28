/* Send Confirmation Email with Google Forms */


//var ccEmail = ", chuanchunho@gmail.com";
var ccEmail = ", lindaliu121220@gmail.com, ganyanyan900613@gmail.com, chuanchunho@gmail.com";
 
function Initialize() { 
    var triggers = ScriptApp.getProjectTriggers();
    for (var i in triggers) {
        ScriptApp.deleteTrigger(triggers[i]);
    }
    ScriptApp.newTrigger("SendConfirmationMail")
        .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
        .onFormSubmit()
        .create();
}
 
function SendConfirmationMail(e) {
    
    try {
        
        var ss, cc, sendername, subject, columns;
        var message, value, textbody, sender;
        
        // This is your email address and you will be in the CC
        cc = Session.getActiveUser().getEmail();
        
        // This will show up as the sender's name
        sendername = "Grace's Market";
 
        // Optional but change the following variable
        // to have a custom subject for Google Docs emails
        subject = "Thanks for contacting us";
 
        // This is the body of the auto-reply
        message = "We have received your details.<br>Thanks!<br><br>";
 
        ss = SpreadsheetApp.getActiveSheet();
        columns = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];
 
        // This is the submitter's email address
        sender = e.namedValues["Email Address"].toString();
 
        // Only include form values that are not blank
        for ( var keys in columns ) {
            var key = columns[keys];
            if ( e.namedValues[key] ) {
                message += key + ' :: '+ e.namedValues[key] + "<br />"; 
            }
        }
        
        textbody = message.replace("<br>", "\n");
 
        GmailApp.sendEmail(sender, subject, textbody, 
                            {bcc: cc, name: sendername, htmlBody: message});
        
    } catch (e) {
      Logger.log('Error at line ' + e.lineNumber.toString() + ' ' + e.name + ': ' + e.message);
    }
 
}
