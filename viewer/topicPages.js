const container = document.getElementById("topics");

Object.entries(topicData).forEach(([key, topic]) => {
  const topicDiv = document.createElement("div");
  topicDiv.className = "topic";
  topicDiv.innerHTML = `<h2>${topic.title}</h2><iframe src="${topic.theory}"></iframe>`;

  topic.exercises.forEach(ex => {
    const exDiv = document.createElement("div");
    exDiv.className = "exercise";
    exDiv.innerHTML = `<h3>${ex.title}</h3>`;

    ex.subexercises.forEach((sub, i) => {
      const subDiv = document.createElement("div");
      subDiv.className = "subexercise";
      subDiv.innerHTML = `
        <p><strong>Teilaufgabe ${i + 1}:</strong></p>
        <iframe src="${sub.question}"></iframe>
        <button onclick="this.nextElementSibling.style.display = (this.nextElementSibling.style.display === 'block') ? 'none' : 'block'">
          Lösung anzeigen
        </button>
        <iframe src="${sub.solution}" style="display:none;"></iframe>
      `;
      exDiv.appendChild(subDiv);
    });

    topicDiv.appendChild(exDiv);
  });

  container.appendChild(topicDiv);
});


const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
render(currentPage);

