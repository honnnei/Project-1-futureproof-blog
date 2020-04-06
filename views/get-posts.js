$( document ).ready(function() {

    axios.get('/get-posts').then(response => {
        console.log(response);
        displayPosts = response.data.posts[0].blogPost;
        displayUsername = response.data.posts[0].username;
    //   $("#text").css({
    //     "text-align": "center",
    //     "min-height": "150px",
    //     "display": "flex",
    //     "justify-content": "center",
    //     "align-items": "center"
    //   });
    $('#user').html(`${displayUsername} :`)
    $("#text").html(`${displayPosts}`);
    })
});