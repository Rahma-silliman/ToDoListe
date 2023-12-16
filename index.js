const inputCategorie = document.getElementById("categorie");
console.log(inputCategorie);
const inputTitle = document.getElementById("titre");
const inputDate = document.getElementById("date");
const inputDescription = document.getElementById("textarea");
const inputStatut = document.getElementById("statut");
const myBtn = document.querySelector(".mybtn");
let myList = document.querySelector(".myList");
const ctx = document.querySelector("#myChart");
const zoneDetexte = document.getElementById("zoneDescription");
const elementDate = document.getElementById("titreData");
const elementTitle = document.getElementById("contenuTitle");
const elementCategorie = document.getElementById("contenuCategorie");
const elementDescription = document.getElementById("contenuDescription");
const elementStatut = document.getElementById("contenuStatut");
const alerte = document.querySelector(".ajout");
console.log(alerte);
console.log(myList);
console.log(ctx);
console.log(myBtn);
let compteur;

function count() {
  compteur++;
  return compteur;
}

function rechargementDePade() {
  const data = {
    labels: ["Nouveau", "En cours", "Terminer"],
    datasets: [
      {
        label: "Nombre",
        data: [],
        backgroundColor: ["#ca47a7", "#0f15f9", "#74da61"],
      },
    ],
  };

  elementDate.innerHTML = "";
  elementTitle.innerHTML = "";
  elementCategorie.innerHTML = "";
  elementDescription.innerHTML = "";
  elementStatut.innerHTML = "";

  if (
    JSON.parse(localStorage.getItem("myTable")) &&
    JSON.parse(localStorage.getItem("myStatut"))
  ) {
    compteur = 0;
    compt = 0;
    let myTable = JSON.parse(localStorage.getItem("myTable")) || [];
    let myStatut = JSON.parse(localStorage.getItem("myStatut")) || [];

    let nouveau = [];
    let encours = [];
    let terminer = [];
    const element = myStatut.find((element) => element == "Nouveau");
    const iterator = myStatut.values();
    for (value of iterator) {
      switch (value) {
        case "Nouveau":
          nouveau.push(value);
          break;
        case "En cours":
          encours.push(value);
          break;
        case "Terminer":
          terminer.push(value);
          break;

          default:
            return;
      }
    }
    data.datasets[0].data = [nouveau.length, encours.length, terminer.length];
    for (item of myTable) {
      myList.innerHTML += `<tr class="list-unstyled p-1 ma-couleur ma-color tr d-flex justify-content-around align-items-center"><td>${count()}</td><td class="">${
        item.date
      }</td><td><button class="border-0 btn desc"   onclick="">${
        item.title
      }</button></td><td>${
        item.categorie
      }</td><td class=""><button class="m-1 detail btn bg-primary"><img src="image/eye.svg"></button><button class="btn m-1 edit bg-secondary"><img src="image/edit.svg"></button><button  class="iconDelet btn bg-danger"><img src="image/delet.svg"></button></td></tr>
      `;

      const tr = document.querySelectorAll(".tr");

      for (let i = 1; i < tr.length; i++) {
        tr[i].style.backgroundColor = "#52a2b2";
        i += 1;
      }

      const detail = document.querySelectorAll(".detail");
      const edit = document.querySelectorAll(".edit");

      let delet = document.querySelectorAll(".iconDelet");
      const btnDescription = document.querySelectorAll(".desc");

      for (let i = 0; i < delet.length; i++) {
        delet[i].addEventListener("click", () => {
          document.location.reload();
          myTable.splice(i, 1);
          myStatut.splice(i, 1);
          localStorage.setItem("myTable", JSON.stringify(myTable));
          localStorage.setItem("myStatut", JSON.stringify(myStatut));
        });
      }
      const display = document.querySelector(".monTableau");
      for (let i = 0; i < tr.length; i++) {
        detail[i].addEventListener("click", () => {
          
          display.classList.remove("d-none");
          elementDate.innerHTML = tr[i].childNodes[1].textContent;
          elementTitle.innerHTML = tr[i].childNodes[2].textContent;
          elementCategorie.innerHTML = tr[i].childNodes[3].textContent;
          elementDescription.innerHTML = myTable[i].description;
          elementStatut.innerHTML = myTable[i].statut;
        });
       
        edit.forEach((element, index) => {
          element.addEventListener("click", () => fillNum(index));
        });
        btnDescription[i].addEventListener("click", () => {
          zoneDetexte.innerHTML = myTable[i].description;
        });
      }
      document.querySelector('.fermer').addEventListener('click', ()=>{
        display.classList.add('d-none')
        })
    }


    for (item of myStatut) {
      const graphique = Chart.getChart("myChart");
      if (graphique) graphique.destroy();
      new Chart(ctx, {
        type: "pie",
        data: data,
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }
}

function editItem() {
  const tr = document.querySelectorAll(".tr");
  let myTable = JSON.parse(localStorage.getItem("myTable")) || [];
  for (let i = 0; i < tr.length; i++) {
    const index = myTable.findIndex(
      (item) =>
        item.date === tr[i].childNodes[1].textContent &&
        item.statut === myTable[i].statut &&
        item.index === count() &&
        item.categorie === tr[i].childNodes[3].textContent &&
        item.description === myTable[i].description &&
        item.title === tr[i].childNodes[2].textContent
    );
    myTable[index] = {
      date: inputDate.value,
      title: inputStatut.value,
      categorie: inputDate.value,
      statut: inputStatut.value,
    };
  }
}
function fillNum(index) {
  
  let myTable = JSON.parse(localStorage.getItem("myTable"));

  console.log(myTable[index]);
  inputDate.value = myTable[index].date;
  inputTitle.value = myTable[index].title;
  inputCategorie.value = myTable[index].categorie;
  inputStatut.value = myTable[index].statut;
  inputDescription.value = myTable[index].description;

  document.getElementById("currentIndex").value = index;
  console.log(index);
}

myBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    inputDate.value &&
    inputTitle.value &&
    inputCategorie.value &&
    inputStatut.value
  ) {
    alerte.classList.remove("d-none");
    setInterval(() => {
      alerte.classList.add("d-none");
    }, 1000);

    myList.innerHTML = "";
    let myTable = JSON.parse(localStorage.getItem("myTable")) || [];
    let myStatut = JSON.parse(localStorage.getItem("myStatut")) || [];
    const currentIndex = document.getElementById("currentIndex").value;
    if (currentIndex !== "") {
      myTable[currentIndex] = {
        date: inputDate.value,
        title: inputTitle.value,
        categorie: inputCategorie.value,
        statut: inputStatut.value,
        description: inputDescription.value,
        index: `${count()}`,
      };
      myStatut[currentIndex] = inputStatut.value;
    } else {
      let monObjet = {
        date: inputDate.value,
        title: inputTitle.value,
        categorie: inputCategorie.value,
        statut: inputStatut.value,
        description: inputDescription.value,
        index: `${count()}`,
      };
      myTable.push(monObjet);
      myStatut.push(inputStatut.value);
    }
   
    localStorage.setItem("myStatut", JSON.stringify(myStatut));
    localStorage.setItem("myTable", JSON.stringify(myTable));
    rechargementDePade();
    const detail = document.querySelectorAll(".detail");
    console.log(detail);
    const edit = document.querySelectorAll(".edit");
    console.log(edit);
    let delet = document.querySelectorAll(".iconDelet");
    console.log(delet);
    const btnDescription = document.querySelectorAll(".desc");
    console.log(btnDescription);
  }
});

window.addEventListener("load", rechargementDePade);
