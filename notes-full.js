import { getNotes } from "./crud.js"; // Add this import

export class NotesFull extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = /*html */ `
      <link rel="stylesheet" href="./notes.css">
      <div class="modalParent" popover="manual" id="viewModal">
        <div class="modal">
          <div class="modal-content">
            <header>
              <h2 id="viewTitle"></h2>
              <button class="close-view-button" popovertarget="#viewModal">&times;</button>
            </header>
            <p id="viewContent"></p>
          </div>
        </div>
      </div>
    `;
    this.viewModal = this.shadowRoot.getElementById("viewModal");
    this.viewTitle = this.shadowRoot.getElementById("viewTitle");
    this.viewContent = this.shadowRoot.getElementById("viewContent");
    this.closeViewButton = this.shadowRoot.querySelector(".close-view-button");

    this.closeViewButton.addEventListener("click", () => {
      this.hideViewModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.hideViewModal();
        this.editingId = null;
      }
    });
  }
  showViewModal() {
    this.viewModal.showPopover();
  }
  hideViewModal() {
    this.viewModal.hidePopover();
  }

  showFullNote(id) {
    const notes = getNotes();
    const note = notes.find((n) => n.id === id);
    if (note) {
      this.viewTitle.textContent = note.title;
      this.viewContent.textContent = note.body;
      this.showViewModal();
    }
  }
}
