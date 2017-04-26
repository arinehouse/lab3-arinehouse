# React notes

A submission for Lab 3 of CS52 at Dartmouth College.

## What I Did
I struggled, certainly, but feel good coming out of it. I started by making a single note, and then a couple of notes, that were loaded in automatically instead of by a user. Then I worked on dragging, editing, and removing, and finally added in the ability to add new notes. Once everything was set up, and once I understood how Firebase worked, it was relatively straightforward to refactor the change functions to work with Firebase. Finally, I decided to create a lock feature on a note if someone else is editing it. When hovering over the lock, the note displays who is currently editing the note (oh yeah, and all users have a randomly-generated alliterative adjective-animal combination, and for that a major thank you is owed to Github user [nwjohn](https://github.com/nwjohn) for her [animal-namer-api](https://github.com/nwjohn/animal-namer-api) project.)

## What Worked / Didn't Work
Aside from learning just what the heck props and state were and how we interacted with them, which was the bulk of the struggle with the assignment, the lock functionality probably caused the most difficulty. I tried a bunch of different ideas, from storing in local storage to App state to firebase, but ultimately settled on storing an editor as part of the note's props.

And for what it's worth, the animal-namer-api caused some problems too. First it was an issue of finding a web-compatible api that didn't need to access a user's filesystem, and then once I found the right one, I was getting an issue because the hosted site did not have an https protocol, so chrome was issuing an error for not trusting the site certificate. In the end, I wound up forking their repo and hosting it on heroku, and then making an api call from the heroku app.

## Extra Credit
I'd consider the lock and the api call to be the extra credit. It didn't make much sense to go for the firebase authentication if I was randomly generating usernames, and by the time I got that functionality working I sort of just needed a breather from the project anyway.
