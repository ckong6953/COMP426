/**
 * Course: COMP 426
 * Assignment: a09
 * Author: <Christopher Kong>
 *
 * This script is to render Twitter-like application
 */

// This creates the banner for the website.
// returns a HTML literal
export function createHero() {
    const banner = `
    <section class="hero is-medium" id = "banner">
        <div class="hero-body">
            <p class="title has-text-white">
                <span class="icon">
                    <i class="fab fa-twitter"></i>
                </span>
                COMP 426 Twitter
            </p>
            <p class="subtitle has-text-white">
            "Imitation is the sincerest form of flattery..." ~ Oscar Wilde
            </p>
        </div>
    </section>`;
    return banner;
}

export function createWarning() {
    let warningText = `<div class="notification is-danger" id="warning">
        <button class="delete"></button>
        <strong>WARNING:</strong> Although you can make a tweet, retweet, reply, and edit a tweet all at once.
        <strong>ONLY ONE</strong> form will be published while the work on all others will not be saved. 
    </div>`;
    return warningText;
}
// This creates the footer for the website.
// returns a HTML literal 
export function createFooter() {
    const footer = `
    <div id="tweet-container">
    </div>
    <footer class="footer">
        <div class="content has-text-centered has-text-white">
            <p>
                Assignment A09 for COMP 426 Spring 2021
            </p>
        </div>
    </footer>`;
    return footer;
}

// This creates the box at the top of the tweets that prompts the user
// to post a tweet.
// returns a HTML literal.
export function createTweetEditor() {
    let editCard = `
    <div class="card tweet" id="insert-area">
        <header class="card-header">
            <p>Share Something!</p>
        </header>
        <div class="card-content>
            <div class="content" id="text-content">
                <button class="button is-dark" id="create-tweet">
                    Create New Tweet
                </button>
            </div>
        </div>
    </div>`;
    return editCard;
}

// Once the user has pressed the "Create New Tweet" button
// This will render the edit page. 
export function createTweet() {
    let createCard = `
    <div class="card tweet" id="insert-area">
        <header class="card-header">
            <p>Create a Tweet!</p>
        </header>
        <div class="card-content" id="create-tweet-box">
            <div class="content">
                <textarea class="textarea" id="create-tweet-textarea" placeholder="What's on your mind?"></textarea>
                <progress class="progress" id ="create-tweet-bar" value="0" max="281">15%</progress>
                <button class="button is-danger" id="post-tweet" title="Disabled button" disabled>Type something!</button>
                <button class="button is-dark" id="cancel-post">Cancel</button>
            </div>
        </div>
    </div>`;
    $('#insert-area').replaceWith(createCard);
}

// Used for the user creating a new tweet as it measures the character count
// of their new tweet to be greater than 0 but less than or equal to 280 characters. 
export function measureCreateForm() {
    let measureBar = $('#create-tweet-bar');
    measureBar.val($("#create-tweet-textarea").val().length);
    if (measureBar.val() == 281) {
        measureBar.addClass("is-danger");
        $("#post-tweet").replaceWith('<button class="button is-danger" id="post-tweet" title="Disabled button" disabled>Too long!</button>')
    }
    else if (measureBar.val() == 0) {
        $("#post-tweet").replaceWith(`<button class="button is-danger" id="post-tweet" title="Disabled button" disabled>Type something!</button>`);
    }
    else if (measureBar.val() < 281) {
        measureBar.removeClass("is-danger")
        $("#post-tweet").replaceWith(`<button class="button is-success" id="post-tweet">Post!</button>`);
    }
}


// REQUIRED 2.1 endpoint for indexing tweets. 
export async function indexTweets() {
    const result = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });

    return result.data;
}

// REQUIRED 2.2
// This will post the tweet from the edit field rendered
// from the createTweet() field.
export async function postTweet() {
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            body: $("#create-tweet-textarea").val(),
        },
    });

    loadTweets();
    $('#insert-area').replaceWith(createTweetEditor());
    return result;
}

