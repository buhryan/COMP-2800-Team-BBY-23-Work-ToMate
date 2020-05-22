## project-2800
BCIT 2020 Comp 2800 Group 23 project 


## Developers
* Bryan Xing
* Calvin Loungsay
* Jessica Chu
* Boming Gong

* [General info](#general-info)
* [Technologies](#technologies)
* [Content](#content)
* [Testing Plans](#testing)
* [Install](#install)


## General Info
This browser based web application allows users to create task lists and use a timer to increase their productivity. Users can add other users as friends and join groups to have work sessions together. Users will are planned to be able to chat with each other also (in development). 
Hosted at: [https://worktomate.web.app](https://worktomate.web.app)

This small project demonstrates:
* read and write to Cloud Firestore, a non-sql database
* usage of Svelte components to create reactive pages
* usage of Tinro to route Svelte pages


## Technologies
Technologies that were used for this project:
* Svelte
* Node.js
* Firebase Hosting
* Firebase Firestore Database
* HTML, CSS
* JavaScript
* Bootstrap 
* Rollup

## Content
Content of the project folder:

```
Top level of project folder:
├── .firebaserc             # Firebase dependency
├── README.md                       
├── firebase.json           # firebase json file
├── firestore.indexes.json  # firebase file for indexes
├── firestore.rules         # determines the read, write rules for Firestore
├── package-lock.json       # exact, version dependency tree for package.json
├── package.json            # dependencies of the project, indicates node modules to download
├── rollup.config.js        # config file for hosting with rollup
└── .gitignore              # Git ignore file

It has the following subfolders:
├── .firebase               # contains files for firebase database
├── image                   # contains images used in project
├── public                  # contains the build file and bundle when deployed
├── sounds                  # contains audio files that are played 
├── src                     # contains the Svelte component files 
├── styles                  # contains the CSS styles used
```


## Testing
Testing plan for the app : [Test plan](https://docs.google.com/spreadsheets/d/1IqETozs5mIn3EoRmYyf8AoEkzyUo08cGLM8VtXBpKHY/edit?usp=sharing)

	
## Install

1. Code editor of choice: [Visual Studio Code](https://code.visualstudio.com/)

2. Install LTS ver of [Node.js](https://nodejs.org/en/download/)

3. Clone the repo onto your computer
```shell
$ git clone https://github.com/buhryan/COMP-2800-Team-BBY-23-Work-ToMate
```
4. Go to the file in your command line

5. Install dependencies from package.json
```shell
$ npm install
```
6. Run the app in a terminal command line 
```shell
$ npm run dev
```
App should now be accessible at localhost:5000
