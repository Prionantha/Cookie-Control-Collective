document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var currentUrl = tabs[0].url;
        chrome.cookies.getAll({url: currentUrl}, function (cookies) {
            var cookieList = document.getElementById("cookie-list");
            cookies.forEach(function (cookie) {

                var listItem = document.createElement('li');
                // append name, value and expirationDate to list
                listItem.textContent = "Name: " + cookie.name + ", Value: " + cookie.value;
                if (cookie.expirationDate) {
                    listItem.textContent += ", Expiration Date: " + new Date(cookie.expirationDate * 1000);
                }
                
                // display delete button
                var deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function () {
                    chrome.cookies.remove({url: currentUrl, name: cookie.name}, function (deletedCookie) {
                    console.log('Deleted Cookie:', deletedCookie);
                    listItem.remove();
                    })
                }

                // add to display
                listItem.appendChild(deleteButton);
                cookieList.appendChild(listItem);
            });
        });
    });
});
