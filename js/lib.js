//Ligação JSON
if (window.XMLHttpRequest) news = new XMLHttpRequest(); 	
if (window.XMLHttpRequest) tablerank = new XMLHttpRequest();
if (window.XMLHttpRequest) cards = new XMLHttpRequest();

$(function () {
    var active = true;

    $('#noticiasJSON').on('show.bs.collapse', function () {
        if (active) $('#noticiasJSON .in').collapse('hide');
    });
  
  $('#newnoticiasJSON').on('show.bs.collapse', function () {
        if (active) $('#newnoticiasJSON .in').collapse('hide');
    });
});

//Load noticias do ficheiro "json/noticias.json"
function loadNoticias(){
  news.open('GET', 'json/noticias.json', false);
  news.onreadystatechange = function () {
    if (news.readyState===4 && news.status===200) {	
      //Parce do ficheiro JSON		
      var items = JSON.parse(news.responseText);
      var par = ''
      //Criação das divs de noticias
      for (i = 0; i < items.length; i++) {
        par += '<div class="panel panel-default">';
        par += '<div class="panel-heading">';
        par += '<h4 class="panel-title">';
        par += '<a data-toggle="collapse" data-parent="#noticiasJSON" href="#'+items[i].Id+'">'+items[i].Titulo+'</a>';
        par += '</h4';
        par += '</div>';
        par += '<div id="'+items[i].Id+'" class="panel-collapse collapse">';
        par += '<div class="panel-body">'+items[i].Texto+'</div>';
        par += '</div>';
        par += '</div>';
        document.getElementById('noticiasJSON').innerHTML = par; 
      }
    }
  }
  news.send();
}

function rankTable() {
  tablerank.open('GET', 'json/rank.json', false);
  tablerank.onreadystatechange = function () {
    if (tablerank.readyState===4 && tablerank.status===200) {			
      var items = JSON.parse(tablerank.responseText);

      var par = '<table class="table" id="id_tabel" align="center"> <tr> <th>Username</th> <th>Rank</th> <th>Level</th> </tr>';
      for (i = 0; i < items.length; i++) {
        par += '<tr><td>'+ items[i].Nome + '</td><td>'+ items[i].Rank + '</td><td>'+ items[i].Lvl + '</td><td>';
      }
      par += '</table>'

      document.getElementById("teste").innerHTML = par;
    }
  }
  tablerank.send();
}

function itemShop() {
  cards.open('GET', 'json/items.json', false);
  cards.onreadystatechange = function () {
    if (cards.readyState===4 && cards.status===200) {			
      var items = JSON.parse(cards.responseText);

      var par = ''
      for (i = 0; i < items.length; i++) {
        par = '<div class="col-md-6 lojaCards">';
        par += '<div class="card ">';
        par += '<a href="#"><img class="card-img-top" src="img/'+items[i].Imagem+'" style="width:235px;height:235px"></a>';
        par += '<div class="card-block items">';
        par += '<h4 class="card-title">'+items[i].Titulo+'</h4>';
        par += '<p>'+items[i].Descricao+'</p>';
        par += '<p>Preço: '+items[i].Preco+'€</p>';
        par += '<a href="#" class="btn btn-primary">Comprar</a>';
        par += '</div>';
        par += '</div>';
        par += '</div>';

        document.getElementById("items").innerHTML += par;
      }
    }
  }
  cards.send();
}

function addNoticia() {
  var title = document.getElementById('inputTitle').value
  var text = document.getElementById('inputText').value
  
  var par = '<div class="panel panel-default" style="margin-top: 0">';
  par += '<div class="panel-heading">';
  par += '<h4 class="panel-title">';
  par += '<a data-toggle="collapse" data-parent="#noticiasJSON" href="#'+6+'">'+title+'</a>';
  par += '</h4';
  par += '</div>';
  par += '<div id="'+6+'" class="panel-collapse collapse">';
  par += '<div class="panel-body">'+text+'</div>';
  par += '</div>';
  par += '</div>';
  
  document.getElementById("noticiasJSON").innerHTML += par;

  var succ = '<p style="color: #45f442">Noticia adicionada</p>'
  document.getElementById("success").innerHTML += succ;

  document.getElementById('inputTitle').value = "";
  document.getElementById('inputText').value = "";
}

