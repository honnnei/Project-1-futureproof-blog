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
            let commentsPresent = element.comments[0];
            
            if (!commentsPresent) {
            
                displayPostNoComment(index, postUser, postContent);
                console.log(element.blogPost);
            } else {
                let arrayOfComments = element.comments;
                let numberOfComments = arrayOfComments.length;
                displayedComments = arrayOfComments.map(comment => {
                    let commentIndex = arrayOfComments.indexOf(comment);
                    let postCommentUserName = element.comments[commentIndex].commentUsername;
                    let postCommentContent = element.comments[commentIndex].commentContent;
                    displayPostWithComment(index, commentIndex, postUser, postContent, postCommentUserName, postCommentContent, numberOfComments );
                    console.log('comments');
                })
            }

        });
     
        function displayPostWithComment(arrayIndex, commentIndex, arrayUser, arrayPost, commentUser, commentValue, commentNumber) {
            let id = arrayIndex.toString();
            let thisWillBeCommentId = commentIndex.toString();
            let commentId = id + thisWillBeCommentId;
            console.log(id);
            $("#blogDisplay").append(`<div class="post_div" id=${id}><div class="post_section"></div></div>`);
            $(`#${id} .post_section`).append(`<div class="user_name"></div>`);
            $(`#${id} .post_section .user_name`).html(`${arrayUser}`);
            $(`#${id} .post_section`).append(`<div class="user_post"></div>`);
            $(`#${id} .post_section .user_post`).html(`${arrayPost}`);
            $(`#${id} .post_section`).append(`<button class="comment">Comment</button>`);
            $(`#${id} .post_section `).append(`<form action="/comment/${id}" method="POST" class="comment-container"><label for = "usernamebox">Username</label><input name="commentUsername" type="text" class="usernamebox"/><label for = "commentbox">Comment here</label><input name="commentContent" type="textarea" class="commentbox"/><button type = "submit">Submit</button></form>`);

            $(`#${id} .post_section .comment`).on('click', function() {
                $(`#${id} .post_section form`).css("display", "flex");
            });
                
                
                
                
                
                // $(`#${id} .post_section .post_div`).append(`<form action="/comment/${id}" method="POST" class="comment-container"><label for = "usernamebox">Username</label><input name="commentUsername" type="text" class="usernamebox"/><label for = "commentbox">Comment here</label><input name="commentContent" type="textarea" class="commentbox"/><button type = "submit">Submit</button></form>`);
        
            // });
            // {
            if (commentIndex === 0) { 
                $(`#${id}`).append(`<div class="comment_section"></div>`);
                $(`#${id} .comment_section`).append(`<div id=${commentId} class="comment_container"></div>`);
                $(`#${commentId}`).append(`<div class="comment_username"></div>`);
                $(`#${commentId} .comment_username`).html(`${commentUser}`);
                $(`#${commentId}`).append(`<div class="comment_content"></div>`);
                $(`#${commentId} .comment_content`).html(`${commentValue}`);
            } else {
                $(`#${id} .comment_section`).append(`<div id=${commentId} class="comment_container"></div>`);
                $(`#${commentId}`).append(`<div class="comment_username"></div>`);
                $(`#${commentId} .comment_username`).html(`${commentUser}`);
                $(`#${commentId}`).append(`<div class="comment_content"></div>`);
                $(`#${commentId} .comment_content`).html(`${commentValue}`);
            }
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

