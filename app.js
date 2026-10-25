// Imiona: filtry + losowanie + ulubione w localStorage.
(function () {
  'use strict';
  var KEY = 'imiona-v1';
  var NAMES = [
    ['Aleksandra', 'f', 'obrończyni ludzi'], ['Alicja', 'f', 'szlachetnego rodu'],
    ['Antonina', 'f', 'bezcenna'], ['Amelia', 'f', 'pracowita'],
    ['Julia', 'f', 'młodzieńcza'], ['Zuzanna', 'f', 'lilia'],
    ['Maja', 'f', 'wielka'], ['Lena', 'f', 'światła'],
    ['Zofia', 'f', 'mądrość'], ['Maria', 'f', 'ukochana'],
    ['Natalia', 'f', 'narodzona w Boże Narodzenie'], ['Wiktoria', 'f', 'zwycięstwo'],
    ['Emilia', 'f', 'gorliwa'], ['Laura', 'f', 'wawrzyn'],
    ['Pola', 'f', 'mieszkanka pól'], ['Helena', 'f', 'jasna, płonąca'],
    ['Anna', 'f', 'łaska'], ['Ewa', 'f', 'dająca życie'],
    ['Klara', 'f', 'jasna, sławna'], ['Róża', 'f', 'kwiat róży'],
    ['Aleksander', 'm', 'obrońca ludzi'], ['Antoni', 'm', 'bezcenny'],
    ['Jan', 'm', 'Bóg jest łaskawy'], ['Franciszek', 'm', 'Francuz'],
    ['Jakub', 'm', 'trzymający za piętę'], ['Szymon', 'm', 'wysłuchany'],
    ['Filip', 'm', 'miłośnik koni'], ['Mikołaj', 'm', 'zwycięstwo ludu'],
    ['Leon', 'm', 'lew'], ['Stanisław', 'm', 'sława + stan'],
    ['Wojciech', 'm', 'pocieszyciel wojska'], ['Tymon', 'm', 'czczony'],
    ['Igor', 'm', 'wojownik'], ['Milan', 'm', 'miły'],
    ['Oliwier', 'm', 'drzewo oliwne'], ['Bruno', 'm', 'brązowy'],
    ['Nikodem', 'm', 'zwycięstwo ludu'], ['Marcel', 'm', 'mały wojownik'],
    ['Kacper', 'm', 'skarbniczny'], ['Bartosz', 'm', 'syn Talmaja'],
    ['Alan', 'm', 'skała'], ['Adam', 'm', 'człowiek'],
    ['Piotr', 'm', 'skała'], ['Marek', 'm', 'wojowniczy'],
    ['Tomasz', 'm', 'bliźniak'], ['Michał', 'm', 'któż jak Bóg'],
    ['Karol', 'm', 'wolny człowiek'], ['Paweł', 'm', 'mały'],
    ['Krzysztof', 'm', 'niosący Chrystusa'], ['Andrzej', 'm', 'mężny'],
    ['Łukasz', 'm', 'pochodzący z Lukanii'], ['Mateusz', 'm', 'dar Boga'],
    ['Dominik', 'm', 'należący do Pana'], ['Kamil', 'm', 'młodzieniec'],
    ['Oskar', 'm', 'Boża włócznia'], ['Fabian', 'm', 'hodowca bobu'],
    ['Natan', 'm', 'dar'], ['Remigiusz', 'm', 'wioślarz']
  ];
  function load() {
    try { var s = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(s)) return s; }
    catch (e) {}
    return [];
  }
  var favs = load(), cur = null;
  function save() { try { localStorage.setItem(KEY, JSON.stringify(favs)); } catch (e) {} }
  function pool() {
    var sex = document.getElementById('sex').value;
    var L = (document.getElementById('letter').value || '').trim().toUpperCase();
    return NAMES.filter(function (n) {
      return (sex === 'all' || n[1] === sex) && (!L || n[0][0] === L);
    });
  }
  function renderFavs() {
    document.getElementById('favs').textContent =
      favs.length ? '❤ Ulubione: ' + favs.join(', ') : '';
  }
  function draw() {
    var p = pool();
    var out = document.getElementById('out');
    var det = document.getElementById('detail');
    if (!p.length) { out.textContent = '—'; det.textContent = 'Brak imion dla tych filtrów.'; cur = null; return; }
    var r = new Uint32Array(1);
    crypto.getRandomValues(r);
    cur = p[r[0] % p.length];
    out.textContent = cur[0];
    det.textContent = 'Znaczenie: ' + cur[2] + '. (' + p.length + ' pasujących)';
  }
  document.getElementById('draw').addEventListener('click', draw);
  ['sex', 'letter'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', draw);
  });
  document.getElementById('fav').addEventListener('click', function () {
    if (cur && favs.indexOf(cur[0]) === -1) { favs.push(cur[0]); save(); renderFavs(); }
  });
  renderFavs(); draw();
})();
