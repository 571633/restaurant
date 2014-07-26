/* Send Confirmation Email with Google Forms */

var ItemTitle = ['#1 Lite Breakfast $1.55',
                '#2 Businesmans Breakfast $1.95',
                '#3 Hearty Breakfast $4.25',
                '#4 Maine’s Favorite $4.75',
                '#5 Country Breakfast $7.50',
                '#6 Eggs Benedict $7.95',
                '#7 Grace’s Favorite $7.95',
                '#8 The Lumber Jack $8.95'];
var ItemPrice = [1.55, 1.95, 4.25, 4.75, 7.50, 7.95, 7.95, 8.95];
var openHour = 8;	// store opens at 8
var closeHour = 15; // store closes at 15


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
	for(var i=0; i<ItemTitle.length; i++)
		if(key == ItemTitle[i])
			return count*ItemPrice[i];
	return 0;
}

function checkTimeValidation(DeliveryDate, DeliveryTime)
{
    currentHours = (new Date()).getHours();
	
    // [0]: hour, [1]: minute, [2]: second
    var DeliveryArray = DeliveryTime.split(":");
    if(DeliveryTime.indexOf("PM") != -1)
      DeliveryArray[0] = parseInt(DeliveryArray[0])+12;
       
	if(DeliveryDate == "Today" && currentHours<=DeliveryArray[0] && DeliveryArray[0]<closeHour)
		return 1;
	if(DeliveryDate == "Tomorrow" && openHour<DeliveryArray[0] && DeliveryArray[0]<closeHour)
		return 1;
	return 0;
}

function SendConfirmationMail(e) {
	try {
		var ss, cc, sendername, subject, columns;
		var message, value, textbody, sender;
		// This is your email address and you will be in the CC
		cc = Session.getActiveUser().getEmail();
		ss = SpreadsheetApp.getActiveSheet();
		columns = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];

		// This is the body of the auto-reply
		message = "Dear Customer: <br><br> ";
		// Only include form values that are not blank
        var price = 0, Delivery = 1;
		var DeliveryDate, DeliveryTime;
        var orderDetail = "";
        for ( var keys in columns ) {
			var key = columns[keys];
			if ( e.namedValues[key] ) {
				orderDetail += key + ' :: '+ e.namedValues[key] + "<br>";
                price += getItemPrice(key, parseInt(e.namedValues[key]));
			    if(key == 'Delivery / Pick up Date')
                  DeliveryDate = e.namedValues[key];
			    if(key == 'Delivery / Pick up Time')
                  DeliveryTime = e.namedValues[key].toString();
                if(key == 'Delivery / Pick up' && e.namedValues[key] == 'Pick up')
                  Delivery = 0;
			}
		}

		if(price<=0)
		{
			subject = "Your Order Failed to Submit";
			message += "Sorry your order failed to submit since you didn't order anything. <br><br>";
            message += "Here is your order detail:<br>";
            message += orderDetail;
		}
		else if(!checkTimeValidation(DeliveryDate, DeliveryTime))
		{
			subject = "Your Order Failed to Submit";
			message += "Sorry your order failed to submit. Please make another order with a proper delivery/pickup time.<br><br>";
            message += "Here is your order detail:<br>";
            message += orderDetail;            
		}
		else
		{
			subject = "Your Order Successfully Submitted";

			message += "Thank you for ordering with Grace’s Market! <br>  Your order has been received and is being processed at this time. Please take a moment to review your order summary below. If you have any questions about your order, please send an email to gracesmarkets@gmail.com or give us a call. All future order updates will be sent to you via email.<br><br> Order Confirmation:<br>"
            message += orderDetail;

			message += "Subtotal: $" + price.toString() + "<br>";
			message += "Sales Tax: $0.00 <br/>";
            if(Delivery)
            {
              message += "Delivery fee: $1.50 <br/>";
              price += 1.5;
            }
			message += "Order Total: $" + price.toString() +"<br>";
		}
		message += "<br>http://www.gracesmarkets.com <br> 5 Lawrence Rd, Salem, NH 03079 <br> (603) 912-5911 <br>Hours of Operations: Mon-Sat - 7:00 am - 3:00 pm <br> Important Note: Please do not reply to this email message as this is an automated order confirmation."

		textbody = message.replace("<br>", "\n");
		sendername = "Graces Market";			// This will show up as the sender's name
		GmailApp.sendEmail(	e.namedValues["Email Address:"].toString(),	//the email address of submitter 
							subject, textbody,
							{cc: cc, name: sendername, htmlBody: message});
	} catch (e) {
      Logger.log(e.toString() + 'line:' + (new Error()).lineNumber);
	}
}
