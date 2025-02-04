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
  this.notesModal.modalTitle.textContent = "Edit Note";
  this.showModal();
  const notes = this.getNotes();
  const note = notes.find((n) => n.id === id);
  if (note) {
    this.notesModal.inputTitle.value = note.title;
    this.notesModal.inputContent.value = note.body;
  }
}

export function renderNotes() {
  const notes = this.getNotes();

  notes.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  this.main.innerHTML = "";
  notes.forEach((note) => {
    const card = createNoteCard.call(this, note);
    this.main.appendChild(card);
  });
}

function createNoteCard(note) {
  const card = createElement("div", {
    className: "note-card",
    dataset: { id: note.id },
  });

  const titleEl = createElement("h3", {}, note.title);
  const bodyEl = createElement("p", {}, note.body);
  const createdEl = createElement(
    "small",
    {},
    `Created: ${new Date(note.createdAt).toLocaleString()}`
  );
  const archivedEl = createElement("small", {}, `Archived: ${note.archived}`);

  const editButton = createElement(
    "button",
    { className: "edit-button" },
    "Edit"
  );
  const deleteButton = createElement(
    "button",
    { className: "delete-button" },
    "Delete"
  );
  const buttonContainer = createElement(
    "div",
    { className: "button-container" },
    editButton,
    deleteButton
  );

  card.append(titleEl, bodyEl, createdEl, archivedEl, buttonContainer);

  card.addEventListener("click", (event) => {
    if (
      !event.target.classList.contains("edit-button") &&
      !event.target.classList.contains("delete-button")
    ) {
      this.notesFull.showFullNote(note.title, note.body);
    }
  });

  editButton.addEventListener("click", (event) => {
    event.stopPropagation();

    this.editNote(note.id);
  });

  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    this.deleteNote(note.id);
  });

  return card;
}
/**
 * @description Creates an HTML element
 * @param {string} tag - The tag name of the element to create
 * @param {object} props - The properties of the element to create
 * @param {...*} children - The children of the element to create
 * @returns {HTMLElement}
 */
export const createElement = (tag, props = {}, ...children) => {
  const element = document.createElement(tag);

  Object.keys(props).forEach((key) => {
    if (key === "className") {
      element.className = props[key];
    } else if (key === "dataset") {
      Object.entries(props[key]).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else if (key === "style") {
      Object.assign(element.style, props[key]);
    } else {
      element[key] = props[key];
    }
  });

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  });

  return element;
};
