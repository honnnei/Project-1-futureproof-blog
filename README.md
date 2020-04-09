# blog-project
## Rosie Keir Matt Hanna

# How to run our app:
1. Fork over the repository 
2. npm init
3. npm install --save express if express not installed
4. npm start / node app.js
5. open the local host in browser (the terminal will tell you the port number)

### How we distributed our work:
Day 1 - creating a server, creating new posts and saving them into storage.json. Adding styling.
Day 2 - creating comments, saving them into storage.json, also creating a giphy option. Adding styling.
Day 3 - mergin the blog app with the giphy option. Creating emoji reactions. Creating a date stamp, character limit alert and character counter. Adding styling.
Day 4 - Refactoring & adding more styling.

### What We Learned:
- how to save data into a json file
- how to retrieve data from a json file
- how to add additional data into an object which already exists in our json storage
- how to create a Date stamp with JS new Date object.

# Challenges we overcame:
- adding a comment array element to each post object so that we can add multiple comments
- mapping the post array, then fetching giffy if necessary, then runnig the post display functions that map the comments array
- obtaining the giphy url - we fixed it with adding an additional .then
- getting the function with the emoji counter to work so that it counts each individual emoji separately
- Finding a suitable service to host our website. And formatting our code so that it could be run online.
- Refactoring the date stamp to a different time zone and display format
- Creating a clear and intuitive UI, by using familiar layouts and labelling, and minimising cluttered layout

# What we struggled with:
- Storing the emoji reactions.
- Displaying posts in chronological order. Instead posts are displayed as their image is loaded.
- Making the comment input box expandable to more lines of text if longer text is added. 

### What we would do differently next time:
- use TDD
- Create a design template for consistent colouring and styling.

# Extra Feature Ideas:
- charcter counter
- once your post goes over the character limit - give the user an alert
- date stamp
- comment section icon
- comment user icon
- expandable comment input box (not implemented)
