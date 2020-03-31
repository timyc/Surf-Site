const request = require('request');
const connection = require('./db');
const querystring = require('querystring');

module.exports = function(req, res) {
    const PAYPAL_EMAIL = 'tolandsunknown@gmail.com';
    // https://github.com/HenryGau/node-paypal-ipn
    // STEP 1: read POST data
    req.body = req.body || {};
    res.status(200).send('OK');
    res.end();

    // read the IPN message sent from PayPal and prepend 'cmd=_notify-validate'
    let postreq = 'cmd=_notify-validate';
    for (let key in req.body) {
        if (req.body.hasOwnProperty(key)) {
            let value = querystring.escape(req.body[key]);
            postreq = postreq + "&" + key + "=" + value;
        }
    }

    // Step 2: POST IPN data back to PayPal to validate
    let options = {
        url: 'https://www.paypal.com/cgi-bin/webscr',
        method: 'POST',
        headers: {
            'Connection': 'close'
        },
        body: postreq,
        strictSSL: true,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    };

    request(options, function callback(error, response, body) {
        if (!error && response.statusCode === 200) {

            // inspect IPN validation result and act accordingly
            if (body.substring(0, 8) === 'VERIFIED') {

                // assign posted variables to local variables
                let payment_amount = req.body['mc_gross'];
                let txn_id = req.body['txn_id'];
                let paying_player = req.body['custom'];
                let receiver_email = req.body['receiver_email'];
                if (receiver_email === PAYPAL_EMAIL) {
                    if (payment_amount === 7.99) {
                        connection.query('SELECT * FROM ck_vipadmins WHERE steamid = ?', [paying_player], function(error, results) {
                            if (error) {
                                return console.log('ERROR FOR TXN: ' + txn_id);
                            }
                            let d = new Date();
                            if (results.length === 0) {
                                d.setMonth(d.getMonth() + 1);
                                connection.query('INSERT INTO ck_vipadmins SET ?', {user: paying_player, expires: d}, function(error) {
                                    if (error) {
                                        return console.log('ERROR FOR TXN: ' + txn_id);
                                    }
                                });
                            } else {
                                if (results[0].expires > d) {
                                    connection.query('UPDATE ck_vipadmins SET expires = DATE_ADD(expires, INTERVAL 1 MONTH) WHERE steamid = ?', [paying_player], function(error) {
                                        if (error) {
                                            return console.log('ERROR FOR TXN: ' + txn_id);
                                        }
                                    });
                                } else {
                                    connection.query('UPDATE ck_vipadmins SET expires = DATE_ADD(NOW(), INTERVAL 1 MONTH) WHERE steamid = ?', [paying_player], function(error) {
                                        if (error) {
                                            return console.log('ERROR FOR TXN: ' + txn_id);
                                        }
                                    });
                                }
                            }
                        });
                    }
                    if (payment_amount === 17.99) {
                        connection.query('SELECT * FROM ck_vipadmins WHERE steamid = ?', [paying_player], function(error, results) {
                            if (error) {
                                return console.log('ERROR FOR TXN: ' + txn_id);
                            }
                            let d = new Date();
                            if (results.length === 0) {
                                d.setMonth(d.getMonth() + 3);
                                connection.query('INSERT INTO ck_vipadmins SET ?', {user: paying_player, expires: d}, function(error) {
                                    if (error) {
                                        return console.log('ERROR FOR TXN: ' + txn_id);
                                    }
                                });
                            } else {
                                if (results[0].expires > d) {
                                    connection.query('UPDATE ck_vipadmins SET expires = DATE_ADD(expires, INTERVAL 3 MONTH) WHERE steamid = ?', [paying_player], function(error) {
                                        if (error) {
                                            return console.log('ERROR FOR TXN: ' + txn_id);
                                        }
                                    });
                                } else {
                                    connection.query('UPDATE ck_vipadmins SET expires = DATE_ADD(NOW(), INTERVAL 3 MONTH) WHERE steamid = ?', [paying_player], function(error) {
                                        if (error) {
                                            return console.log('ERROR FOR TXN: ' + txn_id);
                                        }
                                    });
                                }
                            }
                        });
                    }
                    if (payment_amount === 49.99) {
                        connection.query('SELECT * FROM ck_vipadmins WHERE steamid = ?', [paying_player], function(error, results) {
                            if (error) {
                                return console.log('ERROR FOR TXN: ' + txn_id);
                            }
                            let d = new Date();
                            if (results.length === 0) {
                                d.setMonth(d.getMonth() + 12);
                                connection.query('INSERT INTO ck_vipadmins SET ?', {user: paying_player, expires: d}, function(error) {
                                    if (error) {
                                        return console.log('ERROR FOR TXN: ' + txn_id);
                                    }
                                });
                            } else {
                                if (results[0].expires > d) {
                                    connection.query('UPDATE ck_vipadmins SET expires = DATE_ADD(expires, INTERVAL 12 MONTH) WHERE steamid = ?', [paying_player], function(error) {
                                        if (error) {
                                            return console.log('ERROR FOR TXN: ' + txn_id);
                                        }
                                    });
                                } else {
                                    connection.query('UPDATE ck_vipadmins SET expires = DATE_ADD(NOW(), INTERVAL 12 MONTH) WHERE steamid = ?', [paying_player], function(error) {
                                        if (error) {
                                            return console.log('ERROR FOR TXN: ' + txn_id);
                                        }
                                    });
                                }
                            }
                        });
                    }
                    if (payment_amount === 79.99) {
                        connection.query('SELECT * FROM ck_vipadmins WHERE steamid = ?', [paying_player], function(error, results) {
                            if (error) {
                                return console.log('ERROR FOR TXN: ' + txn_id);
                            }
                            let d = new Date();
                            if (results.length === 0) {
                                d.setMonth(d.getMonth() + 144);
                                connection.query('INSERT INTO ck_vipadmins SET ?', {user: paying_player, expires: d}, function(error) {
                                    if (error) {
                                        return console.log('ERROR FOR TXN: ' + txn_id);
                                    }
                                });
                            } else {
                                if (results[0].expires > d) {
                                    connection.query('UPDATE ck_vipadmins SET expires = DATE_ADD(expires, INTERVAL 144 MONTH) WHERE steamid = ?', [paying_player], function(error) {
                                        if (error) {
                                            return console.log('ERROR FOR TXN: ' + txn_id);
                                        }
                                    });
                                } else {
                                    connection.query('UPDATE ck_vipadmins SET expires = DATE_ADD(NOW(), INTERVAL 144 MONTH) WHERE steamid = ?', [paying_player], function(error) {
                                        if (error) {
                                            return console.log('ERROR FOR TXN: ' + txn_id);
                                        }
                                    });
                                }
                            }
                        });
                    }
                }


            } else if (body.substring(0, 7) === 'INVALID') {
                // IPN invalid, log for manual investigation
                console.log('Invalid IPN!');
                console.log('\n\n');
            }
        }
    });
};
