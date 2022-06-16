const express = require('express');
const Model = require('../models/model');
const router = express.Router();

router.post('/create', async (req, res) => {
    const data = new Model({
        order_id: req.body.order_id,
        item_name: req.body.item_name,
        cost: req.body.cost,
        order_date: req.body.order_date,
        delivery_date: req.body.delivery_date
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/list', async (req, res) => {
    try {
        const data = await Model.find({ order_date: req.body.order_date });
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/search/:id', async (req, res) => {
    try {
        const data = await Model.find({ order_id: req.params.id }, {});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const result = await Model.findOneAndUpdate(
            { order_id: req.params.id }, { delivery_date: req.body.delivery_date }
        )
        res.send(`Delivery date for order_id: ${result.order_id} has been updated`)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findOneAndDelete({ order_id: req.params.id }, {})
        res.send(`Order with order_id: ${data.order_id} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;