const boardButtons = document.getElementById("boardButtons");
const boardData = document.getElementById("myTabContent");
const boardBody = document.getElementById("board-body");
let boardCounter = 1;

let boards = [
  {
    id: 0,
    name: "Home",
    creationDate: Date.now,
    active: "active",
    notes: [],
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
         notes : [],
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
  boardBody.innerHTML = " ";

  boards.forEach((board, index) => {
    const boardButton = `<li class=" py-0 my-0 ">
            <button
              class="tab-btn ${board.active} text-d-gray"
              type="button"
              onclick = "activate(${index})"
            >
             ${board.name}
            </button>`;
    
    if (board.active == "active") {
      boardData.innerHTML = `<div class="tab-content ${board.active} "> ${board.name}</div>`;
    }
    boardButtons.insertAdjacentHTML("beforeend", boardButton);
    if (board.notes.length >= 1 && board.active == "active") 
       {renderNotes(board.notes);}
  });
};

renderBoarders();

const add_new_note = () => { //defines note object and pushes it to notes array

  note = {
    id: Date.now(),
    date: date()
  }
  boards.forEach((board) => {
    if (board.active == "active") {
     board.notes.push(note);
    }

  })
  
  renderBoarders();
  
}
const renderNotes = (notes) => {
  boardBody.innerHTML = " ";
  notes.forEach((note) => {

    boardBody.insertAdjacentHTML('afterbegin', `<input type="text" class="note" id=${note.id} placeholder="Added On: ${note.date} ">`);

  });


};
const activate = (index) => {
  boards.forEach((board) => {
    board.active = "";
  });
  boards[index].active = "active";
  renderBoarders();
};

const activeteArchive = () => {
  boards.forEach((board) => {
    board.active = "";
  });
  renderBoarders();

  boardData.innerHTML = `<div class="tab-content active">archive</div>`;
};

const date = () => { //Returns today's date
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var day = currentDate.getDate();
  var monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  var dateStamp = monthNames[month] + " " + day + "," + year;
  return dateStamp;
}