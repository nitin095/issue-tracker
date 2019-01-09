// modules dependencies.
const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const mailer = require('../libs/mailer')
const socketLib = require('./../libs/socketLib');
const mkdirp = require('mkdirp');
const fs = require('fs')
const path = require('path')

// Models 
const issueModel = mongoose.model('Issue')
const projectModel = mongoose.model('Project')
const UserModel = mongoose.model('User')

// Create issue 
let createIssue = (req, res) => {

    let issueId = shortid.generate();

    let addIssueToProject = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.title && req.body.projectId)) {
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {
                projectModel.findOneAndUpdate({ "projectId": req.body.projectId },
                    { $push: { issues: issueId } },
                    (error, result) => {
                        if (error) {
                            logger.error(`Error Occured : ${error}`, 'Database', 10)
                            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                            res.send(apiResponse)
                            reject(error)
                        } else {
                            resolve()
                        }
                    });
            }
        })
    }// end addIssueToProject

    let newIssue = () => {

        return new Promise((resolve, reject) => {
            let newIssue = new issueModel({
                issueId: issueId,
                projectId: req.body.projectId,
                reporter: req.body.reporter,
                title: req.body.title,
                status: 'backlog',
                issueNumber: 1
            }) // end new issue model

            newIssue.save((err, result) => {
                if (err) {
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    reject(apiResponse)
                } else {
                    console.log('Success in issue creation')
                    resolve(result)
                }
            }) // end newIssue save
        }) // end promise

    } // end newIssue function

    // promise call
    addIssueToProject()
        .then(newIssue)
        .then((issue) => {
            let apiResponse = response.generate(false, 'Issue Created successfully', 200, issue);
            res.send(apiResponse);
        })
        .catch((err) => {
            console.log("error handler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}// end create issue


// Create  comment
let createComment = (req, res) => {

    if (check.isEmpty(req.body.body)) {
        let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
        res.send(apiResponse);
    } else {
        let newComment = {
            createdBy: req.body.createdBy,
            body: req.body.body
        }
        issueModel.findOneAndUpdate(
            { issueId: req.params.issueId },
            { $push: { comments: newComment } },
            { new: true },
            (error, result) => {
                if (error) {
                    console.log('Error Occured.')
                    logger.error(`Error Occured : ${err}`, 'Database', 10)
                    let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                    res.send(apiResponse);
                } else {
                    console.log('Success in comment creation');
                    let apiResponse = response.generate(false, 'Comment created.', 200, result)
                    res.send(apiResponse);
                    //sending notification to all watchers, assignee and reporter
                    let receivers = new Set([...result.watchers, result.assignee, result.reporter])
                    let notification = {
                        event: 'comment',
                        receivers: Array(receivers),
                        editor: req.user.userId,
                        issueId: req.params.issueId,
                        data: req.body.body,
                        time: Date.now()
                    }
                    socketLib.sendNotification(notification)
                }
            });
    }// end else

}// end createComment 


// Get all issue details 
let getAllIssues = (req, res) => {

    let filter = req.query.fields ? req.query.fields.replace(new RegExp(";", 'g'), " ") : '';
    issueModel.find({ 'reporter': req.params.userId })
        .select(`-__v ${filter}`)
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Issue Controller: getAllIssues', 10)
                let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Issue Found', 'Issue Controller: getAllIssues')
                let apiResponse = response.generate(true, 'No Issue Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Issue Details Found', 200, result)
                res.send(apiResponse)
            }
        })

}// end get all issues


