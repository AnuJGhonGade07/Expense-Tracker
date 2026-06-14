const User = require('../models/User');
const bcrypt = require('bcryptjs')

const getProfile = async (req,res) => {
    
    try {
        const user = await User.findById(req.user).select('-password')

        if(!user){
            return res.status(404).json({
                message:'User not Found'
            });
        }
        res.status(200).json(user);
    } catch (error) {
            return res.status(500).json({
                message:'Server error'
            });
    }
}

const updateProfile = async (req,res) => {
    try{
    
    const user = await User.findById(req.user);

    if(!user){
        return res.status(404).json({
            message:'User not found'
        })
    }

    const {name, password} = req.body;

    if(name){
        user.name= name;

    }
    if(password){
        user.password = await bcrypt.hash(password,10);
    }
    await user.save();
    res.status(200).json({
        message:'Profile Updated'
    });
}catch(error){
    res.status(500).json({
        message:"Server Error"
    });
}
}

module.exports = {
    getProfile, updateProfile
}