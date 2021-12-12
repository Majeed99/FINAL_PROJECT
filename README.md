# PlaceX	

## Description

***placeX*** it's an website that help you to communicate with your friends ,and let you share posts with any place around you to let them know now places, such as: restaurant ,café ,  cinema ,etc..



## User Stories

- **SignUp:** As a user I can sign up in the website so that I can start posting my location.
- **SignIn:** As a user I can login to the website.
- **Logout:** As a user I can logout from the website so no one else can use it.
- ***Edit Profile*** As a user I can edit any of my profile info.
- **Add Post** As a user I can add an post with my location with text or photo.
- **Delete Post** As a user I can delete any of my posts.
- ***Search Of User***  As a user I can search of any user by his userName.
- ***Request New Friend***  As a user I can make request for any of the users.
- ***Accept Or Reject Request*** As a user I can accept or reject any user's request.
- ***View Friends Posts*** As a user I want to see the friends posts.
- ***Comment On Posts*** As a user I can add comment of any posts.



# Client / Frontend

## React Router Routes (React App)

| Path           | Component/page | Permissions | Behavior            |
| -------------- | -------------- | ----------- | ------------------- |
| `/`            | HomePage       | public      | Home page           |
| `/signup`      | SignUp         | anon only   | Signup form         |
| `/SignIn`      | SignIn         | anon only   | Login form          |
| `/TimeLine`    | TimeLine       | user only   | Shows all posts     |
| `/Profile`     | Profile        | user only   | Edits a exit points |
| `/Friends`     | Friends        | user only   | see all friends     |
| `/EditProfile` | EditProfile    | user only   | Edit user profile   |
|                |                |             |                     |
|                |                |             |                     |
|                |                |             |                     |
|                |                |             |                     |
|                |                |             |                     |
|                |                |             |                     |
|                |                |             |                     |

## Components

- Loading
- NavBar
- PostCard
- useGeoLocation
- userStatus

## Pages

- SignIn
- SignUp
- Profile
- EditProfile
- HomePage
- TimeLine
- Friends



# Server / Backend

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
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
```



## Backend routes

| HTTP Method | URL                         | Request Body                             | Success status | Error Status | Description |
| ----------- | --------------------------- | ---------------------------------------- | -------------- | :----------: | ----------- |
| GET         | `/api/users/`               |                                          | 200            |     404      |             |
| GET         | `/api/users/getUser/:id`    |                                          | 200            |     404      |             |
| POST        | `/api/users/`               | {name, userName, email, password }       | 200            |     404      |             |
| POST        | `/api/users/signin`         | { email, password }                      | 200            |     404      |             |
| PUT         | `api/users/editProfile/:id` | {all User Info}                          |                |              |             |
| GET         | `api/users/signOut`         |                                          | 200            |     404      |             |
|             |                             |                                          |                |              |             |
| GET         | `api/posts/getPosts/:id`    |                                          | 200            |     404      |             |
| POST        | `api/posts/addPost`         | { id, text, location, locationId,photo } | 200            |     404      |             |
| DELETE      | `api/posts/deletePost`      |                                          | 200            |     404      |             |

## Links

### Trello

[Link to your trello board](https://trello.com/b/tkZUo191/final-project) 

<hr/>

### Git hub

[repository Link](https://github.com/Majeed99/FINAL_PROJECT)

<hr/>

### Slides

[Slides Link](https://docs.google.com/presentation/d/1HEiPSfnp2JHpzyN_fbmG46VJ-WZb1t6ook-d5Cu3CfY/edit?usp=sharing)

<hr/>

### Figma

[Figma Link](https://www.figma.com/file/y6oxGL6fvK6sqeOFMfapvF/FINAL-PROJECT?node-id=0%3A1)



