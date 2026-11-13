/* Expand / collapse long author lists (publication list).
   Markup:  <span class="authors" data-full="Full list of authors">Short, ..., et al.</span>
   A small "[Full Authors]" button is added after each such span. In the full
   list, "Yuan Ke" is shown in bold. Without JavaScript the short list shows. */
(function () {
  var ME = 'Yuan Ke';

  function fill(el, text, boldMe) {
    el.textContent = '';
    var parts = boldMe ? text.split(ME) : [text];
    parts.forEach(function (part, i) {
      if (i > 0) {
        var b = document.createElement('strong');
        b.textContent = ME;
        el.appendChild(b);
      }
      el.appendChild(document.createTextNode(part));
    });
  }

  document.querySelectorAll('.authors[data-full]').forEach(function (span) {
    var shortList = span.textContent.trim();
    var fullList = span.getAttribute('data-full');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'authors-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = '[Full Authors]';
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      fill(span, open ? shortList : fullList, !open);
      btn.setAttribute('aria-expanded', String(!open));
      btn.textContent = open ? '[Full Authors]' : '[Hide]';
    });
    span.parentNode.insertBefore(btn, span.nextSibling);
    span.parentNode.insertBefore(document.createTextNode(' '), btn);
  });
})();