// REQUIRED 2.3
// This will read in a tweet and get the specific details about it
export async function readTweet(tweet) {
    let readURL = `https://comp426-1fa20.cs.unc.edu/a09/tweets/` + tweet;
    const result = await axios({
        method: 'get',
        url: readURL,
        withCredentials: true,
    });

    return result;
}

// REQUIRED 2.4
// update tweet once it is ready
export async function updateTweet(event) {

    let editUrl = 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + $(event.target).parents('.edit-tweet').attr('id');
    let editBody = $(event.target).parents('.content').find('#edit-tweet-textarea').val();
    const result = await axios({
        method: 'put',
        url: editUrl,
        withCredentials: true,
        data: {
            body: editBody,
        },
    });

    // $('.edit-tweet').replaceWith(replaceEditForm(result.data));
    loadTweets();
    return result;
}

// REQUIRED 2.5
// this will destroy a tweet made by the user.
export async function destroyTweet(event) {
    let destroyLink = 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + $(event.target).parents('.tweet').attr('id');
    const result = await axios({
        method: 'delete',
        url: destroyLink,
        withCredentials: true,
    });

    loadTweets();
    return result;
}

//REQUIRED 2.6 
// handling the like
export async function likeTweet(event) {
    let likeUrl = 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + $(event.target).parents(".tweet").attr('id') + '/like';

    const result = await axios({
        method: 'put',
        url: likeUrl,
        withCredentials: true,
    });


    $(event.target).parents(".tweet").find("#like-count").text(parseInt($(event.target).parents(".tweet").find('#like-count').text()) + 1);
    $(event.target).parents(".tweet").find("#like-button").replaceWith(
        `<button class="button" id="unlike-button">
            <span class="icon-text">
                <span class="icon has-text-danger">
                    <i class="fas fa-heart"></i>
                </span>
                <span>Unlike</span>
            </span>
        </button>`);
    return result;
}

//REQUIRED 2.7
// handling the unlike
export async function unlikeTweet(event) {
    let unlikeUrl = 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + $(event.target).parents(".tweet").attr('id') + '/unlike';
    const result = await axios({
        method: 'put',
        url: unlikeUrl,
        withCredentials: true,
    });

    $(event.target).parents(".tweet").find("#like-count").text(parseInt($(event.target).parents(".tweet").find('#like-count').text()) - 1);
    $(event.target).parents(".tweet").find("#unlike-button").replaceWith(
        `<button class="button" id="like-button">
         <span class="icon-text">
             <span class="icon">
                 <i class="far fa-heart"></i>
             </span>
             <span>Like</span>
         </span>
    </button>`);
    return result;
}


// REQUIRED 4.1
// This function is utilized to send the reply to the backend and post it on the page.
export async function replyTweet(event) {
    let parentID = $(event.target).parents(".tweet").attr("id");
    let replyBody = $(event.target).parents("#reply-area").find("#create-reply-textarea").val();

    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "reply",
            "parent": parentID,
            "body": replyBody,
        },
    });

    $(event.target).parents(".tweet").find("#stop-reply-footer-button").attr("id","reply-footer-button");
    $(event.target).parents(".tweet").find("#reply-count").text(parseInt($(event.target).parents(".tweet").find("#reply-count").text()) + 1);
    $(event.target).parents('#reply-area').remove();
    loadTweets();

    return result;
}

// The following functions are those that are related to rendering a reply.
export function renderReplyEditor(event) {
    event.preventDefault();
    let createReply =
        `<div class="card reply" id="reply-area">
        <header class="card-header">
            <p>Replying to ${$(event.target).parents(".tweet").find("#author-info").text()}</p>
        </header>
        <div class="card-content" id="create-tweet-box">
            <div class="content">
                <textarea class="textarea" id="create-reply-textarea" placeholder="What's on your mind?"></textarea>
                <progress class="progress" id ="create-reply-bar" value="0" max="281">15%</progress>
                <button class="button is-danger" id="post-reply" title="Disabled button" disabled>Type something!</button>
                <button class="button is-dark" id="cancel-reply">Cancel</button>
            </div>
        </div>
    </div>`;

    $(event.target).parents(".tweet").append(createReply);
    $(event.target).parents(".tweet").find("#reply-footer-button").attr("id","stop-reply-footer-button");
}

