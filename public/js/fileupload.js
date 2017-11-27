var previewNode = document.querySelector("#template");
previewNode.id = "";
var previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);
var myDropzone = new Dropzone("#drop", {
    paramName: 'files',
    maxFilesize: 5000, // MB
    maxFiles: 100,
    timeout: 600000,
    dictDefaultMessage: 'Drag an image here to upload, or click to select one',
    acceptedFiles: '.png, .jpg, .jpeg, .gif, .webm, .zip, .7z, .txt, .tar, .gz, .iso, .mp4, .pdf, .docx, .xlsx, .csv',
    url: "/upload",
    previewTemplate: previewTemplate,
    autoQueue: false, // Make sure the files aren't queued until manually added
    previewsContainer: "#previews", // Define the container to display the previews
    clickable: ".fileinput-button" // Define the element that should be used as click trigger to select files.
  });
  myDropzone.on("addedfile", function(file) {
    // Hookup the start button
    var ext = file.name.split('.').pop();
    switch(ext) {
    //if .jpg/.gif/.png do something
    case 'jpg': case 'gif': case 'png':
        file.previewElement.querySelector("#preview").innerHTML += "<img class = \"thumbnail\" data-dz-thumbnail />";
        break;
    case 'pdf':
    /* handle */
        break;
    default:
        file.previewElement.querySelector("#preview").innerHTML += "Unable to preview this file";
        break;

    }
    document.querySelector("#previews").style.visibility = "visible";

    file.previewElement.querySelector("#filename-tip").setAttribute('title', file.name)
    file.previewElement.querySelector(".start").onclick = function() { myDropzone.enqueueFile(file); };
  });

  // Update the total progress bar
  myDropzone.on("totaluploadprogress", function(progress) {
    document.querySelector("#total-progress").style.width = progress + "%";
    document.querySelector("#progressTextTotal").textContent = Math.round(progress) + "%";
  });
  myDropzone.on("uploadprogress", function(file, progress) {
    file.previewElement.querySelector("#single-progress").style.width = progress + "%";
    file.previewElement.querySelector("#progressText").textContent = Math.round(progress) + "%";
  });
  myDropzone.on("sending", function(file) {
    // Show the total progress bar when upload starts
    document.querySelector("#total-progress").style.opacity = "1";
    document.querySelector("#total-progress-div").style.opacity = "1";
    // And disable the start button
    file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
  });

  // Hide the total progress bar when nothing's uploading anymore
  myDropzone.on("queuecomplete", function(progress) {
    document.querySelector("#total-progress").style.opacity = "0";
    document.querySelector("#total-progress-div").style.opacity = "0";
  });
  myDropzone.on("success", function(file, message) {
    file.previewElement.querySelector(".progress").innerHTML += "<div class=\"dz-success-mark\"><span>✔</span></div>"
    file.previewElement.querySelector(".progress").innerHTML += "<span><a href=\"http://ul.gy/"+message.file_id+message.file_ext+"\">File Link</a></span>"
    file.previewElement.querySelector(".progress").className += " success"
    console.log(message);
  });

  myDropzone.on("error", function(file, message) {
    document.querySelector("#error").style.display = "block";
    document.querySelector("#error").textContent = "Error: " + message + " File: "+file.name;
  });

  // Setup the buttons for all transfers
  // The "add files" button doesn't need to be setup because the config
  // `clickable` has already been specified.
  document.querySelector("#actions .start").onclick = function() {
    myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
  };
  document.querySelector("#actions .cancel").onclick = function() {
    myDropzone.removeAllFiles(true);
  };
