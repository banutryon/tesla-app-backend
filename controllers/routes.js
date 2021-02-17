const express = require('express');
const router = express.Router();
const Tesla = require('../models/car')
// ============Post Route==================
// Creating data
router.post('/', (req, res) => {

    const tesla = new Tesla({
        models: req.body.models,
        // config: req.body.config
        // id: req.body.id,
        // model: req.body.model,
        // battery: req.body.battery,
        // range: req.body.range
    })


    tesla.save()
        .then(results => {
            res.send({
                message: 'Tesla car data created successfully',
                data: results.data
            })
        })
        .catch(err => console.log(err))
})
// ============Index Route==================
// uses /api/tesla-info
//  return the list of teslas in database
// Fetching Data from ID
router.get('/', (req, res) => {
    Tesla.find()
        .then(telsas => {
            res.send(telsas)
        })
        .catch(err => console.log(err))
});
// ============Show Route==================
// Fetching Data
// uses /api/tesla-info/id
router.get('/:id', (req, res) => {
    const teslaId = req.params.id;

    Tesla.findById(teslaId)
        .then(tesla  => {
            res.send(tesla)
        })
        .catch(err => console.log(err))
})
// ============Update Route==================
// uses /api/tesla-info/id

router.put('/:id', (req, res) => {
    const teslaId = req.params.id;

    Tesla.findById(teslaId)
        .then(tesla  => {
            tesla.models = req.body.model;
            tesla.config = req.body.config;
            

            return tesla.save();
        })
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
})
// //==============Delete===========
// uses /api/tesla-info/id
router.delete('/:id', (req, res) => {
    const teslaId = req.params.id;

    Tesla.findByIdAndRemove(teslaId)
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))

})
// ============Module==================
module.exports = router;
