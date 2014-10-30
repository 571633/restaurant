function createListItem(form, title, description)
{
    var item = form.addListItem();
    item.setTitle(title);
    item.setHelpText(description);
    item.setChoiceValues(['0', '1', '2', '3', '4', '5']);
    return item;
}

function createForm() {
    // Create a new form, then add a checkbox question, a multiple choice question,
    // a page break, then a date question and a grid of questions.
    var form = FormApp.create('Grace\'s Market Dinner');

    var ItemTitle =  [
		'Fish and Chip (haddock) $8.95',
        'Baked haddock $8.95',
        'Steak Tip Dinner $8.95',
        'Chicken Fingers with French Fries $8.95',
        'Chicken Parmigan with Ziti $9.95',
        'Ziti with Meatballs $8.95',
        'Ziti with Sauce $6.95',
        'Chicken Wings with French Fries $8.95',
        'Buffalo Wings with French Fries $8.95',
        'Buffalo Tenders with French Fries $8.95',
        'Eggplant Parmigan with Ziti $8.95'];

    var ItemPrice = [8.95, 8.95, 8.95, 8.95, 9.95, 8.95, 6.95, 8.95, 8.95, 8.95, 8.95];
	var ItemDescription = ['', '', '', '', '', '', '', '', '', '', '']
   
	if (ItemTitle.length != ItemPrice.length || ItemTitle.length != ItemDescription.length){
		throw new Error("Item member numbers don't match");
	}

	//create item array
	var items = [];
	for(var i=0; i<ItemTitle.length; i++)
	{
		// ItemTitle[i] is used as key
		items[ItemTitle[i]] = { itemPrice: ItemPrice[i], 
								itemDescription: ItemDescription[i]};
	}

    var listItem = [];
    for (var i = 0; i < ItemTitle.length; i++) {
	  var key = ItemTitle[i];
      listItem[i] = createListItem(form, key, items[key].itemDescription);
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

    // Add another page because navigation has no effect on the last page.
    form.addPageBreakItem().setTitle('Choose Cheese and spreads');

    var cheeseItem = form.addListItem();
    cheeseItem.setTitle('Cheese');
    cheeseItem.setChoiceValues(['American', 'Swiss', 'Cheddar', 'Pepper Jack', 'Provolone']);
    
    var saladItem = form.addListItem();
    saladItem.setTitle('Salad Dressings');
    saladItem.setHelpText("All dinners are served with a side salad");
    saladItem.setChoiceValues(['Ranch', 'Blue Cheese', 'Greek', 'Caesar', 
                            'Italian', 'Creamy Italian', 'Balsamic Vinaigrette', 
                            'Honey Mustard']);

    var veggiesItem = form.addCheckboxItem();
    veggiesItem.setTitle('Veggies');
    veggiesItem.setChoiceValues(['lettuce', 'tomatoes', 'onions', 'pickles', 'red peppers', 
'green peppers', 'hots', 'banana peppers', 'peppercini', 'black olives']);

    var spreadItem = form.addListItem();
    spreadItem.setTitle('Spreads');
    spreadItem.setChoiceValues(['Mayo', 'Yellow Mustard', 'Brown Mustard', 'Oil', 
        'Honey Mustard', 'Ranch Dressing', 'Italian Dressing', 'Ketchup']);

    var paraItem = form.addParagraphTextItem();
    paraItem.setTitle('Leave us a message for special needs:');


}
