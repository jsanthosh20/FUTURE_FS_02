import React, { useState } from 'react';

const AddNoteModal = ({ lead, onSave, onClose }) => {
  const [note, setNote] = useState(lead.notes || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(note);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Note for {lead.name}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter notes"
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddNoteModal;