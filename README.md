# CPSC 484, Group 40: Dots to the Top
Test your reaction time in 30 seconds and gain points to add to your residential college's score!

## How to start
Our project uses HTML/CSS/JS, Phaser, and JSON. 

Download our ZIP file and run our game starting with index.html. There are no dependencies that need to be installed to play our game.

## Game description
Our project is a 1-player game that generates competition amongst people who are in the 17 Hillhouse space. The goal of our game is for a user to hit circles that randomly emerge around our screen and accumulate a score. After the game runs for 30 seconds, this score will contribute to the score of a residential college of your choosing.

## Game tasks
This game addresses two tasks.

First, we aim to create an application that is conscious of the user's potential time limitation while being in 17 Hillhouse. We indicate the time it takes to play our game upfront, implement a running timer during the game, provide an opportunity for users to exit the game at any given time during the experience. If a user leaves the screen, or the kinect does not sense a user, the game will reset.

Second, we aim to create an application that allows user to feel a sense of competition in a non-communal space like 17 Hillhouse and contribute to the Residential College community on Yale's campus. Because students feel an existing sense of pride to their Residential College, we aim to use that as incentive to play our game, contribute to their College, and meet other people who play for their own Residential College.

## Environment constraints
Because our game is a 1-player game, our program keeps track of the first user who selects the "Hover to start" button. If the user leaves or is moves out of range of the Kinect sensor, our program will reset, allowing others to play the game. There should only be one person interacting with the screen. While playing the game, please stand far enough away from the screen such that your hand can be detected to reach the top of the display screen.

## Collaboration record
This project was developed by Kenan Erol, Yoony Kim, and Karen Lin.

Kenan developed the final score page, select residential college page, confirmation page, and play again page. He leveraged JSON to store score values across residential colleges. 

Yoony developed the game scene and worked with aligning the kinect and display screen coordinates so that the tv can detect users and lock in one player into the game.

Karen developed the start scene and instruction scene, created the randomly generated circles, and connected phaser scenes to each other.

All members of the team worked together to ideate tasks, develop prototypes, and test using the display screen.