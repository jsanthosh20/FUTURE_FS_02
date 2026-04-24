import React from 'react';

const LeadTable = ({ leads, updateStatus, deleteLead, addNote }) => {
  return (
    <table className="lead-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Source</th>
          <th>Status</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leads.map(lead => (
          <tr key={lead.id}>
            <td>{lead.name}</td>
            <td>{lead.email}</td>
            <td>{lead.phone}</td>
            <td>{lead.source}</td>
            <td>
              <select value={lead.status} onChange={(e) => updateStatus(lead.id, e.target.value)}>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
              </select>
            </td>
            <td>{lead.notes}</td>
            <td>
              <button onClick={() => addNote(lead)}>Add Note</button>
              <button onClick={() => deleteLead(lead.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeadTable;