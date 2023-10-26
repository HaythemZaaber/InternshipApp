const Internship = require('../models/internship.model')


const getInternships =  async (req, res)=>{

    const internships= await Internship.find();

    res.json({internships});
}

const getInternship =  async (req, res)=>{

    const internshipId = req.params.id;
 
    const internship= await Internship.findById(internshipId);

    res.json({internship});
}

const createInternship = async (req, res)=>{
    //Get the sent in data off request body 
        const {type, in_pairs, proposed_task, start_date, finish_date, enterprise}= req.body;
    // Create a internship with it
    const internship = await Internship.create({
       type,
    in_pairs,
    proposed_task,
    start_date,
    finish_date,
    enterprise
    });

    //respond with the new
    res.json({internship})
}


const updateInternship  =  async (req, res)=>{

    const internshipId = req.params.id;

    //Get the sent in data off request body 
        const { type, in_pairs, proposed_task, start_date, finish_date, enterprise}= req.body;
    // Create a internship with it
    const internship = await Internship.findByIdAndUpdate(internshipId,{
        type,
    in_pairs,
    proposed_task,
    start_date,
    finish_date,
    enterprise
    }, {new: 1});

    //respond with the new
    res.json({internship})
}

const deleteInternship =  async (req, res)=>{

    const internshipId = req.params.id;

    // delete a internship with it
    await Internship.deleteOne({_id: internshipId});

    //respond with success message
    res.json({message:"internship deleted successfully"})
}


module.exports = {
    getInternships,
    getInternship,
    createInternship,
    updateInternship,
    deleteInternship
    
}
