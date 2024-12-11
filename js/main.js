// tabs logic

const boardButtons = document.getElementById("boardButtons");
const boardData = document.getElementById("myTabContent");
let boardCounter = 1;
let boards = [
  {
    id: 0,
    name: "Home",
    creationDate: Date.now,
    active: "active",
  },
];

const addBoard = () => {
  const boardName = prompt("Enter board name: ");
  if (boardName) {
    let exist = false;
    for (const board of boards) {
      if (board.name === boardName) {
        window.alert("Board already exists");
        exist = true;
        break;
      }
    }

    if (!exist) {
      const newBoard = {
        id: boardCounter,
        name: boardName,
        creationDate: Date.now,
        active: "active",
      };
      boards.forEach((board) => {
        board.active = "";
      });
      boards.push(newBoard);
      boardCounter++;
      renderBoarders();
    }
  }
};

const renderBoarders = () => {
  boardButtons.innerHTML = "";

  boards.forEach((board, index) => {
    const boardButton = `<li class=" py-0 my-0 ps-5">
            <button
              class="tab-btn ${board.active} active text-d-gray px-4 rounded-top-3"
              type="button"
              onclick = "activate(${index})"
            >
             ${board.name}
            </button>`;

    if (board.active == "active") {
      boardData.innerHTML = `<div class="tab-content ${board.active} "> ${board.name}</div>`;
    }
    boardButtons.insertAdjacentHTML("beforeend", boardButton);
  });
};

renderBoarders();

const activate = (index) => {
  boards.forEach((board) => {
    board.active = "";
  });
  boards[index].active = "active";
  renderBoarders();
};

const activeteArchive = () => {
  boardData.innerHTML = `<div class="tab-content active">archive</div>`;
};
