// modules dependencies.
const mongoose = require('mongoose');
const https = require('https');
const check = require('../libs/checkLib');
const token = require('../libs/tokenLib');
const time = require('./../libs/timeLib');
const logger = require('./../libs/loggerLib');
const response = require('./../libs/responseLib');

// Models 
const UserModel = mongoose.model('User');
const AuthModel = mongoose.model('Auth');


// google signup function
let googleSignUp = (req, res) => {

    const { OAuth2Client } = require('google-auth-library');
    const CLIENT_ID = '1064919328221-7ce00cmar1o5e0bcqccq9seeftl11bma.apps.googleusercontent.com'
    const client = new OAuth2Client(CLIENT_ID);

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: CLIENT_ID
        });
        const payload = ticket.getPayload();
        const userEmail = payload['email'];

        UserModel.findOne({ email: userEmail }, (err, userDetails) => {
            if (err) {
                logger.error('Failed To Retrieve User Data', 'socialUserController: googleSignUp()', 10)
            } else if (check.isEmpty(userDetails)) {
                payload.userType = 'google';
                createUser(payload, (userDetails) => {
                    login(userDetails, (response) => {
                        res.send(response)
                    })
                });
            } else {
                login(userDetails, (response) => {
                    res.send(response)
                })
            }//end login
        });
    }
    verify().catch(console.error);

} // end auth function.

let fbSignUp = (req, res) => {

    const appId = '347708909156348';
    const appSecret = '33c610d467d628521ca62de2df0f5898';

    https.get(`https://graph.facebook.com/debug_token?%20input_token=${req.body.idToken}&access_token=${appId}|${appSecret}`, (resp) => {
        let user = '';
        resp.on('data', (chunk) => {
            user += chunk;
        });
        resp.on('end', () => {
            if (user.data.app_id === appId && user.data.is_valid) {
                UserModel.findOne({ email: req.body.user.email }, (err, userDetails) => {
                    if (err) {
                        logger.error('Failed To Retrieve User Data', 'socialUserController: fbSignUp()', 10)
                    } else if (check.isEmpty(userDetails)) {
                        createUser(req.body.user, (userDetails) => {
                            login(userDetails, (response) => {
                                res.send(response)
                            })
                        });
                    } else {
                        login(userDetails, (response) => {
                            res.send(response)
                        })
                    }//end login
                });
            }
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

let createUser = (userDetails, loginAfterSignup) => {

    let newUser = new UserModel({
        userId: userDetails.sub,
        firstName: userDetails.name.split(' ')[0],
        lastName: userDetails.name.split(' ')[1],
        email: userDetails.email,
        userType: userDetails.userType,
        createdOn: time.now()
    })
    newUser.save((err, newUser) => {
        if (err) {
            logger.error(err.message, 'userController: createUser', 10)
        } else {
            let newUserObj = newUser.toObject();
            loginAfterSignup(newUserObj)
        }
    })

}//end signup


let login = (userDetails, res) => {

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }// end generate token


    let saveToken = (tokenDetails) => {

        return new Promise((resolve, reject) => {

            AuthModel.findOne({ userId: tokenDetails.userId }, (err, retrievedTokenDetails) => {
                if (err) {
                    logger.error(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)) {
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if (err) {
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }// end else
            })// end AuthModel

        })// end Promisw
    }// end save token

    // Promise call
    generateToken(userDetails)
        .then(saveToken)
        .then((result) => {
            let apiResponse = response.generate(false, 'Login Successful', 200, result)
            res(apiResponse)
        })
        .catch((err) => {
            res(err)
        })

}// end login


module.exports = {
    googleSignUp: googleSignUp,
    fbSignUp: fbSignUp
}