// Created to measure the number of characters remaining for the reply being formed.
// Replies must be within 0 to 280 characters inclusive. 
// Otherwise the user will not be able to post. 
export function measureReplyForm() {
    let measureBar = $('#create-reply-bar');
    measureBar.val($("#create-reply-textarea").val().length);
    if (measureBar.val() == 281) {
        measureBar.addClass("is-danger");
        $("#post-reply").replaceWith('<button class="button is-danger" id="post-reply" title="Disabled button" disabled>Too long!</button>')
    }
    else if (measureBar.val() == 0) {
        $("#post-reply").replaceWith(`<button class="button is-danger" id="post-reply" title="Disabled button" disabled>Type something!</button>`);
    }
    else if (measureBar.val() < 281) {
        measureBar.removeClass("is-danger")
        $("#post-reply").replaceWith(`<button class="button is-success" id="post-reply">Post Reply!</button>`);
    }
}

export function cancelReply(event) {
    $(event.target).parents(".tweet").find("#stop-reply-footer-button").attr("id","reply-footer-button");
    $(event.target).parents('#reply-area').remove();
}

// REQUIRED 4. 2
// This function is utilized to send the retweet and post it on the page. 
export async function retweetTweet(event) {
    let parentID = $(event.target).parents(".tweet").attr("id");
    let retweetBody = $(event.target).parents("#retweet-area").find("#create-retweet-textarea").val();

    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "retweet",
            "parent": parentID,
            "body": retweetBody,
        },
    });

    $(event.target).parents('.tweet').find('#stop-retweet-footer-button').attr('id','retweet-footer-button');
    $(event.target).parents(".tweet").find("#retweet-count").text(parseInt($(event.target).parents(".tweet").find("#retweet-count").text()) + 1);
    $(event.target).parents('#retweet-area').remove();
    loadTweets();
    return result;
}

// When clicking the retweet button the retweet edit
// form will pop up. 
export function renderRetweetEditor(event) {
    event.preventDefault();
    let createRetweet =
        `<div class="card retweet" id="retweet-area">
        <header class="card-header">
            <p>Retweeting ${$(event.target).parents(".tweet").find("#author-info").text()}</p>
        </header>
        <div class="card-content" id="create-tweet-box">
            <div class="content">
                <textarea class="textarea" id="create-retweet-textarea" placeholder="What's on your mind?"></textarea>
                <progress class="progress" id ="create-retweet-bar" value="0" max="281">15%</progress>
                <button class="button is-danger" id="post-retweet" title="Disabled button" disabled>Type something!</button>
                <button class="button is-dark" id="cancel-retweet">Cancel</button>
            </div>
        </div>
    </div>`;
    $(event.target).parents(".tweet").append(createRetweet);
    $(event.target).parents('.tweet').find('#retweet-footer-button').attr('id','stop-retweet-footer-button');
}

// Measures the amount of characters left in the retweet box.
// Message body must be 0 to 280 characters in length. 
export function measureRetweetForm() {
    let measureBar = $('#create-retweet-bar');
    measureBar.val($("#create-retweet-textarea").val().length);
    if (measureBar.val() == 281) {
        measureBar.addClass("is-danger");
        $("#post-retweet").replaceWith('<button class="button is-danger" id="post-retweet" title="Disabled button" disabled>Too long!</button>')
    }
    else if (measureBar.val() == 0) {
        $("#post-retweet").replaceWith(`<button class="button is-danger" id="post-retweet" title="Disabled button" disabled>Type something!</button>`);
    }
    else if (measureBar.val() < 281) {
        measureBar.removeClass("is-danger")
        $("#post-retweet").replaceWith(`<button class="button is-success" id="post-retweet">Post Retweet!</button>`);
    }
}

export function cancelRetweet(event) {
    $(event.target).parents('.tweet').find('#stop-retweet-footer-button').attr('id','retweet-footer-button');
    $(event.target).parents('#retweet-area').remove();
}


