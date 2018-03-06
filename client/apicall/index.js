import $ from 'jquery';
import axios from 'axios';

const APIcall =  {
  fetch: function(value, endpoint, callback) {
/*    $.ajax({
      type: 'GET',
      url: endpoint,
      data: data,
      success: callback,
      error: function() {
        console.log('GET has failed');
      }
    })*/
    axios.get(endpoint, {params: {query: value} })
    .then((res) => callback(res.data))
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
    .then((res) => callback(res.data));
  },
}

export default APIcall;