var siteList = new Set(["youtube", "chess", "bit", "colab.research"]);
var recent_url = []
var recent_title = []
var max_recent = 5

// chrome.storage.sync.clear()

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});

function updateSiteList() {
  chrome.storage.sync.get("site_list", function(result) {
    // console.log('Value is type of ' + typeof(siteList))
    // console.log(siteList.size)
    // console.log('Value is type of ' + typeof(result.site_list))
    // console.log('Value currently is ' + result.site_list);
    var siteList_str = [...siteList].join(' ')

    if (typeof(result.site_list) == "string") {
      new_siteList = new Set(result.site_list.split(' '))
      // console.log(siteList.size + ' | ' + result.site_list + ' | ' + new_siteList.size)
      // compare site_list lengths
      if (siteList.size <= new_siteList.size) {
        console.log('Updated site ' + result.site_list)
        siteList = new_siteList;
      } else {
        chrome.storage.sync.set({"site_list": siteList_str}, function() {
          console.log('Updated storage1 ' + siteList_str);
        });
      }
    } else {
      chrome.storage.sync.set({"site_list": siteList_str}, function() {
        console.log('Updated storage2 ' + siteList_str);
      });
    }
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url.match(/^about:/)) {

    updateSiteList()

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
              recent_url.push(results[k].url)
              recent_title.push(results[k].title)
              if (recent_url.length > max_recent) {
                recent_url.shift()
                recent_title.shift()
              }
            }
          }
        }
      })
      recent_url = [...new Set(recent_url)];
      recent_title = [...new Set(recent_title)];
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