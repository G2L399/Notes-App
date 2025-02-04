export function handleSubmitAdd() {
  const title = this.notesModal.inputTitle.value;
  const content = this.notesModal.inputContent.value;
  const notes = this.getNotes();
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  const newNote = {
    id,
    title,
    body: content,
    createdAt: now,
    archived: false,
  };

  notes.push(newNote);
  this.saveNotes(notes);
  this.renderNotes();
  this.notesModal.hideModal();
  this.notesModal.form.reset();
}

export function handleSubmitEdit() {
  if (!this.editingId) return;

  const title = this.notesModal.inputTitle.value;
  const content = this.notesModal.inputContent.value;
  let notes = this.getNotes();

  notes = notes.map((note) =>
    note.id === this.editingId ? { ...note, title, body: content } : note
  );

  this.saveNotes(notes);
  this.renderNotes();
  this.notesModal.hideModal();
  this.notesModal.form.reset();
  this.editingId = null;
}
