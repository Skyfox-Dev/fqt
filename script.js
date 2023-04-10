const optionsmiau = {
    method: 'POST',
    body: JSON.stringify({ operation: 'load_questions' }),
    headers: {
      'Content-Type': 'application/json'
    },
  };
  
  let data;
  
  fetch('https://n944ltz30b.execute-api.eu-central-1.amazonaws.com/dev/database', optionsmiau)
    .then(response => response.json())
    .then(result => {
      data = result;
      console.log(data);
      const squaresContainer = document.getElementById('squares');
      const squares = createSquares(data.questions.length, data.questions);
      squares.forEach(square => squaresContainer.appendChild(square));
    })
    .catch(error => console.log(error));
  
  function createSquares(numSquares, questions) {
    const squares = [];
    for (let i = 0; i < numSquares; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
  
      // following creates the 
      const questiontext = document.createElement('div');
      questiontext.classList.add('questiontext');
      const question = data.questions[i].Question;
      console.log(question); // Überprüfen, ob question definiert ist
      questiontext.textContent = question;
      square.appendChild(questiontext);
  
      // create the checkbox container and checkboxes
      const checkboxContainer = document.createElement('div');
      checkboxContainer.classList.add('checkbox-container');
      const checkboxes = [];
      for (let j = 0; j < 5; j++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', function() {
          if (this.checked) {
            checkboxes.forEach(cb => {
              if (cb !== this) cb.checked = false;
            });
          }
        });
        checkboxes.push(checkbox);
        checkboxContainer.appendChild(checkbox);
      }
      square.appendChild(checkboxContainer);

      // create text for the "scale" looking type
      const verylikelytext = document.createElement('div');
      verylikelytext.classList.add('verylikelytext');
      verylikelytext.textContent = "Very Likely";
      square.appendChild(verylikelytext);
      squares.push(square);
    }
    return squares;
  }