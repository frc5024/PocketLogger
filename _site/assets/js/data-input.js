var event_log = [];

Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }

function doevent(type) {
    switch (type) {
        case "start":
            console.log("Match Start");

            // Reset log
            event_log = [];

            // Set the log base timestamp
            event_log.push(["start", getTimestamp()]);

            break;
        case "abort":
            console.log("Match Abort");

            // Add event to log
            event_log.push(["abort", getTimestamp()]);
            break;
        case "autofail":
            console.log("Auto failed");

            // Add event to log
            event_log.push(["autofail", getTimestamp()]);
            break;
        case "disconn":
            console.log("Connection issues");

            // Add event to log
            event_log.push(["disconn", getTimestamp()]);
            break;
        case "brownout":
            console.log("Brownout");

            // Add event to log
            event_log.push(["brownout", getTimestamp()]);
            break;
        case "reboot":
            console.log("Robot rebooted");

            // Add event to log
            event_log.push(["reboot", getTimestamp()]);
            break;
        case "start-endgame":
            console.log("Endgame started");

            // Add event to log
            event_log.push(["start-endgame", getTimestamp()]);
            break;
        case "abort-endgame":
            console.log("Endgame aborted");

            // Add event to log
            event_log.push(["abort-endgame", getTimestamp()]);
            break;

        default:
            console.log(type + " Unknown command");
            break;

    }
}

function getTimestamp() {
    return new Date().getTime()
}

function genQR() {
    // Add extra data
    var no_auto = document.getElementById("no-auto-sel").checked;
    var path_auto = document.getElementById("pathing-auto-sel").checked;
    var human_auto = document.getElementById("human-auto-sel").checked;

    event_log.push(["autotype-none", no_auto]);
    event_log.push(["autotype-path", path_auto]);
    event_log.push(["autotype-human", human_auto]);


    var bscore = document.getElementById("bscore").value
    var rscore = document.getElementById("rscore").value

    event_log.push(["bscore", bscore]);
    event_log.push(["rscore", rscore]);


    // Log all events
    console.log(event_log);

    // Push to QR
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), event_log.toString());
}