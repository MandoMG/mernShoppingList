const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
   Item.find()
      .sort({ date: -1 })
      .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Create items
// @access  Public
router.post('/', (req, res) => {
   const newItem = new Item({
      name: req.body.name,
      aisleCode: req.body.aisleCode,
      checked: req.body.checked
   });

   newItem.save().then(item => res.json(item));
});

// @route   PUT api/items/:id
// @desc    Update Item
// @access  Public
router.put('/:id', (req, res) => {
   Item.find()
      .sort({ date: -1 })
      .then(items => {
         const found = items.some(item => item._id == req.params.id);

         if (found) {
            const updatedItem = req.body;
            for (let i = 0; i < items.length; i++) {
               if (items[i]._id == updatedItem._id) {
                  items[i].checked = updatedItem.checked;
                  items[i].save();
               }
            }

            res.json(items);
         }
         else {
            res.json(items);
         }

      })
      .catch(err => res.status(404).json({ success: false, error: err }));
});

// @route   DELETE api/items/:id
// @desc    Delete item
// @access  Public
router.delete('/:id', (req, res) => {
   Item.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;