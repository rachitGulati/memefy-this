function genericOnClick(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
}

chrome.contextMenus.create({
    id: "myContextMenu",
    title: "Memefy this",
    contexts: ["image"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (tab) {
        chrome.tabs.sendMessage(tab.id, { text: "make_meme" }, function(response) {
            console.log(response);
        });

    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.msg && request.msg === 'download_meme') {
        console.log(request.msg);
        chrome.tabs.captureVisibleTab(
            null,
            {format: 'png', quality: 100},
            function (dataURL) {
                sendResponse({imgSrc: dataURL});
            }
        );
        return true;
    }
});