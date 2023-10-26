const Group = require('../models/group.model')


const getGroups =  async (req, res)=>{

    const groups= await Group.find();

    res.json({groups});
}

const getGroup =  async (req, res)=>{

    const groupId = req.params.id;
 
    const group= await Group.findById(groupId);

    res.json({group});
}

const createGroup = async (req, res)=>{
    //Get the sent in data off request body 
        const { student, internship}= req.body;
    // Create a group with it
    const group = await Group.create({
      student,
      internship
    });

    //respond with the new
    res.json({group})
}


const updateGroup  =  async (req, res)=>{

    const groupId = req.params.id;

    //Get the sent in data off request body 
        const { student, internship}= req.body;
    // Create a group with it
    const group = await Group.findByIdAndUpdate(groupId,{
        student,
        internship
    }, {new: 1});

    //respond with the new
    res.json({group})
}

const deleteGroup =  async (req, res)=>{

    const groupId = req.params.id;

    // delete a group with it
    await Group.deleteOne({_id: groupId});

    //respond with success message
    res.json({message:"group deleted successfully"})
}


module.exports = {
    getGroups,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup
    
}
