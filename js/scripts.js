// Elementos
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");

// Funções

function showNotes() {
  cleanNotes();

  getNotes().forEach((note) => {
    const noteElement = createNode(note.id, note.content, note.fixed);

    notesContainer.appendChild(noteElement);
  });
};

function cleanNotes() {
  notesContainer.replaceChildren([]);
};

function addNote() {
  const notes = getNotes();
  console.log("Adcionando");
  console.log(noteInput.value);

  const noteObject = {
    id: generateId(),
    content: noteInput.value,
    fixed: false,
  };

  const noteElement = createNode(noteObject.id, noteObject.content);

  notesContainer.appendChild(noteElement);

  notes.push(noteObject);

  saveNotes(notes);

  noteInput.value = "";
};

function generateId() {
  return Math.floor(Math.random() * 5000);
};

function createNode(id, content, fixed) {
  const element = document.createElement("div");
  element.classList.add("note");
  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.placeholder = "Adicione alguma coisa...";
  element.appendChild(textarea);

  const pinIcon = document.createElement("i");

  pinIcon.classList.add(...["bi", "bi-pin"]);

  element.appendChild(pinIcon);

  if (fixed) {
    element.classList.add("fixed");
  };

  // Eventos do elemento

  element.querySelector(".bi-pin").addEventListener("click", () => {
    toggleFixNote(id);
  });

  return element;
};

function toggleFixNote(id) {
  const notes = getNotes();

  const targetNotes = notes.filter((note) => note.id === id)[0];

  targetNotes.fixed = !targetNotes.fixed;

  saveNotes(notes);
  showNotes();
};

// LocalStorage

function getNotes() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

  return orderedNotes;
};

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Eventos
addNoteBtn.addEventListener("click", () => addNote());

// Start da aplicação
showNotes();