// This is function that processes the user pressing the edit button on their own tweet
// This takes in parameters corresponding to the click event and will replace the tweet
// card with the new text rendered allowing the user to edit their card.
export function toggleEditTweet(event) {
    let editForm =
        `<div class="card edit-tweet" id="${$(event.target).parents(".tweet").attr('id')}">
        <header class="card-header">
            <span class="icon">
                <i class="fas fa-user"></i>
            </span>
            <p id="author-info"> ${$(event.target).parents(".tweet").find('#author-info').text()} </p>
        </header>
        <div class="card-content" id="create-tweet-box">
            <div class="content">
                <textarea class="textarea" id="edit-tweet-textarea">${$.trim($(event.target).parents("#tweet-content-area").find("#tweet-text").text())}</textarea>
                <progress class="progress" id ="edit-tweet-bar" value="${$.trim($(event.target).parents("#tweet-content-area").find("#tweet-text").text()).length}" max="281">15%</progress>
                <button class="button is-success" id="edit-tweet">Post Edit!</button>
                <button class="button is-dark" id="cancel-edit">Cancel</button>
            </div>
        </div>
    </div>`;
    $(event.target).parents('.tweet').replaceWith(editForm);

}

// Taking in a tweet as a parameter, this will get the data from the original tweet
// to render in an updated, edited card that the user provided.
// Used in conjuction with the function toggleEditTweet().
export function replaceEditForm(tweet) {
    let replaceTweet = `
    <div class="card tweet" id="${tweet.id}">
        <header class="card-header">
            <span class="icon">
                <i class="fas fa-user"></i>
            </span>
            <p id="author-info">${tweet.author}</p>
        </header>
        <div class="card-content" id="tweet-content-area">
            <div class="content" id="tweet-text">
                ${tweet.body}
            </div>`;
                if (tweet.type === "retweet") {
                    if (tweet.parent == undefined){
                        replaceTweet += `
                        <div class="card retweet-parent-body" id="null-id-${tweet.id}">
                                <header class="card-header">
                                    <p id="retweet-parent">Retweet</p>
                                </header>
                                <div class="card-content" id="tweet-content-area">
                                    <div class="content" id="retweet-text">
                                        <p> Original tweet is unavailable :( </p>`;
                    }
                    else {
                        replaceTweet += `
                        <div class="card retweet-parent-body" id="${tweet.parent.id}">
                                <header class="card-header">
                                    <p id="retweet-parent">Retweet</p>
                                </header>
                                <div class="card-content" id="tweet-content-area">
                                    <div class="content" id="retweet-text">
                                        <p><strong>@${tweet.parent.author}</strong>: ${tweet.parent.body} </p>`
                    }
                    replaceTweet += `
                                    </div>
                                </div>
                        </div>`;
                }    
            replaceTweet += `<button class="button" id="edit-button">
                <span class="icon-text">
                    <span class="icon">
                        <i class="far fa-edit"></i>
                    </span>
                    <span>Edit</span>
                </span>
            </button>
            <button class="button" id="delete-button">
                <span class="icon-text">
                    <span class="icon">
                        <i class="fas fa-trash-alt"></i>
                    </span>
                    <span>Delete</span>
                </span>
            </button>
            <table class="table" id="icon-count">
                <tbody>
                    <tr>
                        <td>
                            <span class="icon">
                                <i class="fas fa-heart"></i>
                            </span>
                            <span id="like-count">${tweet.likeCount}</span>
                        </td>
                        <td>
                            <span class="icon">
                                <i class="fas fa-retweet"></i>
                            </span>
                            <span id="retweet-count">${tweet.retweetCount}</span>
                        </td>
                        <td>
                            <span class="icon">
                                <i class="fas fa-reply"></i>
                            </span>
                            <span id="reply-count">${tweet.replyCount}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item" id="retweet-footer-button">
                    <span class="icon">
                        <i class="fas fa-retweet"></i>
                    </span>
                    Retweet
                </a>
                <a href="#" class="card-footer-item" id="reply-footer-button">
                    <span class="icon">
                        <i class="fas fa-reply"></i>
                    </span>
                    Reply
                </a>
            </footer>
        </div>
    </div>`;

    return replaceTweet;
}

