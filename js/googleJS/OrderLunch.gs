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


	var item = ["Chicken Tenders $6.95",
		"Mozzarella Sticks $6.95",
		"Buffalo Tenders $6.95",
		"Small Onion Rings $2.50",
		"Large Onion Rings $4.50",
		"Chicken Wings $6.95",
		"Small Size French Fries $2.50",
		"Large Size French Fries $4.50",
		"Buffalo/BBQ Wings $6.95",
		"Side Salad $2.50",
		"Chipotle Wings $6.95",
		
		"Cold Sandwiches - Bologna $4.95",
		"Cold Sandwiches - Ham+cheese $6.00",
		"Cold Sandwiches - Turkey $6.50",
		"Cold Sandwiches - Roast beef club $6.50",
		"Cold Sandwiches - Tuna $6.50",
		"Cold Sandwiches - Chicken Salad (dried cranberries) $6.50",
		"Cold Sandwiches - BLT $5.95",
		"Cold Sandwiches - Italian $6.95",
		"Cold Sandwiches - Vegetarian $6.95",
		
		"Hot Sandwiches - Hot Dog $2.50",
		"Hot Sandwiches - Grilled Cheese $3.50",
		"Hot Sandwiches - Eggplant $6.50",
		"Hot Sandwiches - Chicken Parmigiana $6.50",
		"Hot Sandwiches - Veal Parmigiana $6.50",
		"Hot Sandwiches - Grilled Chicken sub $6.50",
		"Hot Sandwiches - Grill Chicken Chipotle w/Jalepeno Jack $7.95",
		"Hot Sandwiches - Eggplant Parmesan $6.50",
		"Hot Sandwiches - Buffalo Chicken $6.50",
		"Hot Sandwiches - Cheeseburger $6.95",
		"Hot Sandwiches - Chicken finger $6.95",
		"Hot Sandwiches - Meatball $6.50",
		"Hot Sandwiches - Steak Tip and Cheese $7.50"];

    var itemPrice = [6.95, 6.95, 6.95, 2.50, 4.50, 6.95, 2.50, 4.50, 6.95, 2.50, 6.95,
					4.95, 6.00, 6.50, 6.50, 6.50, 6.50, 5.95, 6.95, 6.95,
					2.50, 3.50, 6.50, 6.50, 6.50, 6.50, 7.95, 6.50, 6.50, 6.95, 6.95, 6.50, 7.50];
	
	if (item.length != itemPrice.length){
		throw new Error("Item member numbers don't match");
	}

	//create item array
    var dinnerListItem = [];
    for (var i = 0; i < item.length; i++) {
      dinnerListItem[i] = createListItem(form, item[i], "");
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
