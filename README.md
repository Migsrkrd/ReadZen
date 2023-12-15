# ReadZen 

## Description

[Visit the Deployed Site](https://read-zen.onrender.com/generate)

This application is a fullstack app designed for generating and sharing READMEs in an efficient and convenient way. We utilize React to render our front-end, Apollo Server for our back-end, and MongoDB/Mongoose for our data storage. ReadZen allows users to input information field by field to generate the exact README that they have in mind. READMEs can be saved to a user and viewed on their profile page, and from there they can download the markdown file or publish it so that it can be viewed on the discover page. A list of published READMEs can be liked or commented on for users who are logged in, and the markdown preview can be viewed by clicking on the card.

![Demonstration gif](client/public/assets/Animation.gif)

## Table of Contents

- [Title](#title)

- [Description](#description)

- [Installation](#installation)

- [Usage](#usage)

- [Credits](#credits)

- [License](#license)

- [Tests](#tests)

## Installation

 To install the application on your local machine, start by cloning the repository to a local file. Once the application has been cloned and you have navigated into the source folder via your terminal, run the command 'npm i' to install all of the needed dependencies. Once the dependencies have been installed, you can run the commands 'npm run build' and 'npm start' to run the server on your local machine or 'npm run develop' to run the application without needing a build.

## Usage

 If the application is installed on your local machine you can navigate to the [local url](http://localhost:3000/) to see the client side of the application, or you can head to the [officially deployed link](https://read-zen.onrender.com/generate). Once the user has navigated to the site, they will be met with the home page, which doubles as the discover page. A user can either browse all of the published READMEs of other users, or they can login to generate their own. The discover page allows a logged in user to like and comment on public READMEs as well, while any user can view the preview markdown, the comment section, or navigate to any associated links to that project.

## Credits

 This application was designed by [David Wright](https://github.com/d-a-v-i-d-w-r-i-g-h-t), [Michael Reickerd](https://github.com/Migsrkrd), [James Hunter](https://github.com/jamessahunter) and [James Waller](https://github.com/DistantDig). Each individuals Github profile can be viewed by clicking on their respective name.

## License

 MIT License

Copyright (c) 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Test

 No automatic methods of testing are included in this project, however feel free to fork the project and add some! Otherwise feel free to just experiment with the project and create issues for any odd behavior.

This README was generated with [ReadZen](https://read-zen.onrender.com/generate)!