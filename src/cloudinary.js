async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'Mazin_Portfolio');
  formData.append('cloud_name', 'dxzv13dho');

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/dxzv13dho/image/upload',
    { method: 'POST', body: formData }
  );
  const data = await res.json();
  return data.secure_url;
}

export default uploadToCloudinary;
