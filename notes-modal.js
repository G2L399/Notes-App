export class NotesModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `
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
  }
}
