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
            let query = element.image;
            console.log(index);
            console.log(postUser);
            console.log(postContent);
            console.log(query);
            let image = "";
                
            if(query){
                let key = "nNH7998Ir4ao8g1OTRrIQxqYr1EomuJO"
                let url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${query}&limit=1&offset=0&rating=G&lang=en` //API call. 1 image is returned for user's search query

                fetch(url) //Returns image url response from giphy api
                .then(response => response.json())
                .then(content => {
                    let image = content.data[0].id;
                    image = "https://media.giphy.com/media/" + image + "/giphy.gif";
                    console.log(image);
                    displayPost(index, postUser, postContent, image);                   //Had trouble with async. displayPost() must be here to ensure image is returned
                    return image;
                })
                .catch(err=>{
                    console.error(err);
                })
            }
            else{
                displayPost(index, postUser, postContent);
            }
    });
     
function displayPost(arrayIndex, arrayUser, arrayPost, arrayImage ) {
    let id = arrayIndex.toString();
    console.log(id);
    //console.log(arrayImage);
    $("#blogDisplay").append(`<div class="post_div" id=${id}></div>`);
    $(`#${id}`).append(`<div class="user_name"></div>`);
    $(`#${id} .user_name`).html(`${arrayUser}`);
    $(`#${id}`).append(`<div class="user_post"></div>`);
    $(`#${id} .user_post`).html(`${arrayPost}`);
    if(arrayImage){
        $(`#${id}`).append(`<div class="user_image"></div>`);
        $(`#${id} .user_image`).html(`<img class ="giphyImage" src="${arrayImage}">`); //Applied class "giphyImage" to reduce image size. Feel free to change styling.
    }
    $(`#${id}`).append(`<button class="comment">Comment</button>`);

}

    })
});