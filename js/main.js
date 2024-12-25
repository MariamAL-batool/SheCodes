const boardButtons = document.getElementById("boardButtons");
const boardData = document.getElementById("myTabContent");
const boardBody = document.getElementById("board-body");
let boardCounter = 1;

let isDragging = false;


// get boards with their notes from local storage and initialize the boards with a default Home board
const getBoards = () => {
  const boardData = localStorage.getItem('boards');
  return boardData ? JSON.parse(boardData) : [ { id: 0,   name: "Home",   creationDate: Date.now(),   active: "active",   notes: []  },];
} 
//store boards with their notes  to the local storage
const storeboards = () => {
  localStorage.setItem('boards', JSON.stringify(boards));
}
//get Archive Notes from  the local storage
const getArchiveNote = () => {
  const archiveNotes = localStorage.getItem('archive');
  return archiveNotes ? JSON.parse(archiveNotes) : [];
} 
// store  Archive Notes to the local storage
const storeArchiveNote = () => {
  localStorage.setItem('archive', JSON.stringify(archive));
}


let boards = getBoards();
let archive = getArchiveNote ();

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
      storeboards();
    }
  }
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
    const hoverControls = noteElement.querySelector(".hover-controls");
    const noteDate = noteElement.querySelector(".note-date");

    // Dragging functionality
    noteElement.addEventListener("mousedown", (e) => {
      // window.getComputedStyle show the actual dimensions of the element in the browser
      const noteStyle = window.getComputedStyle(noteElement);
      // e.clientX and e.clientY specify the location of the mouse pointer  relative to (x-axis and y-axis).
      //noteElement.offsetLeft  is the distance  between the left edge of the noteElement and the left edge of the document body 
      //noteElement.offsetTop  is the distance  between the top edge of the noteElement and the top edge of the document body 
      // isResizing checks whether the mouse pointer is near the bottom-right corner of the noteElement
      const isResizing = e.clientX >= noteElement.offsetLeft + parseInt(noteStyle.width) - 10 &&
                         e.clientY >=  noteElement.offsetTop + parseInt(noteStyle.height) - 10;
      // if not resizing start dragging 
      if (!isResizing) {
        isDragging = true;
      // startX  and startY  store the initial mouse position  relative to the   note element
        startX = e.clientX - noteElement.offsetLeft;
        startY = e.clientY - noteElement.offsetTop;

      // Add move and up event listeners specifically for this note
        const onMouseMove = (e) => {
          if (isDragging) {
            // Calculate the new X  and y position for dragging
            const newX = e.clientX - startX;
            const newY = e.clientY - startY;
           // Update the position of the note 
            noteElement.style.left = newX + "px";
            noteElement.style.top = newY + "px";
            note.left = newX;
            note.top = newY;

          }
        };

        const onMouseUp = () => {
          isDragging = false; 
          // Stop dragging
          document.removeEventListener("mousemove", onMouseMove);
          storeboards();
      
        };

        document.addEventListener("mousemove", onMouseMove);
       document.addEventListener("mouseup", onMouseUp);
      }
      
    });
  
    
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
  storeboards();
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
  storeboards();
};

// Update the background color of a specific note and save it to the note data
const changeNoteColor = (noteId, color) => {
  // Find the note in the active board's notes
  boards.forEach((board) => {
    if (board.active === "active") {
      const note = board.notes.find((n) => `${n.id}` === noteId);
      if (note) {
        note.color = color; // Update the note's color in the data
        storeboards();
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
        storeArchiveNote();
      }
    }
  });
};

const renderArchive = () => {
  boardBody.innerHTML = ""; 
  renderNotes(archive);
  storeboards();
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
  const activeBoard = boards.find((board) => board.active === "active");

  if (activeBoard && term.length >= 1) {
    const filteredItems = activeBoard.notes.filter((note) =>
      note.title.toLowerCase().includes(term)
    );
    renderNotes(filteredItems); 
  }  else {
    renderBoarders(); 
  }
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
