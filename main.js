document.addEventListener("DOMContentLoaded", function() {
    var trackingId = getQueryParamFromUrl('id');
    if (trackingId) {
        document.cookie = 'trackingId=' + trackingId;
    }
});

function barodes_list_handler(page) {
    url = "/account/ajax/?page=" + page;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            var resp = this.response;
            document.getElementById("barcodeTable").innerHTML = resp;
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        } else {
            document.getElementById("barcodeTable").innerHTML = "<p> Something went wrong =( </p>";   
        }
    };

    request.onerror = function() {
        document.getElementById("barcodeTable").innerHTML = "<p> Network error </p>";
        console.log(resp);
    };

    request.send();
}

function open_barcode_modal(path_svg, path_png, info) {
    var myModal = new bootstrap.Modal(document.getElementById('barcodeModal'), {
        keyboard: false
    });
    myModal.toggle();
    document.getElementById('barcodeModalImage').src = path_svg;
    document.getElementById('barcodeModalTitle').innerHTML = info.replace(/<br>/g, ', ');
    document.getElementById('barcodeSVGModalDownloadButton').href = path_svg;
    document.getElementById('barcodePNGModalDownloadButton').href = path_png;
}

function createBarcode() {
    let form = document.getElementById('barcodeDataForm');
    AJAX_createBarcode(form);
}

function AJAX_createBarcode(form) {
    var formData = new FormData(form);

    // Convert form data to JSON for sending via AJAX
    var data = {};
    for (let [key, value] of formData) {
        data[key] = value;
    }

    data = JSON.stringify(data);

    const csrftoken = getCookie('csrftoken');
    var request = new XMLHttpRequest();
    request.open('POST', 'create_barcode_ajax/', true);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('X-CSRFToken', csrftoken);

    // Handle response from server
    request.onload = function () {
        if (request.status === 200) {
            var response = JSON.parse(request.responseText);

            // Check if barcode generation was successful
            if (response['status'] === 'SUCCESS') {
                // Display the barcode image and set download links
                document.getElementById("barcodeImage").src = response["file_svg"];
                document.getElementById("barcodeImageSVGDownload").href = response["file_svg"];
                document.getElementById("barcodeImagePNGDownload").href = response["file_png"];

                // Hide spinner and show barcode
                document.getElementById('barcodeAreaText').classList.add("visually-hidden");
                document.getElementById('barcodeImage').classList.remove("visually-hidden");
                document.getElementById('barcodeAreaPlaceholder').classList.remove("visually-hidden");

                // Clear any previous error messages
                document.getElementById("inputDataErrorAlertArea").innerHTML = "";
                document.getElementById("resultDataErrorAlertArea").innerHTML = "";

            } else {
                // Display error message if barcode generation failed
                document.getElementById('barcodeAreaText').classList.remove("visually-hidden");
                document.getElementById('barcodeImage').classList.add("visually-hidden");
                document.getElementById('barcodeAreaPlaceholder').classList.add("visually-hidden");
                document.getElementById('barcodeAreaText').innerHTML = response['message'];

                // Display specific error messages based on response
                var html_msg = "";
                switch (response['message']) {
                    case 'BARCODE_LIMIT':
                        html_msg = 'You don\'t have barcodes. Please <a target="_blank" href="/pricing/">buy barcode packages</a> to get access to generators.';
                        break;
                    case 'CONFIG_ERROR':
                        html_msg = 'Internal config error. Something went wrong!';
                        break;
                    case 'BARCODE_ERROR':
                        html_msg = 'Internal barcode error. Something went wrong!';
                        break;
                    default:
                        html_msg = 'Something went wrong!';
                }

                // Display error alert message
                document.getElementById("inputDataErrorAlertArea").innerHTML = '<div class="alert alert-danger font-monospace alert-dismissible fade show" role="alert"><div class="text-center"> ' + html_msg + ' </div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
            }
        } else {
            // Handle network errors
            document.getElementById("inputDataErrorAlertArea").innerHTML = '<div class="alert alert-danger font-monospace alert-dismissible fade show" role="alert"><div class="text-center"> Network error. Please try again later. </div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        }
    };

    // Show spinner while waiting for response
    document.getElementById('barcodeAreaText').classList.add("visually-hidden");
    document.getElementById('barcodeImage').classList.add("visually-hidden");
    document.getElementById('barcodeAreaPlaceholder').classList.remove("visually-hidden");

    // Send AJAX request with data
    request.send(data);
}

function getQueryParamFromUrl(param) {
    var currentUrl = window.location.search.substring(1);
    var urlVariables = currentUrl.split('&');
    for (var i = 0; i < urlVariables.length; i++) {
        var sParameterName = urlVariables[i].split('=');
        if (sParameterName[0] == param) {
            return sParameterName[1];
        }
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
