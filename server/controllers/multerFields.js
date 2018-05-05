/*
This is a custom file containing all the FILE fields that formData will be passing to the server in POST requests.

Whenever a new file field will be passed, this list needs to be updated otherwise things will break.. Multer will add `req.files`
to all POST routes
*/

module.exports =  [
  {'name': 'image'},
  {'name': 'mixFile'},
  {'name': 'trackImage'},
  {'name': 'imageCropped'},
  {'name': 'multitrackFiles'},
  {'name': 'previewFile'}
];