// This is a function that if the user decides to cancel their current new tweet; 
// it will instead repalce the current edit form with the initial edit form
// rendered from createTweetEditor().
export function cancelPost() {
    $("#insert-area").replaceWith(createTweetEditor());
}

// This is a funciton that if the user decides to cancel their current edit of their previous tweet.
// it will instead replaced the current edit form with the original tweet. 
export function cancelEdit() {
    loadTweets();
}

// This is a helper function for the edit progress bar that measures the number of characters
// that the user has inputed already. If it is more than 280 or equal to 0 characters, the user 
// will not be allowed to post this. 
export function measureEditForm() {
    let measureBar = $('#edit-tweet-bar');
    measureBar.val($("#edit-tweet-textarea").val().length);
    if (measureBar.val() == 281) {
        measureBar.addClass("is-danger");
        $("#edit-tweet").replaceWith('<button class="button is-danger" id="edit-tweet" title="Disabled button" disabled>Too long!</button>')
    }
    else if (measureBar.val() == 0) {
        $("#edit-tweet").replaceWith(`<button class="button is-danger" id="edit-tweet" title="Disabled button" disabled>Type something!</button>`);
    }
    else if (measureBar.val() < 281) {
        measureBar.removeClass("is-danger")
        $("#edit-tweet").replaceWith(`<button class="button is-success" id="edit-tweet">Save Edit!</button>`);
    }
}

//  This function is to handle the event when the user clicks the "Show Replies" button
export async function renderReplies(event){
    const tweet = await readTweet($(event.target).parents('.tweet').attr("id"));
    const replies = tweet.data.replies;
    let repliesUI = 
    `<div class="card tweet replies" id="all-replies">
        <header class="card-header">
            <p id="reply-header">Replies:</p>
        </header>
        <div class="card-content">
                <div class="content">`;
    for (let i = 0; i < replies.length; i++){
        repliesUI += `
        <div class="card">
            <div class="card-content" id="replies-text">
                <div class="content">
                    <p><strong>@${replies[i].author}</strong>: ${replies[i].body}</p>
                </div>
            </div>
        </div>`
    }
    repliesUI +=
    `</div>
        </div>
            </div>`;
    $(event.target).parents('.tweet').append(repliesUI);
    $(event.target).parents('.tweet').find('#replies-button').replaceWith(
        `<button class="button is-dark" id="hide-replies-button">
            <span class="icon-text">
                <span class="icon">
                    <i class="fas fa-list-alt"></i>
                </span>
                <span>Hide Replies</span>
            </span>
        </button>`
    );
}

// Toggling the "Hide Replies" button to toggle the view of the replies. 
export function destroyReplies(event){
    $(event.target).parents(".tweet").find(".replies").remove();
    $(event.target).parents(".tweet").find("#hide-replies-button").replaceWith(`
        <button class="button" id="replies-button">
            <span class="icon-text">
                <span class="icon">
                    <i class="far fa-list-alt"></i>
                </span>
                <span>Show Replies</span>
            </span>
        </button>
    `);
}

