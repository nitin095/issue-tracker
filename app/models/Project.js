'use strict'
// Dependencies
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Schema Declaration
let projectSchema = new Schema({
    projectId: {
        type: String,
        index: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: String,
        required: true
    },
    issues: [],
    description: {
        type: String,
        default: ''
    },
    key: {
        type: String,
        default: '',
        uppercase: true
    },
    url: {
        type: String,
        default: ''
    },
    team: [],
    isStarred: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: {
            createdAt: 'createdOn',
            updatedAt: 'lastModified'
        }
    })
// end userSchema


mongoose.model('Project', projectSchema);