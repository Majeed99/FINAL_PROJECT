# PlaceX	

## 💡Project Idea

***placeX*** it's an website that help you to communicate with your friends ,and let you share posts with any place around you to let them know now places, such as: restaurant ,café ,  cinema ,etc..



## 📝User Stories

- **SignUp:** As a user I can sign up in the website so that I can start posting my location.
- **SignIn:** As a user I can login to the website.
- **Logout:** As a user I can logout from the website so no one else can use it.
- ***Edit Profile:*** As a user I can edit any of my profile info.
- **Add Post:** As a user I can add an post with my location with text or photo.
- **Delete Post:** As a user I can delete any of my posts.
- **Search of any place:** As a user I can  search of any place around me to add new post.
- ***Search Of User:***  As a user I can search of any user by his userName.
- ***Request New Friend:***  As a user I can make request for any of the users.
- ***Accept Or Reject Request:*** As a user I can accept or reject any user's request.
- ***View Friends Posts:*** As a user I want to see the friends posts.
- ***Add Comment On Posts:*** As a user I can add comment of any posts.
- ***Delete Comment On Posts:*** As a user I can delete my comment of any posts.
- ***Show more information of place :*** As a user I can show more details of places.
- 



# 💻Client / Frontend

## React Router Routes (React App)

| Path                  | Component/page | Permissions | Behavior                                                |
| --------------------- | -------------- | ----------- | ------------------------------------------------------- |
| `/`                   | HomePage       | public      | Home page                                               |
| `/signup`             | SignUp         | anon only   | Signup form                                             |
| `/SignIn`             | SignIn         | anon only   | Login form                                              |
| `/TimeLine`           | TimeLine       | user only   | Shows all posts                                         |
| `/Profile`            | Profile        | user only   | Edits a exit points                                     |
| `/Friends`            | Friends        | user only   | see all friends                                         |
| `/EditProfile`        | EditProfile    | user only   | Edit user profile                                       |
| `/Search`               | Search         | user only   | Search for any user                                     |
| `/User/:id`             | User           | user only   | view user profile                                       |
| `/Notification`         | Notification   | user only   | get any requests                                        |
| `/NewPost`              | NewPost        | user only   | add new post                                            |
| `/Post/:userId/:postId` | Post           | user only   | show post details with comments and can add new comment |
| `/Place/:id`            | Place          | user only   | see more information of the places                      |
| `/adminSignIn`          | AdminSignIn    | admin only  | signin for admin                                        |
| `/admin`               | Admin          | admin only  | admin page witch can delete any user                    |

## Components

- Loading
- NavBar
- PostCard
- useGeoLocation
- userStatus
- UserCard

## Pages

- SignIn
- SignUp
- Profile
- EditProfile
- HomePage
- TimeLine
- Friends
- EditProfile
- Search
- User
- Notification
- NewPost
- Post
- Place
- AdminSignIn
- Admin

## Functions

- calcTime
- UploadImage

# ⚡Server / Backend

## Models

User model

```
{
    userName: { type: String, required: true, unique: true, sparse: true },
    email: { type: String, required: true, unique: true, sparse: true },
    name: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    header: {
      type: String,
      default:
        "https://i.pinimg.com/564x/5b/01/1c/5b011c6ef65dfded3a246cb856ed9a4a.jpg",
    },
    gender: { type: String },
    location: { type: String },
    bio: { type: String },
    requests: { type: Array, default: [] },
    friends: { type: Array, default: [] },
    posts: { type: [postSchema], default: [] },
  },
  {
    timestamps: true,
  }
```

Post model

```
 {
    text: { type: String, required: false },
    photo: { type: String, required: false },
    location: { type: String, required: true },
    locationId: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: { type: [commentSchema], required: false, default: [] },
  },
  {
    timestamps: true,
  }
```

Comment model



```
 {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
```



Admin model



```
 {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
```



## Backend routes

| HTTP Method | URL                                     | Request Body                              | Success status | Error Status | Description                                |
| ----------- | --------------------------------------- | ----------------------------------------- | -------------- | :----------: | ------------------------------------------ |
| GET         | `/api/users/`                           |                                           | 200            |     404      |                                            |
| GET         | `/api/users/getUser/:id`                |                                           | 200            |     404      |                                            |
| POST        | `/api/users/`                           | {name, userName, email, password }        | 200            |     404      |                                            |
| POST        | `/api/users/signin`                     | { email, password }                       | 200            |     404      |                                            |
| PUT         | `api/users/editProfile/:id`             | {all User Info}                           |                |              |                                            |
| GET         | `api/users/signOut`                     |                                           | 200            |     404      |                                            |
| DELETE      | `api/users/deleteUser/:id`              |                                           | 200            |     404      | delete user for admin                      |
| DELETE      | `api/users/deleteAccount/:id`           |                                           |                |              | delete account for user with remove cookie |
| GET         | `api/posts/getPosts/:id`                |                                           | 200            |     404      |                                            |
| POST        | `api/posts/addPost/:id`                 | { text, location, locationId,photo }      | 200            |     404      |                                            |
| DELETE      | `api/posts/deletePost`                  |                                           | 200            |     404      |                                            |
| GET         | `api/posts/getTimeLine/:id`             |                                           | 200            |     404      |                                            |
| GET         | `api/posts/getPostInfo/:userId/:postId` |                                           | 200            |     404      |                                            |
| POST        | `api/posts/addComment`                  | { userId, postId, commentText, senderId } |                |              |                                            |
| DELETE      | `api/posts/DeleteComment`               | { userId, postId, commentId }             | 200            |     404      |                                            |

## 🔗 Links

### PlaceX 

[Link to web app](https://placex-location.herokuapp.com/) 

<hr/>

### Trello

[Link to your trello board](https://trello.com/b/tkZUo191/final-project) 

<hr/>

### Slides

[Slides Link](https://docs.google.com/presentation/d/1HEiPSfnp2JHpzyN_fbmG46VJ-WZb1t6ook-d5Cu3CfY/edit?usp=sharing)

<hr/>

### Figma

[Figma Link](https://www.figma.com/file/y6oxGL6fvK6sqeOFMfapvF/FINAL-PROJECT?node-id=0%3A1)



