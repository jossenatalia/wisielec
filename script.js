var password = 'Bez pracy nie ma kołaczy';
password = password.toUpperCase();

var length = password.length;
var noHit = 0;
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var password1 = '';

for (i = 0; i < length; i++) {
  if (password.charAt(i) == ' ') password1 = password1 + ' ';
  else password1 = password1 + "-";
}

function getPassword() {
  document.getElementById('plansza').innerHTML = password1;
}

window.onload = start;

var char = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ź", "Ż"];

function start() {
  var letters = '';

  for (var i = 0; i < 35; i++) {
    var element = 'lit' + i;
    letters = letters + '<div class="litera" id="' + element + '" onclick="check(' + i + ')">' + char[i] + '</div>';
    if ((i + 1) % 7 == 0) {
      letters = letters + '<div style="clear:both;"></div>';
    }
  }

  document.getElementById('alfabet').innerHTML = letters;

  getPassword();
}

String.prototype.changeSign = function (place, sign) {
  if (place > this.length - 1) return this.toString();
  else return this.substr(0, place) + sign + this.substr(place + 1);
}

function check(nr) {
  var hit = false;
  for (var i = 0; i < length; i++) {
    if (password.charAt(i) == char[nr]) {
      password1 = password1.changeSign(i, char[nr]);
      hit = true;
    }
  }

  if (hit == true) {
    yes.play();
    var element = 'lit' + nr;
    document.getElementById(element).style.background = "#003300";
    document.getElementById(element).style.color = "#00C000";
    document.getElementById(element).style.border = "3px solid #00C000";
    document.getElementById(element).style.cursor = "default";

    getPassword();
  } else {
    no.play()
    var element = 'lit' + nr;
    document.getElementById(element).style.background = "#330000";
    document.getElementById(element).style.color = "#C00000";
    document.getElementById(element).style.border = "3px solid #C00000";
    document.getElementById(element).style.cursor = "default";
    document.getElementById(element).setAttribute("onclick", ";");
    //skucha
    noHit++;
    var image = "img/s" + noHit + '.jpg'
    document.getElementById('szubienica').innerHTML = '<img src="' + image + '" alt=""/>'
  }
  //wygrana
  if (password == password1) {
    document.getElementById('alfabet').innerHTML = "Brawo! Podano prawidłowe hasło : " + password + '<br/><br/><span class="reset" onclick="location.reload()">Jeszcze Raz?</span>'
  }

  //przegrana
  if (noHit >= 9) {
    document.getElementById('alfabet').innerHTML = "Przegrana! Prawidłowe hasło : " + password + '<br/><br/><span class="reset" onclick="location.reload()">Jeszcze Raz?</span>'

  }
}