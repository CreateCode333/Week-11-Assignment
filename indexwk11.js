


    document.addEventListener('DOMContentLoaded', function() {
      const board = document.getElementById('game-board');
      const cells = [];
      let currentPlayer = 'X';
      let gameActive = true;

      // The code below initializes the game board
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        cells.push(cell);
        board.appendChild(cell);
      }

      // Here is where I display whose turn it is
      updateGameInfo();

      // I used a function handleCellClick to respond to user clicks on the game board
      function handleCellClick() {
        const cellIndex = this.dataset.index;
        if (!gameActive || cells[cellIndex].textContent !== '') return;

        cells[cellIndex].textContent = currentPlayer;
        checkGameStatus();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateGameInfo();
      }

      // The cpde below uses a function to update the game
      function updateGameInfo() {
        document.getElementById('game-info').textContent = `Current turn: ${currentPlayer}`;
      }

      // The code below uses a function, checkGameStatus to check if the game has ended
      function checkGameStatus() {
        const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
          const [a, b, c] = combination;
          if (cells[a].textContent !== '' &&
              cells[a].textContent === cells[b].textContent &&
              cells[a].textContent === cells[c].textContent) {
            // Highlight winning cells
            cells[a].classList.add('bg-success', 'text-white');
            cells[b].classList.add('bg-success', 'text-white');
            cells[c].classList.add('bg-success', 'text-white');

            // The code below alerts out a winner
            const winner = currentPlayer === 'X' ? 'O' : 'X';
            showGameAlert(`Player ${winner} wins!`);
            gameActive = false;
            return;
          }
        }

        // The code below checks for a tie and if there is a tie it gives the message "Darn, it's a tie!" 
        if (![...cells].some(cell => cell.textContent === '')) {
          showGameAlert(`Darn, it's a tie!`);
          gameActive = false;
        }
      }

      // The code below uses a button to restart the game after you click the button.
      document.getElementById('restart-btn').addEventListener('click', function() {
        resetGame();
      });

      // Reset the game
      function resetGame() {
        cells.forEach(cell => {
          cell.textContent = '';
          cell.classList.remove('bg-success', 'text-white');
        });
        currentPlayer = 'X';
        gameActive = true;
        updateGameInfo();
        hideGameAlert();
      }

      // Show game result alert
      function showGameAlert(message) {
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert', 'alert-info', 'text-center', 'mt-4');
        alertElement.textContent = message;
        document.body.appendChild(alertElement);
      }

      // Hide game result alert
      function hideGameAlert() {
        const alertElement = document.querySelector('.alert');
        if (alertElement) {
          alertElement.remove();
        }
      }
    })