// Get all Project issues
let getProjectIssues = (req, res) => {
    let filter = req.query.fields && req.query.fields !== 'undefined' ? req.query.fields.replace(new RegExp(";", 'g'), " ") : " ";
    issueModel.find({ projectId: req.params.projectId })
        .select(`-_id ${filter}`)
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Issue Controller: getProjectIssues', 10)
                let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Issue Found', 'Issue Controller: getProjectIssues')
                let apiResponse = response.generate(true, 'No Issue Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Issue Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all project issues


// Get single issue details 
let getSingleIssue = (req, res) => {

    let filter = req.query.fields ? req.query.fields.replace(new RegExp(";", 'g'), " ") : '';
    issueModel.findOne({ 'issueId': req.params.issueId })
        .select(`-__v -_id ${filter}`)
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Issue Controller: getSingleIssue', 10)
                let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Issue Found', 'Issue Controller:getSingleIssue')
                let apiResponse = response.generate(true, 'No Issue Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Issue Details Found', 200, result)
                res.send(apiResponse)
            }
        })

}// end get single issue


// Edit issue
let editIssue = (req, res) => {
    let options = req.body;
    issueModel.findOneAndUpdate({ 'issueId': req.params.issueId }, options, { new: true }).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'issue Controller:editissue', 10)
            let apiResponse = response.generate(true, 'Failed To edit issue details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No issue Found', 'issue Controller: editissue')
            let apiResponse = response.generate(true, 'No issue Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'issue details edited', 200, result)
            res.send(apiResponse)

            for (let key in options) {
                if (key === 'assignee') {
                    UserModel.findOne({ userId: result.reporter }).exec((err, user) => {
                        if (err) return
                        else mailer.sendissueAssignedNotification(result, user.email)
                    })
                }
            }

            //sending notification to all watchers, assignee and reporter
            let receivers = new Set([...result.watchers, result.assignee, result.reporter])
            let notification = {
                event: 'issue edited',
                receivers: Array(receivers),
                editor: req.user.userId,
                issueId: req.params.issueId,
                data: options,
                time: Date.now()
            }
            socketLib.sendNotification(notification)
        }
    });

}// end edit issue


// Edit comment
let editComment = (req, res) => {

    issueModel.findOneAndUpdate({ 'issueId': req.params.issueId, 'comments._id': req.body.comment_id },
        { 'comments.$.body': req.body.body }, { new: true }).exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'issue Controller: editComment', 10)
                let apiResponse = response.generate(true, 'Failed To edit comment', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No comment Found', 'issue Controller: editComment')
                let apiResponse = response.generate(true, 'No issue Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Comment edited', 200, result)
                res.send(apiResponse)
            }
        });

}// end edit comment


// Delete issue
let deleteIssue = (req, res) => {

    let removeIssueFromProject = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.projectId && req.params.issueId)) {
                let apiResponse = response.generate(true, 'required parameters are missing', 403, null)
                reject(apiResponse)
            } else {
                projectModel.findOneAndUpdate({ "projectId": req.body.projectId },
                    { $pull: { issues: req.params.issueId } },
                    (error, result) => {
                        if (error) {
                            logger.error(`Error Occured : ${error}`, 'Database', 10)
                            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                            res.send(apiResponse)
                            reject(error)
                        } else {
                            resolve()
                        }
                    });
            }
        })
    }// end addIssueToProject

    let removeIssue = () => {
        return new Promise((resolve, reject) => {
            issueModel.findOneAndDelete({ 'issueId': req.params.issueId }).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'Issue Controller: deleteissue', 10)
                    let apiResponse = response.generate(true, 'Failed To delete issue', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No issue Found', 'issue Controller: deleteissue')
                    let apiResponse = response.generate(true, 'No issue Found', 404, null)
                    reject(apiResponse)
                } else {
                    resolve(result)
                }
            });
        })
    }// end removeIssue

    // promise call
    return removeIssueFromProject()
        .then(removeIssue)
        .then((result) => {
            if (res) {
                let apiResponse = response.generate(false, 'Issue deleted successfully', 200, result);
                res.send(apiResponse);
            } else {
                return result.data
            }
        })
        .catch((err) => {
            console.log("error handler");
            console.log(err);
            res.status(err.status)
            res.send(err)
        })

}// end delete issue


