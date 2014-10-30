function createListItem(form, title, description)
{
    var item = form.addListItem();
    item.setTitle(title);
    if(description)
        item.setHelpText(description);
    item.setChoiceValues(['0', '1', '2', '3', '4', '5']);
    return item;
}

function createForm() {
    // Create a new form, then add a checkbox question, a multiple choice question,
    // a page break, then a date question and a grid of questions.
    var form = FormApp.create('Grace\'s Market Lunch');


	var LunchBoxItemTitle = ["Chicken Tenders $6.95",
		"Mozzarella Sticks $6.95",
		"Buffalo Tenders $6.95",
		"Small Onion Rings $2.50",
		"Large Onion Rings $4.50",
		"Chicken Wings $6.95",
		"Small Size French Fries $2.50",
		"Large Size French Fries $4.50",
		"Buffalo/BBQ Wings $6.95",
		"Side Salad $2.50",
		"Chipotle Wings $6.95"];

    var LunchBoxItemPrice = [6.95, 6.95, 6.95, 2.50, 4.50, 6.95, 2.50, 4.50, 6.95, 2.50, 6.95];
	var LunchBoxItemDescription = ['', '', '', '', '', '', '', '', '', '', '']
   
	if (LunchBoxItemTitle.length != LunchBoxItemPrice.length || LunchBoxItemTitle.length != LunchBoxItemDescription.length){
		throw new Error("Item member numbers don't match");
	}

	//create item array
	var LunchBoxItems = [];
	for(var i=0; i<LunchBoxItemTitle.length; i++)
	{
		// ItemTitle[i] is used as key
		LunchBoxItems[LunchBoxItemTitle[i]] = { lunchBoxItemPrice: LunchBoxItemPrice [i], 
								lunchBoxItemDescription: LunchBoxItemDescription[i]};
	}

    var lunchBoxListItem = [];
    for (var i = 0; i < LunchBoxItemTitle.length; i++) {
	  var key = LunchBoxItemTitle[i];
      lunchBoxListItem[i] = createListItem(form, key, LunchBoxItems[key].itemDescription);
    }

    var nameItem = form.addTextItem();
    nameItem.setTitle('Name: ');
    nameItem.setRequired(true);
    var addressItem1 = form.addTextItem();
    addressItem1.setTitle('Street Address: ');
    addressItem1.setRequired(true);
    var addressItem2 = form.addTextItem();
    addressItem2.setTitle('Suite/Apt #: ');    
    
      var cityItem = form.addListItem();
    cityItem.setTitle("City, State Zip Code: ");
    cityItem.setChoiceValues(['Salem, NH 03079', 
                              'Atkinson, NH 03811', 
                              'Hampstead, NH 03841', 
                              'Haverhill, MA, 01830', 
                              'Lawrence, MA 01840', 
                              'Methuen, MA 01844',
                              'Pelham, NH 03076',
                              'Windham, NH 03087']);
    cityItem.setRequired(true);

    var telItem = form.addTextItem();
    telItem.setTitle('Telephone: ');
    telItem.setRequired(true);

    var emailItem = form.addTextItem();
    emailItem.setTitle('Email Address:');
    emailItem.setRequired(true);
    
    var dateItem = form.addListItem();
    dateItem.setTitle('Delivery / Pick up Date');
    dateItem.setChoiceValues(['Today', 'Tomorrow']);
    dateItem.setRequired(true);
  
    var timeItem = form.addTimeItem();
    timeItem.setTitle('Delivery / Pick up Time');
    timeItem.setHelpText("Working Hours: 7:00AM~6:00PM");
    timeItem.setRequired(true);
  
    var pickItem = form.addListItem();
    pickItem.setTitle('Delivery / Pick up');
    pickItem.setChoiceValues(['Delivery', 'Pick up']);
    pickItem.setRequired(true);

    var paraItem = form.addParagraphTextItem();
    paraItem.setTitle('Leave us a message for special needs:');


}
