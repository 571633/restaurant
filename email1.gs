/* Send Confirmation Email with Google Forms */

function Initialize() {

	var triggers = ScriptApp.getScriptTriggers();

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
		sendername = "Graces Market";

		// Optional but change the following variable
		// to have a custom subject for Google Docs emails
		subject = "Your order Successfully Submitted";

		// This is the body of the auto-reply
		message = "We have received your details.<br>Thanks!<br><br>";

		ss = SpreadsheetApp.getActiveSheet();
		columns = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];

		// This is the submitter's email address
		sender = e.namedValues["Email Address:"].toString();

		// Only include form values that are not blank
        var totalPrice = 0;
        var prices = [1.55, 1.95, 4.25, 4.75, 7.50, 7.95, 7.95, 8.95];
		for ( var keys in columns ) {
			var key = columns[keys];
			if ( e.namedValues[key] ) {
			    message += key + ' :: '+ e.namedValues[key] + "<br />";
                if (1<keys.getColumn() && keys.getColumn()<8) {
                  totalPrice = totalPrice + parseInt(e.namedValues[key])*prices[keys.getColumn()-1];
                }
			}
		}
      message += 'Total Price (exclude delivery fee) :: ' + totalPrice.toString() + "<br />";
		textbody = message.replace("<br>", "\n");

		GmailApp.sendEmail(sender, subject, textbody,
				{cc: cc, name: sendername, htmlBody: message});
	} catch (e) {
		Logger.log(e.toString());
	}

}
