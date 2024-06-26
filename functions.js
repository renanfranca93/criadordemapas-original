var elementControl = 0;
var allMapElements = [];
var numberStyle = 2;
var typeOfSystem = "";

async function counter() {
  const response = await fetch("https://httpbin.org/get");
  const myJson = await response.json(); //extract JSON from the http response
  var xhttp = new XMLHttpRequest();
  xhttp.open(
    "GET",
    "counter.php?ip=" + myJson.origin + "&url=" + document.URL,
    true
  );
  xhttp.send();
}

function changeBg() {
  numberStyle++;
  if (numberStyle > 5) {
    numberStyle = 1;
  }
  var nextStyle = numberStyle + 1;
  if (nextStyle > 5) {
    nextStyle = 1;
  }
  var seletor = document.getElementById("selectorBg");
  var body = document.querySelector("body");

  seletor.removeAttribute("class");
  body.removeAttribute("class");

  seletor.setAttribute("class", "bgSelector bgStyle" + nextStyle);
  body.setAttribute("class", "bgStyle" + numberStyle);

  localStorage.setItem("criadordemasmorrabg", "bgStyle" + numberStyle);
}

function rolld6() {
  var random = Math.floor(Math.random() * 6) + 1;

  var d6 = document.getElementById("d6");
  setTimeout(function () {
    d6.removeAttribute("class");
    d6.setAttribute("class", "diceRoller dice" + random);
  }, 1000);
  d6.setAttribute("class", "diceRoller diceWhat shake");
}

function loadPage() {
  var bg = localStorage.getItem("criadordemasmorrabg");
  if (!bg) {
    bg = "bgStyle2";
  }
  var body = document.querySelector("body");
  body.removeAttribute("class");
  body.setAttribute("class", bg);

  bgseletor = bg.split("bgStyle");
  bgSeletorValue = bgseletor[1];

  bgSeletorValue++;

  if (bgSeletorValue > 5) {
    bgSeletorValue = 1;
  }

  var seletor = document.getElementById("selectorBg");
  seletor.removeAttribute("class");
  seletor.setAttribute("class", "bgSelector bgStyle" + bgSeletorValue);

  var url = window.location.href;

  var modal = url.search("modal");

  if (modal !== -1) {
    document.getElementById("myBtn").click();
  }

  var screenType = url.search("type");

  var logoImg = document.getElementById("logo");
  if (screenType !== -1) {
    //se for dungeon precisa do parametro type=dg
    typeOfSystem = "dg";
    logoImg.removeAttribute("src");
    logoImg.setAttribute("src", "img/logo-dungeon.png");
    var sumirIten1 = document.getElementById("addItemMap");
    sumirIten1.setAttribute("class", "invisible");
    var sumirIten2 = document.getElementById("deleteItemMap");
    sumirIten2.setAttribute("class", "invisible");
    var sumirIten3 = document.getElementById("toDundGen");
    sumirIten3.setAttribute("class", "invisible");
    var sumirIten4 = document.getElementById("newMap");
    sumirIten4.setAttribute("class", "invisible");
    var sumirIten5 = document.getElementById("chooseClassMap");
    sumirIten5.setAttribute("class", "invisible");
    var nameButton = document.getElementById("modalBtn");
    nameButton.setAttribute("src", "img/icons/world.png");
    nameButton.setAttribute("title", "Alternar para o Criador de Mundos");
    // nameButton.innerHTML = "Criador de Mundos";
  } else {
    //se não tiver o parametro type é do tipo criador de mundos
    typeOfSystem = "mp";
    logoImg.removeAttribute("src");
    logoImg.setAttribute("src", "img/logo-map.png");

    var sumirIten1 = document.getElementById("addItemDungeon");
    sumirIten1.setAttribute("class", "invisible");
    var sumirIten2 = document.getElementById("deleteDgElement");
    sumirIten2.setAttribute("class", "invisible");
    var sumirIten3 = document.getElementById("toWorldGen");
    sumirIten3.setAttribute("class", "invisible");
    var sumirIten4 = document.getElementById("newDung");
    sumirIten4.setAttribute("class", "invisible");
    var sumirIten5 = document.getElementById("chooseClass");
    sumirIten5.setAttribute("class", "invisible");
    var nameButton = document.getElementById("modalBtn");
    // nameButton.innerHTML = "Criador de Masmorras";
    nameButton.setAttribute("src", "img/icons/dungeon.png");
    nameButton.setAttribute("title", "Alternar para o Criador de Dungeons");
  }
  counter();
}

function redirect(page, modal, type) {
  if (type) {
    if (modal) {
      window.location.href = "./" + page + ".html?modal=1&type=dg";
    } else {
      window.location.href = "./" + page + ".html?type=dg";
    }
  } else if (modal) {
    window.location.href = "./" + page + ".html?modal=1";
  } else {
    window.location.href = "./" + page + ".html?";
  }
}

function closeModal() {
  modal.style.display = "none";
}

