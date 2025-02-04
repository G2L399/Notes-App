import * as notesMethods from "./crud.js";
import * as handleSubmit from "./handleSubmit.js";
import { NotesFull } from "./notes-full.js";

class NotesApp extends HTMLElement {
  constructor() {
    super();
    this.notesFull = this.querySelector("notes-full");

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
      <!-- Modal for adding/editing notes -->
      <div class="modalParent" popover="manual" id="modal">
        <div class="modal">
          <div class="modal-content">
            <header>
              <h2>Add New Note</h2>
              <button class="close-button" popovertarget="#modal">
                &times;
              </button>
            </header>
            <form id="noteForm">
              <div class="form-group">
                <label for="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  minlength="4"
                  name="title"
                  required
                />
              </div>
              <div class="form-group">
                <label for="content">Content:</label>
                <textarea id="content" name="content" required></textarea>
              </div>
              <div class="submitButton">
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <slot></slot>
    `;

    this.modal = this.shadowRoot.getElementById("modal");

    this.inputTitle = this.shadowRoot.getElementById("title");
    this.inputContent = this.shadowRoot.getElementById("content");
    this.form = this.shadowRoot.getElementById("noteForm");
    this.main = this.shadowRoot.getElementById("notes");
    this.modalTitle = this.shadowRoot.querySelector(".modal-content header h2");
    this.addButton = this.shadowRoot.querySelector(".addNewNote");
    this.closeButton = this.shadowRoot.querySelector(".close-button");

    this.addButton.addEventListener("click", () => {
      this.modalTitle.textContent = "Add New Note";
      this.showModal();
      this.form.reset();
      this.editingId = null;
    });

    this.closeButton.addEventListener("click", () => {
      this.editingId = null;
      this.hideModal();
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.editingId) {
        this.handleSubmitEdit();
      } else {
        this.handleSubmitAdd();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hideModal();
        this.editingId = null;
      }
    });

    this.renderNotes();
  }

  showModal() {
    this.modal.showPopover();
  }
  hideModal() {
    this.modal.hidePopover();
  }
}
Object.assign(NotesApp.prototype, notesMethods);
Object.assign(NotesApp.prototype, handleSubmit);

customElements.define("notes-app", NotesApp);
customElements.define("notes-full", NotesFull);
