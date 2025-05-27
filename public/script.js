console.log("Client-side Javascript")

async function deleteHair(_id) {
    await fetch('/delete/hairstyle/' + _id, {method: 'DELETE'})
   window.location.href = '/'
  }

  async function editHair(e, _id) {
    e.preventDefault();
   
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
   
    await fetch('/update/hairstyle/' + _id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formObject)
    });
   
   window.location.href = '/'

}