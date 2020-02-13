function onLoadProc() {

    //document.getElementById('bbb').innerHTML = ccc

    var query = document.location.search.substr(1)
    var paramList = query.split("&")
    var params = {}
    for (index=0; index<paramList.length; index++) {
        paramItems = paramList[index].split("=")
        console.log("paramItems:", paramItems)
        params[paramItems[0]] = paramItems[1]
    }
    console.log("params:", params)
    /*if (query) {
        var paramsHTML = ""
        for (var key in params) {
            paramsHTML += key + ":" + params[key] + "<br>"
        }
        tableRowsHTML += "\t<tr><td>Params:</td><td>"+ paramsHTML + "</td></tr>\n"
    }

    document.getElementById("Values_Table_tbody").innerHTML = tableRowsHTML*/

    //var plusKrizek = '<svg class="controlBtn" style="cursor: pointer; width: 36px; height: 36px; margin-left: 4px;"><circle class="controlBtnBg" fill="#FFFFFF" cx="18" cy="18" r="15" style="fill: rgb(0, 0, 0);"></circle><g class="controlBtnIco" id="CBC-icoClose" style="fill: rgb(255, 255, 255);"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M20.625,18.133l4.246,4.245c0.276,0.276,0.276,0.724,0,0.999l-1.499,1.499c-0.276,0.276-0.723,0.276-0.999,0l-4.246-4.245l-4.245,4.245c-0.276,0.276-0.724,0.276-0.999,0l-1.499-1.499c-0.275-0.275-0.275-0.723,0-0.999l4.246-4.245l-4.246-4.246c-0.275-0.276-0.275-0.723,0-0.999l1.499-1.499c0.276-0.276,0.723-0.276,0.999,0l4.245,4.246l4.246-4.246c0.276-0.276,0.723-0.276,0.999,0l1.499,1.499c0.276,0.276,0.276,0.723,0,0.999L20.625,18.133z"></path></g></svg>'

    if (params["closeButtonEnabled"]) {
        console.log("closeButtonEnabled is in URL...")
        if (params["closeButtonEnabled"] === "true") {
            console.log("closeButtonEnabled = true...")
            document.getElementById('controlsDiv').innerHTML = '<div id="controlsDiv1" style="height: 40px; width: 120px; position: absolute; top: 7px; right: 7px; z-index: 1000;"><span id="SpeakerSvg">' + svgSoundSvitchOn +'</span><svg onclick="openFullscreen()" class="controlBtn" style="cursor: pointer; width: 36px; height: 36px; margin-left: 4px;"><circle class="controlBtnBg" fill="#FFFFFF" cx="18" cy="18" r="15" style="fill: rgb(0, 0, 0);"></circle><g class="controlBtnIco" id="CBC-icoScFull" style="fill: rgb(255, 255, 255);"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M9.931,10.27c0,2.499,0.003,6.241,0.003,6.241l2.09-2.089l2.787,2.787l2.151-2.15l-2.787-2.787l2.038-2.038C16.212,10.233,14.187,10.233,9.931,10.27z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M9.931,26.389c0-2.345,0.003-6.292,0.003-6.292l2.09,2.09L14.81,19.4l2.151,2.15l-2.787,2.787l2.038,2.038C16.212,26.376,11.697,26.389,9.931,26.389z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M26.018,10.27c0,3.451-0.002,6.241-0.002,6.241l-2.09-2.089l-2.787,2.787l-2.15-2.15l2.787-2.787l-2.038-2.038C19.737,10.233,24.158,10.27,26.018,10.27z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M26.018,26.389c0-2.433-0.002-6.292-0.002-6.292l-2.09,2.09L21.139,19.4l-2.15,2.15l2.787,2.787l-2.038,2.038C19.737,26.376,22.503,26.389,26.018,26.389z"></path></g><g class="controlBtnIco" id="CBC-icoScNormal" style="display: none; fill: rgb(255, 255, 255);"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M16.451,16.792c-1.825,0-5.87-0.003-5.87-0.003l1.95-1.95l-2.6-2.6l2.006-2.006l2.6,2.6l1.901-1.901C16.439,10.931,16.461,13.868,16.451,16.792z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M19.409,16.792c2.777-0.001,5.871-0.003,5.871-0.003l-1.95-1.95l2.6-2.6l-2.006-2.006l-2.6,2.6l-1.902-1.901C19.422,10.931,19.409,13.512,19.409,16.792z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M16.451,19.779c-2.331,0.001-5.87,0.003-5.87,0.003l1.95,1.95l-2.6,2.6l2.006,2.006l2.6-2.6l1.901,1.901C16.439,25.64,16.454,22.747,16.451,19.779z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M19.409,19.779c2.03,0.001,5.871,0.003,5.871,0.003l-1.95,1.95l2.6,2.6l-2.006,2.006l-2.6-2.6l-1.902,1.901C19.422,25.64,19.417,22.615,19.409,19.779z"></path></g></svg><svg class="controlBtn" style="cursor: pointer; width: 36px; height: 36px; margin-left: 4px;"><circle class="controlBtnBg" fill="#FFFFFF" cx="18" cy="18" r="15" style="fill: rgb(0, 0, 0);"></circle><g class="controlBtnIco" id="CBC-icoClose" style="fill: rgb(255, 255, 255);"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M20.625,18.133l4.246,4.245c0.276,0.276,0.276,0.724,0,0.999l-1.499,1.499c-0.276,0.276-0.723,0.276-0.999,0l-4.246-4.245l-4.245,4.245c-0.276,0.276-0.724,0.276-0.999,0l-1.499-1.499c-0.275-0.275-0.275-0.723,0-0.999l4.246-4.245l-4.246-4.246c-0.275-0.276-0.275-0.723,0-0.999l1.499-1.499c0.276-0.276,0.723-0.276,0.999,0l4.245,4.246l4.246-4.246c0.276-0.276,0.723-0.276,0.999,0l1.499,1.499c0.276,0.276,0.276,0.723,0,0.999L20.625,18.133z"></path></g></svg></div>'
        }

        if (params["closeButtonEnabled"] === "false") {
            console.log("closeButtonEnabled = false...")
            document.getElementById('controlsDiv').innerHTML = '<div id="controlsDiv1" style="height: 40px; width: 80px; position: absolute; top: 7px; right: 7px; z-index: 1000;"><span id="SpeakerSvg">' + svgSoundSvitchOn +'</span><svg onclick="openFullscreen()" class="controlBtn" style="cursor: pointer; width: 36px; height: 36px; margin-left: 4px;"><circle class="controlBtnBg" fill="#FFFFFF" cx="18" cy="18" r="15" style="fill: rgb(0, 0, 0);"></circle><g class="controlBtnIco" id="CBC-icoScFull" style="fill: rgb(255, 255, 255);"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M9.931,10.27c0,2.499,0.003,6.241,0.003,6.241l2.09-2.089l2.787,2.787l2.151-2.15l-2.787-2.787l2.038-2.038C16.212,10.233,14.187,10.233,9.931,10.27z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M9.931,26.389c0-2.345,0.003-6.292,0.003-6.292l2.09,2.09L14.81,19.4l2.151,2.15l-2.787,2.787l2.038,2.038C16.212,26.376,11.697,26.389,9.931,26.389z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M26.018,10.27c0,3.451-0.002,6.241-0.002,6.241l-2.09-2.089l-2.787,2.787l-2.15-2.15l2.787-2.787l-2.038-2.038C19.737,10.233,24.158,10.27,26.018,10.27z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M26.018,26.389c0-2.433-0.002-6.292-0.002-6.292l-2.09,2.09L21.139,19.4l-2.15,2.15l2.787,2.787l-2.038,2.038C19.737,26.376,22.503,26.389,26.018,26.389z"></path></g><g class="controlBtnIco" id="CBC-icoScNormal" style="display: none; fill: rgb(255, 255, 255);"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M16.451,16.792c-1.825,0-5.87-0.003-5.87-0.003l1.95-1.95l-2.6-2.6l2.006-2.006l2.6,2.6l1.901-1.901C16.439,10.931,16.461,13.868,16.451,16.792z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M19.409,16.792c2.777-0.001,5.871-0.003,5.871-0.003l-1.95-1.95l2.6-2.6l-2.006-2.006l-2.6,2.6l-1.902-1.901C19.422,10.931,19.409,13.512,19.409,16.792z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M16.451,19.779c-2.331,0.001-5.87,0.003-5.87,0.003l1.95,1.95l-2.6,2.6l2.006,2.006l2.6-2.6l1.901,1.901C16.439,25.64,16.454,22.747,16.451,19.779z"></path><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M19.409,19.779c2.03,0.001,5.871,0.003,5.871,0.003l-1.95,1.95l2.6,2.6l-2.006,2.006l-2.6-2.6l-1.902,1.901C19.422,25.64,19.417,22.615,19.409,19.779z"></path></g></svg></div>'
        }
    }

    if (params["closeButtonEnabled"] != "true") {
        if (params["closeButtonEnabled"] != "false") {
            console.error("Cannot find '?closeButtonEnabled=true' or '?closeButtonEnabled=false' in URL.")
            document.getElementsByTagName('body').innerHTML = "404\n" +
                "File not found\n" +
                "\n" +
                "The site configured at this address does not contain the requested file.\n" +
                "\n" +
                "If this is your site, make sure that the filename case matches the URL.\n" +
                "\n" +
                "Read the full documentation for more information about using https://kubikaugustyn.github.io Pages."
        }
    }

    /*if (params["closeButtonEnabled"] != "false") {
        console.error("Cannot find '?closeButtonEnabled=false' in URL.")
    }*/
}

