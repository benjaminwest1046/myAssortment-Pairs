var express = require('express');
var router = express.Router();
var Slack = require('slack-node');


router.post('/', function(req, res, next) {

    webhookUri = "https://hooks.slack.com/services/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";

    slack = new Slack();
    slack.setWebhook(webhookUri);

    slack.webhook({
        username: "AM Pair App Bot",
        text: "/topic Today's resilliency pair is " + req.body.anchor + " & " + req.body.developer
    }, function(err, response) {
        console.log(response);
    // });
  });
})


module.exports = router;