function openModal() {
  document.getElementById("myBtn").click();
}

function mountSelectMap() {
  var option = document.getElementById("selectmap");

  var bd = localStorage;

  if (typeOfSystem == "mp") {
    for (var map in bd) {
      if (map.includes("world.")) {
        var mapName = map.replace("world.", "");
        var elemento = document.createElement("option");
        elemento.value = mapName;
        elemento.innerHTML = mapName;
        option.appendChild(elemento);
      }
    }
  } else {
    for (var map in bd) {
      if (map.includes("dungeon.")) {
        var mapName = map.replace("dungeon.", "");
        var elemento = document.createElement("option");
        elemento.value = mapName;
        elemento.innerHTML = mapName;
        option.appendChild(elemento);
      }
    }
  }
}

function addElement(text) {
  if (typeOfSystem == "mp") {
    var source = document.getElementById("addTiles").value;
  } else {
    var source = document.getElementById("addelement").value;
  }
  var element = source.split("-");
  if (!document.querySelector("#group")) {
    var corpo = document.querySelector("#corpo");
    var localCreation = document.createElement("div");
    localCreation.setAttribute("id", "group");
    corpo.appendChild(localCreation);
  }
  var local = document.querySelector("#group");
  if (text) {
    var source = document.getElementById("addTextInput").value;
    console.log(source);
    var newElement = document.createElement("div");
    newElement.setAttribute("id", "dgn99text" + elementControl + "dgn99");
    newElement.setAttribute("class", "textdiv");
    newElement.setAttribute("title", "text" + elementControl);
    newElement.innerText = source;
    local.appendChild(newElement);
    dragElement(
      document.getElementById("dgn99text" + elementControl + "dgn99")
    );
    allMapElements.push("text" + elementControl);
    mountaAllMapElements(allMapElements);
    elementControl++;
    return;
  }
  var newElement = document.createElement("div");
  newElement.setAttribute(
    "id",
    "dgn99" + element[1] + elementControl + "dgn99"
  );
  newElement.setAttribute("class", element[0] + " " + element[1]);
  newElement.setAttribute("title", element[1] + elementControl);
  // newElement.setAttribute('class',element[1]);
  local.appendChild(newElement);
  dragElement(
    document.getElementById("dgn99" + element[1] + elementControl + "dgn99")
  );
  allMapElements.push(element[1] + elementControl);
  mountaAllMapElements(allMapElements);
  elementControl++;
}

function deleteMapElement() {
  if (typeOfSystem == "mp") {
    var source = document.getElementById("deleteTiles").value;
  } else {
    var source = document.getElementById("deleteelement").value;
  }

  var toDeleteElement = document.getElementById("dgn99" + source + "dgn99");
  toDeleteElement.remove();
  var index = allMapElements.indexOf(source);
  allMapElements.splice(index, 1);
  mountaAllMapElements(allMapElements);
}

function saveMap() {
  var corpo = document.querySelector("#group").outerHTML;
  console.log(corpo);
  var nomeMapa = document.getElementById("nomeMapa").value;
  console.log(nomeMapa);
  if (typeOfSystem == "mp") {
    localStorage.setItem("world." + nomeMapa, JSON.stringify(corpo));
    closeModal();
    redirect("index", true);
  } else {
    localStorage.setItem("dungeon." + nomeMapa, JSON.stringify(corpo));
    closeModal();
    redirect("index", true, true);
  }
}

function deleteMap() {
  var nomeMapa = document.getElementById("selectmap").value;

  if (typeOfSystem == "mp") {
    localStorage.removeItem("world." + nomeMapa);
    redirect("index", true);
  } else {
    localStorage.removeItem("dungeon." + nomeMapa);
    redirect("index", true, true);
  }
}

function mountaAllMapElements() {
  if (typeOfSystem == "mp") {
    var option = document.getElementById("deleteTiles");
  } else {
    var option = document.getElementById("deleteelement");
  }

  option.innerHTML = "";
  var selecione = document.createElement("option");
  selecione.value = -1;
  selecione.innerHTML = "Selecionar...";
  option.appendChild(selecione);

  for (i = allMapElements.length; i >= 0; i--) {
    if (allMapElements[i] !== undefined) {
      var elemento = document.createElement("option");
      elemento.value = allMapElements[i];
      elemento.innerHTML = allMapElements[i];
      option.appendChild(elemento);
    }
  }
}

function loadMap(map) {
  if (!map) {
    var option = document.getElementById("selectmap").value;
  } else {
    var option = map;
  }
  var corpo = document.querySelector("#corpo");
  corpo.innerHTML = "";
  if (typeOfSystem == "mp") {
    var posInicial = JSON.parse(localStorage.getItem("world." + option)) || "";
  } else {
    var posInicial =
      JSON.parse(localStorage.getItem("dungeon." + option)) || "";
  }

  var frag = document.createRange().createContextualFragment(posInicial);

  corpo.appendChild(frag);

  var catchElement = posInicial.split("dgn99");

  for (i = catchElement.length; i > 0; i--) {
    if (i % 2 !== 0) {
      if (catchElement[i] !== undefined) {
        allMapElements.push(catchElement[i]);
        dragElement(
          document.getElementById("dgn99" + catchElement[i] + "dgn99")
        );
      }
    }
  }
  closeModal();
  mountaAllMapElements();
}

