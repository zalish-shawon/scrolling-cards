function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const attachItems = document.querySelectorAll('.attach-files');
    const itemsList = document.getElementById('items-list');
    const addForm = document.getElementById('add-form');
  
    // Fetch data from the server and update the UI
    const fetchData = async () => {
        const response = await fetch('https://scrolling-card-server.vercel.app/files');
        const data = await response.json();
        let totalAttachData = 0;
   
        
        attachItems.innerHTML = totalAttachData;

        itemsList.innerHTML = data.map(item => {
          const fileLinks = item.files.map(file => {
            return file.originalFileName;
          }).join('<br />');
    
          
          return `<li>Uploaded Files: ${item.files.length} - ${fileLinks}</li>`;
        }).join('');
      

      const totalFilesResponse = await fetch('https://scrolling-card-server.vercel.app/totalFiles');
    const totalFilesData = await totalFilesResponse.json();

    // Update total files information in all elements with the class "attachItems"
    attachItems.forEach(element => {
      element.innerText = totalFilesData.totalFiles;
    });
  };
  
    // Add a new item when the form is submitted
    addForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      
      const fileInputs = document.getElementById('item-files').files;
  
      const formData = new FormData();
      
  
      for (const file of fileInputs) {
        formData.append('files', file);
      }

  
      await fetch('https://scrolling-card-server.vercel.app/files', {
        method: 'POST',
        body: formData,
      })
  
  
      fetchData();
    });
  
    // Initial data fetch
    fetchData();
  });
  