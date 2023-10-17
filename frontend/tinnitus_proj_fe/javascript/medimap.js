document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('createFlowchart').addEventListener('click', fetchData);
  });
  // Define the fetchData function
  async function fetchData() {
    try {
        const userText = document.getElementById('inputText').value;
  
        if (!userText) {
          console.log('User input is empty.');
          return; // Exit the function
        }
  
        const response = await fetch('http://localhost:5500/data', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userText }), // Send the user input as JSON
        });
        const data = await response.json();
        const mermaidSyntax = generateFlowchart(data);
        
        const html = `
        <html>
          <head>
            <title>Flowchart Generator</title>
            <link rel="stylesheet" type="text/css" href="style.css" />
          </head>
          <body>
            <h1>Your MediMap</h1>
  
              <pre class="mermaid" id="flowchart">
                ${mermaidSyntax}
              </pre>
              <script type="module">
                import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
              </script>
  
          </body>
        </html>
        `;
  
        const popupWindow = window.open('', '', 'width=600,height=600');
          popupWindow.document.open();
          popupWindow.document.write(html);
          popupWindow.document.close();
  
    } catch (error) {
        console.error(error);
    }
  }
  
  function generateFlowchart(data) {
    const { flow } = data;
  
    if (!flow || !Array.isArray(flow)) {
      return ''; // Handle invalid data
    }
  
    // Initialize the Mermaid syntax
    let mermaidSyntax = 'graph TD;\n';
  
    for (let i = 0; i < flow.length; i++) {
      const stepText = flow[i];
      const nodeName = `step${i}`;
  
      mermaidSyntax += `${nodeName}["${stepText}"]`;
  
      if (i < flow.length - 1) {
        const nextNodeName = `step${i + 1}`;
        mermaidSyntax += ` --> ${nextNodeName}`;
      }
  
      mermaidSyntax += ';\n';
    }
  
    return mermaidSyntax;
  }