// Delete comment
let deleteComment = (req, res) => {
    issueModel.findOneAndUpdate(
        { issueId: req.params.issueId },
        { $pull: { comments: { _id: req.body.comment_id } } },
        { new: true },
        (error, result) => {
            if (error) {
                console.log('Error Occured.')
                logger.error(`Error Occured : ${error}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse);
            } else {
                console.log('comment deleted');
                let apiResponse = response.generate(false, 'Comment created.', 200, result)
                res.send(apiResponse);
            }
        });

}// end delete issue


let searchIssues = (req, res) => {
    let search = req.params.search;
    let keywords = search.split(" ").map(x => new RegExp(x, 'i'));
    issueModel.find({ title: { $in: keywords } })
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Issue Controller: searchIssues', 10)
                let apiResponse = response.generate(true, 'Failed To search issues', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Issue Found', 'Issue Controller: searchIssues')
                let apiResponse = response.generate(true, 'No results', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Issues found', 200, result)
                res.send(apiResponse)
            }
        })
}


let addAttachment = (req, res) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files)
    let files = Array.isArray(req.files.file) ? req.files.file : Array(req.files.file)
    for (let file of files) {
        console.log('FILE:  ', file.name)
        let path = __dirname + `/../../uploads/attachments/issues/${req.params.issueId}`
        mkdirp(path, function (err) {
            if (err) console.error(err)
            else {
                file.mv(`${path}/${file.name}`, (err) => {
                    if (err)
                        return res.status(500).send(err);
                    let apiResponse = response.generate(false, 'File uploaded!', 200, null)
                    res.send(apiResponse);
                });
            }
        });

    }
}// end addAttachment 


let getAttachments = (req, res) => {
    if (check.isEmpty(req.params.issueId)) {
        let apiResponse = response.generate(true, 'parameters issueId missing', 403, null)
        res.send(apiResponse);
    } else {
        let folderPath = __dirname + `/../../uploads/attachments/issues/${req.params.issueId}`;
        fs.access(folderPath, fs.F_OK, (err) => {
            if (err) {
                console.error(err);
                let apiResponse = response.generate(true, 'No file found!', 404, null)
                res.send(apiResponse);
                return
            }
            let files = [];
            fs.readdirSync(folderPath).map(fileName => {
                files.push(fileName)
            })
            if (files.length > 0) {
                let apiResponse = response.generate(false, 'Files found!', 200, files)
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(true, 'No file found!', 404, null)
                res.send(apiResponse);
            }

        })
    }
}// end  getAttachments

let downloadAttachment = (req, res) => {
    if (check.isEmpty(req.params.issueId && req.params.file)) {
        let apiResponse = response.generate(true, 'parameters issueId missing', 403, null)
        res.send(apiResponse);
    } else {
        let path = __dirname + `/../../uploads/attachments/issues/${req.params.issueId}/${req.params.file}`;
        res.download(path);
    }
}

let deleteAttachment = (req, res) => {
    if (check.isEmpty(req.params.issueId && req.params.file)) {
        let apiResponse = response.generate(true, 'parameters issueId missing', 403, null)
        res.send(apiResponse);
    } else {
        let path = __dirname + `/../../uploads/attachments/issues/${req.params.issueId}/${req.params.file}`;
        fs.unlink(path, (err) => {
            if (err) {
                let apiResponse = response.generate(true, 'No file found!', 404, null)
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, 'File deleted!', 200, null)
                res.send(apiResponse);
            }
        })
    }
}

module.exports = {

    createIssue: createIssue,
    createComment: createComment,
    getAllIssues: getAllIssues,
    getProjectIssues: getProjectIssues,
    getSingleIssue: getSingleIssue,
    editIssue: editIssue,
    editComment: editComment,
    deleteIssue: deleteIssue,
    deleteComment: deleteComment,
    searchIssues: searchIssues,
    addAttachment: addAttachment,
    getAttachments: getAttachments,
    downloadAttachment: downloadAttachment,
    deleteAttachment: deleteAttachment

}// end exports