const express = require('express');
const router = express.Router();
const projectController = require("./../../app/controllers/projectController");
const appConfig = require("../../config/appConfig")
const auth = require('../middlewares/auth')

module.exports.setRouter = (app) => {

	let baseUrl = `${appConfig.apiVersion}/projects`;

	// defining routes.

	app.get(`${baseUrl}/all/:userId`, auth.isAuthorized, projectController.getAllProjects);

    /**
	 * @api {get} /api/v1/projects/view/:userId Get all projects user is collaborating in.
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as QUERY parameter, body parameter or as a header)
	 * @apiParam {String} userId user ids of the user passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Project edited",
	    "status": 200,
	    "data": [
				 	{
						"tasks": [
							"taskId1",
							"taskId2"
						],
						"notes": "String",
						"collaborators": [Array<string>],
						"isDone": Boolean,
						"projectId": "String",
						"createdBy": "String",
						"title": "String",
						"createdOn": "Date",
						"lastModified": "Date"
        			}
	    		]
	    }
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Failed To Find Project Details",
	    "status": 500,
	    "data": null
	   }
	 */


	app.get(`${baseUrl}/:projectId/details`, auth.isAuthorized, projectController.getSingleProject);

    /**
	 * @api {get} /api/v1/projects/:projectId/details Get single project
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} projectId The projectId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Project Found Successfully.",
	    "status": 200,
	    "data": {
					"tasks": [
						"taskId1",
						"taskId2"
					],
					"notes": "String",
					"collaborators": [Array<string>],
					"isDone": Boolean,
					"projectId": "String",
					"createdBy": "String",
					"title": "String",
					"createdOn": "Date",
					"lastModified": "Date"
        		}
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


	app.post(`${baseUrl}/create`, auth.isAuthorized, projectController.createProject);

    /**
	 * @api {post} /api/v1/projects/create Create new project
	 * @apiVersion 0.0.1
	 * @apiGroup create
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} createdBy userId of the creator passed as the body parameter
     * @apiParam {String} title Title of the project passed as the body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Project created Successfully",
	    "status": 200,
	    "data": []
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



	app.put(`${baseUrl}/:projectId/edit`, auth.isAuthorized, projectController.editProject);

    /**
	 * @api {put} /api/v1/projects/:projectId/edit Edit project by projectId
	 * @apiVersion 0.0.1
	 * @apiGroup update
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} title title of the project passed as the Body parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Project Edited Successfully.",
	    "status": 200,
	    "data": [
					"tasks": [
						"taskId1",
						"taskId2",
						...
					],
					"notes": "String",
					"collaborators": [Array<string>],
					"isDone": Boolean,
					"projectId": "String",
					"createdBy": "String",
					"title": "String",
					"createdOn": "Date",
					"lastModified": "Date"
	    		]
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


	app.post(`${baseUrl}/:projectId/delete`, auth.isAuthorized, projectController.deleteProject);

    /**
	 * @api {post} /api/v1/projects/delete Delete project by projectId
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} projectId projectId of the project passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Project Deleted Successfully",
	    "status": 200,
	    "data": []
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

	app.post(`${baseUrl}/:projectId/attachment`, auth.isAuthorized, projectController.addAttachment);

}
// end module.exports.setRouter