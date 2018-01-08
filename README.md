# vuln-headers-extension
___
This is firefox extension which parses the requests before forwarding to the DNS server to scan for vulnerable URLs which occur due to [Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers).

## Highlights
___
The extension currently detects URLs which are vulnerable to
* CORS Misconfiguration
* Host Header Injection
* Missing X-XSS-Protection headers

### Screenshots
![https://nyc3.digitaloceanspaces.com/rewanthcool/screenshot.PNG](https://nyc3.digitaloceanspaces.com/rewanthcool/screenshot.PNG)

### Installation steps
___
##### Method 1 -
1. Clone the repo or fork it.
2. Open Firefox and load `about:debugging` in the URL bar.
3. Click the Load Temporary Add-on button and select the `manifest.json` file in your cloned repo.
4. Now the vuln-headers-extension is installed.

##### Method 2 -
1. Clone the repo or fork it.
2. Install the [web-ext](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext) tool, a npm package.
3. Change into the directory where you cloned the repo.
4. Type `web-ext run`. This will launch Firefox and install the extension.

#### Article
https://medium.com/@rewanthcool/firefox-vuln-headers-extension-e848b6d80d14
