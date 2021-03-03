document.addEventListener('DOMContentLoaded', (event) => {
  hljs.configure({
    tabReplace: '  ',
    classPrefix: 'hjs'
  })
  hljs.initHighlighting();
});