fetch('passage.txt')
  .then(r => r.text())
  .then(data => {
    const lines = data.split('\n');

    let title = '';
    let passage = '';

    let current = '';

    lines.forEach(line => {
      if (line.startsWith('#')){
        current = line;
      } 
      else if(current === "#TITLE"){
        title += line + ' ';
      }
      else if(current === "#PASSAGE"){
        passage += line + ' ';
      }
    });

    document.getElementById("title").innerText = title;
    document.getElementById("passage").innerText = passage.trim();
  })
.catch(error => console.error('Error loading text file:', error));