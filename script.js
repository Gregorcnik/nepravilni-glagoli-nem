var s = [
  ["backen", "buk", "gebacken", "peči"], 
  ["beginnen", "begann", "begonnen", "začeti"], 
  ["bleiben", "bleib", "gebleiben", "ostati"],
  ["brennen", "brannte", "gebrannt", "goreti"],
  ["bringen", "brachte", "gebracht", "prinesti"],
  ["denken", "dacthe", "gedacht", "misliti"], 
  ["essen", "aß", "gegessen", "jesti"], 
  ["fahren", "fuhr", "gefahren", "voziti"], 
  ["fallen", "fiel", "gefallen", "pasti"],
  ["fangen", "fing", "gefangen", "loviti"]
];

var a = s;
a = premesaj(a);

var pravilno = 0;
var vseTocke = 0;
var i = 0;
var stStolpca = -1; //-1 means nakljucno, 1 means first column itd.

document.getElementById('seznamBesed').innerHTML = narediSeznamBesed([a[0]], function f() {return nakljucno(4)-1;});

function narediSeznamBesed(seznam, funkcijaZaStolpec) {
  var vrnitev = "<tbody><tr style=\'position: sticky; top: -1.5px; background-color: white;\'><td><b>Infitive</b><br><i>nedoločnik</i></td><td><b>Past Tense</b><br><i>preteklik</i></td><td><b>Past Participle</b><br><i>pretekli deležnik</i></td><td><b></b><br><i>slovenski prevod</i></td></tr></tbody>";
  for (var vrstica = 0; vrstica < seznam.length; vrstica++) {
    vrnitev=vrnitev+'<tr>';
    izpisniStolpec = funkcijaZaStolpec();
    for (var stolpec = 0; stolpec < seznam[vrstica].length; stolpec++) {
      if (stolpec == izpisniStolpec) {
        vrnitev=vrnitev+'<td>'+seznam[vrstica][stolpec]+'</td>';
      } else {
        vrnitev=vrnitev+'<td><input type="text" id="prostorcek" spellcheck="false"></input></td>';
      }
    }
    vrnitev=vrnitev+'</tr>';
  }
  document.getElementById('naprej').style.display = 'none';
  return vrnitev;
}

 function preveri(seznamResitev) {
  let narobe = 0;
  let prav = 0;
  let seznam = document.getElementById('seznamBesed').children[1];
  let vrstice = seznam.children;
  for (var vrstica = 0; vrstica < vrstice.length; vrstica++) {
    stolpci = vrstice[vrstica].children;
    for (var stolpec = 0; stolpec < stolpci.length; stolpec++) {
      if (stolpci[stolpec].children[0] != undefined) {
        if ((enako(stolpci[stolpec].children[0].value, seznamResitev[vrstica][stolpec])) && (stolpec != 3)) {
          stolpci[stolpec].children[0].style.backgroundColor = 'lightgreen';
          prav += 1;
        } else if ((stolpec == 3) && (stolpci[stolpec].children[0].value != '')) {
          stolpci[stolpec].children[0].style.backgroundColor = 'orange';
        } else {
          stolpci[stolpec].children[0].style.backgroundColor = 'rgb(255, 102, 102)';
          narobe += 1;
        }
      }
    }
    document.getElementById('naprej').style.display = 'block';
  }
  return [prav, narobe];
}

function resi(seznamResitev) {
  let seznam = document.getElementById('seznamBesed').children[1];
  let vrstice = seznam.children;
  for (var vrstica = 0; vrstica < vrstice.length; vrstica++) {
    stolpci = vrstice[vrstica].children;
    for (var stolpec = 0; stolpec < stolpci.length; stolpec++) {
      if (stolpci[stolpec].children[0] != undefined) {
        stolpci[stolpec].children[0].value = seznamResitev[vrstica][stolpec];
      }
    }
  }
}

 function nakljucno(a) {
  /*vrne nakljucno celo stevilo med 1 in a vkljucno*/
  let x = Math.random();
  return Math.floor(x * a + 1);
}

 function enako(a, b) {
  a = a.toUpperCase();
  b = b.toUpperCase();
  return (a == b);
}

 function premesaj(seznam) {
  let vrnitev = [];
  let l = seznam.length;
  for (var i = 0; i < l; i++) {
    nakljuc = nakljucno(seznam.length)-1;
    vrnitev.push(seznam[nakljuc]);
    seznam = removeAt(nakljuc, seznam);
  }
  return vrnitev;
}

 function removeAt(int, seznam) {
  seznam.splice(int, 1);
  return seznam;
}

 function nastaviStevecTock(p, v) {
  document.getElementById('steviloNalog').innerText = v;
  document.getElementById('pravilno').innerText = p;
}

function prikazi(id) {
  document.getElementById(id).style.visibility = 'visible';
}

function skrij(id) {
  document.getElementById(id).style.visibility = 'hidden';
}

function dodajI(i) {
  if (i < a.length - 1) {
    return i+1;
  } else {
    return 0;
  }
}

function izberiStolpec () {
  // vrne index stolpca za izpis
  if (stStolpca == -1) {
    return nakljucno(4)-1;
  } else {
    return stStolpca-1;
  }
}

function nastaviStStolpec() {
  console.log("jej");
  if (document.getElementById("set1").value == "naključno") {
    return -1;
  }
  if (document.getElementById("set1").value == "nedoločnik") {
    return 1;
  }
  if (document.getElementById("set1").value == "preteklik") {
    return 2;
  }
  if (document.getElementById("set1").value == "pretekli deležnik") {
    return 3;
  }
  if (document.getElementById("set1").value == "prevod") {
    return 4;
  }
}

function toggleTheme (element) {
  if (element.checked) {
    document.getElementById("body").classList = "dark";
  } else {
    document.getElementById("body").classList = "";
  }
}
