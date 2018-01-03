browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({"url": "/display.html"});
});

function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
    //console.log(changeInfo);
    //console.log("Tab: " + tabId +" URL changed to " + changeInfo.url);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
      }
    };
    //xhttp.open("GET", url, true);
    //xhttp.send();
  }
}

browser.tabs.onUpdated.addListener(handleUpdated);

function addCustomHeaders(e) {


  let xForwardedHostFlag = 0;
  let hostHeaderInjectionCheckUrl = "evilhosth3r0kU.com";
  let corsMisconfigurationCheckUrl = "http://evil.com";

  for (var header of e.requestHeaders) {
    if (header.name == "X-Forwarded-Host") {
      header.value = "http://" + hostHeaderInjectionCheckUrl;
      xForwardedHostFlag = 1;
    }
  }
  if (xForwardedHostFlag == 0) {
    // Add the header.
    e.requestHeaders.push({
      "name": "X-Forwarded-Host",
      "value": hostHeaderInjectionCheckUrl
    });
  }

  // Checking for CORS error
  e.requestHeaders.push({
    "name": "Origin",
    "value": corsMisconfigurationCheckUrl
  });

  return {requestHeaders: e.requestHeaders};
}

browser.webRequest.onBeforeSendHeaders.addListener(
  addCustomHeaders,
  {urls: ["<all_urls>"]},
  ["blocking", "requestHeaders"]
);

function verifyHeaders(e) {

  let xssProtectionFlag = 0;

  // Checks for redirection
  if(e.statusCode) {
  //if(e.statusCode == 302 || e.statusCode == 301) {
    let hostHeaderInjectionCheckPattern = "evilhosth3r0kU";
    let corsMisconfigurationCheckPattern = "evil.com";
    corslist = document.getElementById('result-list');
    hostlist = document.getElementById('host-header-list');

    for (var header of e.responseHeaders) {
      //console.log(header);
      if (header.name.toLowerCase() == "location" && header.value.match(hostHeaderInjectionCheckPattern)) {
        console.log("hostHeaderInjection URL = " + e.url);
        hostlist.innerHTML = hostlist.innerHTML + '<div>' + e.url + '</div>';
      }
      // Checks for X-XSS-Protection missing header
      else if (header.name == "X-XSS-Protection") {
        xssProtectionFlag = 1;
      }
      // Checks for CORS Misconfiguration vulnerability
      else if (header.value.match(corsMisconfigurationCheckPattern)) {
          console.log("CORS URL = " + e.url);
          corslist.innerHTML = corslist.innerHTML + '<div>' + e.url + '</div>';
      }
    }
  }

  // Ignored as of now for testing other plugins.
  if (xssProtectionFlag == 0) {
    //console.log("X-XSS-Protection header missing : " + e.url);
  }

  return {responseHeaders: e.responseHeaders};
}

browser.webRequest.onHeadersReceived.addListener(
  verifyHeaders,
  {urls: ["<all_urls>"]},
  ["blocking", "responseHeaders"]
);
