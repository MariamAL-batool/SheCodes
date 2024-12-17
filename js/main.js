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
let archive = [];
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
        notes: [],
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


    boardButtons.insertAdjacentHTML("beforeend", boardButton);
    if (board.notes.length >= 1 && board.active == "active") {
      renderNotes(board.notes);
    }
  });
};

renderBoarders();

const add_new_note = () => {
  //defines note object and pushes it to notes array

  note = {
    id: Date.now(),
    title: "Enter your note...",
    date: date(),
    color: "#e8eaed",
  };
  boards.forEach((board) => {
    if (board.active == "active") {
      board.notes.push(note);
    }
  });

  renderBoarders();
};
const renderNotes = (notes) => {
  boardBody.innerHTML = ""; // Clear previous notes

  notes.forEach((note) => {
    const noteHTML = `
      <div class="note" id="note-${note.id}" style=" background-color: ${note.color};">

       <textarea placeholder="${note.title}" class="note-input" id="note"  "></textarea>

        <div class="note-date"> Added On: ${note.date} </div>

        <div class="hover-controls">
          <div class="color-dot gray" onclick="changeNoteColor('note-${note.id}', '#e8eaed')"></div>
          <div class="color-dot red" onclick="changeNoteColor('note-${note.id}', '#FEAEAE')"></div>
          <div class="color-dot green" onclick="changeNoteColor('note-${note.id}', '#CDFCB6')"></div>
          <div class="color-dot blue" onclick="changeNoteColor('note-${note.id}', '#B6D7FC')"></div>
          <button class="delete-btn" onclick="deleteNote(${note.id})">x</button>

        </div>
      </div>
    `;

    boardBody.insertAdjacentHTML("beforeend", noteHTML);

    // Add hover functionality
    const noteElement = document.getElementById(`note-${note.id}`);
    const hoverControls = noteElement.querySelector(".hover-controls");
    const noteDate = noteElement.querySelector(".note-date");

    noteElement.addEventListener("mouseenter", () => {
      hoverControls.style.display = "flex";
      noteDate.style.bottom = "35px";
    });

    noteElement.addEventListener("mouseleave", () => {
      hoverControls.style.display = "none";
      noteDate.style.bottom = "5px";
    });

    //Save text written in note 
    noteElement.addEventListener("input", (e) => {
      note.title = e.target.value;
    })

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
// Delete a note and move it to the archive
const deleteNote = (noteId) => {
  boards.forEach((board) => {
    if (board.active === "active") {
      const noteIndex = board.notes.findIndex((note) => note.id === noteId);
      if (noteIndex !== -1) {
        const noteToArchive = board.notes.splice(noteIndex, 1)[0];
        noteToArchive.content = document.getElementById(`note-${noteId}`).querySelector('.note-input').value; // Save user input
        archive.push(noteToArchive); // Move to archive
        renderBoarders();
      }
    }
  });
};

const renderArchive = () => {
  boardBody.innerHTML = ""; // Clear board body
  archive.forEach((note) => {
    const noteHTML = `
      <div class="note" style="background-color: ${note.color || "#e8eaed"};">
         <textarea  placeholder="${note.title}" disabled class="note-input"></textarea>
        <div class="note-date"> Archived On: ${note.date} </div>
      </div>
    `;
    boardBody.insertAdjacentHTML("beforeend", noteHTML);
  });
};


const activeteArchive = () => {
  boards.forEach((board) => {
    board.active = "";
  });
  boardData.innerHTML = `<div class="tab-content active">archive</div>`;
  renderArchive();
};

const activate = (index) => {
  boards.forEach((board) => {
    board.active = "";
  });
  boards[index].active = "active";
  renderBoarders();
};

const search = (event) => {
  const term = event.target.value.toLowerCase();
  boards.forEach((board) => {
    if (board.active == "active" && term.length >= 1) {
      const filteredItems = board.notes.filter(note => note.title.toLowerCase().includes(term));
      renderNotes(filteredItems);
    }
    else {
      renderBoarders();
    }
  });

}


const date = () => {
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var day = currentDate.getDate();
  var monthNames = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May.",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  var dateStamp = monthNames[month] + " " + day + "," + year;
  return dateStamp;
};