// VERY IMPORTANT
// this is a function that will render in the first 50 tweets from the backend.
// There are multiple checkpoints:
// 1. It will check if the tweet is the user, if so it will render it edit and delete buttons
//    If it is not the user's it will render a like button instead.
// 2. It will render various icons to display the like, reply, and retweet count.
// At the end fo the function, it will append this to the body of the HTML file
// and it will render in the footer. 
export async function loadTweets() {
    $('#root').find("#insert-area").replaceWith(createTweetEditor());
    let tweets = '';
    let twitterInfo = await indexTweets();
    tweets += `<div id=tweet-container>`;
    for (let i = 0; i < twitterInfo.length; i++) {
        tweets +=
            `<div class="card tweet" id="${twitterInfo[i].id}">
                <header class="card-header">
                    <span class="icon">
                        <i class="fas fa-user"></i>
                    </span>
                    <p id="author-info">${twitterInfo[i].author}</p>`;
                    if (twitterInfo[i].replyCount > 0){
                        tweets+=    
                        `<button class="button" id="replies-button">
                            <span class="icon-text">
                                <span class="icon">
                                    <i class="far fa-list-alt"></i>
                                </span>
                                <span>Show Replies</span>
                            </span>
                        </button>`;
                    }
                tweets += `</header>
                <div class="card-content" id="tweet-content-area">
                    <div class="content" id="tweet-text">
                        ${twitterInfo[i].body}
                    </div>`;
        if (twitterInfo[i].type === "retweet") {
            if (twitterInfo[i].parent == undefined){
                tweets += `
                <div class="card retweet-parent-body" id="null-id-${twitterInfo[i].id}">
                        <header class="card-header">
                            <p id="retweet-parent">Retweet</p>
                        </header>
                        <div class="card-content" id="tweet-content-area">
                            <div class="content" id="retweet-text">
                                <p> Original tweet has been deleted </p>`;
            }
            else {
                tweets += `
                <div class="card retweet-parent-body" id="${twitterInfo[i].parent.id}">
                        <header class="card-header">
                            <p id="retweet-parent">Retweet</p>
                        </header>
                        <div class="card-content" id="tweet-content-area">
                            <div class="content" id="retweet-text">
                                <p><strong>@${twitterInfo[i].parent.author}</strong>: ${twitterInfo[i].parent.body} </p>`
            }
            tweets += `
                            </div>
                        </div>
                </div>`;
        }
        if (twitterInfo[i].isMine) {
            tweets +=
                `   <button class="button" id="edit-button">
                        <span class="icon-text">
                            <span class="icon">
                                <i class="far fa-edit"></i>
                            </span>
                            <span>Edit</span>
                        </span>
                    </button>
                    <button class="button" id="delete-button">
                        <span class="icon-text">
                            <span class="icon">
                                <i class="fas fa-trash-alt"></i>
                            </span>
                            <span>Delete</span>
                        </span>
                    </button>`;
        }
        else {
            if (twitterInfo[i].isLiked) {
                tweets +=
                    `<button class="button" id="unlike-button">
                    <span class="icon-text">
                        <span class="icon has-text-danger">
                            <i class="fas fa-heart"></i>
                        </span>
                        <span>Unlike</span>
                    </span>
                </button>`;
            }
            else {
                tweets +=
                    `<button class="button" id="like-button">
                            <span class="icon-text">
                                <span class="icon">
                                    <i class="far fa-heart"></i>
                                </span>
                                <span>Like</span>
                            </span>
                        </button>`;
            }
        }
        tweets +=
            `<table class="table" id="icon-count">
            <tbody>
                <tr>
                    <td>
                        <span class="icon">
                            <i class="fas fa-heart"></i>
                        </span>
                        <span id="like-count">${twitterInfo[i].likeCount}</span>
                    </td>
                    <td>
                        <span class="icon">
                            <i class="fas fa-retweet"></i>
                        </span>
                        <span id="retweet-count">${twitterInfo[i].retweetCount}</span>
                    </td>
                    <td>
                        <span class="icon">
                            <i class="fas fa-reply"></i>
                        </span>
                        <span id="reply-count">${twitterInfo[i].replyCount}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
            <footer class="card-footer">
            <a href="#" class="card-footer-item" id="retweet-footer-button">
                <span class="icon">
                    <i class="fas fa-retweet"></i>
                </span>
                Retweet
            </a>
            <a href="#" class="card-footer-item" id="reply-footer-button">
                <span class="icon">
                    <i class="fas fa-reply"></i>
                </span>
                Reply
            </a>
        </footer>
        </div>`;
    }
    tweets += `</div>`;
    $('#tweet-container').replaceWith(tweets);

    // const $root = $('#root');
    // // $root.on("click", "#delete-button", destroyTweet);
    // // $root.on("click", "#create-tweet", createTweet);
    // $root.on('input', "#create-tweet-textarea", measureCreateForm);
    // $root.on("click", "#post-tweet", postTweet);
    // $root.on('input', "#edit-tweet-textarea", measureEditForm);
    // // $root.on("click", "#edit-tweet", updateTweet);
    // $root.on("click", "#edit-button", toggleEditTweet);
    // // $root.on("click", "#like-button", likeTweet);
    // // $root.on("click", "#unlike-button", unlikeTweet);
    // $root.on("click", "#cancel-post", cancelPost);
    // $root.on("click", "#cancel-edit", cancelEdit);
    // // if(!($('#reply-area').length)){
    // //     $root.on("click", "#reply-footer-button", renderReplyEditor);
    // // }
    // $root.on("click", "#stop-reply-footer-button", function(event){
    //     event.preventDefault();
    // })
    // $root.on('input', "#create-reply-textarea", measureReplyForm);
    // $root.on('click', "#post-reply", replyTweet)
    // $root.on("click", "#cancel-reply", cancelReply);
    // // if(!($('#retweet-area').length)){
    // //     $root.on("click", "#retweet-footer-button", renderRetweetEditor);
    // // }
    // $root.on("click", "#stop-retweet-footer-button", function(event){
    //     event.preventDefault();
    // })
    // $root.on("input", "#create-retweet-textarea", measureRetweetForm)
    // $root.on("click", "#post-retweet", retweetTweet);
    // $root.on("click", "#cancel-retweet", cancelRetweet);
    // $root.on("click","#replies-button",renderReplies);
    // $root.on("click", "#hide-replies-button",destroyReplies);
    // $root.on("click","#warning",function(){
    //     $root.find('#warning').remove();
    // });
}

