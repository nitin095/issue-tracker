// modules dependencies.
const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');


// Models 
const projectModel = mongoose.model('Project')


// Create project 
let createProject = (req, res) => {

    if (check.isEmpty(req.body.title)) {
        let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
        res.send(apiResponse)
    } else {
        let projectId = shortid.generate()
        let newProject = new projectModel({
            projectId: projectId,
            key: req.body.key,
            createdBy: req.body.createdBy,
            title: req.body.title,
            team: req.body.team
        }) // end new project model

        newProject.save((err, result) => {
            if (err) {
                console.log('Error Occured.')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else {
                console.log('Success in project creation')
                let apiResponse = response.generate(false, 'Success in project creation', 200, result)
                res.send(apiResponse)
            }
        }) // end newProject save
    }// end else

}// end create project


// Get all project details 
let getAllProjects = (req, res) => {

    projectModel.find({ "team": req.params.userId })
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Project Controller: getAllProjects', 10)
                let apiResponse = response.generate(true, 'Failed To Find Project Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Project Found', 'Project Controller: getAllProjects')
                let apiResponse = response.generate(true, 'No Project Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Project Details Found', 200, result)
                res.send(apiResponse)
            }
        })

}// end get all projects


// Get single project details 
let getSingleProject = (req, res) => {
    let filter = req.query.fields&&req.query.fields !== 'undefined' ? req.query.fields.replace(new RegExp(";", 'g'), " ") : " ";
    projectModel.findOne({ 'projectId': req.params.projectId })
        .select(`-_id ${filter}`)
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Project Controller: getSingleProject', 10)
                let apiResponse = response.generate(true, 'Failed To Find Project Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Project Found', 'Project Controller:getSingleProject')
                let apiResponse = response.generate(true, 'No Project Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Project Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get single project


// Edit project
let editProject = (req, res) => {

    let options = req.body;
    projectModel.findOneAndUpdate({ 'projectId': req.params.projectId }, options, { new: true }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'project Controller:editproject', 10)
            let apiResponse = response.generate(true, 'Failed To edit project details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No project Found', 'project Controller: editproject')
            let apiResponse = response.generate(true, 'No project Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'project details edited', 200, result)
            res.send(apiResponse)
        }
    });

}// end edit project


// Delete project
let deleteProject = (req, res) => {

    projectModel.findOneAndRemove({ 'projectId': req.params.projectId }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Project Controller: deleteproject', 10)
            let apiResponse = response.generate(true, 'Failed To delete project', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No project Found', 'project Controller: deleteproject')
            let apiResponse = response.generate(true, 'No project Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the project successfully', 200, result)
            res.send(apiResponse)
        }
    });

}// end delete project


let addAttachment = (req, res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files)
    let files = Array.isArray(req.files.file) ? req.files.file : Array(req.files.file)
    for (let file of files) {
        console.log('FILE:  ', file.name)
        file.mv(`/uploads/attachments/projects/${req.params.projectId}/${file.name}`, (err) => {
            if (err)
                return res.status(500).send(err);
            let apiResponse = response.generate(false, 'File uploaded!', 200, null)
            res.send(apiResponse);
        });
    }
}// end addAttachment 


module.exports = {

    createProject: createProject,
    getAllProjects: getAllProjects,
    getSingleProject: getSingleProject,
    editProject: editProject,
    deleteProject: deleteProject,
    addAttachment: addAttachment

}// end exports