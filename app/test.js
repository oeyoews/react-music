fetch(
  'https://om-app.vercel.app/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA',
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
