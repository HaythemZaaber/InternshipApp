const Enterprise = require('../models/enterprise.model')


const getEnterprises =  async (req, res)=>{

    const enterprise= await Enterprise.find();

    res.json({enterprise});
}

const getEnterprise =  async (req, res)=>{

    const enterpriseId = req.params.id;
 
    const enterpriseById= await Enterprise.findById(enterpriseId);

    res.json({enterpriseById});
}

const createEnterprise = async (req, res)=>{
    //Get the sent in data off request body 
        const {name_enterprise,fieldOfActivity, address, phone, fax, web_site, name_supervisor,function_supervisor, service_supervisor, mail_supervisor}= req.body;
    // Create a enterprise with it
    const enterprise = await Enterprise.create({
        name_enterprise,
        fieldOfActivity, 
        address, 
        phone, 
        fax, 
        web_site, 
        name_supervisor,
        function_supervisor, 
        service_supervisor, 
        mail_supervisor
    });

    //respond with the new
    res.json({enterprise})
}


const updateEnterprise  =  async (req, res)=>{

    const enterpriseId = req.params.id;

    //Get the sent in data off request body 
        const { name_enterprise,fieldOfActivity, address, phone, fax, web_site, name_supervisor,function_supervisor, service_supervisor, mail_supervisor}= req.body;
    // Create a enterprise with it
    const enterprise = await Enterprise.findByIdAndUpdate(enterpriseId,{
        name_enterprise,
        fieldOfActivity, 
        address, 
        phone, 
        fax, 
        web_site, 
        name_supervisor,
        function_supervisor, 
        service_supervisor, 
        mail_supervisor
    }, {new: 1});

    //respond with the new
    res.json({enterprise})
}

const deleteEnterprise =  async (req, res)=>{

    const enterpriseId = req.params.id;

    // delete a enterprise with it
    await Enterprise.deleteOne({_id: enterpriseId});

    //respond with success message
    res.json({message:"enterprise deleted successfully"})
}


module.exports = {
    getEnterprises,
    getEnterprise,
    createEnterprise,
    updateEnterprise,
    deleteEnterprise
    
}
