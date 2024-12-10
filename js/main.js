// tabs logic
const tabs = document.querySelectorAll(".tab-btn");
const tabs_content = document.querySelectorAll(".tab-content");
tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabs_content.forEach((tab_content) => {
      tab_content.classList.remove("active");
    });
    tabs_content[index].classList.add("active");
  });
});

const boardButtons = document.getElementById("boardButtons");
const boardData = document.getElementById("myTabContent");
let boardCounter = 2;
let boards = [
  {
    id: 0,
    name: "Home",
    creationDate: Date.now,
    active: "active",
  },
  {
    id: 1,
    name: "archive",
    creationDate: Date.now,
    active: "",
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
  boardButtons.innerHTML = "";
  // boards.length == 0
  //   ? `<li class=" py-0 my-0 ps-5">
  //         <button
  //           class="tab-btn active text-d-gray px-4 rounded-top-3"
  //           type="button"
  //         >
  //           Home
  //         </button>
  //       </li>`
  //   : `<li class=" py-0 my-0 ps-5">
  //         <button
  //           class="tab-btn  text-d-gray px-4 rounded-top-3"
  //           type="button"
  //         >
  //           Home
  //         </button>
  //       </li>`;
  boardData.innerHTML =
    boards.length == 1
      ? `

      <div class="tab-content">archive</div>>`
      : ` 

      <div class="tab-content">archive</div>`;

  boards.forEach((board, index) => {
    const boardButton = `<li class=" py-0 my-0 ps-5">
            <button
              class="tab-btn ${board.active} active text-d-gray px-4 rounded-top-3"
              type="button"
              onclick = "activate(${index})"
            >
             ${board.name}
            </button>`;

    const boardInnerData = ` <div class="tab-content ${board.active} "> ${board.name}
</div>
`;

    boardData.insertAdjacentHTML("beforeend", boardInnerData);
    board.id == 1
      ? boardButtons.insertAdjacentHTML(
          "beforeend",
          `  <li class="nav-item" role="presentation">
      <button
        type="button"
        class="tab-btn rounded-5 border-0 px-3 py-1 bg-pink"
      >
        <i class="fa-solid fa-trash"></i>
        <span class="ps-1 text-white"> Archived</span>
      </button>
    </li>`
        )
      : boardButtons.insertAdjacentHTML("beforeend", boardButton);
  });
};

const activate = (index) => {
  boards.forEach((board) => {
    board.active = "";
  });
  boards[index].active = "active";
  renderBoarders();
  // tabs_content.forEach((tab_content) => {
  //   tab_content.classList.remove("active");
  // });
  // tabs_content[index].classList.add("active");
};
