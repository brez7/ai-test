  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("reverseForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const word = document.getElementById("wordInput").value;
        fetch("/reverse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({word: word}),
        })
          .then(response => response.json())
          .then(data => {
            document.getElementById("result").textContent =
              "Reversed Word: " + data.reversedWord;
          })
          .catch(error => {
            console.error("Error:", error);
          });
      });
  });
