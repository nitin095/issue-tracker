'use strict'
// Dependencies
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Comment schema
let commentSchema = new Schema({
    createdBy: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'lastModified'
        }
    });
// End commentSchema


// Linked issue schema
let linkedIssueSchema = new Schema({
    issueId: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
});
// End linkedIssueSchema


// Schema Declaration
let issueSchema = new Schema({
    issueId: {
        type: String,
        index: true,
        unique: true
    },
    issueNumber: {
        type: Number,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    reporter: {
        type: String,
        required: true
    },
    isFlagged: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        default: null
    },
    assignee: {
        type: String,
        default: null
    },
    watchers: [],
    labels: [],
    linkedIssues: [linkedIssueSchema],
    comments: [commentSchema]
},
    {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'lastModified'
        }
    })
// End userSchema

mongoose.model('Issue', issueSchema);