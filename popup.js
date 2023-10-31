document.addEventListener('DOMContentLoaded', function () {
    chrome.cookies.getAll({}, function (cookies) {
      var cookieList = document.getElementById('cookie-list');
      cookies.forEach(function (cookie) {
        var listItem = document.createElement('li');
        listItem.textContent = "Name: " + cookie.name + "<br>";
        listItem.textContent += "Value: " + cookie.value + "<br>";
        listItem.textContent += "Domain: " + cookie.domain + "<br>";

        if (cookie.expirationDate) {
            listItem.textContent += "Expiration Date: " + new Date(cookie.expirationDate * 1000);
        }

        cookieList.appendChild(listItem);
      });
    });
  });


