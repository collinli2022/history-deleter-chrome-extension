# History deleter

## Pitch

Yes... we all know why we are here. This is a automatic history deleter inspired due to "personal" events. 

## How to install
So you want to know how to get it. Yay! Download this zip file of this github and then unzip it into a safe directory like your desktop. Then go to your extensions tab on your web browser and enable Developer Mode (a toggle switch usually in the top right corner). Finally, click on the "Load unpacked" button and select the unziped folder. Yay, now go have fun!

<img src="https://cdnblog.webkul.com/blog/wp-content/uploads/2019/07/15065849/4-3.png" alt="drawing" width="1000"/>

For more information on how to install an unpacked extension visit this youtube tutorial: https://www.youtube.com/watch?v=hIRX1dpfqHc.

**Disclamer: This extension only works for chromium based browsers such as: Vivaldi, Brave, Microsoft Edge, Epic Privacy Browser, Comodo Dragon, SlimBrowser, Torch, and (obviously) Chrome. If you use firefox... why? However, you can still probably find a way to install this AwEsoME extension.**

## Privacy
So privacy. This chrome extension does not send your history to the FBI. It does not save anything into the cloud. It does not send anything to servers. I mean I **can't even afford** a server (sadge). In conclusion: it does not require wifi to be used since it does not access the interent. 

Still don't trust me? Ok acceptable. You can view the permissions in the "manifest.json" file to see exactly what permissions I use. The google chrome [documentation](https://developer.chrome.com/docs/extensions/mv3/declare_permissions/). 

### Big brain move to prove my legitness
Going into a deeper level, Cross-origin resource sharing (CORS) is a security policy implemented in all modern browsers, that disallow fetching contents from other sites unless the site you're trying to fetch data from explicitly allows it. It's simply not possible to circumvent CORS in the browser itself as CORS was implemented as security solution against various attacks such as loading sites in an iframe. It used to be common for scammers to load a bank site in an iframe, which would allow them to record every click and keystroke the user made and steal their credentials that way. However, thanks to CORS, they can't. This means I can't steal your private info... wah wah wah.

Finally, if you still unconvinced.. my code is OPEN-SOURCE so just see if I ever send a request to a api/server. (Hint: I don't)

## What it does

This extension includes a page action with a popup specified as "popup.html". This popup will display your recent blacklisted pages that have been deleted from your history. The popup shows a list of 5 history entries for the current domain. So... technically what is happening is your last recent 5 visted pages are saved locally in the chrome extension (where nobody but you know) and deleted from your chrome history logs (Alt-h). 

**It removes history based on keywords. For example, if you have the keyword "youtube" then all urls including the word youtube would be deleted from the history even if the website is not youtube.com: https://www.google.com/search?q=youtube&oq=youtube&aqs=chrome..69i57j69i65l2.769j0j1&sourceid=chrome&ie=UTF-8.**
You can specify websites by making the keyword "youtube.com".

## Visual

![Fig1](figs/demo1.png)

As we can see, this is quite a crude layout / appearance. However, it is simple and gets the job done. **To add or remove keywords to blacklist sites, write your keyword into the text-bar and click the button "Set". There will be no duplicate values (since it is a Set). If the keyword already exists in the set, the keyword will be removed.

## For nerds: What it shows

How to use the history API.
Please give suggetions on how to improve in the [issues](https://github.com/collinli2022/history-deleter-chrome-extension/issues)
