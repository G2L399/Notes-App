import { modalParent, styles } from "./notes-full-element.js";

export class NotesFull extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = ``;
    this.shadowRoot.appendChild(styles);
    this.shadowRoot.appendChild(modalParent);

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
  showFullNote(title, body) {
    if (title && body) {
      this.viewTitle.textContent = title;
      this.viewContent.textContent = body;
      this.showViewModal();
    }
  }
}