var svgSoundSvitchOff = '<svg onclick="document.getElementById(SpeakerSvg1).innerHTML=svgSoundSvitchOn" class="controlBtn" style="cursor: pointer; width: 36px; height: 36px; margin-left: 4px;"><circle class="controlBtnBg" fill="#FFFFFF" cx="18" cy="18" r="15" style="fill: rgb(0, 0, 0);"></circle><g class="controlBtnIco" id="CBC-icoUnMute" style="fill: rgb(255, 255, 255); display: none;"><path d="M24.504,12.331l-0.682,0.827c1.271,1.388,2.077,3.238,2.077,5.269c0,2.028-0.803,3.875-2.071,5.262l0.681,0.845c1.45-1.633,2.328-3.744,2.328-6.107C26.837,16.07,25.948,13.963,24.504,12.331z"></path><path d="M22.696,14.021l-0.608,0.873c0.902,0.905,1.474,2.154,1.474,3.532c0,1.406-0.595,2.677-1.528,3.587l0.631,0.838c1.127-1.152,1.808-2.685,1.808-4.424C24.472,16.719,23.787,15.168,22.696,14.021z"></path><path d="M20.908,15.791l-0.485,0.989c0.463,0.397,0.757,0.987,0.757,1.645c0,0.725-0.165,1.381-0.712,1.775l0.468,0.836c0.716-0.642,1.166-1.573,1.166-2.609C22.103,17.375,21.641,16.433,20.908,15.791z"></path><path d="M9,16.489v3.96C9,20.953,9.761,22,10.301,22H13v-7h-2.699C9.761,15,9,15.984,9,16.489z"></path><path d="M17.893,12.383L14,15.21v6.486l3.893,2.858c0.541,0,1.107-0.409,1.107-0.914V13.296C19,12.791,18.434,12.383,17.893,12.383z"></path></g><g class="controlBtnIco" id="CBC-icoMute" style="display: block; fill: rgb(255, 255, 255);"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M24.803,18.737l1.783,1.783c0.116,0.117,0.116,0.304,0,0.42l-0.629,0.63c-0.116,0.116-0.304,0.116-0.419,0l-1.784-1.783L21.97,21.57c-0.117,0.116-0.304,0.116-0.42,0l-0.629-0.63c-0.116-0.116-0.116-0.303,0-0.42l1.783-1.783l-1.783-1.785c-0.116-0.115-0.116-0.303,0-0.419l0.629-0.63c0.116-0.116,0.303-0.116,0.42,0l1.783,1.784l1.784-1.784c0.116-0.116,0.304-0.116,0.419,0l0.629,0.63c0.116,0.116,0.116,0.304,0,0.419L24.803,18.737z"></path><path d="M9,16.489v3.96C9,20.953,9.761,22,10.301,22H13v-7h-2.699C9.761,15,9,15.984,9,16.489z"></path><path d="M17.893,12.383L14,15.21v6.486l3.893,2.858c0.541,0,1.107-0.409,1.107-0.914V13.296C19,12.791,18.434,12.383,17.893,12.383z"></path></g></svg>'

