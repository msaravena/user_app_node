const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const users = await User.findAll();
    return res.json(users);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if(user === null) return res.status(404).json({message: "user does not exist"})
    return res.json(user);
});

const create = catchError(async(req, res) => {
    const { first_name, last_name, email, password, birthday } = req.body;
    const user = await User.create({
        first_name,
        last_name,
        email,
        password,
        birthday
    });
    return res.status(201).json(user);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const usersDeleted = await User.destroy({ where: { id }});
    if(usersDeleted === 0) return res.status(404).json({message: "user not found"});
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password, birthday } = req.body;
    const user = await User.update(
        { first_name, last_name, email, password, birthday },
        { where: {id}, returning: true}
    )
    if(user[0] === 0) return res.status(404).json({message: "user not found"})
    return res.json(user[1][0]);
});

module.exports = {
    getAll,
    getOne,
    create,
    remove,
    update
}