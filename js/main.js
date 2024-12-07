const boardButtons = document.getElementById("boardButtons");
const boardData = document.getElementById("myTabContent");
let boardCounter = 0;
let boards = [];
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
    if (boardName === "Home") {
      window.alert("Board already exists");
      exist = true;
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
      console.log(boards);
      boardCounter++;
      renderBoarders();
    }
  }
};

const renderBoarders = () => {
  boardButtons.innerHTML =
    boards.length == 0
      ? `<li class="nav-item py-0 my-0 ps-5" role="presentation">
            <button
              class="nav-link active text-d-gray px-4 rounded-top-3"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
Home            </button>
          </li>`
      : `<li class="nav-item py-0 my-0 ps-5" role="presentation">
            <button
              class="nav-link text-d-gray px-4 rounded-top-3"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
Home            </button>
          </li>`;
  boardData.innerHTML =
    boards.length == 0
      ? ` <div
        class="tab-pane fade show active "
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
Home
      </div>
  
      <div
        class="tab-pane fade"
        id="archive"
        role="tabpanel"
        aria-labelledby="archive-tab"
      >
        archive
      </div>`
      : ` <div
        class="tab-pane fade   "
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
Home
      </div>
  
      <div
        class="tab-pane fade"
        id="archive"
        role="tabpanel"
        aria-labelledby="archive-tab"
      >
        archive
      </div>`;

  boards.forEach((board) => {
    const boardButton = ` <li class="nav-item py-0 my-0 " role="presentation">
            <button
              class="nav-link ${board.active}  text-d-gray px-4 rounded-top-3"
              id="${board.id}-tab"
              data-bs-toggle="tab"
              data-bs-target="#${board.id}"
              type="button"
              role="tab"
              aria-controls="${board.id}"
              aria-selected="true"
            >
             ${board.name}
            </button>
          </li>`;

    const boardInnerData = ` <div
        class="tab-pane fade ${board.active == "active" ? "active show" : ""}"
        id="${board.id}"
        role="tabpanel"
        aria-labelledby="${board.id}-tab"
      >
                     ${board.name}

      </div>`;

    boardData.insertAdjacentHTML("beforeend", boardInnerData);
    boardButtons.insertAdjacentHTML("beforeend", boardButton);
  });
};
