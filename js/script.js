console.clear();
console.log("script init");
var $messages = $('div.messages-content'), d, h, m, i = 0;
(function (window) {
    {
        /* test cases
         alert(
         'browserInfo result: OS: ' + browserInfo.os +' '+ browserInfo.osVersion + '\n'+
         'Browser: ' + browserInfo.browser +' '+ browserInfo.browserVersion + '\n' +
         'Mobile: ' + browserInfo.mobile + '\n' +
         'Cookies: ' + browserInfo.cookies + '\n' +
         'Screen Size: ' + browserInfo.screen
         );
         */
        var unknown = 'Unknown';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        //browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }

        //IE 11 no longer identifies itself as MS IE, so trap it
        //http://stackoverflow.com/questions/17907445/how-to-detect-ie11
        else if ((browser == 'Netscape') && (nAgt.indexOf('Trident/') != -1)) {

            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
            if ((verOffset = nAgt.indexOf('rv:')) != -1) {
                version = nAgt.substring(verOffset + 3);
            }

        }

        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }

            // Chrome on iPad identifies itself as Safari. Actual results do not match what Google claims
            //  at: https://developers.google.com/chrome/mobile/docs/user-agent?hl=ja
            //  No mention of chrome in the user agent string. However it does mention CriOS, which presumably
            //  can be keyed on to detect it.
            if (nAgt.indexOf('CriOS') != -1) {
                //Chrome on iPad spoofing Safari...correct it.
                browser = 'Chrome';
                //Don't believe there is a way to grab the accurate version number, so leaving that for now.
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1)
            version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1)
            version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1)
            version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s: 'Windows 3.11', r: /Win16/},
            {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
            {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
            {s: 'Windows 98', r: /(Windows 98|Win98)/},
            {s: 'Windows CE', r: /Windows CE/},
            {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
            {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
            {s: 'Windows Server 2003', r: /Windows NT 5.2/},
            {s: 'Windows Vista', r: /Windows NT 6.0/},
            {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
            {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
            {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
            {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s: 'Windows ME', r: /Windows ME/},
            {s: 'Android', r: /Android/},
            {s: 'Open BSD', r: /OpenBSD/},
            {s: 'Sun OS', r: /SunOS/},
            {s: 'Linux', r: /(Linux|X11)/},
            {s: 'iOS', r: /(iPhone|iPad|iPod)/},
            {s: 'Mac OS X', r: /Mac OS X/},
            {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s: 'QNX', r: /QNX/},
            {s: 'UNIX', r: /UNIX/},
            {s: 'BeOS', r: /BeOS/},
            {s: 'OS/2', r: /OS\/2/},
            {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;

        }
    }

    window.browserInfo = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled
    };
}(this));

function click_open_close() {
    $("a#closeChat").on('click', function (e) {
        e.preventDefault();
        $(this).hide();
        $(".chat").animate({
            height: '43px'
        }, {
            duration: 1000  // 2 seconds
        });
        $("#openChat").show();
    });
    $("a#openChat").on('click', function (e) {
        e.preventDefault();
        $(this).hide();
        $("#closeChat").show();
        $(".chat").animate({
            height: '100%'
        }, {
            duration: 1000  // 2 seconds
        });
        $("textarea.message-input").focus();
        setTimeout(function () {
            if ($("div#mCSB_1_container").text().length == 0) {
                fakeMessage();
            }
        }, 100);
    });
}
var intervalPage = setInterval(function () {
    if (document.readyState === "complete") {
        click_open_close();
            $messages.mCustomScrollbar();

        clearInterval(intervalPage);
    }
}, 1000);
var userGUID = localStorage.getItem('guid');
var ip = sessionStorage.getItem('ip');
if (ip == undefined) {
    ip_info();
}
if (userGUID == undefined) {
    localStorage.setItem('guid', guid());
}
function base_url_chat(segment) {
    // get the segments
    return "http://local.dev/chatbot/";
//    var pathArray = window.location.pathname.split('/');
//    // find where the segment is located
//    var indexOfSegment = pathArray.indexOf(segment);
//    // make base_url be the origin plus the path to the segment
//    return window.location.origin + pathArray.slice(0, indexOfSegment).join('/') + '/';
}

$(window).load(function () {
    $messages.mCustomScrollbar();

});
function updateScrollbar() {
    $messages.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}

function ip_info() {
    $.getJSON('//freegeoip.net/json/?callback=?', function (data) {
        //console.log(JSON.stringify(data, null, 2));
        sessionStorage.setItem('ip', JSON.stringify(data, null, 2));
        return data.ip;
//        $.getJSON("//api.db-ip.com/v2/c583fc6a4921001cbdac3b2db65295ac07a41128/" + data.ip, function (response) {
//            console.log(response);
//        });
    });
}
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
}
function setDate() {
    d = new Date();
    if (m != d.getMinutes()) {
        m = d.getMinutes();
        $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    }
}
function treat_context(context) {
    console.log(context);
    $("div#mCSB_1_container").empty();
    $('<div class="message loading new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    setTimeout(function () {
        var contextToTreat = sessionStorage.setItem('contextToTreat', context);
        sessionStorage.setItem('in_context', true);
        $('.message.loading').remove();
        $('<div class="message new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure>d\'accord commençons :), démarrez un scénario<br>\n\
            <strong>N.B :</strong> pour sortir d\'un scénario veuillez taper "movie_end"</div>').appendTo($('.mCSB_container')).addClass('new');
    }, 500);
}
function insertMessage() {
    var msg = $('textarea.message-input').val();
    if ($.trim(msg) == '') {
        return false;
    }
    $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    $('textarea.message-input').val(null);
    updateScrollbar();
    setTimeout(function () {
        sendMessage(msg);
    }, 1000 + Math.random() * 20 * 100);
}
$('.message-submit').click(function () {
    insertMessage();
});
function sendMessageOld(msg) {
    var in_context = sessionStorage.getItem('in_context');
    var ip_info = $.parseJSON(sessionStorage.getItem('ip'));
    if (in_context === null) {
        $.ajax({
            url: "http://chatbotapi.amyevolution.com/bots/start_context",
            type: "POST",
            data: {
                Context: {
                    content: msg
                }
            },
            beforeSend: function (xhr) {
                $('<div class="message loading new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
            },
            success: function (data, textStatus, jqXHR) {
                $('.message.loading').remove();
                if (data.status === 200) {
                    $('<div class="message new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure>' + data.text + '<br>Voulez vous traité ce context ?<br>\n\
                        <button class="btn btn-sm btn-success" onclick="treat_context(\'' + data.text + '\')">Oui</button>  <button  class="btn btn-sm btn-default">Non</button></div>').appendTo($('.mCSB_container')).addClass('new');
                } else {
                    $('<div class="message new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure>' + data.text + ', Veuillez rajouter ce context pour un traitement à venir.</div>').appendTo($('.mCSB_container')).addClass('new');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('.message.loading').remove();
                $('<div class="message new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure>' + jqXHR.responseJSON.text + '</div>').appendTo($('.mCSB_container')).addClass('new');
            }
        });
    } else {
        var contextToTreat = sessionStorage.getItem('contextToTreat');
        console.log(contextToTreat);
    }

}
function sendMessage(msg) {
    var userGUID = localStorage.getItem('guid');
    var ip_info = $.parseJSON(sessionStorage.getItem('ip'));
    $.ajax({
        url: "http://chatbotapi.amyevolution.com/bots/getResponse",
        type: "POST",
        data: {
            Reponse: {
                searchKey: msg,
                guid: userGUID,
                ip_address: ip_info,
                browserInfos: window.browserInfo
            }
        },
        beforeSend: function (xhr) {
            $('<div class="message loading new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
        },
        success: function (data, textStatus, jqXHR) {
            $('div.message.loading').remove();
            if (data.status === 200) {
                $('<div class="message new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure>' + data.text + '</div>').appendTo($('.mCSB_container')).addClass('new');
            } else {
                $('<div class="message new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure>' + data.text + '</div>').appendTo($('.mCSB_container')).addClass('new');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('div.message.loading').remove();
            $('<div class="message new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure>' + jqXHR.responseJSON.text + '</div>').appendTo($('.mCSB_container')).addClass('new');
        }
    });
    setTimeout(updateScrollbar, 500);
}
$(window).on('keydown', function (e) {
    if (e.which == 13) {
        insertMessage();
        return false;
    }
});
var Fake = [
    'Salut et bienvenue sur notre site :)',
    'Nice to meet you',
    'How are you?',
    'Not too bad, thanks',
    'What do you do?',
    'That\'s awesome',
    'Codepen is a nice place to stay',
    'I think you\'re a nice person',
    'Why do you think that?',
    'Can you explain?',
    'Anyway I\'ve gotta go now',
    'It was a pleasure chat with you',
    'Time to make a new codepen',
    'Bye',
    ':)'
];
function fakeMessage() {
    if ($('textarea.message-input').val() != '') {
        return false;
    }
    $('<div class="message loading new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure><span></span></div>').appendTo($('div.mCSB_container'));
    updateScrollbar();
    setTimeout(function () {
        $('div.message.loading').remove();
        var in_context = sessionStorage.getItem('in_context');
        if (in_context === null) {
//            $('<div class="message new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure>Qu\'allons nous apprendre aujourd\'hui ? :)</div>').appendTo($('.mCSB_container')).addClass('new');
            var today = new Date().getHours();
            if (today >= 3 && today <= 16) {
                $('<div class="message new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure>Bonjour, comment puis-je vous aider ? :)</div>').appendTo($('.mCSB_container')).addClass('new');
            } else {
                $('<div class="message new"><figure class="avatar"><img src="' + base_url_chat() + 'images/student.png" /></figure>Bonsoir, comment puis-je vous aider ? :)</div>').appendTo($('.mCSB_container')).addClass('new');
            }
        }
        setDate();
        updateScrollbar();
        i++;
    }, 800);
}