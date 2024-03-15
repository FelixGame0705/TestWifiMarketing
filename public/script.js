document.getElementById('wifiForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    const json = JSON.stringify(object);
  
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbza0SzCzHGkzdWAU2A3xQPo2y3IZIG-AMf-xWRN0Y2NBZ5pV2jJDXglSlIK2pEkRsDx/exec', { // Thay đổi URL tương ứng với máy chủ của bạn
        method: 'POST',
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: json
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.text();
      alert('Data submitted successfully!');
      console.log(data);
    } catch (error) {
      console.error('There was an error!', error);
      alert('Error submitting data! Please try again.'+ error);
    }
  });
  