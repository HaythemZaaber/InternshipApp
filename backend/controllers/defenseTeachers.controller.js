const DefenseTeacher = require('../models/defense_teacher.model')


const getDefenseTeachers =  async (req, res)=>{

    const defenseTeacher= await DefenseTeacher.find();

    res.json({defenseTeacher});
}

const getDefenseTeacher =  async (req, res)=>{

    const defenseTeacherId = req.params.id;
 
    const defenseTeacherById= await DefenseTeacher.findById(defenseTeacherId);

    res.json({defenseTeacherById});
}

const createDefenseTeacher = async (req, res)=>{
    //Get the sent in data off request body 
        const {defense, teacher, role }= req.body;
    // Create a defenseTeacher with it
    const defenseTeacher = await DefenseTeacher.create({
       defense,
    teacher,
    role
    });

    //respond with the new
    res.json({defenseTeacher})
}


const updateDefenseTeacher  =  async (req, res)=>{

    const defenseTeacherId = req.params.id;

    //Get the sent in data off request body 
        const { defense, teacher, role}= req.body;
    // Create a defenseTeacher with it
    const defenseTeacher = await DefenseTeacher.findByIdAndUpdate(defenseTeacherId,{
       defense,
    teacher,
    role
    }, {new: 1});

    //respond with the new
    res.json({defenseTeacher})
}

const deleteDefenseTeacher =  async (req, res)=>{

    const defenseTeacherId = req.params.id;

    // delete a defenseTeacher with it
    await DefenseTeacher.deleteOne({_id: defenseTeacherId});

    //respond with success message
    res.json({message:"defenseTeacher deleted successfully"})
}


module.exports = {
    getDefenseTeachers,
    getDefenseTeacher,
    createDefenseTeacher,
    updateDefenseTeacher,
    deleteDefenseTeacher
    
}
