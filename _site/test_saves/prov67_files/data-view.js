dataset = [];

discomn_count = 0;
brownout_count = 0;
reboot_count = 0;

auto_fail = false;

game_start = 0;
endgame_start = 0;

function getTimestamp() {
    return new Date().getTime()
}

function loadQR(content) {
    console.log(content);

    // Reset the dataset
    dataset = [];
    discomn_count = 0;
    brownout_count = 0;
    reboot_count = 0;

    game_start = 0;
    endgame_start = 0;

    auto_fail = false;

    // Split the content
    content = content.split(",");

    // Rebuild the 2D array
    var i = 0;
    while (i < content.length) {
        dataset.push([content[i], content[i + 1]])

        switch (content[i]) {
            case "start":
                document.getElementById("game-status").innerHTML = "Game Status: Success";
                document.getElementById("game-status").classList = "list-group-item list-group-item-success"

                game_start = content[i + 1]

                break;
            case "abort":
                document.getElementById("game-status").innerHTML = "Game Status: Aborted";
                document.getElementById("game-status").classList = "list-group-item list-group-item-danger"

                break;
            case "autofail":
                document.getElementById("auto-type").innerHTML = "Auto Type: Failed";
                document.getElementById("auto-type").classList = "list-group-item list-group-item-danger"

                auto_fail = true;
                break;
            case "disconn":
                discomn_count += 1
                break;
            case "brownout":
                brownout_count += 1
                break;
            case "reboot":
                reboot_count += 1
                break;
            case "start-endgame":
                document.getElementById("endgame-status").innerHTML = "Endgame Status: Success";
                document.getElementById("endgame-status").classList = "list-group-item list-group-item-success"

                endgame_start = content[i + 1]
                break;
            case "abort-endgame":
                document.getElementById("endgame-status").innerHTML = "Endgame Status: Fail";
                document.getElementById("endgame-status").classList = "list-group-item list-group-item-danger"
                break;

            case "autotype-none":

                if (content[i + 1] == "true") {
                    document.getElementById("auto-type").innerHTML = "Auto Type: None";
                    document.getElementById("auto-type").classList = "list-group-item list-group-item-warning"
                }

                break;

            case "autotype-path":

                if (content[i + 1] == "true") {
                    document.getElementById("auto-type").innerHTML = "Auto Type: Pathing";
                    document.getElementById("auto-type").classList = "list-group-item list-group-item-success"
                }

                break;

            case "autotype-human":

                if (content[i + 1] == "true") {
                    document.getElementById("auto-type").innerHTML = "Auto Type: Human";
                    document.getElementById("auto-type").classList = "list-group-item list-group-item-success"
                }

                break;

            case "rscore":
                document.getElementById("rscore").innerHTML = "Red Score: " + content[i + 1];
                break;

            case "bscore":
                document.getElementById("bscore").innerHTML = "Blue Score: " + content[i + 1];
                break;

            default:
                console.log(type + " Unknown command");
                break;

        }

        i += 2
    }

    console.log(dataset);

    // Set the last scan time
    // document.getElementById("scan-time").value = getTimestamp();
    // document.getElementById("scan-data").value = dataset;

    // Set status boxes
    if (discomn_count != 0) {
        document.getElementById("conn").innerHTML = "Connection Issues: " + discomn_count;
        document.getElementById("conn").classList = "list-group-item list-group-item-warning"
    }

    if (brownout_count != 0) {
        document.getElementById("brownouts").innerHTML = "Robot Brownouts: " + brownout_count;
        document.getElementById("brownouts").classList = "list-group-item list-group-item-warning"
    }

    if (reboot_count != 0) {
        document.getElementById("reboots").innerHTML = "Robot Reboots: " + reboot_count;
        document.getElementById("reboots").classList = "list-group-item list-group-item-danger"
    }

    document.getElementById("game-start").innerHTML = "Game Start Time: " + game_start;
    document.getElementById("endgame-start").innerHTML = "Endgame Start Time: " + endgame_start;

    // Reset logging data
    
    document.getElementById("rbt-log-container").innerHTML = '<div class="custom-file"><input type="file" class="custom-file-input" id="customFile"><label class="custom-file-label" for="customFile">Choose file</label></div>'
    document.getElementById("file-match").value = ""

}

