//import Axios from "axios";

export async function renderNewsFeed() {
    const $root = $('#root');
    const result = await axios({
        method: 'get',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });
    let tweets = `<div id="tweets">
                    <div><button type="button" class="button newTweetButton">New Tweet</button></div>`;
    for (let i = 0; i < 50; i++) {
        if (result.data[i]["isMine"] == true) {
            tweets += renderMyTweet(result.data[i]);
        } else {
            tweets += renderOtherTweet(result.data[i]);
        }
    }
    tweets += `</div>`;
    $root.append(tweets);
    $("button.likeButton").on('click', handleLike);
    $("button.unlikeButton").on('click', handleUnlike);
    $("button.newTweetButton").on('click', handleNewTweet);
    $("button.removeButton").on('click', handleDeleteTweet);
    $("button.editButton").on('click', handleEditTweet);
    $("button.retweetButton").on('click', handleRetweet);
    $("button.replyButton").on('click', handleReplyTweet);

}

export function renderMyTweet(tweet) {
    if (tweet.type === "retweet" && tweet.parent != undefined) {
        return `<div id=${tweet.id} class="box">
        <p><strong>${tweet.author}</strong>
            <br>
            ${tweet.body}
            <br>
            <div class="box">
                <p><strong>${tweet.parent.author}</strong>
                <br>${tweet.parent.body}</p>
            </div>
        </p>
        <button type="button" class="button retweetButton is-small">Retweet ${tweet.retweetCount}</button>
        <button type="button" class="button replyButton is-small">Reply ${tweet.replyCount}</button>
        <button type="button" class="button editButton is-small">Edit</button>
        <button type="button" class="button removeButton is-small">Delete</button>
    </div>`
    } else {
    return `<div id=${tweet.id} class="box">
                <p><strong>${tweet.author}</strong>
                    <br>
                    ${tweet.body}
                </p>
                <button type="button" class="button retweetButton is-small">Retweet ${tweet.retweetCount}</button>
                <button type="button" class="button replyButton is-small">Reply ${tweet.replyCount}</button>
                <button type="button" class="button editButton is-small">Edit</button>
                <button type="button" class="button removeButton is-small">Delete</button>
            </div>`
    }

}

export function renderOtherTweet(tweet) {
    if (tweet.type === "retweet" && tweet.parent != undefined) {
        if (tweet.isLiked == false) {
            return `<div id=${tweet.id} class="box">
                        <p><strong>${tweet.author}</strong>
                            <br>
                            ${tweet.body}
                            <br>
                            <div class="box">
                                <p><strong>${tweet.parent.author}</strong>
                                <br>${tweet.parent.body}</p>
                            </div>
                        </p>
                        <button type="button" class="button likeButton is-small">Like ${tweet.likeCount}</button>
                        <button type="button" class="button retweetButton is-small">Retweet ${tweet.retweetCount}</button>
                        <button type="button" class="button replyButton is-small">Reply ${tweet.replyCount}</button>
                    </div>`
        } else {
            return `<div id=${tweet.id} class="box">
                        <p><strong>${tweet.author}</strong>
                            <br>
                            ${tweet.body}
                            <br>
                            <div class="box">
                                <p><strong>${tweet.parent.author}</strong>
                                <br>${tweet.parent.body}</p>
                            </div>
                        </p>
                        <button type="button" class="button unlikeButton is-small">Unlike ${tweet.likeCount}</button>
                        <button type="button" class="button retweetButton is-small">Retweet ${tweet.retweetCount}</button>
                        <button type="button" class="button replyButton is-small">Reply ${tweet.replyCount}</button>
                    </div>`
        }
    } else {
    if (tweet.isLiked == false) {
        return `<div id=${tweet.id} class="box">
                    <p><strong>${tweet.author}</strong>
                        <br>
                        ${tweet.body}
                    </p>
                    <button type="button" class="button likeButton is-small">Like ${tweet.likeCount}</button>
                    <button type="button" class="button retweetButton is-small">Retweet ${tweet.retweetCount}</button>
                    <button type="button" class="button replyButton is-small">Reply ${tweet.replyCount}</button>
                </div>`
    } else {
        return `<div id=${tweet.id} class="box">
                    <p><strong>${tweet.author}</strong>
                        <br>
                        ${tweet.body}
                    </p>
                    <button type="button" class="button unlikeButton is-small">Unlike ${tweet.likeCount}</button>
                    <button type="button" class="button retweetButton is-small">Retweet ${tweet.retweetCount}</button>
                    <button type="button" class="button replyButton is-small">Reply ${tweet.replyCount}</button>
                </div>`
    }
}
}

export async function handleLike(event) {
    let id = event.target.parentElement.id;
    let url = `https://comp426fa19.cs.unc.edu/a09/tweets/${id}/like`;
    const result = await axios({
        method: 'put',
        url: url,
        withCredentials: true,
    });

    $('#tweets').remove();
    renderNewsFeed();
}

export async function handleUnlike(event) {
    let id = event.target.parentElement.id;
    let url = `https://comp426fa19.cs.unc.edu/a09/tweets/${id}/unlike`;
    const result = await axios({
        method: 'put',
        url: url,
        withCredentials: true,
    });

    $('#tweets').remove();
    renderNewsFeed();
}

