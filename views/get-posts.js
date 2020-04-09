$(document).ready(function () {
       
    axios.get('/get-posts').then(response => { 
        let blogArray = response.data.posts;
        // console.log(Array.isArray(blogArray));
        displayedBlogArray = blogArray.map(element => {
            let index = blogArray.indexOf(element);
            let postUser = element.username;
            let postContent = element.blogPost;
            let postDate = element.date;
            let giphyQuery = element.image; //if there is giphy input
            console.log(giphyQuery); //this works
            let commentsPresent = element.comments[0];
            //calling display function if giphy:
            if (giphyQuery) {
                let imageSource = "";
                let key = "nNH7998Ir4ao8g1OTRrIQxqYr1EomuJO"
                let url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${giphyQuery}&limit=1&offset=0&rating=G&lang=en` //API call. 1 image is returned for user's search query

                fetch(url) //Returns image url response from giphy api
                .then(response => response.json())
                .then(content => {
                    let image = content.data[0].id;
                    imageSource = "https://media.giphy.com/media/" + image + "/giphy.gif";
                    return imageSource;
                    // displayPost(index, postUser, postContent, image);  
                })
                .then(imageUrl => {

                    if (!commentsPresent) {
//emoji starts:
                        displayPostNoComment(index, postUser, postContent, postDate, imageUrl);
                        displayEmojiReacts(index);
                    } else {
                        let arrayOfComments = element.comments;
                        displayPostWithComment(index, postUser, postContent, arrayOfComments, element, postDate, imageUrl);
                        displayEmojiReacts(index);
//this was on master before meoji:
//                         displayPostNoComment(index, postUser, postContent, postDate, imageUrl);
//                     } else {
//                         let arrayOfComments = element.comments;
//                         displayPostWithComment(index, postUser, postContent, arrayOfComments, element, postDate, imageUrl);

                    }
                })                 //Had trouble with async. displayPost() must be here to ensure image is returned
                   
                    
              .catch(err=>{
                    console.error(err);
                });
            } else { //calling display function if no giphy:
                if (!commentsPresent) {
//emoji starts:
                    displayPostNoComment(index, postUser, postContent, postDate);
                    displayEmojiReacts(index);
                } else {
                    let arrayOfComments = element.comments;
                    displayPostWithComment(index, postUser, postContent, arrayOfComments, element, postDate);
                    displayEmojiReacts(index);
//this was on master before meoji:
//                     displayPostNoComment(index, postUser, postContent, postDate);
//                 } else {
//                     let arrayOfComments = element.comments;
//                     displayPostWithComment(index, postUser, postContent, arrayOfComments, element, postDate);
                }
            }


        }); //array map close
    }); //axios close

//emoji starts:
    function displayPostWithComment(arrayIndex, arrayUser, arrayPost, commentArray, postElement, arrayDate, arrayImage ) {
//this was on master before meoji:
//     function displayPostWithComment(arrayIndex, arrayUser, arrayPost, commentArray, postElement, arrayDate, arrayImage) {

        //taken out of the function arguments: commentIndex, commentUser, commentValue, commentNumber
        let id = arrayIndex.toString();
        //displaying the post:
        $("#blogDisplay").append( // should we put use post image INSIDE the post div?
            `<div class="post_div" id=${id}>
                    <div class="post_section">
                        <div class="post_date"></div>
                        <div class="user_name"></div>
                        <div class="user_post_image">
                            <div class="user_post"></div>
                        </div>
                        <div class="comment_and_emojis">
                            <button class="comment">Comment</button>
                        </div>
                        <div class="form_div">
                            <form action="/comment/${id}" method="POST" class="comment-container">
                                <label for = "usernamebox">Username</label>
                                <input name="commentUsername" type="text" class="usernamebox"/>
                                <label for = "commentbox">Comment here</label>
                                <input name="commentContent" type="textarea" class="commentbox"/>

                                <button type = "submit" class="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div class="comment_section"></div>
                </div>`);
        $(`#${id} .post_date`).html(`${arrayDate}`);
        $(`#${id} .post_section .user_name`).html(`${arrayUser}`);
        $(`#${id} .post_section .user_post`).html(`${arrayPost}`);
        $(`#${id} .comment`).on('click', function () {
            $(`#${id} .form_div`).toggle();
        });
        if(arrayImage){
            console.log(arrayImage);
            $(`#${id} .user_post_image`).append(`<div class="user_image"></div>`);
            $(`#${id} .user_image`).html(`<img class ="giphyImage" src="${arrayImage}">`); //Applied class "giphyImage" to reduce image size. Feel free to change styling.
        }
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
                <div class="comment_icon"></div>
                <div class="comment_username"></div>
                <div class="comment_content"></div>
            </div>`
        );
        $(`#${commentId} .comment_username`).html(`&#128100; ${userOfComment}`);    
        $(`#${commentId} .comment_content`).html(`${contentOfComment}`);  
        $(`#${commentId} .comment_icon`).html(`&#128172;`);
    }

//emoji starts
    function displayPostNoComment(arrayIndex, arrayUser, arrayPost, arrayDate, arrayImage) {
//before meoji
//     function displayPostNoComment(arrayIndex, arrayUser, arrayPost, arrayDate, arrayImage) {

        let id = arrayIndex.toString();
        console.log(id);

        $("#blogDisplay").append(
            `<div class="post_div" id=${id}>
                    <div class="post_section">
                        <div class="post_date"></div>
                        <div class="user_name"></div>
                        <div class="user_post_image">
                            <div class="user_post"></div>
                        </div>
                        <div class="comment_and_emojis">
                            <button class="comment">Comment</button>
                        </div>
                        <div class="form_div">
                            <form action="/comment/${id}" method="POST" class="comment-container">
                                <label for = "usernamebox">Username</label>
                                <input name="commentUsername" type="text" class="usernamebox"/>
                                <label for = "commentbox">Comment here</label>
                                <input name="commentContent" type="textarea" class="commentbox"/>
                                <button type = "submit" class="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div class="comment_section"></div>
                </div>`);
        $(`#${id} .post_date`).html(`${arrayDate}`);
        $(`#${id} .post_section .user_name`).html(`${arrayUser}`);
        $(`#${id} .post_section .user_post`).html(`${arrayPost}`);
        $(`#${id} .comment`).on('click', function () {
            $(`#${id} .form_div`).toggle();
        });
        
        if(arrayImage){
            console.log(arrayImage);
            $(`#${id} .user_post_image`).append(`<div class="user_image"></div>`);
            $(`#${id} .user_image`).html(`<img class ="giphyImage" src="${arrayImage}">`); //Applied class "giphyImage" to reduce image size. Feel free to change styling.
        }
        else{
            $(`#${id} .user_post`).css("width", "100%");
        }

    }

});
  
// function makeAGiphy(query) {
//             let imageSource = "";
//                 let key = "nNH7998Ir4ao8g1OTRrIQxqYr1EomuJO"
//                 let url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${query}&limit=1&offset=0&rating=G&lang=en` //API call. 1 image is returned for user's search query

//                 fetch(url) //Returns image url response from giphy api
//                 .then(response => response.json())
//                 .then(content => {
//                     let image = content.data[0].id;
//                     imageSource = "https://media.giphy.com/media/" + image + "/giphy.gif";
//                     console.log(imageSource);
//                     // displayPost(index, postUser, postContent, image);                   //Had trouble with async. displayPost() must be here to ensure image is returned
//                     return imageSource;
//                     displayPostNoComment();
//                     displayPostWithComment();
//                 })
//                 .catch(err=>{
//                     console.error(err);
//                 })
           
//     }
     
function displayPost(arrayIndex, arrayUser, arrayPost, arrayDate, arrayImage ) {
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

function displayEmojiReacts(index) {
    let id = index.toString();
    let bigEmojiDiv = "emoji"+id
    let laughCount = 0;
    let neutralCount = 0;
    let poopCount = 0;

    $(`#${id} .comment_and_emojis`).append(`<div id=${bigEmojiDiv} class="emojicontainer"></div>`);
        $(`#${bigEmojiDiv}`).append(`<div id=group1${id} class="emojigroup"></div>`);
            $(`#group1${id}`).append(`<div id=laughing${id} class="laughing">🤣</div>`);
            $(`#group1${id}`).append(`<div id=laughingCounter${id} class="counter">0</div>`);
            $(`#laughing${id}`).click(function() {
                laughCount += 1;
                $(`#laughingCounter${id}`).html(`${laughCount}`);
            });
        

        $(`#${bigEmojiDiv}`).append(`<div id=group2${id} class="emojigroup"></div>`);
            $(`#group2${id}`).append(`<div id=neutral${id} class="neutral">😑</div>`);
            $(`#group2${id}`).append(`<div id=neutralCounter${id}  class="counter">0</div>`);
            $(`#neutral${id}`).click(function() {
                neutralCount += 1;
                $(`#neutralCounter${id}`).html(`${neutralCount}`);
            });

        $(`#${bigEmojiDiv}`).append(`<div id=group3${id} class="emojigroup"></div>`);
            $(`#group3${id}`).append(`<div id=poop${id} class="poop">💩</div>`);
            $(`#group3${id}`).append(`<div id=poopCounter${id} class="counter">0</div>`);
            $(`#poop${id}`).click(function() {
                poopCount += 1;
                $(`#poopCounter${id}`).html(`${poopCount}`);
            });

}
