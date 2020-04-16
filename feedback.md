## Project Feedback

### Successes
* UI and user experience is excelent - well polished and presented.
* well commented, but moving forward in future projects comments are only needed when there is something specific or out of the ordinary that needs to be communicated.
* Start of some good documentation - this needs to be started sooner for next projects and built upon throughout.

### Improvements
* as a general rule of thumb, functions should be kept to 30 lines or under. In `app.js` you have a post request that is ~95 lines. This should have felt a little wrong at the time. There are big chunks of code such as the date, that could easily be pulled out to it's own function.
* Additionally there are formatting options pre-built to handle the Date object so you don't have to.


### Comments
Some general tidying needed - there are bits of redundant code left over or variables not used, such as lns 5/6 in `app.js` 

You have a mixed and matched approached to make this application work. As a user it is a rich, fun and pleasant experience, on the back end the code is a little spaghetti-like. There is an awful going on in `get-posts.js`.

All the route definitions for this project could/should be kept in `app.js`. If additional functionality is required, then that functionality can be imported from another file e.g. read/write posts or comments. This will keep the code much cleaner. The file `get-posts.js` is not the best way to achieve this as you are executing it client side, rather than server-side and then presenting the data. This is not the best practice.  Here is an example from the previous cohort: [blog_project](https://github.com/jtorbett23/blog_project)

Overall, a really solid effort that produced a great experience, but some attention to the approach and the implementation needed for future projects.