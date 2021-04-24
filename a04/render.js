/**
 * Course: COMP 426
 * Assignment: a04
 * Author: Chris Kong
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
   /*let card = document.createElement('div');
    card.innerHTML = `${hero.name}`;
    */
    let card = $('<div class=column></div>');
    card.attr('id',hero.id);
    card.css({'float': 'left', 'margin': '0 1.5%', 'width': '30%','padding': '30px'})
    card.addClass("is-one-third");
    card.append('<div class=card>');
    card.find('.card').css({'position': 'relative', 'display': 'inline-block', 'width': '100%', 'height': '100%', 'margin': 'auto'});

    card.find('.card').append('<div class=box>');
    card.find('.box').css({'background-color': hero.backgroundColor});
    card.find('.box').append('<figure class=image>');
    card.find('.image').css({'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto', 'height': '25%', 'width': '25%', 'border': '5px solid ' + hero.color, 'border-radius': '50%'});
    card.find('.image').addClass("is-128x128 ");
    card.find('.image').append('<img class=is-rounded src=' + hero.img + '>');
    card.find('.box').append('<h1 class=title>' + hero.name);
    card.find('h1').css('color', hero.color);

    
    card.find('.card').append('<div class=card-content>');
    card.find('.card-content').append('<h2 class=subtitle>"' + hero.subtitle +'"');
    card.find('h2').addClass("has-text-grey is-italic");
    card.find('.card-content').append('<p><span class=has-text-weight-semibold>Alter ego: </span>' + hero.first + " " + hero.last);
    card.find('.card-content').append('<p><span class=has-text-weight-semibold>First Appearance: </span>' + hero.firstSeen.getMonth() + '\/' + hero.firstSeen.getDate() + '\/19' + hero.firstSeen.getYear());
    card.find('.card-content').append('<div class=content>' + hero.description);
    
    card.find('.card-content').append('<button class=button>Edit</button>');
    card.find('.button').addClass('is-dark is-left');
    return card;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    let newCard = $('<div class=column></div>');
    newCard.attr('id',hero.id);
    newCard.css({'float': 'left', 'margin': '0 1.5%', 'width': '30%', 'padding': '30px'});
    newCard.addClass("is-one-third");
    newCard.append('<form>');
    newCard.find('form').append('<div class=card>');
    newCard.find('.card').css({'position': 'relative', 'display': 'inline-block', 'width': '100%', 'height': '100%', 'margin': 'auto'});
    newCard.find('.card').append('<div class=box>');
    newCard.find('.box').css('background-color', hero.backgroundColor);
    newCard.find('.box').append('<figure class=image>');
    newCard.find('.image').css({'display': 'block', 'margin-left': 'auto', 'margin-right': 'auto', 'height': '25%', 'width': '25%', 'border': '5px solid ' + hero.color, 'border-radius': '50%'});
    newCard.find('.image').addClass("is-128x128");
    newCard.find('.image').append('<img class=is-rounded src=' + hero.img + '>');
   
    newCard.find('.card').append('<div class=card-content>');
    newCard.find('.card-content').append('<div id = hname class=field>');
    newCard.find('#hname').append('<label class=label>Hero Name');
    newCard.find('#hname').after('<div id=hncontrol class=control>');
    newCard.find('#hncontrol').append('<input class=input type=text value="'+ hero.name +'">');

    newCard.find('.card-content').append('<div id = fname class=field>');
    newCard.find('#fname').append('<label  class=label>First Name');
    newCard.find('#fname').after('<div id=fncontrol class=control>');
    newCard.find('#fncontrol').append('<input class=input type=text value="'+ hero.first +'">');
    
    newCard.find('.card-content').append('<div id = lname class=field>');
    newCard.find('#lname').append('<label class=label>Last Name');
    newCard.find('#lname').after('<div id=lncontrol class=control>');
    newCard.find('#lncontrol').append('<input class=input type=text value="'+ hero.last +'">');

    newCard.find('.card-content').append('<div id = subname class=field>');
    newCard.find('#subname').append('<label class=label>Hero Name');
    newCard.find('#subname').after('<div id= subname-control class=control>');
    newCard.find('#subname-control').append('<input class=input type=text value="'+ hero.subtitle +'">');

    newCard.find('.card-content').append('<div id = date class=field>');
    newCard.find('#date').append('<label class=label> First Appearance');
    newCard.find('#date').after('<div id=datecontrol class=control>');
    newCard.find('#datecontrol').append('<input class=input type=text value="'+ hero.firstSeen.getMonth() + '\/' + hero.firstSeen.getDate() + '\/19' + hero.firstSeen.getYear() +'">');

    newCard.find('.card-content').append('<div id = descript class=field>');
    newCard.find('#descript').append('<label id = descript-txt class=label>Description');
    newCard.find('#descript-txt').append('<textarea class=textarea placeholder=10 lines of textarea rows=10>' + hero.description + '</textarea>');
    
    newCard.find('.card-content').append('<button id = save type=submit class=button>Save</button>');
    newCard.find('#save').addClass('is-dark');
    newCard.find('#save').css('margin-right', '10px');
    newCard.find('.card-content').append('<button id = exit class=button>Cancel</button>');
    newCard.find('#exit').addClass('is-dark');

    return newCard;
};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    $root.append("<div class=columns>");
    $(".columns").addClass("is-multiline");
    heroes.forEach(function(e){
        let $hero_card = renderHeroCard(e);
        $(".columns").append($hero_card);
    });
    // TODO: Append the hero cards to the $root element
    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    // TODO: Generate the hero edit form using renderHeroEditForm()
    let newHeroCard = renderHeroEditForm(randomHero);
    // TODO: Append the hero edit form to the $root element
    $('.columns').append(newHeroCard);
    $('body').css('background-color','#343D56');
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
