function updateRecents() {
  const bg = chrome.extension.getBackgroundPage()
  document.getElementById("recent").innerHTML = "<p> History for (Last 5 results) <p>"
  for (var prop in bg.recent) {
    document.getElementById("recent").innerHTML += "<li><a href=" + bg.recent[prop] + ">" + bg.recent[prop] + "</a></li>"
  }
}

function updateSiteList() {
  const bg = chrome.extension.getBackgroundPage()
  var siteListset = bg.getSiteList()

  document.getElementById("sitelist").innerHTML = ""
  for (let i of siteListset) {
    document.getElementById("sitelist").innerHTML += "<li>" + i + "</a></li>"
  }
}

window.onload = function() {
  const bg = chrome.extension.getBackgroundPage()
  var siteListset = bg.getSiteList()
  chrome.storage.sync.get("data", function(items) {
    console.log("site list: " + siteListset)
    console.log("sync list: " + items.data);
    if (!chrome.runtime.error) {
      if (items.data && items.data.length >= siteListset.size) {
        console.log(items.data.length + " - " + siteListset.size)
        console.log("sightList updated with" + items.data)
        bg.setSiteList(new Set(items.data))
        document.getElementById("data").innerText = "Site List updated"
      } else {
        chrome.storage.sync.set({ "data" : [...siteListset] }, function() {
          if (chrome.runtime.error) {
            console.log("Runtime error.");
          } else {
            console.log("sync updated")
            document.getElementById("data").innerText = "Sync updated"
          }
        });
      }
    }
  });

  chrome.storage.sync.get("data", function(items) {
      if (!chrome.runtime.error) {
        console.log(items.data);
        document.getElementById("data").innerText += "\nListed: " + items.data
      }
    });
  updateRecents()
  updateSiteList()
};

document.getElementById("clear").addEventListener("click", updateRecents);

document.getElementById("set").onclick = function() {
  const bg = chrome.extension.getBackgroundPage()
  var siteListset = bg.getSiteList()
  var d = document.getElementById("text").value;
  console.log(siteListset)
  if(siteListset.has(d)) {
    siteListset.delete(d)
  } else {
    siteListset.add(d)
  }
  bg.siteList = siteListset
  updateSiteList()
}