import $ from 'jquery';
import axios from 'axios';

const APIcall =  {
  fetch: function(data, endpoint, callback) {
/*    $.ajax({
      type: 'GET',
      url: endpoint,
      data: data,
      success: callback,
      error: function() {
        console.log('GET has failed');
      }
    })*/
    axios.get(endpoint)
    .then(callback)
    .catch((err) => console.log('GET has failed.'))
  },

  post: function(data, endpoint, callback) {
/*    $.ajax({
      type: 'POST',
      url: endpoint,
      data: data,
      contentType: false,
      processData: false,
      success: callback,
      error: function() {
        console.log('GET has failed');
      }
    })*/
    axios.post(endpoint, data)
    .then(callback)
    .catch((err) => console.log('POST has failed'));
  },
}

export default APIcall;

