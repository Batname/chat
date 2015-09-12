import $ from 'jquery';

export default () => {
  document.getElementById('logout').addEventListener('click', () => {

    $.ajax({
      url: '/logout',
      method: 'POST',
      statusCode: {
        200: function() {
          window.location.href = '/';
        }
      }
    });

  });
};