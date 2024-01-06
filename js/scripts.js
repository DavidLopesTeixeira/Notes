// Elementos
const notesContainer = document.querySelector("#notes-container");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note");


// Funções

function showNotes() {
    getNotes().forEach((note) => {
        const noteElement = createNode(note.id, note.content, note.fixed);

        notesContainer.appendChild(noteElement);
    });
};

function addNote() {
    const notes = getNotes();
    console.log("Adcionando")
    console.log(noteInput.value)

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
    
        return element;
};

// LocalStorage

function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

        return notes;
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}


// Eventos
addNoteBtn.addEventListener("click", () => addNote());


// Start da aplicação
showNotes();