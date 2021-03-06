define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/issues/comment/create",
    "title": "Create new issue comment",
    "version": "0.0.1",
    "group": "create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>userId of the creator passed as the body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "body",
            "description": "<p>body of the comment passed as the body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\terror: false\n\t\tmessage: \"Comment created.\"\n\t\tstatus: 200,\n\t\tdata:[...]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "create",
    "name": "PostApiV1IssuesCommentCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/issues/create",
    "title": "Create new issue",
    "version": "0.0.1",
    "group": "create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>userId of the creator passed as the body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the issue passed as the body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Issue Created Successfully\",\n\t    \"status\": 200,\n\t      data: {\n\t\t\t\t  title: \"String\"\n\t\t\t\t  status: \"String\"\n\t\t\t\t  assignee: \"String\"\n\t\t\t\t  comments: [{\n\t\t\t\t\t  body: \"String\"\n\t\t\t\t\t  createdBy: \"String\"\n\t\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t\t  },\n\t\t\t\t\t  ...\n\t\t\t\t\t  ],\n\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t  description: \"String\"\n\t\t\t\t  dueDate: \"Date\"\n\t\t\t\t  isFlagged: Boolean\n\t\t\t\t  issueId: \"String\"\n\t\t\t\t  issueNumber: Number\n\t\t\t\t  labels: [Array<String>]\n\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t  linkedIssues: [Array<String>]\n\t\t\t\t  projectId: \"String\"\n\t\t\t\t  reporter: \"String\"\n\t\t\t\t},\n\t\t\t  \t\t...\n\t\t\t\t}\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "create",
    "name": "PostApiV1IssuesCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/issues/:issueId/attachment",
    "title": "Upload a file attachment of a issue on the server",
    "version": "0.0.1",
    "group": "create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as the URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>file passed as form data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"File uploaded Successfully\",\n\t    \"status\": 200,\n\t    \"data\": [...]\n\t    \t}\n\t\t}\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "create",
    "name": "PostApiV1IssuesIssueidAttachment"
  },
  {
    "type": "post",
    "url": "/api/v1/projects/create",
    "title": "Create new project",
    "version": "0.0.1",
    "group": "create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "createdBy",
            "description": "<p>userId of the creator passed as the body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the project passed as the body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Project created Successfully\",\n\t    \"status\": 200,\n\t     \"data\": {\n\t\t\t\t\ttitle: \"String\"\n\t\t\t\t\treatedBy: \"String\"\n\t\t\t\t\tcreatedOn: Date\n\t\t\t\t\tdescription: \"String\"\n\t\t\t\t\tisStarred: Blloean\n\t\t\t\t\tissues: [Array<String>]\n\t\t\t\t\tkey: \"String\"\n\t\t\t\t\tlastModified: Date\n\t\t\t\t\tprojectId: \"String\"\n\t\t\t\t\tteam: [Array<String>]\n\t\t\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/project.js",
    "groupTitle": "create",
    "name": "PostApiV1ProjectsCreate"
  },
  {
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "Login user",
    "version": "0.0.1",
    "group": "create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user passed as the body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user passed as the body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           error: false, \n           message: \"Login Successful\", \n           status: 200,\n           data: {\n               authToken: \"String\"\n               error: false\n               message: \"Login Successful\"\n               status: 200\n               }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "Logout user by authToken",
    "version": "0.0.1",
    "group": "create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n          error: false, \n          message: \"Logged Out Successfully\", \n          status: 200, \n          data: null\n      }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n           error: true, \n           message: \"Invalid Or Expired Authorization Key\", \n           status: 404, \n           data: null\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersLogout"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "Signup user",
    "version": "0.0.1",
    "group": "create",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user passed as the body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>LastName of the user passed as the body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "countryCode",
            "description": "<p>Country code of the user passed as the body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile number of the user passed as the body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user passed as the body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user passed as the body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"User Created Successfully\",\n\t    \"status\": 200,\n\t    \"data\": []\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "create",
    "name": "PostApiV1UsersSignup"
  },
  {
    "type": "post",
    "url": "/api/v1/issues/delete",
    "title": "Delete issue by issueId",
    "version": "0.0.1",
    "group": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Issue Deleted Successfully\",\n\t    \"status\": 200,\n\t    \"data\": [...]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "delete",
    "name": "PostApiV1IssuesDelete"
  },
  {
    "type": "post",
    "url": "/api/v1/issues/:issueId/attachment/delete/:file",
    "title": "Delete a file attachment of a issue from the server",
    "version": "0.0.1",
    "group": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as the URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>name of file passed as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"File deleted Successfully\",\n\t    \"status\": 200,\n\t    \"data\": [...]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "delete",
    "name": "PostApiV1IssuesIssueidAttachmentDeleteFile"
  },
  {
    "type": "post",
    "url": "/api/v1/issues/:issueId/commentDelete",
    "title": "Delete issue comment by issueId and comment_id",
    "version": "0.0.1",
    "group": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as the URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment_id",
            "description": "<p>comment_id of the comment passed as the Body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Issue Comment Deleted Successfully\",\n\t    \"status\": 200,\n\t    \"data\": [...]\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "delete",
    "name": "PostApiV1IssuesIssueidCommentdelete"
  },
  {
    "type": "post",
    "url": "/api/v1/projects/delete",
    "title": "Delete project by projectId",
    "version": "0.0.1",
    "group": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>projectId of the project passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Project Deleted Successfully\",\n\t    \"status\": 200,\n\t    \"data\": []\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/project.js",
    "groupTitle": "delete",
    "name": "PostApiV1ProjectsDelete"
  },
  {
    "type": "post",
    "url": "/api/v1/users/delete",
    "title": "Delete user by userId",
    "version": "0.0.1",
    "group": "delete",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"User Deleted Successfully\",\n\t    \"status\": 200,\n\t    \"data\": []\n\t    \t}\n\t\t}\n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "delete",
    "name": "PostApiV1UsersDelete"
  },
  {
    "type": "get",
    "url": "/api/v1/issues/all:userId",
    "title": "Get all issues created by user",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The userId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t\t\t  error: false, \n\t\t\t  message: \"All Issue Details Found\", \n\t\t\t  status: 200, \n\t\t\t  data: {\n\t\t\t\t  title: \"String\"\n\t\t\t\t  status: \"String\"\n\t\t\t\t  assignee: \"String\"\n\t\t\t\t  comments: [{\n\t\t\t\t\t  body: \"String\"\n\t\t\t\t\t  createdBy: \"String\"\n\t\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t\t  },\n\t\t\t\t\t  ...\n\t\t\t\t\t  ],\n\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t  description: \"String\"\n\t\t\t\t  dueDate: \"Date\"\n\t\t\t\t  isFlagged: Boolean\n\t\t\t\t  issueId: \"String\"\n\t\t\t\t  issueNumber: Number\n\t\t\t\t  labels: [Array<String>]\n\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t  linkedIssues: [Array<String>]\n\t\t\t\t  projectId: \"String\"\n\t\t\t\t  reporter: \"String\"\n\t\t\t\t},\n\t\t\t  \t\t...\n\t\t\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find Issue Details\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "read",
    "name": "GetApiV1IssuesAllUserid"
  },
  {
    "type": "get",
    "url": "/api/v1/issues/:issueId/attachment/download/:file",
    "title": "Download a single file from server",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as the URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>name of the file passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ file-download }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Cannot find file.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "read",
    "name": "GetApiV1IssuesIssueidAttachmentDownloadFile"
  },
  {
    "type": "get",
    "url": "/api/v1/issues/:issueId/details",
    "title": "Get a single issue",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>The issueId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    error: false, \n\t\tmessage: \"Issue Details Found\", \n\t\tstatus: 200, \n\t\t  data: {\n\t\t\t\t  title: \"String\"\n\t\t\t\t  status: \"String\"\n\t\t\t\t  assignee: \"String\"\n\t\t\t\t  comments: [{\n\t\t\t\t\t  body: \"String\"\n\t\t\t\t\t  createdBy: \"String\"\n\t\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t\t  },\n\t\t\t\t\t  ...\n\t\t\t\t\t  ],\n\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t  description: \"String\"\n\t\t\t\t  dueDate: \"Date\"\n\t\t\t\t  isFlagged: Boolean\n\t\t\t\t  issueId: \"String\"\n\t\t\t\t  issueNumber: Number\n\t\t\t\t  labels: [Array<String>]\n\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t  linkedIssues: [Array<String>]\n\t\t\t\t  projectId: \"String\"\n\t\t\t\t  reporter: \"String\"\n\t\t\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "read",
    "name": "GetApiV1IssuesIssueidDetails"
  },
  {
    "type": "get",
    "url": "/api/v1/issues/:issueId/details",
    "title": "Search issues",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    error: false, \n\t\tmessage: \"Attachments Found\", \n\t\tstatus: 200, \n\t\tdata: [Array<String>]\n\t \t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "read",
    "name": "GetApiV1IssuesIssueidDetails"
  },
  {
    "type": "get",
    "url": "/api/v1/issues/project/:projectId",
    "title": "Get all issues of the project",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>The projectId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    error: false, \n\t\t\t  message: \"Project Issues Found\", \n\t\t\t  status: 200, \n\t\t\t  data: {\n\t\t\t\t  title: \"String\"\n\t\t\t\t  status: \"String\"\n\t\t\t\t  assignee: \"String\"\n\t\t\t\t  comments: [{\n\t\t\t\t\t  body: \"String\"\n\t\t\t\t\t  createdBy: \"String\"\n\t\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t\t  },\n\t\t\t\t\t  ...\n\t\t\t\t\t  ],\n\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t  description: \"String\"\n\t\t\t\t  dueDate: \"Date\"\n\t\t\t\t  isFlagged: Boolean\n\t\t\t\t  issueId: \"String\"\n\t\t\t\t  issueNumber: Number\n\t\t\t\t  labels: [Array<String>]\n\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t  linkedIssues: [Array<String>]\n\t\t\t\t  projectId: \"String\"\n\t\t\t\t  reporter: \"String\"\n\t\t\t\t},\n\t\t\t  \t\t...\n\t\t\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find Project Issues\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "read",
    "name": "GetApiV1IssuesProjectProjectid"
  },
  {
    "type": "get",
    "url": "/api/v1/issues/search/:search",
    "title": "Search issues",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "search",
            "description": "<p>search query should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    error: false, \n\t\tmessage: \"Issue Details Found\", \n\t\tstatus: 200, \n\t\t  data: {\n\t\t\t\t  title: \"String\"\n\t\t\t\t  status: \"String\"\n\t\t\t\t  assignee: \"String\"\n\t\t\t\t  comments: [{\n\t\t\t\t\t  body: \"String\"\n\t\t\t\t\t  createdBy: \"String\"\n\t\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t\t  },\n\t\t\t\t\t  ...\n\t\t\t\t\t  ],\n\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t  description: \"String\"\n\t\t\t\t  dueDate: \"Date\"\n\t\t\t\t  isFlagged: Boolean\n\t\t\t\t  issueId: \"String\"\n\t\t\t\t  issueNumber: Number\n\t\t\t\t  labels: [Array<String>]\n\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t  linkedIssues: [Array<String>]\n\t\t\t\t  projectId: \"String\"\n\t\t\t\t  reporter: \"String\"\n\t\t\t\t},\n\t\t\t  \t\t...\n\t\t\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "read",
    "name": "GetApiV1IssuesSearchSearch"
  },
  {
    "type": "get",
    "url": "/api/v1/projects/all/:userId",
    "title": "Get all projects user is a team member of.",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as QUERY parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>user ids of the user passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Project Details Found\",\n\t    \"status\": 200,\n\t    \"data\": {[\n\t\t\t{\n\t\t\t\ttitle: \"String\"\n\t\t\t\treatedBy: \"String\"\n\t\t\t\tcreatedOn: Date\n\t\t\t\tdescription: \"String\"\n\t\t\t\tisStarred: Blloean\n\t\t\t\tissues: [Array<String>]\n\t\t\t\tkey: \"String\"\n\t\t\t\tlastModified: Date\n\t\t\t\tprojectId: \"String\"\n\t\t\t\tteam: [Array<String>]\n\t\t\t},{...}\n\t\t]}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find Project Details\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/project.js",
    "groupTitle": "read",
    "name": "GetApiV1ProjectsAllUserid"
  },
  {
    "type": "get",
    "url": "/api/v1/projects/:projectId/details",
    "title": "Get single project",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "projectId",
            "description": "<p>The projectId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Project Found Successfully.\",\n\t    \"status\": 200,\n\t    \"data\": {\n\t\t\t\t\ttitle: \"String\"\n\t\t\t\t\treatedBy: \"String\"\n\t\t\t\t\tcreatedOn: Date\n\t\t\t\t\tdescription: \"String\"\n\t\t\t\t\tisStarred: Blloean\n\t\t\t\t\tissues: [Array<String>]\n\t\t\t\t\tkey: \"String\"\n\t\t\t\t\tlastModified: Date\n\t\t\t\t\tprojectId: \"String\"\n\t\t\t\t\tteam: [Array<String>]\n\t\t\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/project.js",
    "groupTitle": "read",
    "name": "GetApiV1ProjectsProjectidDetails"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:userId/details",
    "title": "Get a single user",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>The userId should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"User Found Successfully.\",\n\t    \"status\": 200,\n\t    \"data\": {\n            userId: \"string\",\n            firstName: \"string\",\n            lastName: \"string\",\n            email: \"mstring\",\n            countryCode: number,\n            mobileNumber: number,\n            createdOn: \"Date\",\n\t\t\t\t}\n\t    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "read",
    "name": "GetApiV1UsersUseridDetails"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:userId/details",
    "title": "Search users",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "searchQuery",
            "description": "<p>searchQuery should be passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Users Found Successfully.\",\n\t    \"status\": 200,\n\t    \"data\": {[\n\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\tfirstName: \"string\",\n\t\t\t\t\tlastName: \"string\",\n\t\t\t\t\temail: \"mstring\",\n\t\t\t\t\tcountryCode: number,\n\t\t\t\t\tmobileNumber: number,\n\t\t\t\t\tcreatedOn: \"Date\",\n\t\t\t\t],[\n\t\t\t\t\t...\n\t\t\t\t]}\n\t    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "read",
    "name": "GetApiV1UsersUseridDetails"
  },
  {
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "Get all users",
    "version": "0.0.1",
    "group": "read",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "users",
            "description": "<p>user ids of all users passed as url parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"All User Details Found\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tfirstName: \"string\",\n\t\t\t\t\t\tlastName: \"string\",\n                        email: \"string\",\n                        countryCode: number,\n\t\t\t\t\t\tmoile: number,\n\t\t\t\t\t\tlastModified: \"date\"\n\t\t\t\t\t}\n\t    \t\t]\n\t    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Failed To Find User Details\",\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "read",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "type": "put",
    "url": "/api/v1/blogs/:issueId/edit",
    "title": "Edit issue by issueId",
    "version": "0.0.1",
    "group": "update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Issue Edited Successfully.\",\n\t    \"status\": 200,\n\t      data: {\n\t\t\t\t  title: \"String\"\n\t\t\t\t  status: \"String\"\n\t\t\t\t  assignee: \"String\"\n\t\t\t\t  comments: [{\n\t\t\t\t\t  body: \"String\"\n\t\t\t\t\t  createdBy: \"String\"\n\t\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t\t  },\n\t\t\t\t\t  ...\n\t\t\t\t\t  ],\n\t\t\t\t  createdOn: \"Date\"\n\t\t\t\t  description: \"String\"\n\t\t\t\t  dueDate: \"Date\"\n\t\t\t\t  isFlagged: Boolean\n\t\t\t\t  issueId: \"String\"\n\t\t\t\t  issueNumber: Number\n\t\t\t\t  labels: [Array<String>]\n\t\t\t\t  lastModified: \"Date\"\n\t\t\t\t  linkedIssues: [Array<String>]\n\t\t\t\t  projectId: \"String\"\n\t\t\t\t  reporter: \"String\"\n\t\t\t\t},\n\t\t\t  \t\t...\n\t\t\t\t}\t\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "update",
    "name": "PutApiV1BlogsIssueidEdit"
  },
  {
    "type": "put",
    "url": "/api/v1/issues/:issueId/edit/comment",
    "title": "Edit issue comment by commentId",
    "version": "0.0.1",
    "group": "update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>issueId of the issue passed as the URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment_id",
            "description": "<p>comment_id of the comment passed as the Body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Comment Edited Successfully.\",\n\t    \"status\": 200,\n\t    \"data\": [...]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "update",
    "name": "PutApiV1IssuesIssueidEditComment"
  },
  {
    "type": "put",
    "url": "/api/v1/projects/:projectId/edit",
    "title": "Edit project by projectId",
    "version": "0.0.1",
    "group": "update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title of the project passed as the Body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"Project Edited Successfully.\",\n\t    \"status\": 200,\n\t     \"data\": {\n\t\t\t\t\ttitle: \"String\"\n\t\t\t\t\treatedBy: \"String\"\n\t\t\t\t\tcreatedOn: Date\n\t\t\t\t\tdescription: \"String\"\n\t\t\t\t\tisStarred: Blloean\n\t\t\t\t\tissues: [Array<String>]\n\t\t\t\t\tkey: \"String\"\n\t\t\t\t\tlastModified: Date\n\t\t\t\t\tprojectId: \"String\"\n\t\t\t\t\tteam: [Array<String>]\n\t\t\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/project.js",
    "groupTitle": "update",
    "name": "PutApiV1ProjectsProjectidEdit"
  },
  {
    "type": "put",
    "url": "/api/v1/users/forgotPassword",
    "title": "Recover password by user email",
    "version": "0.0.1",
    "group": "update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user passed as the Body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           error: false, \n           message: \"Password change requested\", \n           status: 200, \n           data: {\n               n: 1\n               nModified: 1\n               ok: 1\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "update",
    "name": "PutApiV1UsersForgotpassword"
  },
  {
    "type": "put",
    "url": "/api/v1/users/resetPassword",
    "title": "Reset password by password reset token",
    "version": "0.0.1",
    "group": "update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>password reset token of the user passed as the Query parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           error: false, \n           message: \"Password change sucessfully\", \n           status: 200, \n           data: {\n               n: 1\n               nModified: 1\n               ok: 1\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "update",
    "name": "PutApiV1UsersResetpassword"
  },
  {
    "type": "put",
    "url": "/api/v1/users/:userId/edit",
    "title": "Edit user by userId",
    "version": "0.0.1",
    "group": "update",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user passed as the URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n\t    \"error\": false,\n\t    \"message\": \"User Edited Successfully.\",\n\t    \"status\": 200,\n\t    \"data\": [\n\t\t\t\t\t{\n\t\t\t\t\t\tuserId: \"string\",\n\t\t\t\t\t\tfirstName: \"string\",\n\t\t\t\t\t\tlastName: \"string\",\n                        email: \"string\",\n                        countryCode: number,\n\t\t\t\t\t\tmoile: number,\n\t\t\t\t\t\tlastModified: \"date\"\n\t\t\t\t\t}\n\t    \t\t]\n\t\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured.,\n\t    \"status\": 500,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "update",
    "name": "PutApiV1UsersUseridEdit"
  }
] });
