import { createElement } from "./crud.js";

export class NotesModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notesApp = this.closest("notes-app");
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = /*html*/ `

    `;
    const styles = createElement("link", {
      rel: "stylesheet",
      href: "./notes.css",
    });
    this.shadowRoot.appendChild(styles);

    const modalParent = createElement("div", {
      className: "modalParent",
      id: "modal",
      popover: "manual",
    });
    const modal = createElement("div", { className: "modal" });
    const modalContent = createElement("div", { className: "modal-content" });
    const header = createElement("header");
    const modalTitle = createElement("h2", { id: "modalTitle" });
    const closeButton = createElement(
      "button",
      { className: "close-button", popovertarget: "#modal" },
      "\u00D7"
    );
    const form = createElement("form", {
      id: "noteForm",
      className: "form-group",
    });
    const titleLabel = createElement("label", { htmlFor: "title" }, "Title");
    const title = createElement("input", {
      type: "text",
      id: "title",
      minlength: "4",
      name: "title",
      required: true,
    });
    const contentLabel = createElement(
      "label",
      { htmlFor: "content" },
      "Content"
    );
    const content = createElement("textarea", {
      id: "content",
      name: "content",
      required: true,
    });
    const submitButton = createElement("div", { className: "submitButton" });
    const saveButton = createElement("button", { type: "submit" }, "Save");

    header.appendChild(modalTitle);
    header.appendChild(closeButton);
    modalContent.appendChild(header);
    modalContent.appendChild(form);
    form.appendChild(titleLabel);
    form.appendChild(title);
    form.appendChild(contentLabel);
    form.appendChild(content);
    form.appendChild(submitButton);
    submitButton.appendChild(saveButton);
    modal.appendChild(modalContent);
    modalParent.appendChild(modal);
    this.shadowRoot.appendChild(modalParent);

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
