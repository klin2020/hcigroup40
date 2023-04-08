# demo-p5js
Demo of the [p5.js library](https://p5js.org)

This demo implements the classic [Snake game](https://p5js.org/examples/interaction-snake-game.html) on the interactive system for [CPSC 484/584 Intro. to HCI](https://cpsc484-584-hci.gitlab.io/s23/project).

Specifically, the game itself is implemented with p5.js and the data are obtained via a WebSocket.
Technical details for the interactive systems are available on the [course website](https://cpsc484-584-hci.gitlab.io/s23/display_tutorial).


## Quickstart

Clone this repository and open `index.html` in a web browser.
Note that you must be connected to the Yale network.

To quickly view the game responding to actual data, start the [recorder utility](https://github.com/Yale-CPSC484-HCI/recorder) in play mode:

```
$ cd ~/recorder
$ pipenv run python src/main.py --data-path data/sample2 --mode play
```

The default host is `localhost:4444`, which you can modify in `sketch.js`


## System Overview

Three files in this repository define the project's structure:

+ `index.html`: defines the elements of the webpage (excluding the dynamic game elements, which are defined in `sketch.js`).
+ `style.css`: defines the style properties of the elements of the webpage.
+ `sketch.js`: defines the game interaction and websocket connection.

Most of the components that actually implement the game are defined in `sketch.js`.
At a high level, the components defined therein open a websocket to one of the HCI displays, process body tracking data from the Kinect sensor to obtain a command, send that command to the game, and update the game objects and game score.
The following block diagram illustrates the components defined in `sketch.js`:

![snake game block diagram](./docs/snake_game_block_diagram.png)


## Publishing Your Own Changes to This Project

In order to publish changes that you make to this project, you should fork this repository and push changes to that fork.

Here are the steps, in order:
1. Fork this repo by following the instructions in the [GitHub documentation on forks](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
2. Clone the forked repository. Make sure to clone the URL for SSH authentication!

```
$ cd ~
$ git clone git@github.com:<your forked repo>
$ cd ~/demo-p5js
```

3. Make any changes to the files in your cloned repository.
4. Commit and push to your cloned repository

```
$ cd ~/demo-p5js
$ git add <files you edited>
$ git commit -m "helpful commit message!"
$ git push origin main
```

5. The pushed changes should be visible on GitHub!

If you cloned the repository with HTTPS instead of SSH, you will get an authentication error when trying to push.
To convert the remote URL to SSH, follow [this GitHub tutorial on managing remote repositories](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#switching-remote-urls-from-ssh-to-https).
If you haven't yet configured an SSH key for your GitHub account, you should follow [this GitHub tutorial on adding SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).
