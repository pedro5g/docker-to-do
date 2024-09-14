const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button"),
  snackbar = document.querySelector("#snackbar");

let notes;
let isUpdate = false;
let updateId;

addBox.addEventListener("click", () => {
  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});

function showNotes(notes) {
  document.querySelectorAll(".note").forEach((li) => li.remove());
  if (!notes || notes.length < 0) return;
  notes.forEach((note) => {
    let filterDesc = note.description?.replaceAll("\n", "<br/>");
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.createdAt}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${note.id}, '${note.title}', '${filterDesc}')"><i class="fa-solid fa-pen"></i>Editar</li>
                                    <li onclick="deleteNote(${note.id})"><i class="fa-solid fa-trash-can"></i>Excluir</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "i" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

async function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  await api(`tasks/${noteId}`, { method: "DELETE" })
    .then(() => {
      showSnackBar("Deleted with success");
      notes = notes.filter((note) => note.id !== noteId);
      showNotes(notes);
    })
    .catch(() => {
      showSnackBar("Failure to delete");
    });
}

function updateNote(noteId, title, filterDesc) {
  let description = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "Update a Note";
  addBtn.innerText = "Update Note";
}

addBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();

  if (title && description) {
    let noteInfo = { title, description };
    if (!isUpdate) {
      await api("tasks", { method: "POST", body: noteInfo })
        .then((res) => {
          showSnackBar("Created with success");
          notes.push({
            id: res.insertId.insertId,
            createdAt: res.created_at,
            ...noteInfo,
          });
        })
        .catch((e) => {
          showSnackBar("Failure to create");
        });
    } else {
      isUpdate = false;
      await api(`tasks/${updateId}`, {
        method: "PUT",
        body: noteInfo,
      })
        .then(() => {
          showSnackBar("Updated with success");
          const id = notes.findIndex((note) => note.id === updateId);
          notes[id].description = noteInfo.description;
          notes[id].title = noteInfo.title;
        })
        .catch((e) => showSnackBar("Failure to update"));
    }
    showNotes(notes);
    return closeIcon.click();
  }
  alert(`${description ? "title" : "description"} cannot be empty`);
});

async function api(path = "", config = {}) {
  const BASE_URL = `http://localhost:3000/${path}`;
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: config.method || "GET",
      body: JSON.stringify(config.body),
    });

    if (response.status === 204) {
      return true;
    }

    return await response.json();
  } catch (err) {
    throw err;
  }
}

const loadTasks = async () => {
  api("tasks", { method: "GET" })
    .then((res) => {
      notes = res.map(({ id, title, description, created_at }) => {
        return {
          id,
          title,
          description,
          createdAt: created_at,
        };
      });
      // console.log(notes);
      showNotes(notes);
    })
    .catch((e) => {
      showSnackBar("Failure to try getting tasks");
      console.error(e);
    });
};

const showSnackBar = (message) => {
  snackbar.className = "show";
  snackbar.innerHTML = message;
  setTimeout(() => {
    snackbar.classList.remove("show");
  }, 3000);
};

loadTasks();
