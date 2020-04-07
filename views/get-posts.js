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
            let commentsPresent = element.comments;
            
            
        
            if (!commentsPresent) {
            
                displayPostNoComment(index, postUser, postContent);
                console.log(element.blogPost);
            } else {
                console.log(element.comments);
                let postCommentUserName = element.comments.commentUser;
                let postCommentContent = element.comments.commentContent;
                displayPostWithComment(index, postUser, postContent, postCommentUserName, postCommentContent );
                // console.log('comments');
            }

        });
     
        function displayPostWithComment(arrayIndex, arrayUser, arrayPost, commentUser, commentValue) {
            let id = arrayIndex.toString();
            console.log(id);
            $("#blogDisplay").append(`<div class="post_div" id=${id}></div>`);
            $(`#${id}`).append(`<div class="user_name"></div>`);
            $(`#${id} .user_name`).html(`${arrayUser}`);
            $(`#${id}`).append(`<div class="user_post"></div>`);
            $(`#${id} .user_post`).html(`${arrayPost}`);
            $(`#${id}`).append(`<button class="comment">Comment</button>`);
            $(`#${id} .comment`).on('click', function() {
                $(`#${id}.post_div`).append(`<form action="/comment/${id}" method="POST" class="comment-container"><label for = "usernamebox">Username</label><input name="commentUsername" type="text" class="usernamebox"/><label for = "commentbox">Comment here</label><input name="commentContent" type="textarea" class="commentbox"/><button type = "submit">Submit</button></form>`);

            });
            $(`#${id}`).append(`<div class="comment_section">Hi</div>`);
            $(`#${id} .comment_section`).append(`<div class="comment_username"></div>`);
            $(`#${id} .comment_username`).html(`${commentUser}`);
            $(`#${id} .comment_section`).append(`<div class="comment_content"></div>`);
            $(`#${id} .comment_content`).html(`${commentValue}`);
            

        }

        function displayPostNoComment(arrayIndex, arrayUser, arrayPost) {
            let id = arrayIndex.toString();
            console.log(id);
            $("#blogDisplay").append(`<div class="post_div" id=${id}></div>`);
            $(`#${id}`).append(`<div class="user_name"></div>`);
            $(`#${id} .user_name`).html(`${arrayUser}`);
            $(`#${id}`).append(`<div class="user_post"></div>`);
            $(`#${id} .user_post`).html(`${arrayPost}`);
            $(`#${id}`).append(`<button class="comment">Comment</button>`);
            $(`#${id} .comment`).on('click', function() {
                $(`#${id}.post_div`).append(`<form action="/comment/${id}" method="POST" class="comment-container"><label for = "usernamebox">Username</label><input name="commentUsername" type="text" class="usernamebox"/><label for = "commentbox">Comment here</label><input name="commentContent" type="textarea" class="commentbox"/><button type = "submit">Submit</button></form>`);

            });
            

        }

});

})