//renders the page in terms of getting everything ready and presentable
// Note: it utilies the loadTweets() as well as applying various
// event listeners for the different interactiosn the user can have. 
export function renderTwitter() {
    let $root = $('#root');
    $root.append(createHero());
    $root.append(createWarning());
    $root.append(createTweetEditor());
    $root.append(createFooter());
    loadTweets();
    $root.on("click", "#delete-button", destroyTweet);
    $root.on("click", "#create-tweet", createTweet);
    $root.on("click", "#edit-tweet", updateTweet);
    $root.on("click", "#like-button", likeTweet);
    $root.on("click", "#unlike-button", unlikeTweet);
    $root.on("click", "#reply-footer-button", renderReplyEditor);
    $root.on("click", "#retweet-footer-button", renderRetweetEditor);
    // $root.on("click", "#delete-button", destroyTweet);
    // $root.on("click", "#create-tweet", createTweet);
    $root.on('input', "#create-tweet-textarea", measureCreateForm);
    $root.on("click", "#post-tweet", postTweet);
    $root.on('input', "#edit-tweet-textarea", measureEditForm);
    // $root.on("click", "#edit-tweet", updateTweet);
    $root.on("click", "#edit-button", toggleEditTweet);
    // $root.on("click", "#like-button", likeTweet);
    // $root.on("click", "#unlike-button", unlikeTweet);
    $root.on("click", "#cancel-post", cancelPost);
    $root.on("click", "#cancel-edit", cancelEdit);
    // if(!($('#reply-area').length)){
    //     $root.on("click", "#reply-footer-button", renderReplyEditor);
    // }
    $root.on("click", "#stop-reply-footer-button", function(event){
        event.preventDefault();
    })
    $root.on('input', "#create-reply-textarea", measureReplyForm);
    $root.on('click', "#post-reply", replyTweet)
    $root.on("click", "#cancel-reply", cancelReply);
    // if(!($('#retweet-area').length)){
    //     $root.on("click", "#retweet-footer-button", renderRetweetEditor);
    // }
    $root.on("click", "#stop-retweet-footer-button", function(event){
        event.preventDefault();
    })
    $root.on("input", "#create-retweet-textarea", measureRetweetForm)
    $root.on("click", "#post-retweet", retweetTweet);
    $root.on("click", "#cancel-retweet", cancelRetweet);
    $root.on("click","#replies-button",renderReplies);
    $root.on("click", "#hide-replies-button",destroyReplies);
    $root.on("click","#warning",function(){
        $root.find('#warning').remove();
    });
}

// jQeury equivalent of loading in the window. 
$(function () {
    renderTwitter();
});