/* Interactive SVG diagrams: hover highlights via CSS; click/Enter on a node
   opens a detail panel below the figure. Explanations live in an inline
   <script type="application/json" class="diagram-data"> block per figure,
   keyed by each node's data-node id. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('figure.diagram').forEach(function (fig) {
      var dataEl = fig.querySelector('script.diagram-data');
      var panel = fig.querySelector('.detail-panel');
      if (!dataEl || !panel) return;

      var info;
      try { info = JSON.parse(dataEl.textContent); } catch (e) { return; }

      var nodes = fig.querySelectorAll('.node[data-node]');
      var selected = null;

      function deselect() {
        if (selected) selected.classList.remove('selected');
        selected = null;
        panel.hidden = true;
      }

      function select(node) {
        var entry = info[node.getAttribute('data-node')];
        if (!entry) return;
        if (selected === node) { deselect(); return; }
        if (selected) selected.classList.remove('selected');
        selected = node;
        node.classList.add('selected');
        panel.innerHTML = '';
        var h = document.createElement('h4');
        h.textContent = entry.title;
        var p = document.createElement('p');
        p.textContent = entry.body;
        panel.appendChild(h);
        panel.appendChild(p);
        panel.hidden = false;
      }

      nodes.forEach(function (node) {
        node.addEventListener('click', function () { select(node); });
        node.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            select(node);
          }
        });
      });
    });
  });
})();
