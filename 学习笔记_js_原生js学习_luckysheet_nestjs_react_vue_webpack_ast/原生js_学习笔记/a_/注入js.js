const theScript = document.createElement('script');
theScript.innerHTML = '"your code here"';
document.body.appendChild(theScript);



function appendScript(scriptFile) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.setAttribute("src", chrome.extension.getURL(scriptFile));
  document.documentElement.appendChild(script); // run the script
}






// Executing an anonymous script
function exec(fn) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = '(' + fn + ')();';
  document.documentElement.appendChild(script); // run the script
  document.documentElement.removeChild(script); // clean up
}

script = function () {
  //sayHello();
  alert('hello');
}

exec(script);

// Append a script from a file in your extension
function appendScript(scriptFile) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.setAttribute("src", chrome.extension.getURL(scriptFile));
  document.documentElement.appendChild(script); // run the script
}

appendScript('someFile.js');




chrome.tabs.executeScript(tab.id, { file: 'content.js' }, function () {
  chrome.tabs.sendMessage(tab.id, 'whatever value; String, object, whatever');
})