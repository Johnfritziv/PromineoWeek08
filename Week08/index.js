// Menu app for recording a list of game consoles and games of each that you own.

class Console {
    constructor(name) {
        this.name = name;
        this.games = [];
        this.completeGames = this.games.filter((Game) => {Game.completeStatus === 'Complete';})  //These filter through the games list for games that are complete and incomplete for tracking purposes later.
        this.incompleteGames = this.games.filter((Game) => {Game.completeStatus === 'Incomplete';})
    }

    addGame(game) {
        if (game instanceof Game) {
            this.games.push(game);
        } else {
            throw new Error('You have not yet added that game.');
        }
    }

    info() {
        return `For the ${this.name} you own ${this.games.length} games`;
    }

    completedCheck() {
        `Here are the games you have yet to finish: ${this.incompleteGames} \n
        and here are the games you have already finished: ${this.completeGames}`; //This will provide two lists, using the filtered arrays from earlier to give all games divided into completed and incompleted status.
    }
}

class Game {
    constructor(name, genre, completeStatus) {
        this.name = name;
        this.genre = genre;
        this.completeStatus = completeStatus;
    }

    info() {
        return `${this.name} is a ${this.genre} game and is ${this.completeStatus}`;
    }
}

class Menu {
    constructor() {
        this.consoles = []
        this.selectedConsole = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createConsole();
                    break;
                case '2':
                    this.viewConsole();
                    break;
                case '3':
                    this.deleteConsole();
                    break;
                case '4':
                    this.displayConsoles();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Catch you next time!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new console
        2) view console
        3) delete console
        4) display all consoles
        `);
    }

    showConsoleMenuOptions(consoleInfo) {
        return prompt (`
        0) back
        1) create game
        2) delete game
        -----------------------
        ${consoleInfo}
        `);
    }

    displayConsoles() {
        let consoleString = '';
        for (let i = 0; i < this.consoles.length; i++) {
            consoleString += i + ') ' + this.consoles[i].name + '\n';
        }
        alert(consoleString); // This iterates through each console and displays the name to the user
    }

    createConsole() {
        let name = prompt('Enter name for new console:');
        this.consoles.push(new Console(name));
    }

    viewConsole() {
        let index = prompt('Enter the index of the console you wish to view:');
        if (index > -1 && index < this.consoles.length) {
            this.selectedConsole = this.consoles[index];
            let description = 'Console Name: ' + this.selectedConsole.name + '\n';

            for (let i = 0; i < this.selectedConsole.games.length; i++) {
                description += i + ') ' + this.selectedConsole.games[i].name + ' - ' + this.selectedConsole.games[i].completeStatus + '\n'; // This shows you all the games on the console and lists whether or not they are completed. Does not show genre.
            }

            let selection = this.showConsoleMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createGame();
                    break;
                case '2':
                    this.deleteGame();
            }
        }
    }

    deleteConsole() {
        let index = prompt('Enter the index of the console you wish to delete:');
        if (index > -1 && index < this.consoles.length) {
            this.consoles.splice(index, 1);
        }
    }

    createGame() {
        let name = prompt('Enter name for new game:');
        let genre = prompt('Enter the genre of the game:');
        let completeStatus = prompt('Enter "Complete" if you have finished the game, or "Incomplete" if you have not:');
        this.selectedConsole.games.push(new Game(name, genre, completeStatus));
    }

    deleteGame() {
        let index = prompt('Enter the index of the game you wish to delete:');
        if (index > -1 && index < this.selectedConsole.games.length) {
            this.selectedConsole.games.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start(); //Creates the menu itself and opens it up to run.