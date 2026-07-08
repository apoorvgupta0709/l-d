/* Quiz engine: renders multiple-choice questions from an inline JSON block
   (<script type="application/json" class="quiz-data">) inside section.quiz.
   Question format: { q, opts: [..], a: <correct index>, why: <explanation> }.
   Answers give instant feedback; best score is stored via window.AIE. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('section.quiz').forEach(function (sec) {
      var dataEl = sec.querySelector('script.quiz-data');
      var host = sec.querySelector('.quiz-body');
      if (!dataEl || !host) return;

      var questions;
      try { questions = JSON.parse(dataEl.textContent); } catch (e) { return; }

      var chapter = document.body.getAttribute('data-chapter');
      var answered = 0;
      var correct = 0;

      var scoreLine = document.createElement('p');
      scoreLine.className = 'quiz-score';

      questions.forEach(function (q, qi) {
        var box = document.createElement('div');
        box.className = 'quiz-q';

        var qt = document.createElement('p');
        qt.className = 'q-text';
        qt.textContent = (qi + 1) + '. ' + q.q;
        box.appendChild(qt);

        var buttons = [];
        q.opts.forEach(function (opt, oi) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'quiz-opt';
          b.textContent = opt;
          b.addEventListener('click', function () {
            buttons.forEach(function (x) { x.disabled = true; });
            var ok = oi === q.a;
            b.classList.add(ok ? 'correct' : 'wrong');
            if (!ok) buttons[q.a].classList.add('correct');
            if (ok) correct++;
            answered++;

            var why = document.createElement('p');
            why.className = 'quiz-why';
            var verdict = document.createElement('span');
            verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
            verdict.textContent = ok ? 'Correct. ' : 'Not quite. ';
            why.appendChild(verdict);
            why.appendChild(document.createTextNode(q.why));
            box.appendChild(why);

            scoreLine.textContent = 'Score: ' + correct + ' / ' + answered +
              (answered === questions.length ? ' — quiz finished!' : '');
            if (answered === questions.length && chapter && window.AIE) {
              window.AIE.setQuizScore(chapter, correct, questions.length);
            }
          });
          buttons.push(b);
          box.appendChild(b);
        });

        host.appendChild(box);
      });

      host.appendChild(scoreLine);
    });
  });
})();
