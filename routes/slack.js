var express = require('express');
var router = express.Router();
var Slack = require('slack-node');


router.get('slack', function(req, res, next) {
    // console.log('here');
    //
    // webhookUri = "https://hooks.slack.com/services/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";
    //
    // slack = new Slack();
    // slack.setWebhook(webhookUri);
    //
    // slack.webhook({
    //     channel: "#general",
    //     username: "CUPID ROBOT",
    //     icon_emoji: ":cupid:",
    //     text: "Happy Valentines Day from Ben's Robot!!! \n LUH U!"
    // }, function(err, response) {
    //     console.log(response);
    // });
    res.send('what')
});


module.exports = router;

