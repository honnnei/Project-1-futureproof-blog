# blog-project
## Rosie Keir Matt Hanna

# How to run our app:
1. Fork over the repository 
2. npm init
3. npm install --save express if express not installed
4. npm start / node app.js
5. open the local host in browser (the terminal will tell you the port number)

### What We have learned



# Challenges we overcame:
- adding a comment array element to each post object so that we can add multiple comments
- mapping the post array, then fetching giffy if necessary, then runnig the post display functions that map the comments array
- obtaining the giphy url - we fixed it with adding an additional .then
- getting the function with the emoji counter to work so that it counts each individual emoji separately
- Finding a suitable service to host our website. And formatting our code so that it could be run online.
- refactoring the date stamp to a different time zone 

# What we struggled with:
- Storing the emoji reactions 
- Displaying posts in chronological order. Instead posts are displayed as their image is loaded.
- Making the comment input box expandable to more lines of text if longer text is added. 


### What I/we would do differently next time
- use TDD

# Extra Feature Ideas:
- charcter counter
- once your post goes over the character limit - give the user an alert
- date stamp
- comment section icon
- comment user icon
- expandable comment input box (not implemented)