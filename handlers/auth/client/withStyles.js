function withStyles(styles) {
  return () =>  {

    let style;
    style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = styles.toString();
    document.getElementsByTagName('head')[0].appendChild(style);

  };
}

export default withStyles;
