const express = require('express');
const router = express.Router();
const issueController = require("./../../app/controllers/issueController");
const appConfig = require("../../config/appConfig")
const auth = require('../middlewares/auth')

module.exports.setRouter = (app) => {

	let baseUrl = `${appConfig.apiVersion}/issues`;

	// defining routes.

	app.get(`${baseUrl}/all/:userId`, auth.isAuthorized, issueController.getAllIssues);

    /**
	 * @api {get} /api/v1/issues/all:userId Get all issues created by user
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} userId The userId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
			  error: false, 
			  message: "All Issue Details Found", 
			  status: 200, 
			  data: {
				  title: "String"
				  status: "String"
				  assignee: "String"
				  comments: [{
					  body: "String"
					  createdBy: "String"
					  createdOn: "Date"
					  lastModified: "Date"
					  },
					  ...
					  ],
				  createdOn: "Date"
				  description: "String"
				  dueDate: "Date"
				  isFlagged: Boolean
				  issueId: "String"
				  issueNumber: Number
				  labels: [Array<String>]
				  lastModified: "Date"
				  linkedIssues: [Array<String>]
				  projectId: "String"
				  reporter: "String"
				},
			  		...
				}

	 * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Issue Details",
	    "status": 500,
	    "data": null
	   }
	 */



	app.get(`${baseUrl}/project/:projectId`, auth.isAuthorized, issueController.getProjectIssues);

    /**
	 * @api {get} /api/v1/issues/project/:projectId Get all issues of the project
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} projectId The projectId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    error: false, 
			  message: "Project Issues Found", 
			  status: 200, 
			  data: {
				  title: "String"
				  status: "String"
				  assignee: "String"
				  comments: [{
					  body: "String"
					  createdBy: "String"
					  createdOn: "Date"
					  lastModified: "Date"
					  },
					  ...
					  ],
				  createdOn: "Date"
				  description: "String"
				  dueDate: "Date"
				  isFlagged: Boolean
				  issueId: "String"
				  issueNumber: Number
				  labels: [Array<String>]
				  lastModified: "Date"
				  linkedIssues: [Array<String>]
				  projectId: "String"
				  reporter: "String"
				},
			  		...
				}

	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Project Issues",
	    "status": 500,
	    "data": null
	   }
	 */


	app.get(`${baseUrl}/:issueId/details`, auth.isAuthorized, issueController.getSingleIssue);

    /**
	 * @api {get} /api/v1/issues/:issueId/details Get a single issue
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId The issueId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    error: false, 
		message: "Issue Details Found", 
		status: 200, 
		  data: {
				  title: "String"
				  status: "String"
				  assignee: "String"
				  comments: [{
					  body: "String"
					  createdBy: "String"
					  createdOn: "Date"
					  lastModified: "Date"
					  },
					  ...
					  ],
				  createdOn: "Date"
				  description: "String"
				  dueDate: "Date"
				  isFlagged: Boolean
				  issueId: "String"
				  issueNumber: Number
				  labels: [Array<String>]
				  lastModified: "Date"
				  linkedIssues: [Array<String>]
				  projectId: "String"
				  reporter: "String"
				}

	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


	app.get(`${baseUrl}/search/:search`, auth.isAuthorized, issueController.searchIssues);

    /**
	 * @api {get} /api/v1/issues/search/:search Search issues
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} search search query should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    error: false, 
		message: "Issue Details Found", 
		status: 200, 
		  data: {
				  title: "String"
				  status: "String"
				  assignee: "String"
				  comments: [{
					  body: "String"
					  createdBy: "String"
					  createdOn: "Date"
					  lastModified: "Date"
					  },
					  ...
					  ],
				  createdOn: "Date"
				  description: "String"
				  dueDate: "Date"
				  isFlagged: Boolean
				  issueId: "String"
				  issueNumber: Number
				  labels: [Array<String>]
				  lastModified: "Date"
				  linkedIssues: [Array<String>]
				  projectId: "String"
				  reporter: "String"
				},
			  		...
				}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */


	app.post(`${baseUrl}/create`, auth.isAuthorized, issueController.createIssue);

    /**
	 * @api {post} /api/v1/issues/create Create new issue
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} createdBy userId of the creator passed as the body parameter
     * @apiParam {String} title Title of the issue passed as the body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Issue Created Successfully",
	    "status": 200,
	      data: {
				  title: "String"
				  status: "String"
				  assignee: "String"
				  comments: [{
					  body: "String"
					  createdBy: "String"
					  createdOn: "Date"
					  lastModified: "Date"
					  },
					  ...
					  ],
				  createdOn: "Date"
				  description: "String"
				  dueDate: "Date"
				  isFlagged: Boolean
				  issueId: "String"
				  issueNumber: Number
				  labels: [Array<String>]
				  lastModified: "Date"
				  linkedIssues: [Array<String>]
				  projectId: "String"
				  reporter: "String"
				},
			  		...
				}
		}
	
	 * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


	app.post(`${baseUrl}/comment/:issueId`, auth.isAuthorized, issueController.createComment);

    /**
	 * @api {post} /api/v1/issues/comment/create Create new issue comment
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} createdBy userId of the creator passed as the body parameter
     * @apiParam {String} body body of the comment passed as the body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
		error: false
		message: "Comment created."
		status: 200,
		data:[...]
		}

	 * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


	app.put(`${baseUrl}/:issueId/edit`, auth.isAuthorized, issueController.editIssue);

    /**
	 * @api {put} /api/v1/blogs/:issueId/edit Edit issue by issueId
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId issueId of the issue passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Issue Edited Successfully.",
	    "status": 200,
	      data: {
				  title: "String"
				  status: "String"
				  assignee: "String"
				  comments: [{
					  body: "String"
					  createdBy: "String"
					  createdOn: "Date"
					  lastModified: "Date"
					  },
					  ...
					  ],
				  createdOn: "Date"
				  description: "String"
				  dueDate: "Date"
				  isFlagged: Boolean
				  issueId: "String"
				  issueNumber: Number
				  labels: [Array<String>]
				  lastModified: "Date"
				  linkedIssues: [Array<String>]
				  projectId: "String"
				  reporter: "String"
				},
			  		...
				}	
		}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


	app.put(`${baseUrl}/:issueId/edit/comment`, auth.isAuthorized, issueController.editComment);

    /**
	 * @api {put} /api/v1/issues/:issueId/edit/comment Edit issue comment by commentId
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId issueId of the issue passed as the URL parameter
	 * @apiParam {String} comment_id comment_id of the comment passed as the Body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Comment Edited Successfully.",
	    "status": 200,
	    "data": [...]
		}

	 * @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


	app.post(`${baseUrl}/:issueId/delete`, auth.isAuthorized, issueController.deleteIssue);

    /**
	 * @api {post} /api/v1/issues/delete Delete issue by issueId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId issueId of the issue passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Issue Deleted Successfully",
	    "status": 200,
	    "data": [...]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


	app.post(`${baseUrl}/:issueId/commentDelete`, auth.isAuthorized, issueController.deleteComment);

    /**
	 * @api {post} /api/v1/issues/:issueId/commentDelete Delete issue comment by issueId and comment_id
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId issueId of the issue passed as the URL parameter
	 * @apiParam {String} comment_id comment_id of the comment passed as the Body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Issue Comment Deleted Successfully",
	    "status": 200,
	    "data": [...]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


	app.post(`${baseUrl}/:issueId/attachment`, auth.isAuthorized, issueController.addAttachment);
	 
	/**
	 * @api {post} /api/v1/issues/:issueId/attachment Upload a file attachment of a issue on the server
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId issueId of the issue passed as the URL parameter
	 * @apiParam {String} file file passed as form data
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "File uploaded Successfully",
	    "status": 200,
	    "data": [...]
	    	}
		}
		}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */


	app.get(`${baseUrl}/:issueId/attachment/get`, auth.isAuthorized, issueController.getAttachments);
	
	/**
	 * @api {get} /api/v1/issues/:issueId/details Search issues
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId issueId of the issue passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    error: false, 
		message: "Attachments Found", 
		status: 200, 
		data: [Array<String>]
	 	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */

	
	app.get(`${baseUrl}/:issueId/attachment/download/:file`, auth.isAuthorized, issueController.downloadAttachment);
	
	/**
	 * @api {get} /api/v1/issues/:issueId/attachment/download/:file Download a single file from server
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId issueId of the issue passed as the URL parameter
	 * @apiParam {String} file name of the file passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  { file-download }
	 * 
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Cannot find file.",
	    "status": 500,
	    "data": null
	   }
	 */



	app.post(`${baseUrl}/:issueId/attachment/delete/:file`, auth.isAuthorized, issueController.deleteAttachment);

	/**
	 * @api {post} /api/v1/issues/:issueId/attachment/delete/:file Delete a file attachment of a issue from the server
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} issueId issueId of the issue passed as the URL parameter
	 * @apiParam {String} file name of file passed as URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "File deleted Successfully",
	    "status": 200,
	    "data": [...]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */

}
// end module.exports.setRouter