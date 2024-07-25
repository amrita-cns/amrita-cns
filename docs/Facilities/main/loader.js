function fetchData() {
  setTitle();

  for (i = 1; i < information.length; i++) {
    addOddItem(i);
  }
}

function setTitle() {
  document.getElementById("Pagetitle").innerHTML = information[0];
}

function addOddItem(index) {
  let section = document.createElement("section");
  section.className = "hero is-widescreen";

  let heroBody = document.createElement("div");
  heroBody.className = "hero-body";

  let nav = document.createElement("nav");
  nav.className = "level";

  let levelItem = document.createElement("div");
  levelItem.className = "level-item";

  let content = document.createElement("div");
  content.className = "content";

  let title = document.createElement("h1");
  title.innerHTML = information[index]["title"];

  let matter = document.createElement("div");
  matter.id = "matter";

  let data = document.createElement("p");
  data.innerHTML = information[index]["content"];

  let imgCont = document.createElement("div");
  imgCont.className =
    "level-item is-flex is-flex-direction-column is-justify-content-center is-align-content-center";

  let image = document.createElement("img");
  image.src = information[index]["image"];
  image.width = "320";
  image.height = "240";
  image.id = "dispImg";

  let btn = document.createElement("button");
  btn.className = "button";
  btn.innerHTML = "Show on Map";
  btn.onclick = function () {
    sessionStorage.setItem("title", information[index]["title"]);
    sessionStorage.setItem("lat", information[index]["latitude"]);
    sessionStorage.setItem("long", information[index]["longitude"]);
    window.open("../map/index.html", "_self");
  };

  if (index % 2 == 0) {
    section.appendChild(heroBody);
    heroBody.appendChild(nav);

    nav.appendChild(imgCont);
    imgCont.appendChild(image);
    imgCont.appendChild(btn);

    nav.appendChild(levelItem);
    levelItem.appendChild(content);
    content.appendChild(title);
    content.appendChild(matter);
    matter.appendChild(data);
  } else {
    section.appendChild(heroBody);
    heroBody.appendChild(nav);
    nav.appendChild(levelItem);
    levelItem.appendChild(content);
    content.appendChild(title);
    content.appendChild(matter);
    matter.appendChild(data);

    nav.appendChild(imgCont);
    imgCont.appendChild(image);
    imgCont.appendChild(btn);
  }
  document.getElementById("page").append(section);
}

// function addEvenItem(index) {
//     let section = document.createElement('section');
//     section.className = "hero is-widescreen";

//     let heroBody = document.createElement("div");
//     heroBody.className = "hero-body";

//     let nav = document.createElement('nav');
//     nav.className = "level";

//     let levelItem = document.createElement("div");
//     levelItem.className = "level-item";

//     let content = document.createElement("div");
//     content.className = "content";

//     let title = document.createElement("h1");
//     title.innerHTML = information[index]["title"];

//     let matter = document.createElement("div");
//     matter.id = "matter";

//     let data = document.createElement("p");
//     data.innerHTML = information[index]["content"];

//     let imgCont = document.createElement("div");
//     imgCont.className = "level-item is-flex is-flex-direction-column is-justify-content-center is-align-content-center";

//     let image = document.createElement("img");
//     image.src = information[index]["image"];
//     image.width = "320";
//     image.height = "240";
//     image.id = "dispImg";

//     let btn = document.createElement("button");
//     btn.className = "button";
//     btn.innerHTML = "Know More";
//     btn.onclick = function() { sessionStorage.setItem("title", information[index]["title"]);
//         sessionStorage.setItem("lat", information[index]["latitude"]);
//         sessionStorage.setItem("long", information[index]["longitude"]);
//         window.open("../map/index.html", "_self") };

//     section.appendChild(heroBody);
//     heroBody.appendChild(nav);

//     nav.appendChild(imgCont);
//     imgCont.appendChild(image);
//     imgCont.appendChild(btn);

//     nav.appendChild(levelItem);
//     levelItem.appendChild(content);
//     content.appendChild(title);
//     content.appendChild(matter);
//     matter.appendChild(data);

//     document.getElementById("page").append(section);
// }
