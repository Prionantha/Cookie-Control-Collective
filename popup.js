document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var currentUrl = tabs[0].url;
        chrome.cookies.getAll({url: currentUrl}, function (cookies) {
            var cookieTable = document.getElementById("cookie-table");

            var header = cookieTable.createTHead();
            var headerRow = header.insertRow(0);
            headerRow.innerHTML = "<th>Name</th><th>Value</th><th>Expiration Date</th><th>Delete</th>";

            var body = cookieTable.createTBody();

            cookies.forEach(function (cookie) {
                var row = body.insertRow();

                var nameCell = row.insertCell(0);
                nameCell.textContent = cookie.name;

                var valueCell = row.insertCell(1);
                valueCell.textContent = cookie.value;

                var expirationCell = row.insertCell(2);
                expirationCell.textContent = cookie.expirationDate ? new Date(cookie.expirationDate * 1000).toString() : 'N/A';

                // delete button
                var deleteCell = row.insertCell(3);
                var deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = function () {
                    chrome.cookies.remove({url: currentUrl, name: cookie.name}, function (deletedCookie) {
                        console.log('Deleted Cookie:', deletedCookie);
                        row.remove(); 
                    });
                };
                deleteCell.appendChild(deleteButton);
            });
        });
    });
});