var siteList = new Set(["youtube", "chess", "bit"]);
var recent = []
var max_recent = 5

chrome.storage.sync.clear()

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url.match(/^about:/)) {

    chrome.storage.sync.get('site_list', function(result) {
      console.log('Value currently is ' + result.key);
      if (typeof(result.key) == "undefined") {
        chrome.storage.sync.set({"site_list": siteList}, function() {
          console.log('Value is set to ' + siteList);
        });
      }
    });

    var searchingHistory = chrome.history.search({
        text: tab.url,
        maxResults: max_recent
      }, // the query object
      (results) => {
        for (var k in results) {
          var history = results[k]
          for (let i of siteList) {
            if (history.url.indexOf(i) != -1) {
              chrome.history.deleteUrl({
                url: results[k].url
              }, (res) => {});
              recent.push(results[k].url)
              if (recent.length > max_recent) {
                recent.shift()
              }
            }
          }
        }
      })
    recent = [...new Set(recent)];
  }
});

function getSiteList() {
  return siteList
}
function setSiteList(replace) {
  siteList = replace
}

/*
chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
*/