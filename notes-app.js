import * as notesMethods from "./crud.js";
import * as handleSubmit from "./handleSubmit.js";
import { NotesFull } from "./notes-full.js";
import { NotesModal } from "./notes-modal.js";

class NotesApp extends HTMLElement {
  constructor() {
    super();
    this.notesFull = this.querySelector("notes-full");
    this.notesModal = this.querySelector("notes-modal");

    this.attachShadow({ mode: "open" });
    this.editingId = null;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
      <link rel="stylesheet" href="./notes.css" />
      <header>
        <h1>Notes App</h1>
        <button class="addNewNote" popovertarget="#modal">Add Notes</button>
      </header>

      <main id="notes"></main>
  
      <slot></slot>
    `;
    this.main = this.shadowRoot.getElementById("notes");

    this.addButton = this.shadowRoot.querySelector(".addNewNote");

    this.addButton.addEventListener("click", () => {
      console.log(this.notesModal, this.notesFull);

      this.notesModal.modalTitle.textContent = "Add New Note";
      this.showModal();
      this.notesModal.form.reset();
      this.editingId = null;
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.notesModal.hideModal();
        this.editingId = null;
      }
    });

    this.renderNotes();
  }

  showModal() {
    this.notesModal.modal.showPopover();
  }
}
Object.assign(NotesApp.prototype, notesMethods);
Object.assign(NotesApp.prototype, handleSubmit);

customElements.define("notes-app", NotesApp);
customElements.define("notes-full", NotesFull);
customElements.define("notes-modal", NotesModal);
