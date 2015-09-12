import $ from 'jquery';
import styles from './index.scss';
import withStyles from './withStyles';

withStyles(styles);

export let loginInit = () => {
  $(document.forms['login-form']).on('submit', function() {
    var form = $(this);

    $('.error', form).html('');
    let button = $(':submit', form)[0];
    button.innerHTML = button.dataset.loadingText;

    $.ajax({
      url: '/login',
      method: 'POST',
      data: form.serialize(),
      complete: function() {
        button.innerHTML = 'Enter';
      },
      statusCode: {
        200: function() {
          form.html('You access to site').addClass('alert-success');
          window.location.href = '/chat';
        },
        403: function(jqXHR) {
          var error = JSON.parse(jqXHR.responseText);
          $('.error', form).html(error.message);
        }
      }
    });
    return false;
  });
};