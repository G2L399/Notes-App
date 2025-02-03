export function handleSubmitAdd() {
  const title = this.inputTitle.value;
  const content = this.inputContent.value;
  const notes = this.getNotes();
  const now = new Date().toISOString();
  const id = crypto.randomUUID();

  const newNote = {
    id,
    field1: title,
    field2: content,
    created_at: now,
    updated_at: now,
  };

  notes.push(newNote);
  this.saveNotes(notes);
  this.renderNotes();
  this.hideModal();
  this.form.reset();
}

export function handleSubmitEdit() {
  if (!this.editingId) return;

  const title = this.inputTitle.value;
  const content = this.inputContent.value;
  let notes = this.getNotes();
  const now = new Date().toISOString();

  notes = notes.map((note) =>
    note.id === this.editingId
      ? { ...note, field1: title, field2: content, updated_at: now }
      : note
  );

  this.saveNotes(notes);
  this.renderNotes();
  this.hideModal();
  this.form.reset();
  this.editingId = null;
}
