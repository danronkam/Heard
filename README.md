# Heard

[Click here to view!](https://heard--app.herokuapp.com/)

## Background
--- 
Heard is an application that aims to foster a safe, anonymous community of secret sharers and secret bearers. Users can choose to share a confession or start a message thread about a specific topic. The application design takes a mobile-focused approach as most of the interactions will likely take place sporadically throughout the day on an accessible device. 


## Features 
---
### User Authentication - Login/Signup 

Heard features a fully functional user authentication system, complete with a demo user login and error handling for incomplete entries. Upon successful login, the user will be redirected to a home page where the user can choose to participate in the application as a listener or create confessions or message threads. 

<img width="350" alt="Screen Shot 2022-09-27 at 9 49 23 AM" src="https://user-images.githubusercontent.com/107089418/192587580-7cb3dd42-b8f9-4626-9483-f76ade558ce6.png">
<img width="350" alt="Screen Shot 2022-09-27 at 9 49 35 AM" src="https://user-images.githubusercontent.com/107089418/192587576-aad07c04-440e-4291-93d8-8454974fc00a.png">

## Message Thread Feature
Users can create topics that open message threads, or proceed directly to an index of topics. From a side menu, they can edit and/or delete the threads that they created.

<img width="350" alt="TopicDrawerScreenshot" src="https://user-images.githubusercontent.com/100994924/192670284-437fb40d-6aa4-4c5c-bfcd-d11f1e748f4d.png">

Within a chat, users are anonymized except for the last five characters of their user ID. New messages are fetched at regular short intervals from the server.

<img width="350" alt="TopicMessageScreenShot" src="https://user-images.githubusercontent.com/100994924/192670264-92079b49-52d2-4f04-9bb8-61246c826364.png">

Topics are organized in the database so that they are affiliated with a `user` and an array of `messages` in Mongoose:

```javascript
const TopicSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ...
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    ...
```
In order to create messages then, the frontend must send in not only the content of the new message, but the `topicId` of the topic the message is affiliated with. Authentication middleware grabs the `userId` from the JSON Web Token (JWT).
```javascript
const createMessage = asyncHandler(async (req, res) => {

  const { topicId, content } = req.body;
  
  const userId = req.user._id
  
  if (!topicId|| !content || !userId) {
    res.status(400);
    throw new Error("Data missing. need topic ID, content, and user ID");
  }
  const messageInfo ={
   sender: userId,
    content,
    topicId
  };
  try {
    const newMessage = await Message.create(messageInfo)
    
    const fullMessage = await Message.findOne({_id : newMessage._id})
    .populate('topicId')

    const foundTopic = await Topic.findById(topicId)
    if (foundTopic){
      Topic.findByIdAndUpdate(topicId, {
        messages: [...foundTopic.messages, fullMessage._id]
      })
    res.status(200).json(fullMessage)
    }
  }catch(error) {
    res.status(401).json({message: 'problem in messages controller', error: error})
  }
});
```

It is then populated with its `topicId` before the topic is found and updated by appending the message to its list of `messages` using `findByIdAndUpdate()`.

Updating the title's title and / or mood or deleting it is simpler, involving mainly the findById and findByIdAndUpdate methods, since a new instance of a `Message` object does not have to be created.
