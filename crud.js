import { notesData } from "./data.js";
export function getNotes() {
  const stored = localStorage.getItem("Notes");
  const data = stored ? JSON.parse(stored) : null;
  const newNotesData = notesData.filter((note) => {
    return !data?.some((d) => d.id !== note.id);
  });
  const missingData = notesData.filter((note) => {
    return !data?.some((d) => d.id == note.id);
  });
  if (newNotesData.length === 1) {
    return data;
  }
  if (newNotesData.length !== 0) {
    localStorage.setItem("Notes", JSON.stringify(newNotesData));
    return newNotesData;
  }

  if (stored) {
    try {
      return data;
    } catch (err) {
      console.error("Error parsing stored notes", err);
      return [];
    }
  }
  return [];
}

export function saveNotes(notes) {
  console.log(notes);

  localStorage.setItem("Notes", JSON.stringify(notes));
}

export function deleteNote(id) {
  let notes = this.getNotes();
  console.log(notes);
  notes = notes.filter((note) => note.id !== id);
  console.log(notes);

  this.saveNotes(notes);
  this.renderNotes();
}

export function editNote(id) {
  console.log(id);

  this.editingId = id;
  this.modalTitle.textContent = "Edit Note";
  this.showModal();
  const notes = this.getNotes();
  const note = notes.find((n) => n.id === id);
  if (note) {
    this.inputTitle.value = note.title;
    this.inputContent.value = note.body;
  }
}

export function renderNotes() {
  const notes = this.getNotes();

  notes.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  this.main.innerHTML = "";
  notes.forEach((note) => {
    const card = document.createElement("div");
    card.classList.add("note-card");
    card.dataset.id = note.id;
    card.innerHTML = /*html*/ `
    <h3>${note.title}</h3>
    <p>${note.body}</p>
    <small>Created: ${new Date(note.createdAt).toLocaleString()}</small>
    <small>Archived: ${note.archived}</small>
    <div style="margin-top: 0.5rem;">
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
    </div>
    `;
    card.addEventListener("click", (event) => {
      if (
        !event.target.classList.contains("edit-button") &&
        !event.target.classList.contains("delete-button")
      ) {
        this.notesFull.showFullNote(note.title, note.body);
      }
    });
    card.querySelector(".edit-button").addEventListener("click", (event) => {
      event.stopPropagation();
      this.editNote(note.id);
    });
    card.querySelector(".delete-button").addEventListener("click", (event) => {
      event.stopPropagation();
      this.deleteNote(note.id);
    });

    this.main.appendChild(card);
  });
}
