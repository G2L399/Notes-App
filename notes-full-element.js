import { createElement } from "./crud.js";

export const styles = createElement("link", {
  rel: "stylesheet",
  href: "./notes.css",
});
export const modalParent = createElement("div", {
  className: "modalParent",
  id: "viewModal",
  popover: "manual",
});
const modal = createElement("div", { className: "modal" });
const modalContent = createElement("div", { className: "modal-content" });
const header = createElement("header");
const viewTitle = createElement("h2", { id: "viewTitle" });
const closeViewButton = createElement(
  "button",
  { className: "close-view-button", popovertarget: "#viewModal" },
  "\u00D7"
);
const viewContent = createElement("p", { id: "viewContent" });

header.appendChild(viewTitle);
header.appendChild(closeViewButton);
modalContent.appendChild(header);
modalContent.appendChild(viewContent);
modal.appendChild(modalContent);
modalParent.appendChild(modal);
