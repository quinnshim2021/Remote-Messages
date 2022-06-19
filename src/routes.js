"use strict";

const axios = require('axios');
const express = require("express");
const router = express.Router();

// test ping for client to web server
router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "App is running."
        });
    });

// validate request
// just a dummy method rn
let validateData = (data) => {
    let testFailure = false;

    if (!testFailure) {
        return true;
    } else {
        throw 'oof error';
    }
};

// validate ip address
// just a dummy method rn
let validateIP = (ip, port) => {
    // check if undefined
    // check regex for valid ip
    // check regex for valid port
    return true;
    // else throw 'invalid ip';
};

// test ping from web server to arduino
router.route("/pingArduino")
    .post((req, res) => {
        // req: ip address
        let ipAddr;
        let port;
        let status;
        let data;

        try {
            // get and validate ip address, port
            ipAddr, port = req.body.ipAddr, req.body.port;
            validateIP(ipAddr, port);

            // send ping to arduino
            axios
                .post('ip address:port', {
                    message: 'test'
                })
                .then(res => {
                    let resStatus = res.status;
                    if (resStatus >= 299){
                        data = 'okie dokie';
                    } else { // prob automatically goes to catch
                        throw '500 from arduino';
                    }
                })
                .catch(error => {
                    throw error;
                });
        } catch (error) {
            status = 500;
            data = error;
        }

        // respond to web client
        res.status(status).send(data);
    });

router.route("/uploadMap")
    .post((req, res) => {
        let status;
        let data;

        try {
            data = req.body;
            validateData(data);

            // validate bitmap exists and is good (i.e. dimensions)

            // validate forwarding ip address is in request payload

            // send bitmap to ip address
            
            // at end, include a catch
            // also send back a 200 for the post
            status = 200;
        } catch (error) {
            status = 500;
        }

        res.status(status).send();
    });

module.exports = router;