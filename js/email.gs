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

function getItemPrice(key, count)
{
   var ItemTitle = ['#1 Lite Breakfast $1.55',
                     '#2 Businesmans Breakfast $1.95',
                     '#3 Hearty Breakfast $4.25',
                     '#4 Maine’s Favorite $4.75',
                     '#5 Country Breakfast $7.50',
                     '#6 Eggs Benedict $7.95',
                     '#7 Grace’s Favorite $7.95',
                     '#8 The Lumber Jack $8.95'];
  var ItemPrice = [1.55, 1.95, 4.25, 4.75, 7.50, 7.95, 7.95, 8.95];
  for(var i=0; i<ItemTitle.length; i++)
  {
      if(key == ItemTitle[i])
      {
        return count*ItemPrice[i];
      }
  }
  return 0;
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
		subject = "Your Order Successfully Submitted";

		// This is the body of the auto-reply
		message = "We have received your details.<br>Thanks!<br><br>";

		ss = SpreadsheetApp.getActiveSheet();
		columns = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];

		// This is the submitter's email address
		sender = e.namedValues["Email Address:"].toString();

		// Only include form values that are not blank
        var price = 0;
        for ( var keys in columns ) {
			var key = columns[keys];
			if ( e.namedValues[key] ) {
				message += key + ' :: '+ e.namedValues[key] + "<br />";
                price = price + getItemPrice(key, parseInt(e.namedValues[key]));
			}
		}
      message += 'Total Price (exclude delivery fee):: ' + price.toString() + "<br />";
		textbody = message.replace("<br>", "\n");

		GmailApp.sendEmail(sender, subject, textbody,
				{cc: cc, name: sendername, htmlBody: message});
	} catch (e) {
		Logger.log(e.toString());
	}

}
