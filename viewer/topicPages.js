const container = document.getElementById("topics");

function loadHTML(path) {
  return fetch(path).then(res => res.text()); //a promise => inhalt der html Files wird genommen.
}

async function render(topic) {
  const topicDataEntry = topicData[topic];
  if (!topicDataEntry) return;

  const topicDiv = document.createElement("div");
  topicDiv.className = "topic";
  //topicDiv.innerHTML = `<h2>${topicDataEntry.title}</h2>`;
  const theoryContent = await loadHTML(topicDataEntry.theory);
  topicDiv.innerHTML += `<div class="theory">${theoryContent}</div>`;

  for (const ex of topicDataEntry.exercises) {
    const exDiv = document.createElement("div");
    exDiv.className = "exercise";
    exDiv.innerHTML = `<h3>${ex.title}</h3>`;

    for (const [i, sub] of ex.subexercises.entries()) { //i index, sub object
      const subDiv = document.createElement("div");
      subDiv.className = "subexercise";

      const qHTML = await loadHTML(sub.question);
      const sHTML = await loadHTML(sub.solution);

      const lösungDiv = document.createElement("div");
      lösungDiv.className = "hidden";
      lösungDiv.innerHTML = `<strong>Lösung:</strong> ${sHTML}`;

      const button = document.createElement("button");
      button.textContent = "Lösung anzeigen";
      button.onclick = () => {
        lösungDiv.classList.toggle("hidden");
        button.textContent = lösungDiv.classList.contains("hidden") ? "Lösung anzeigen" : "Lösung ausblenden";
      };

      subDiv.innerHTML = `<p><strong>Teilaufgabe ${i + 1}:</strong></p>${qHTML}`;
      subDiv.appendChild(button);
      subDiv.appendChild(lösungDiv);
      exDiv.appendChild(subDiv);
    }

    topicDiv.appendChild(exDiv);
  }

  container.appendChild(topicDiv);
  MathJax.typesetPromise();
}

const currentPage = window.location.pathname.split("/").pop().replace(".html", ""); //analysis, vektorgeometri oder wahrscheinlichkeit
render(currentPage);

