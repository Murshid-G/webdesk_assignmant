const router = require('express').Router();
const Emp = require('../models/Emp');
const { empValidation } = require('./empVal')
router.get('/', async (req, res) => {
    try {
        const emps = await Emp.find();
        res.send(emps);
    } catch (err) {
        res.status(400).send(err)
    }
})
router.get('/:empId', async (req, res) => {
    try {
        const emp = await Emp.findOne({ empId: req.params.id });
        res.send(emp);
    } catch (err) {
        res.status(400).send(err)
    }
})
router.post('/register', async (req, res) => {
    const { error } = empValidation(req.body);
    if (error) return res.status.send(error.details[0].message)

    const existEmail = await Emp.findOne({ email: req.body.email })
    if (existEmail) return res.status(400).send('email already exist')
    // hash password

    const emp = new Emp({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        dob: req.body.dob
    })
    try {
        const savedEmp = await emp.save();
        res.send(savedEmp);
    } catch (err) {
        res.status(400).send(err)
    }
})
router.delete('/:empId', async (req, res) => {
    try {
        const emp = await Emp.deleteOne({ empId: req.params.id });
        res.send(emp);
    } catch (err) {
        res.status(400).send(err)
    }
})
router.patch('/:empId', async (req, res) => {
    try {
        const emp = await Emp.updateOne({ empId: req.params.id }, { $set: req.body });
        res.send(emp);
    } catch (err) {
        res.status(400).send(err)
    }
})
module.exports = router;


