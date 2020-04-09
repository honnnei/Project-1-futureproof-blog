# blog-project
## Rosie Keir Matt Hanna

### PLAN:
-	server
o	app.js
o	Post HTML
	script.js
o	Display HTML
	script.js
o	json storage file
-	Post HTML
o	username input
o	post input
o	id
	comments
	gifs
	emojis

# Extra Feature Ideas:
- charcter counter
- once your post goes over the character limit - give the user an alert
- date stamp
- comment section icon
- comment user icon

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
