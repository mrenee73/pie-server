
const express = require('express');
const router = express.Router();
// const router = require('express').Router();
const { PieModel } = require('../models');
const middleware = require('../middleware'); 
// router.get('/', (req, res) => res.send('I love pies!'));


router.get('/', async(req, res) => {
    try {
        const allPies = await PieModel.findAll();
        res.status(200).json(allPies);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})
router.get('/:name', async(req,res) => {
    try {
        const locatedPie=  await PieModel.findOne({
            where: {nameOfPie: req.params.name}
        })
        res.status(200).json({
            msg: `Success!`,
            locatedPie
        })
    } catch (err) {
        res.status(500).json({
            msg: `Failed to get pie(s): ${err}`
        })
    }
})
router.post('/', middleware.validateSession, async(req,res) => {
    const {
        nameOfPie, 
        baseOfPie,
        crust,
        timeToBake,
        servings,
        ratings
    } = req.body
    try {
        const Pie = await PieModel.create({
            nameOfPie, 
            baseOfPie,
            crust,
            timeToBake,
            servings,
            ratings
        })
        res.status(201).json({
            msg: `Pie successfully created!`,
            Pie
        })
    } catch (err) {
        res.status(500).json({
            msg: `Failed to create pie: ${err}`
        })
    }
})
router.put('/:id', middleware.validateSession, async(req,res) => {
    const {
        nameOfPie, baseOfPie, crust, timeToBake, servings, ratings
    } = req.body
    try{
        const pieUpdated = await PieModel.update(
            {nameOfPie, baseOfPie, crust, timeToBake, servings, ratings},
            {where: {id: req.params.id}}
            )
            res.status(200).json({
                msg: `Pie successfully updated!`,
                pieUpdated
            })
    } catch(err) {
        res.status(500).json({
            msg: `Failed to update pie: ${err}`
        })
    }
})
router.delete('/:id', middleware.validateSession, async (req,res) => {
    try {
        const locatedPie = await PieModel.destroy({
            where: {id: req.params.id}
        })
        .then(result => {
            res.status(200).json({
                msg: `Pie destroyed!`,
                deletedPie: result
            })
        })
    } catch (error) {
        res.status(500).json({
            msg: `Unable to delete: ${error}`
        })
    }
})
module.exports = router;