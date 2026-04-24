import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextValue } from '../context/AuthContext';
import axios from 'axios';
import LeadTable from '../components/LeadTable';
import Stats from '../components/Stats';
import AddNoteModal from '../components/AddNoteModal';

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContextValue);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
      return;
    }
  }, [auth.token, navigate]);

  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    if (!auth.token) return;
    fetchLeads();
  }, [auth.token]);

  useEffect(() => {
    let filtered = leads;
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }
    if (search) {
      filtered = filtered.filter(lead => lead.name.toLowerCase().includes(search.toLowerCase()) || lead.email.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredLeads(filtered);
  }, [leads, statusFilter, search]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('/api/leads', { headers: { Authorization: `Bearer ${auth.token}` } });
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/leads/${id}`, { status }, { headers: { Authorization: `Bearer ${auth.token}` } });
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLead = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/leads/${id}`, { headers: { Authorization: `Bearer ${auth.token}` } });
        fetchLeads();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const addNote = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const saveNote = async (note) => {
    try {
      await axios.put(`/api/leads/${selectedLead.id}`, { notes: note }, { headers: { Authorization: `Bearer ${auth.token}` } });
      setShowModal(false);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <header>
        <h1>CRM Dashboard</h1>
        <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>
      </header>
      <Stats leads={leads} />
      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <LeadTable leads={filteredLeads} updateStatus={updateStatus} deleteLead={deleteLead} addNote={addNote} />
      {showModal && <AddNoteModal lead={selectedLead} onSave={saveNote} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;