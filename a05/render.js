/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function (hero) {
    // TODO: Copy your code from a04 to render the hero card
    let card = $('<div class=column></div>');
    card.attr('id', hero.id + '_card');
    card.css({ 'float': 'left', 'margin': '0 1.5%', 'width': '30%', 'padding': '30px' })
    card.addClass("is-one-third");
    card.append('<div class=card>');
    card.find('.card').css({ 'position': 'relative', 'display': 'inline-block', 'width': '100%', 'height': '100%', 'margin': 'auto' });

    card.find('.card').append('<div class=box>');
    card.find('.box').css({ 'background-color': hero.backgroundColor });
    card.find('.box').append('<figure class=image>');
    card.find('.image').css({ 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto', 'height': '25%', 'width': '25%', 'border': '5px solid ' + hero.color, 'border-radius': '50%' });
    card.find('.image').addClass("is-128x128 ");
    card.find('.image').append('<img class=is-rounded src=' + hero.img + '>');
    card.find('.box').append('<h1 class=title>' + hero.name);
    card.find('h1').css('color', hero.color);


    card.find('.card').append('<div class=card-content>');
    card.find('.card-content').append('<h2 class=subtitle>"' + hero.subtitle + '"');
    card.find('h2').addClass("has-text-grey is-italic");
    card.find('.card-content').append('<p><span class=has-text-weight-semibold>Alter ego: </span>' + hero.first + " " + hero.last);
    card.find('.card-content').append('<p><span class=has-text-weight-semibold>First Appearance: </span>' + hero.firstSeen.getMonth() + '\/' + hero.firstSeen.getFullYear());
    card.find('.card-content').append('<div class=content>' + hero.description);

    card.find('.card-content').append('<button id = edit class=button>Edit</button>');
    card.find('button').attr('id', hero.id + '_edit');
    card.find('.button').addClass('is-dark is-left');
    return card;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function (hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    let newCard = $('<div class=column></div>');
    newCard.attr('id', hero.id + '_form');
    newCard.css({ 'float': 'left', 'margin': '0 1.5%', 'width': '30%', 'padding': '30px' });
    newCard.addClass("is-one-third");
    newCard.append('<form>');
    newCard.find('form').append('<div class=card>');
    newCard.find('.card').css({ 'position': 'relative', 'display': 'inline-block', 'width': '100%', 'height': '100%', 'margin': 'auto' });
    newCard.find('.card').append('<div class=box>');
    newCard.find('.box').css('background-color', hero.backgroundColor);
    newCard.find('.box').append('<figure class=image>');
    newCard.find('.image').css({ 'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto', 'height': '25%', 'width': '25%', 'border': '5px solid ' + hero.color, 'border-radius': '50%' });
    newCard.find('.image').addClass("is-128x128");
    newCard.find('.image').append('<img class=is-rounded src=' + hero.img + '>');

    newCard.find('.card').append('<div class=card-content>');
    newCard.find('.card-content').append('<div id = hname class=field>');
    newCard.find('#hname').append('<label class=label>Hero Name');
    newCard.find('#hname').after('<div id=hncontrol class=control>');
    newCard.find('#hncontrol').append('<input id=hnametxt class=input type=text value="' + hero.name + '">');
    newCard.find('#hnametxt').attr('id', hero.id + '_hnametxt');

    newCard.find('.card-content').append('<div id = fname class=field>');
    newCard.find('#fname').append('<label  class=label>First Name');
    newCard.find('#fname').after('<div id=fncontrol class=control>');
    newCard.find('#fncontrol').append('<input id = fnametxt class=input type=text value="' + hero.first + '">');
    newCard.find('#fnametxt').attr('id', hero.id + '_fnametxt');

    newCard.find('.card-content').append('<div id = lname class=field>');
    newCard.find('#lname').append('<label class=label>Last Name');
    newCard.find('#lname').after('<div id=lncontrol class=control>');
    newCard.find('#lncontrol').append('<input id = lnametxt class=input type=text value="' + hero.last + '">');
    newCard.find('#lnametxt').attr('id', hero.id + '_lnametxt');

    newCard.find('.card-content').append('<div id = subname class=field>');
    newCard.find('#subname').append('<label class=label>Hero Name');
    newCard.find('#subname').after('<div id= subname-control class=control>');
    newCard.find('#subname-control').append('<input id = subnametxt class=input type=text value="' + hero.subtitle + '">');
    newCard.find('#subnametxt').attr('id', hero.id + '_subnametxt');

    newCard.find('.card-content').append('<div id = date class=field>');
    newCard.find('#date').append('<label class=label> First Appearance');
    newCard.find('#date').after('<div id=datecontrol class=control>');
    newCard.find('#datecontrol').append('<input id=datetxt class=input type=text value="' + hero.firstSeen.getMonth() + '\/' + hero.firstSeen.getFullYear() + '">');
    newCard.find('#datetxt').attr('id', hero.id + '_datetxt');

    newCard.find('.card-content').append('<div id = descript class=field>');
    newCard.find('#descript').append('<label id = descript-txt class=label>Description');
    newCard.find('#descript-txt').append('<textarea id=descripttxt class=textarea placeholder=10 lines of textarea rows=10>' + hero.description + '</textarea>');
    newCard.find('#descripttxt').attr('id', hero.id + '_descripttxt');

    newCard.find('.card-content').append('<button type=submit class=button>Save</button>');
    newCard.find('button').attr('id', hero.id + '_save');
    newCard.find('#' + hero.id + '_save').addClass('is-dark');
    newCard.find('#' + hero.id + '_save').css('margin-right', '10px');
    newCard.find('.card-content').append('<button id = exit class=button>Cancel</button>');
    newCard.find('#exit').attr('id', hero.id + '_exit');
    newCard.find('#' + hero.id + '_exit').addClass('is-dark');

    return newCard;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function (event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    let id = parseInt(event.target.id.split("_edit")[0]);
    let hero = heroicData.find(h => h.id === id);
    $('#' + id + '_card').replaceWith(renderHeroEditForm(hero));

    $('*[id*=save]').on('click', handleEditFormSubmit);
    $('*[id*=exit]').on('click', handleCancelButtonPress);
};

/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function (event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    let id = parseInt(event.target.id.split("_exit")[0]);
    let hero = heroicData.find(h => h.id === id);
    $('#' + id + '_form').replaceWith(renderHeroCard(hero));
    $('*[id*=edit]').on('click', handleEditButtonPress);
};

/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function (event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead

    let id = parseInt(event.target.id.split("_save")[0]);

    //let form = document.getElementById(id+'_form');
    //let elements = form.elements;

    $("#" + id + "_hnametxt").on('input', function () {
        $("#" + id + "_hnametxt").attr('value', $(this).val());
    });

    $("#" + id + "_fnametxt").on('input', function () {
        $("#" + id + "_fnametxt").attr('value', $(this).val());
    });

    $("#" + id + "_lnametxt").on('input', function () {
        $("#" + id + "_lnametxt").attr('value', $(this).val());
    });

    $("#" + id + "_subnametxt").on('input', function () {
        $("#" + id + "_subnametxt").attr('value', $(this).val());
    });

    $("#" + id + "_descripttxt").on('input', function () {
        $("#" + id + "_descripttxt").attr('value', $(this).val());
    });

    $("#" + id + "_datetxt").on('input', function () {
        $("#" + id + "_datetxt").attr('value', $(this).val());
    });


    let hero = heroicData.find(h => h.id === id);

    if (!(typeof $("#" + id + "_hnametxt").val() === 'undefined')) {
        hero.name = $("#" + id + "_hnametxt").val();
        hero.first = $("#" + id + "_fnametxt").val();
        hero.last = $("#" + id + "_lnametxt").val();
        hero.subtitle = $("#" + id + "_subnametxt").val();
        hero.description = $("#" + id + "_descripttxt").val();
        let dateData = $('#' + id + '_datetxt').val().split('\/');

        hero.firstSeen = new Date(dateData[1], dateData[0]);;
    }

    $('#' + id + '_form').replaceWith(renderHeroCard(hero));

    $('*[id*=edit]').on('click', handleEditButtonPress);
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    $root.append("<div class=columns>");
    $(".columns").addClass("is-multiline");
    heroes.forEach(function (e) {
        let $hero_card = renderHeroCard(e);
        $(".columns").append($hero_card);
    });
    $('body').css('background-color', '#343D56');
    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    $('*[id*=edit]').on('click', handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form

    $('*[id*=save]').on('click', handleEditFormSubmit);

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button

    $('*[id*=exit]').on('click', handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);
});