export function handleNewTweet() {
    let c = `<div id="newTweet" class="box">
                <form>
                    <textarea id="newTweetBody" rows="5" cols="50">Tweet body here</textarea>
                    <button type="submit" class="button submitButton">Tweet</button>
                    <button type="button" class="button cancelButton">Cancel</button>
                </form>
             </div>`
    $('#newTweet').remove();
    $('#root').prepend(c);
    $("button.submitButton").on('click', submitTweet);
    $("button.cancelButton").on('click', cancelNewTweet);
}

export async function submitTweet() {
    event.preventDefault();
    let body = $('#newTweetBody').val();
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        data: {
            "type": "tweet",
            "body": `${body}`,
        },
        withCredentials: true,
    });
    $('#tweets').remove();
    $('#newTweet').remove();
    renderNewsFeed();
}

export function cancelNewTweet() {
    $('#newTweet').remove();
}

export async function handleDeleteTweet(event) {
    let id = event.target.parentElement.id;
    let url = "https://comp426fa19.cs.unc.edu/a09/tweets/" + id;
    const result = await axios({
        method: 'delete',
        url: url,
        withCredentials: true,
    });
    $('#tweets').remove();
    renderNewsFeed();
}

export async function handleEditTweet(event) {
    event.preventDefault();
    let id = event.target.parentElement.id;
    let url = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id;
    const result = await axios({
        method: 'get',
        url: url,
        withCredentials: true,
    });
    let tweet = result.data;
    let e = renderEditForm(tweet);
    $('#tweets').remove();
    $('#root').append(e);
    $('button.submitEditButton').on('click', handleSubmitEdit);
    $('button.cancelEditButton').on('click', handleCancelEdit);
}

export function renderEditForm(tweet) {
    let e = `<div id=${tweet.id} class="box">
                <form>
                    <textarea id="editTweetBody" rows="5" cols="50">${tweet.body}</textarea>
                    <button type="submit" class="button submitEditButton">Submit</button>
                    <button type="button" class="button cancelEditButton">Cancel</button>
                </form>
            </div>`
    return e;

}

export function handleCancelEdit(event) {
    let id = event.target.parentElement.parentElement.id;
    $(`#${id}`).remove();
    renderNewsFeed();
}

export async function handleSubmitEdit(event) {
    event.preventDefault();
    let id = event.target.parentElement.parentElement.id;
    let body = $('#editTweetBody').val();
    if (body === "") {
        body = " ";
    }
    let url = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id;
    const result = await axios({
        method: 'put',
        url: url,
        withCredentials: true,
        data: {
            "body": body,
        },
    });
    $('#tweets').remove();
    $(`#${id}`).remove();
    renderNewsFeed();


}

export async function handleRetweet(event) {
    let id = event.target.parentElement.id;
    let url = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id;
    const result = await axios({
        method: 'get',
        url: url,
        withCredentials: true,
    });
    let tweet = result.data;
    let e = renderRetweetForm(tweet);
    $('#tweets').remove();
    $('#root').append(e);
    $('button.submitRetweetButton').on('click', handleSubmitRetweet);
    $('button.cancelRetweetButton').on('click', handleCancelRetweet);
}

export function renderRetweetForm(tweet) {
    let e = `<div id=${tweet.id} class="box">
    <p><strong>${tweet.author}</strong>
        <br>
        ${tweet.body}
    </p>
    <form>
        <textarea id="retweetBody" rows="5" cols="50"></textarea>
        <button type="submit" class="button submitRetweetButton">Submit</button>
        <button type="button" class="button cancelRetweetButton">Cancel</button>
    </form>  
    </div>`
    return e;
}

export function handleCancelRetweet(event) {
    let id = event.target.parentElement.parentElement.id;
    $(`#${id}`).remove();
    renderNewsFeed();
}

export async function handleSubmitRetweet(event) {
    event.preventDefault();
    let id = event.target.parentElement.parentElement.id;
    let body = $('#retweetBody').val();
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            'type': 'retweet',
            'parent': id,
            'body': body,
        }
    });
    $(`#${id}`).remove();
    renderNewsFeed();
}

export async function handleReplyTweet(event) {
    let id = event.target.parentElement.id;
    let url = 'https://comp426fa19.cs.unc.edu/a09/tweets/' + id;
    const result = await axios({
        method: 'get',
        url: url,
        withCredentials: true,
    });
    let tweet = result.data;
    let e = renderReplyForm(tweet);
    $('#tweets').remove();
    $('#root').append(e);
    $('button.submitReplyButton').on('click', handleSubmitReply);
    $('button.cancelReplyButton').on('click', handleCancelReply);
}

export function renderReplyForm(tweet) {
    let e = `<div id=${tweet.id} class="box">
    <p><strong>${tweet.author}</strong>
        <br>
        ${tweet.body}
    </p>
    <form>
        <textarea id="replyBody" rows="5" cols="50"></textarea>
        <button type="submit" class="button submitReplyButton">Submit</button>
        <button type="button" class="button cancelReplyButton">Cancel</button>
    </form>  
    </div>`
    return e;
}

export function handleCancelReply(event) {
    let id = event.target.parentElement.parentElement.id;
    $(`#${id}`).remove();
    renderNewsFeed();
}

export async function handleSubmitReply(event) {
    event.preventDefault();
    let id = event.target.parentElement.parentElement.id;
    let body = $('#replyBody').val();
    if (body === '') {
        body = ' ';
    }
    const result = await axios({
        method: 'post',
        url: 'https://comp426fa19.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            'type': 'reply',
            'parent': id,
            'body': body,
        }
    });
    $(`#${id}`).remove();
    renderNewsFeed();
}


$(function () {
    renderNewsFeed();
});