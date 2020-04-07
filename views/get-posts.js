$(document).ready(function () {
    axios.get('/get-posts').then(response => {
        console.log(response);  
      let blogArray = response.data.posts;
        console.log(Array.isArray(blogArray));
        displayedBlogArray = blogArray.map(element => {
            console.log(element);
            let index = blogArray.indexOf(element);
            let postUser = element.username;
            let postContent = element.blogPost;
            let commentsPresent = element.comments[0];

            if (!commentsPresent) {

                displayPostNoComment(index, postUser, postContent);
                // console.log('this is a post with no comment');
            } else {
                let arrayOfComments = element.comments;
                displayPostWithComment(index, postUser, postContent, arrayOfComments, element);
            } // if statement close 
        }); //array map close
    }); //axios close

    function displayPostWithComment(arrayIndex, arrayUser, arrayPost, commentArray, postElement ) {
        //taken out of the function arguments: commentIndex, commentUser, commentValue, commentNumber
        let id = arrayIndex.toString();
        //displaying the post:
        $("#blogDisplay").append(
            `<div class="post_div" id=${id}>
                    <div class="post_section">
                        <div class="user_name"></div>
                        <div class="user_post"></div>
                        <button class="comment">Comment</button>
                        <div class="form_div">
                            <form action="/comment/${id}" method="POST" class="comment-container">
                                <label for = "usernamebox">Username</label>
                                <input name="commentUsername" type="text" class="usernamebox"/>
                                <label for = "commentbox">Comment here</label>
                                <input name="commentContent" type="textarea" class="commentbox"/>
                                <button type = "submit">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div class="comment_section"></div>
                </div>`);
        $(`#${id} .post_section .user_name`).html(`${arrayUser}`);
        $(`#${id} .post_section .user_post`).html(`${arrayPost}`);
        $(`#${id} .comment`).on('click', function () {
            $(`#${id} .form_div`).toggle();
        });
        //mapping comments:
        displayedComments = commentArray.map(comment => {
                let commentIndex = commentArray.indexOf(comment);
                let postCommentUserName = postElement.comments[commentIndex].commentUsername;
                let postCommentContent = postElement.comments[commentIndex].commentContent;
                //invoking the display function:
                writeComment(id, commentIndex, postCommentUserName, postCommentContent);        
        }); 
    }

    function writeComment(idOfPost, indexOfComment, userOfComment, contentOfComment) {

        let thisWillBeCommentId = indexOfComment.toString();
        let commentId = idOfPost + thisWillBeCommentId;

        $(`#${idOfPost} .comment_section`).append(
            `<div id=${commentId} class="comment_container">
                <div class="comment_username"></div>
                <div class="comment_content"></div>
            </div>`
        );
        $(`#${commentId} .comment_username`).html(`${userOfComment}`);    
        $(`#${commentId} .comment_content`).html(`${contentOfComment}`);   
    }

    function displayPostNoComment(arrayIndex, arrayUser, arrayPost) {
        let id = arrayIndex.toString();
        console.log(id);

        $("#blogDisplay").append(
            `<div class="post_div" id=${id}>
                    <div class="post_section">
                        <div class="user_name"></div>
                        <div class="user_post"></div>
                        <button class="comment">Comment</button>
                        <div class="form_div">
                            <form action="/comment/${id}" method="POST" class="comment-container">
                                <label for = "usernamebox">Username</label>
                                <input name="commentUsername" type="text" class="usernamebox"/>
                                <label for = "commentbox">Comment here</label>
                                <input name="commentContent" type="textarea" class="commentbox"/>
                                <button type = "submit">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div class="comment_section"></div>
                </div>`);
        $(`#${id} .post_section .user_name`).html(`${arrayUser}`);
        $(`#${id} .post_section .user_post`).html(`${arrayPost}`);
        $(`#${id} .comment`).on('click', function () {
            $(`#${id} .form_div`).toggle();
        });

    }

});
  
function makeAGiphy() {
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
    // $(`#${id}`).append(`<div class="user-icon"><p>&#129409;</p></div>`);
    $(`#${id}`).append(`<div class="post_content"></div>`);
    $(`#${id} .post_content`).append(`<div class="user_name"></div>`);
    $(`#${id} .post_content`).append(`<div class="user_post_image"></div>`);
    $(`#${id} .user_name`).html(`&#129409 ${arrayUser}`);
    $(`#${id} .user_post_image`).append(`<div class="user_post"></div>`);
    $(`#${id} .user_post`).html(`${arrayPost}`);
    if(arrayImage){
        $(`#${id} .user_post_image`).append(`<div class="user_image"></div>`);
        $(`#${id} .user_image`).html(`<img class ="giphyImage" src="${arrayImage}">`); //Applied class "giphyImage" to reduce image size. Feel free to change styling.
    }
    $(`#${id}`).append(`<button class="comment">Comment</button>`);

//     $(`#${id} .post_content`).append(`<button class="comment">Comment</button>`); - from matt-style
}



