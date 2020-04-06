$( document ).ready(function() {

    axios.get('/get-posts').then(response => {
        console.log(response);
        // displayPosts = response.data.posts[0].blogPost;
        // displayUsername = response.data.posts[0].username;
        let blogArray = response.data.posts;
        console.log(Array.isArray(blogArray));
        displayedBlogArray = blogArray.map(element => {
        console.log(element);
            let index = blogArray.indexOf(element);
            let postUser = element.username;
            let postContent = element.blogPost;
            console.log(index);
            console.log(postUser);
            console.log(postContent);
            displayPost(index, postUser, postContent);
        });
     
function displayPost(arrayIndex, arrayUser, arrayPost ) {
    let id = arrayIndex.toString();
    console.log(id);
    $("#blogDisplay").append(`<div class="post_div" id=${id}></div>`);
    $(`#${id}`).append(`<div class="user_name"></div>`);
    $(`#${id} .user_name`).html(`${arrayUser}`);
    $(`#${id}`).append(`<div class="user_post"></div>`);
    $(`#${id} .user_post`).html(`${arrayPost}`);
    $(`#${id}`).append(`<button class="comment">Comment</button>`);

}})

$(`.post_div`).append($('<input type="button" id="comment" value="comment"/>'));

});