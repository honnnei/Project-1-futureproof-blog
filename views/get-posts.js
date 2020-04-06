$( document ).ready(function() {

    axios.get('/get-posts').then(response => {
        console.log(response);
        let postJson = response.data.post;
        return postJson;
    })
    .then(json => {
        let postArray = JSON.parse(postJson);
        console.log(postArray);
    });
        // let postArray = JSON.parse(postJson);
        // console.log(postArray);
        // for (i=0; i < response.data.post.length; i++) {
        //     displayPosts = response.data.posts[i].blogPost;
        //     displayUsername = response.data.posts[i].username;
        //     console.log(displayPosts);
        // }
        // displayPosts = response.data.posts[1].blogPost;
        // displayUsername = response.data.posts[1].username;
    //   $("#text").css({
    //     "text-align": "center",
    //     "min-height": "150px",
    //     "display": "flex",
    //     "justify-content": "center",
    //     "align-items": "center"
    //   });
    // $('#user').html(`${displayUsername} :`)
    // // $("#text").html(`${displayPosts}`);
    // });
  });
