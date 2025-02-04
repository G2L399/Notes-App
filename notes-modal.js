export class NotesModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notesApp = this.closest("notes-app");
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
    <link rel="stylesheet" href="./notes.css" />
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
    `;

    this.modal = this.shadowRoot.getElementById("modal");
    this.inputTitle = this.shadowRoot.getElementById("title");
    this.inputContent = this.shadowRoot.getElementById("content");
    this.form = this.shadowRoot.getElementById("noteForm");
    this.modalTitle = this.shadowRoot.querySelector(".modal-content header h2");
    this.closeButton = this.shadowRoot.querySelector(".close-button");

    this.closeButton.addEventListener("click", () => {
      this.editingId = null;
      this.hideModal();
    });
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (this.notesApp.editingId) {
        this.notesApp.handleSubmitEdit();
      } else {
        this.notesApp.handleSubmitAdd();
      }
    });
  }
  hideModal() {
    this.modal.hidePopover();
  }
}
