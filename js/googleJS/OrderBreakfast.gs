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
	var form = FormApp.create('Grace\'s Market Breakfast');

    // page 1
    var ItemTitle = ['#1 Lite Breakfast $1.55',
                     '#2 Businesmans Breakfast $1.95',
                     '#3 Hearty Breakfast $4.25',
                     '#4 Maine’s Favorite $4.75',
                     '#5 Country Breakfast $7.50',
                     '#6 Eggs Benedict $7.95',
                     '#7 Grace’s Favorite $7.95',
                     '#8 The Lumber Jack $8.95'];
    
    var ItemPrice = [1.55, 1.95, 4.25, 4.75, 7.50, 7.95, 7.95, 8.95];
    
    var ItemDescription = ['One egg and toast',
                           'Two eggs and toast',
                           'Two eggs with two pancakes or three French toast',
                           'Two eggs any style with potatoes',
                           'Three French toast or two pancakes with bacon, ham, sausage and coffee or tea',
                           'Two poached eggs, Canadian bacon, and Hollandaise set atop an English muffin',
                           'Two eggs, Two Pancake, Two Bacon Two Sausage Home Fries or Beans, Toast and Coffee or Tea',
                           'Two eggs, bacon, ham, and sausage ,with toast, home fries or beans ,two pancakes or two French toast and coffee or tea'];
    
    var listItem = [];
	for (var i = 0; i < ItemTitle.length; i++) {
      listItem[i] = createListItem(form, ItemTitle[i], ItemDescription[i]);
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
	timeItem.setHelpText("Working Hours: 7:00AM~3:00PM");
    timeItem.setRequired(true);
  
  	var pickItem = form.addListItem();
	pickItem.setTitle('Delivery / Pick up');
    pickItem.setChoiceValues(['Delivery', 'Pick up']);
    pickItem.setRequired(true);
	
	var paraItem = form.addParagraphTextItem();
	pickItem.setTitle('Leave us a message for special needs:');

}


