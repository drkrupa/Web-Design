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
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    let e = `<div id=${hero.id}><p style="color: ${hero.color}">${hero.name}</p>
            <img src=${hero.img}></img>
            <div style="background: ${hero.backgroundColor}"<p>Alter Ego: ${hero.first} ${hero.last}</p>
            <span>${hero.description}</span></div>
            <span>First Seen: ${hero.firstSeen}</span>
            <button type="button" class="editButton">Edit</button></div>`;

    $("button.editButton").on('click', handleEditButtonPress);
    e = $.parseHTML(e);
    return e;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    let e = `<form id=${hero.id}>
                Hero Name: <input type="text" id="name" value=${hero.name}>
                First Name: <input type="text" id="firstName" value=${hero.first}>
                Last Name: <input type="text" id="lastName" value=${hero.last}>
                Description: <textarea rows="5" cols="50" id="desc">${hero.description}</textarea>
                First Seen: <textarea rows="1" cols="100" id="date">${hero.firstSeen}</textarea>
                <button type="submit" class="submitButton">Save</button>
                <button type="button" class="cancelButton">Cancel</button>
            </form>`;
    e = $.parseHTML(e);
    return e;
}; 



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    let tar = event.target;
    let id = tar.parentNode.id, hero = heroicData[0];
    for (let i = 0; i < heroicData.length; i++) {
        if (heroicData[i].id == id) {
            hero = heroicData[i];
            break;
        }
    }
    let e = renderHeroEditForm(hero);
    $('#'+id).replaceWith(e);
    $("button.submitButton").on('click', handleEditFormSubmit);
    $("button.cancelButton").on('click', handleCancelButtonPress);
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    let tar = event.target;
    let id = tar.parentNode.id, hero = heroicData[0];
    for (let i = 0; i < heroicData.length; i++) {
        if (heroicData[i].id == id) {
            hero = heroicData[i];
            break;
        }
    }
    let e = renderHeroCard(hero);
    $('#'+id).replaceWith(e);
    $("button.editButton").on('click', handleEditButtonPress);
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    let tar = event.target;
    let id = tar.parentNode.id, index = 0;
    for (let i = 0; i < heroicData.length; i++) {
        if (heroicData[i].id == id) {
            index = i;
            break;
        }
    }
    let newName = $('#name').val();
    let newFirstName = $('#firstName').val();
    let newLastName = $('#lastName').val();
    let newDescription = $('#desc').val();
    let newDate = $('#date').val();
    newDate = new Date(newDate);
    newDate = newDate.toUTCString();
    newDate = new Date(newDate);
    //((new Date(newDate)).getTime() + Math.abs((new Date(newDate)).getTimezoneOffset()*60000))
    heroicData[index].name = newName;
    heroicData[index].first = newFirstName;
    heroicData[index].last = newLastName;
    heroicData[index].description = newDescription;
    heroicData[index].firstSeen = newDate;

    let e = renderHeroCard(heroicData[index]);
    $('#'+id).replaceWith(e);
    $("button.editButton").on('click', handleEditButtonPress);


};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part
    for (let i = 0; i < heroes.length; i++) {
        let e = renderHeroCard(heroes[i]);
        $root.append(e);
    }

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