var svgSoundSvitchOn = '<svg onclick="document.getElementById(SpeakerSvg1).innerHTML=svgSoundSvitchOff" class="controlBtn" style="cursor: pointer; width: 36px; height: 36px; margin-left: 4px;"><circle class="controlBtnBg" fill="#FFFFFF" cx="18" cy="18" r="15" style="fill: rgb(0, 0, 0);"></circle><g class="controlBtnIco" id="CBC-icoUnMute" style="fill: rgb(255, 255, 255);"><path d="M24.504,12.331l-0.682,0.827c1.271,1.388,2.077,3.238,2.077,5.269c0,2.028-0.803,3.875-2.071,5.262l0.681,0.845c1.45-1.633,2.328-3.744,2.328-6.107C26.837,16.07,25.948,13.963,24.504,12.331z"></path><path d="M22.696,14.021l-0.608,0.873c0.902,0.905,1.474,2.154,1.474,3.532c0,1.406-0.595,2.677-1.528,3.587l0.631,0.838c1.127-1.152,1.808-2.685,1.808-4.424C24.472,16.719,23.787,15.168,22.696,14.021z"></path><path d="M20.908,15.791l-0.485,0.989c0.463,0.397,0.757,0.987,0.757,1.645c0,0.725-0.165,1.381-0.712,1.775l0.468,0.836c0.716-0.642,1.166-1.573,1.166-2.609C22.103,17.375,21.641,16.433,20.908,15.791z"></path><path d="M9,16.489v3.96C9,20.953,9.761,22,10.301,22H13v-7h-2.699C9.761,15,9,15.984,9,16.489z"></path><path d="M17.893,12.383L14,15.21v6.486l3.893,2.858c0.541,0,1.107-0.409,1.107-0.914V13.296C19,12.791,18.434,12.383,17.893,12.383z"></path></g><g class="controlBtnIco" id="CBC-icoMute" style="display: none; fill: rgb(255, 255, 255);"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M24.803,18.737l1.783,1.783c0.116,0.117,0.116,0.304,0,0.42l-0.629,0.63c-0.116,0.116-0.304,0.116-0.419,0l-1.784-1.783L21.97,21.57c-0.117,0.116-0.304,0.116-0.42,0l-0.629-0.63c-0.116-0.116-0.116-0.303,0-0.42l1.783-1.783l-1.783-1.785c-0.116-0.115-0.116-0.303,0-0.419l0.629-0.63c0.116-0.116,0.303-0.116,0.42,0l1.783,1.784l1.784-1.784c0.116-0.116,0.304-0.116,0.419,0l0.629,0.63c0.116,0.116,0.116,0.304,0,0.419L24.803,18.737z"></path><path d="M9,16.489v3.96C9,20.953,9.761,22,10.301,22H13v-7h-2.699C9.761,15,9,15.984,9,16.489z"></path><path d="M17.893,12.383L14,15.21v6.486l3.893,2.858c0.541,0,1.107-0.409,1.107-0.914V13.296C19,12.791,18.434,12.383,17.893,12.383z"></path></g></svg>'

var SpeakerSvg1 = 'SpeakerSvg'
