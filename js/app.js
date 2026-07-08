/* Progress tracking backed by localStorage. */
(function () {
  var STORE_KEY = 'aie-progress';
  var TOTAL_CHAPTERS = 10;

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      var data = raw ? JSON.parse(raw) : {};
      if (!Array.isArray(data.completedChapters)) data.completedChapters = [];
      if (typeof data.quizScores !== 'object' || data.quizScores === null) data.quizScores = {};
      return data;
    } catch (e) {
      return { completedChapters: [], quizScores: {} };
    }
  }

  function save(data) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) { /* private mode */ }
  }

  var AIE = {
    isComplete: function (id) {
      return load().completedChapters.indexOf(id) !== -1;
    },
    toggleComplete: function (id) {
      var data = load();
      var i = data.completedChapters.indexOf(id);
      if (i === -1) data.completedChapters.push(id);
      else data.completedChapters.splice(i, 1);
      save(data);
      return i === -1;
    },
    setQuizScore: function (id, correct, total) {
      var data = load();
      var prev = data.quizScores[id];
      if (!prev || correct > prev.correct) data.quizScores[id] = { correct: correct, total: total };
      save(data);
    },
    completedCount: function () {
      return load().completedChapters.length;
    },
    total: TOTAL_CHAPTERS
  };

  window.AIE = AIE;

  document.addEventListener('DOMContentLoaded', function () {
    // Chapter page: wire up the "mark complete" button.
    var chapter = document.body.getAttribute('data-chapter');
    var btn = document.getElementById('complete-btn');
    if (chapter && btn) {
      var render = function () {
        var done = AIE.isComplete(chapter);
        btn.classList.toggle('done', done);
        btn.textContent = done ? '✓ Completed — tap to undo' : 'Mark chapter as complete';
      };
      btn.addEventListener('click', function () {
        AIE.toggleComplete(chapter);
        render();
      });
      render();
    }

    // Home page: progress bar + per-card completion badges.
    var fill = document.getElementById('progress-fill');
    if (fill) {
      var n = AIE.completedCount();
      fill.style.width = (n / AIE.total * 100) + '%';
      var label = document.getElementById('progress-count');
      if (label) label.textContent = n + ' of ' + AIE.total + ' chapters complete';
      document.querySelectorAll('[data-ch]').forEach(function (card) {
        if (AIE.isComplete(card.getAttribute('data-ch'))) {
          var badge = card.querySelector('.badge');
          if (badge) badge.hidden = false;
        }
      });
    }
  });
})();
