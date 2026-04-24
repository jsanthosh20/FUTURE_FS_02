import React from 'react';

const Stats = ({ leads }) => {
  const total = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const contacted = leads.filter(l => l.status === 'contacted').length;
  const converted = leads.filter(l => l.status === 'converted').length;

  return (
    <div className="stats">
      <div className="stat-card">
        <h3>Total Leads</h3>
        <p>{total}</p>
      </div>
      <div className="stat-card">
        <h3>New Leads</h3>
        <p>{newLeads}</p>
      </div>
      <div className="stat-card">
        <h3>Contacted</h3>
        <p>{contacted}</p>
      </div>
      <div className="stat-card">
        <h3>Converted</h3>
        <p>{converted}</p>
      </div>
    </div>
  );
};

export default Stats;