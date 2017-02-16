var express = require('express');
var router = express.Router();
var Slack = require('slack-node');


router.post('/', function(req, res, next) {
    console.log('----------------------HERE-------------------')
    console.log(req.body.text);

    webhookUri = "https://hooks.slack.com/services/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";

    slack = new Slack();
    slack.setWebhook(webhookUri);

    slack.webhook({
        channel: "#general",
        username: "CUPID ROBOT",
        icon_emoji: ":cupid:",
        text: req.body.text
    }, function(err, response) {
        console.log(response);
    // });
  });
})


module.exports = router;
