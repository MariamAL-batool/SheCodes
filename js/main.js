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
  boardBody.innerHTML = ""; // Clear previous notes

  notes.forEach((note) => {
    // Set the default color if not already set
    if (!note.color) {
      note.color = "#efefef"; // Default note color
    }

    const noteHTML = `
      <div class="note" id="note-${note.id}" style="position: relative; background-color: ${note.color};">
        <input 
          type="text" 
          placeholder="Enter your note..." 
          style="width: 100%; height: 75%; border: none; outline: none; background: transparent;"
        >
        <div class="hover-controls" style="display: none; position: absolute; bottom: 5px; right: 5px;">
          <div class="color-dot red" onclick="changeNoteColor('note-${note.id}', '#f28b82')"></div>
          <div class="color-dot green" onclick="changeNoteColor('note-${note.id}', '#ccff90')"></div>
          <div class="color-dot blue" onclick="changeNoteColor('note-${note.id}', '#aecbfa')"></div>
          <div class="color-dot gray" onclick="changeNoteColor('note-${note.id}', '#e8eaed')"></div>
        </div>
        <div 
          class="note-date" 
          style="position: absolute; bottom: 5px; left: 5px; font-size: 10px; color: gray; transition: all 0.3s ease;"
        >
          Added On: ${note.date}
        </div>
      </div>
    `;

    boardBody.insertAdjacentHTML('beforeend', noteHTML);

    // Add hover functionality
    const noteElement = document.getElementById(`note-${note.id}`);
    const hoverControls = noteElement.querySelector('.hover-controls');
    const noteDate = noteElement.querySelector('.note-date');

    noteElement.addEventListener('mouseenter', () => {
      hoverControls.style.display = 'flex';
      noteDate.style.bottom = '35px'; // Move the date above the color dots
    });

    noteElement.addEventListener('mouseleave', () => {
      hoverControls.style.display = 'none';
      noteDate.style.bottom = '5px'; // Reset the date position
    });
  });
};

// Update the background color of a specific note and save it to the note data
const changeNoteColor = (noteId, color) => {
  // Find the note in the active board's notes
  boards.forEach((board) => {
    if (board.active === "active") {
      const note = board.notes.find((n) => `note-${n.id}` === noteId);
      if (note) {
        note.color = color; // Update the note's color in the data
      }
    }
  });

  // Update the UI for the specific note
  const noteElement = document.getElementById(noteId);
  if (noteElement) {
    noteElement.style.backgroundColor = color;
  }
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