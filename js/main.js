const boardButtons = document.getElementById("boardButtons");
const boardData = document.getElementById("myTabContent");
const boardBody = document.getElementById("board-body");
let boardCounter = 1;

// initialize boards with default Home board
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

//function to add new board
const addBoard = () => {
  const boardName = prompt("Enter board name: ");
  // check if the board already exists
  if (boardName) {
    let exist = false;
    for (const board of boards) {
      if (board.name === boardName) {
        window.alert("Board already exist");
        exist = true;
        break;
      }
    }
    // create new board
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
  //  loop to render the boards tabs in the page
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

const add_new_note = () => {//defines note object and pushes it into notes array in the active board
 
  //Random note position
  const bodyWidth = window.innerWidth - 67.95;  //67.59 is navbar height, to avoid note display above it
  const bodyHeight = window.innerHeight - 67.95;
  const randomLeft = Math.floor(Math.random() * bodyWidth);
  const randomTop = Math.floor(Math.random() * bodyHeight);
  

  note = {
    id: Date.now(),
    title: "Enter your note...",
    date: date(),
    color: "#e8eaed",
    changeCounter: 0,
    left: randomLeft,
    top: randomTop,
  };
  boards.forEach((board) => {
    if (board.active == "active") {
      board.notes.push(note);
    }
  });

  renderBoarders();
};

const renderNotes = (notes) => { //render notes in the active board
  boardBody.innerHTML = "";
  notes.forEach((note) => {
    const noteHTML = `
      <div class="note" id="${note.id}" style="background-color: ${note.color}; left: ${note.left}px; top: ${note.top}px;">
  <textarea onchange="editNoteDate(${note.id})" placeholder="${note.title}" class="note-input" id="note"></textarea>
  <div class="note-date">${note.changeCounter > 1 ? "Edited On:" : "Added On:"} ${note.date}</div>
    <div class="hover-controls">
      <div class="color-controls">
        <div class="color-dot gray" onclick="changeNoteColor('${note.id}', '#e8eaed')"></div>
        <div class="color-dot red" onclick="changeNoteColor('${note.id}', '#FEAEAE')"></div>
        <div class="color-dot green" onclick="changeNoteColor('${note.id}', '#CDFCB6')"></div>
        <div class="color-dot blue" onclick="changeNoteColor('${note.id}', '#B6D7FC')"></div>
      </div>
      <button class="delete-btn " onclick="deleteNote(${note.id})">x</button>
    </div>
</div>
    `;

    boardBody.insertAdjacentHTML("beforeend", noteHTML);

    // Add hover functionality
    const noteElement = document.getElementById(`${note.id}`);
    noteElement.addEventListener("mousedown", (e) =>
      mouseDown(e, note, noteElement)
    );
    const hoverControls = noteElement.querySelector(".hover-controls");
    const noteDate = noteElement.querySelector(".note-date");

    //allow note resize and drag-drop             
    function mouseDown(e) {
      const computedStyle = window.getComputedStyle(noteElement);
      const isResizing =
        e.clientX >=
        noteElement.offsetLeft + parseInt(computedStyle.width, 10) - 10 &&
        e.clientY >=
        noteElement.offsetTop + parseInt(computedStyle.height, 10) - 10;

      if (!isResizing) {
        isDragging = true;

        startX = e.clientX - noteElement.offsetLeft;
        startY = e.clientY - noteElement.offsetTop;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      }
    }

    function onMouseMove(e) {
      if (isDragging) {
        const newX = e.clientX - startX;
        const newY = e.clientY - startY;

        noteElement.style.left = newX + "px";
        noteElement.style.top = newY + "px";

        note.left = newX;
        note.top = newY;
      }
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    
    noteElement.addEventListener("mouseenter", () => {
      hoverControls.style.display = "flex";
      noteDate.style.bottom = "25px";
    });

    noteElement.addEventListener("mouseleave", () => {
      hoverControls.style.display = "none";
      noteDate.style.bottom = "5px";
    });

    //Save text written in note
    noteElement.addEventListener("input", (e) => {
      note.title = e.target.value;
    });
  });
};

const editNoteDate = (noteId) => {
  let boardId;
  // find board of the note
  boards.forEach((board) => {
    if (board.active == "active") {
      boardId = board.id;
    }
  });
  // counter to check if the note was edited before or not
  changeCounter = ++boards[boardId].notes.find((note) => note.id === noteId)
    .changeCounter;

  currentNoteDate = document
    .getElementById(`${noteId}`)
    .getElementsByClassName("note-date");

  if (changeCounter > 1) {
    boards[boardId].notes.find((note) => note.id === noteId).date = date();
    currentNoteDate[0].innerHTML = `Edited On:  ${note.date}`;
    changeCounter = 0;
  }
};

// Update the background color of a specific note and save it to the note data
const changeNoteColor = (noteId, color) => {
  // Find the note in the active board's notes
  boards.forEach((board) => {
    if (board.active === "active") {
      const note = board.notes.find((n) => `${n.id}` === noteId);
      if (note) {
        note.color = color; // Update the note's color in the data
      }
    }
  });

  // Update the color of the  note
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
        noteToArchive.content = document
          .getElementById(`${noteId}`)
          .querySelector(".note-input").value; // Save user input
        archive.push(noteToArchive); // Move to archive
        renderBoarders();
      }
    }
  });
};

const renderArchive = () => {
  boardBody.innerHTML = ""; 
  renderNotes(archive);
};

// function to activate the archive when the user clicks on it
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

const search = (event) => { // filters notes based on entered term  
  const term = event.target.value.toLowerCase();
  boards.forEach((board) => {
    if (board.active == "active" && term.length >= 1) {
      const filteredItems = board.notes.filter((note) =>
        note.title.toLowerCase().includes(term)
      );
      renderNotes(filteredItems);
    } else {
      renderBoarders();
    }
  });
};

const date = () => {  //returns full-current date 
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth();
  var day = currentDate.getDate();
  var monthNames = ["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec.",];
  var dateStamp = monthNames[month] + " " + day + "," + year;
  return dateStamp;
};
