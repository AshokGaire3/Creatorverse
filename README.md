# WEB103 Prework - *Creatorverse*

Submitted by: **Ashok Gaire**

About this web app: **Creatorverse is a frontend web application that allows users to perform CRUD (Create, Read, Update, Delete) operations on their favorite content creators, keeping track of their channels, descriptions, and avatars.**

Time spent: **8 hours** spent in total

## Required Features

The following **required** functionality is completed:

- [x] Use a logical component structure in React to create the frontend of the app
- [x] Display at least five content creators on the homepage of the app
- [x] Each content creator item includes:
  - [x] their name
  - [x] a link to their channel or page
  - [x] a short description of their content
- [x] API calls use the async/await design pattern via Axios or fetch
- [x] Clicking on a content creator item takes the user to their details page, which includes their name, url, and description
- [x] Each content creator has their own unique URL
- [x] The user can edit a content creator to change their name, url, or description
- [x] The user can delete a content creator
- [x] The user can add a new content creator by entering a name, url, and description
- [x] The new content creator then appears in the displayed list

## Stretch Features

The following **stretch** features are implemented:

- [x] Use Picocss to style HTML elements
- [x] Display content creator items in a creative format, like cards instead of a list
- [x] Show an image of each content creator on their content creator card

## Video Walkthrough

Here's a video walkthrough of the implemented user stories:
[Video Walkthrough](https://youtu.be/l4VualJFrBE)

## Demo

Here's a screenshot of the application:

![Demo Picture](public/demo.png)

## Notes

The main challenges I encountered while building the app were getting the Supabase client configured properly to handle the CRUD operations efficiently, and setting up the routes with React Router so that the user flow from adding a creator to viewing their details felt seamless. I also focused heavily on styling the cards to make the interface look modern and visually appealing.

## License

    Copyright [2026] [Ashok Gaire]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
