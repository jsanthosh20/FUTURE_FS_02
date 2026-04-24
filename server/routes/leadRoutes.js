const express = require('express');
const { body, validationResult } = require('express-validator');
const Lead = require('../models/Lead');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get all leads
router.get('/', auth, async (req, res) => {
  try {
    const leads = await Lead.findAll({ order: [['createdAt', 'DESC']] });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create lead
router.post('/', [
  body('name').notEmpty(),
  body('email').isEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, source, notes } = req.body;

  try {
    const lead = await Lead.create({ name, email, phone, source, notes });
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update lead
router.put('/:id', auth, [
  body('name').optional().notEmpty(),
  body('email').optional().isEmail(),
  body('status').optional().isIn(['new', 'contacted', 'converted'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    await Lead.update(req.body, { where: { id: req.params.id } });
    const lead = await Lead.findByPk(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete lead
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Lead.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;