function salvarPosicao() {
  var saved = document.querySelector("#group");

  if (typeOfSystem == "mp") {
    download("myworld.world", saved.outerHTML);
  } else {
    download("mydungeon.dungeon", saved.outerHTML);
  }
}

function download(filename, text) {
  var pom = document.createElement("a");
  pom.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  pom.setAttribute("download", filename);

  if (document.createEvent) {
    var event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

//FUNÇÕES PARA TORNAR O ELEMENTO ARRASTÁVEL

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//FUNÇÃO PARA LER TXT

function readMapFile() {
  // document.querySelector("#read-button").addEventListener('click', function() {
  if (document.querySelector("#file-input").files.length == 0) {
    alert("Erro : Nenhum arquivo de dungeon selecionado");
    return;
  }

  // first file selected by user
  var file = document.querySelector("#file-input").files[0];

  if (typeOfSystem == "mp") {
    if (file.name.search(".world") === -1) {
      alert("Erro : Arquivo selecionado não é do tipo .world");
      return;
    }
  } else {
    if (file.name.search(".dungeon") === -1) {
      alert("Erro : Arquivo selecionado não é do tipo .dungeon");
      return;
    }
  }

  // perform validation on file type & size if required

  // read the file
  var reader = new FileReader();

  // file reading finished successfully
  reader.addEventListener("load", function (e) {
    // contents of file in variable
    var text = e.target.result;

    console.log(text);
    var name = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);

    if (typeOfSystem == "mp") {
      localStorage.setItem("world.Importado_" + name, JSON.stringify(text));
      redirect("index", true);
    } else {
      localStorage.setItem("dungeon.Importado_" + name, JSON.stringify(text));
      redirect("index", true, true);
    }
  });

  // read as text file
  reader.readAsText(file);
}

//funcao do modal

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//funcao do modal2

var modal2 = document.getElementById("confirmChange");

// Get the button that opens the modal
var modalBtn = document.getElementById("modalBtn");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("nao_class")[0];
var span3 = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
modalBtn.onclick = function () {
  modal2.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span2.onclick = function () {
  modal2.style.display = "none";
};

// When the user clicks on <span> (x), close the modal
span3.onclick = function () {
  modal2.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
};

//funcao do modal

var modalUp = document.getElementById("uploadImageModal");

// Get the button that opens the modal
var btnUp = document.getElementById("btnUpload");

// Get the <span> element that closes the modal
var spanUp = document.getElementById("closeUp");

// When the user clicks on the button, open the modal
btnUp.onclick = function () {
  modalUp.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
spanUp.onclick = function () {
  modalUp.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modalUp.style.display = "none";
  }
};

var input = document.getElementById("myfile");
input.onchange = function () {
  var file = input.files[0],
    reader = new FileReader();

  reader.onloadend = function () {
    var b64 = reader.result.replace(/^data:.+;base64,/, "");
    showImage(b64);
  };

  reader.readAsDataURL(file);
};

function showImage(imgb64) {
  if (!document.querySelector("#group")) {
    var corpo = document.querySelector("#corpo");
    var localCreation = document.createElement("div");
    localCreation.setAttribute("id", "group");
    corpo.appendChild(localCreation);
  }
  var local = document.querySelector("#group");
  if (typeOfSystem == "mp") {
    var chooseClassElement = document.getElementById("chooseClassMap");
    var classImg = document.getElementById("chooseClassMap").value;
  } else {
    var chooseClassElement = document.getElementById("chooseClass");
    var classImg = document.getElementById("chooseClass").value;
  }

  if (classImg == -1) {
    alert("Escolha uma classe antes de escolher a imagem!");
    return;
  }
  var randonString = Math.random().toString(36).substring(2, 6);
  var img = document.createElement("img");
  img.setAttribute("src", "data:image/jpeg;base64," + imgb64);
  img.setAttribute(
    "id",
    "dgn99img" + randonString + "-" + elementControl + "dgn99"
  );
  img.setAttribute("title", "img" + elementControl);
  img.setAttribute("class", classImg);
  local.appendChild(img);
  dragElement(
    document.getElementById(
      "dgn99img" + randonString + "-" + elementControl + "dgn99"
    )
  );
  allMapElements.push("img" + randonString + "-" + elementControl);
  mountaAllMapElements(allMapElements);
  modalUp.style.display = "none";
  elementControl++;

  var input = document.getElementById("myfile");
  input.value = "";
  chooseClassElement.value = -1;
}

loadPage();
mountSelectMap();
