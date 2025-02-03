export function getNotes() {
  const stored = localStorage.getItem("Notes");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (err) {
      console.error("Error parsing stored notes", err);
      return [];
    }
  }
  return [];
}

export function saveNotes(notes) {
  localStorage.setItem("Notes", JSON.stringify(notes));
}

export function deleteNote(id) {
  let notes = this.getNotes();
  notes = notes.filter((note) => note.id !== id);
  this.saveNotes(notes);
  this.renderNotes();
}

export function editNote(id) {
  this.editingId = id;
  this.modalTitle.textContent = "Edit Note";
  this.showModal();
  const notes = this.getNotes();
  const note = notes.find((n) => n.id === id);
  if (note) {
    this.inputTitle.value = note.field1;
    this.inputContent.value = note.field2;
  }
}

export function renderNotes() {
  const notes = this.getNotes();
  notes.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  this.main.innerHTML = "";
  notes.forEach((note) => {
    const card = document.createElement("div");
    card.classList.add("note-card");
    card.dataset.id = note.id;
    card.innerHTML = /*html*/ `
    <h3>${note.field1}</h3>
    <p>${note.field2}</p>
    <small>Created: ${new Date(note.created_at).toLocaleString()}</small>
    <small>Updated: ${new Date(note.updated_at).toLocaleString()}</small>
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
        this.showFullNote(note.id);
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