function addItem() {
  var title = document.getElementById('inputTitle').value
  var text = document.getElementById('inputText').value
  var price = document.getElementById('inputPreco').value
  var img = document.getElementById('inputImg').value

  if(img == "necklace" || img == "ring" || img == "shield" || img == "sword")
  {
    img = document.getElementById('inputImg').value
  }
  else {
    img = "new"
  }

  par = '<div class="col-md-6 lojaCards">';
  par += '<div class="card ">';
  par += '<a href="#"><img class="card-img-top" src="img/'+img+'.jpg" style="width:235px;height:235px"></a>';
  par += '<div class="card-block items">';
  par += '<h4 class="card-title">'+title+'</h4>';
  par += '<p>'+text+'</p>';
  par += '<p>Preço: '+price+'€</p>';
  par += '<a href="#" class="btn btn-primary">Comprar</a>';
  par += '</div>';
  par += '</div>';
  par += '</div>';

  document.getElementById("items").innerHTML += par;

  var succ = '<p style="color: #45f442">Item adicionada</p>'
  document.getElementById("success").innerHTML += succ;

  document.getElementById('inputTitle').value = ""
  document.getElementById('inputText').value = ""
  document.getElementById('inputPreco').value = ""
  document.getElementById('inputImg').value = ""
}

function login(){
  var username = loginform.username.value;
  var password = loginform.username.value;
  
  if(username ==="admin" && password ==="admin")
  {
    window.location="homepageafterlogin.html";
  }else{
    alert("Login Incorrecto");
  }
}

function updateTable(){
  table = document.getElementById("id_tabel"); 

  console.log(table.rows.length)

  while(table.rows.length > 0)
  {
    table.deleteRow(table.rows.length - 1)
  }

  tablerank.open('GET', 'json/rankactualizado.json', false);
  tablerank.onreadystatechange = function () {
    if (tablerank.readyState===4 && tablerank.status===200) {			
      var items = JSON.parse(tablerank.responseText);

      var par = '<table class="table" id="id_tabel" align="center"> <tr> <th>Username</th> <th>Rank</th> <th>Level</th> </tr>';
      for (i = 0; i < items.length; i++) {
        par += '<tr><td>'+ items[i].Nome + '</td><td>'+ items[i].Rank + '</td><td>'+ items[i].Lvl + '</td><td>';
      }
      par += '</table>'

      document.getElementById("teste").innerHTML = par;
    }
  }

  var succ = '<p style="color: #45f442">Noticia adicionada</p>'
  document.getElementById("success").innerHTML += succ;
  tablerank.send();
}

function navBar(){

  nav = '<div class = "navbar-header">';
  nav += '<button type = "button" class = "navbar-toggle" data-toggle = "collapse" data-target = "#navbarNav">';
  nav += '<span class = "sr-only">Toggle navigation</span>';
  nav += '<span class = "icon-bar"></span>';
  nav += '<span class = "icon-bar"></span>';
  nav += '<span class = "icon-bar"></span>';
  nav += '</button>';
  nav += '</div>';
  nav += '<div class="collapse navbar-collapse" id="navbarNav">';
  nav += '<ul class="nav navbar-nav">';
  nav += '<li class="nav-item"><a class="nav-link" href="index.html">Página Inicial</a></li>';
  nav += '<li class="nav-item"><a class="nav-link" href="#">Informações</a></li>';
  nav += '<li class="nav-item"><a class="nav-link" href="noticias.html">Notícias</a></li>';
  nav += '<li class="nav-item"><a class="nav-link" href="ranking.html">Ranking</a></li>';
  nav += '<li class="nav-item"><a class="nav-link" href="loja.html">Loja</a></li>';
  nav += '<li class="nav-item"><a class="nav-link" href="#">Forúm</a></li>';
  nav += '</ul>';
  nav += '</div>';

  document.getElementById("nav").innerHTML=nav;
}
