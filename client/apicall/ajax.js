import $ from 'jquery';

const APIcall =  {
  fetch: function(data, endpoint, callback) {
    $.ajax({
      type: 'GET',
      url: endpoint,
      data: data,
      success: callback,
      error: function() {
        console.log('GET has failed');
      }
    })
  },

  post: function(data, endpoint, callback) {
    $.ajax({
      type: 'POST',
      url: endpoint,
      data: data,
      contentType: false,
      processData: false,
      success: callback,
      error: function() {
        console.log('GET has failed');
      }
    })
  },
}

export default APIcall;