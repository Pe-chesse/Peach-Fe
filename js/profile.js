const baseurl = "http://3.37.239.49/api/v1/";
const profileImg = document.querySelector("#profile-img");
const profileImgRenderer = document.querySelector("#profile-img-renderer");
let imageKey;

profileImg.addEventListener("change", async (event) => {
  const selectedFile = event.target.files[0];

  const formData = new FormData();
  formData.append("files", selectedFile);

  if (selectedFile) {
    const result = await fetch(`${baseurl}bucket/media/`, {
      method: "POST",
      headers: {
        //   Authorization: `bearer ${idtoken}`,
        Authorization: `bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MGI5ZGUwODBmZmFmYmZjMTgzMzllY2Q0NGFjNzdmN2ZhNGU4ZDMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi6rmA7KSA6regIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGR5dFlGLVl1ZW9nNnNqams2c1pjZ0pIUHdSaTZWNFozMUpZM3lBNU9vZz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wZWFjaC1tYXJrZXQtYTM3MGIiLCJhdWQiOiJwZWFjaC1tYXJrZXQtYTM3MGIiLCJhdXRoX3RpbWUiOjE2OTM0NzQ5ODcsInVzZXJfaWQiOiJzYjhVc3h6TFlWTVZzeVEwb2lQcU41VFBKc3YxIiwic3ViIjoic2I4VXN4ekxZVk1Wc3lRMG9pUHFONVRQSnN2MSIsImlhdCI6MTY5MzQ3NDk4NywiZXhwIjoxNjkzNDc4NTg3LCJlbWFpbCI6ImpnNTU1NTI3NThAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTU1ODYxNTM5Mjc1MTkyNjUyNjIiXSwiZW1haWwiOlsiamc1NTU1Mjc1OEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.Qf7iBhbu3RUuJu91Z45dp9heD_QwLSy0qYiHZkVAsxQXDb_eZraEnomBjnlNHb0jY4L7aF-d-wKNIqY3ZfM66-XCN0pY7NTd8kwsaa4p0uaEexksTN2b_FjuQOR_7zW6tfNY32j51ylKJ4bFHQ6ds2uXPy70fE-NsqFpdUQojSWWZ3ujEjkGNuOVwSErP5eX2jOOFLvv1JA39dMhVuF0XZV0f7olxWC1iTsmSxWBxDMZvNGtOo-buSltm_hplfiraYyxl0_9wXDU6DcXneGLjd5dpoC2aRl8WQWFlWSZm6jciYXFko6d6bWEBfb8KlUcqGfgiDn8RHVSO2nuKDEr_w`,
      },
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        imageKey = data.image_keys[0];
        console.log(imageKey);
        profileImgRenderer.src = `${baseurl}bucket/media/?key=${imageKey}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

document.querySelector(".start-btn").onclick = async function (e) {
  const profileNickname = document.querySelector("#nickname");
  const profileIntroduce = document.querySelector("#introduce");
  console.log(profileImg.value);
  console.log(profileNickname.value);
  console.log(profileIntroduce.value);
  let body = {
    nickname: profileNickname.value,
    description: profileIntroduce.value,
  };
  if (profileImg != null) {
    body.image_key = imageKey;
  }
  console.log(body);

  await fetch(`${baseurl}account/profile/`, {
    method: "PUT",
    headers: {
      // Authorization: `bearer ${idtoken}`,
      Authorization: `bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2MGI5ZGUwODBmZmFmYmZjMTgzMzllY2Q0NGFjNzdmN2ZhNGU4ZDMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi6rmA7KSA6regIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGR5dFlGLVl1ZW9nNnNqams2c1pjZ0pIUHdSaTZWNFozMUpZM3lBNU9vZz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wZWFjaC1tYXJrZXQtYTM3MGIiLCJhdWQiOiJwZWFjaC1tYXJrZXQtYTM3MGIiLCJhdXRoX3RpbWUiOjE2OTM0NzQ5ODcsInVzZXJfaWQiOiJzYjhVc3h6TFlWTVZzeVEwb2lQcU41VFBKc3YxIiwic3ViIjoic2I4VXN4ekxZVk1Wc3lRMG9pUHFONVRQSnN2MSIsImlhdCI6MTY5MzQ3NDk4NywiZXhwIjoxNjkzNDc4NTg3LCJlbWFpbCI6ImpnNTU1NTI3NThAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTU1ODYxNTM5Mjc1MTkyNjUyNjIiXSwiZW1haWwiOlsiamc1NTU1Mjc1OEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.Qf7iBhbu3RUuJu91Z45dp9heD_QwLSy0qYiHZkVAsxQXDb_eZraEnomBjnlNHb0jY4L7aF-d-wKNIqY3ZfM66-XCN0pY7NTd8kwsaa4p0uaEexksTN2b_FjuQOR_7zW6tfNY32j51ylKJ4bFHQ6ds2uXPy70fE-NsqFpdUQojSWWZ3ujEjkGNuOVwSErP5eX2jOOFLvv1JA39dMhVuF0XZV0f7olxWC1iTsmSxWBxDMZvNGtOo-buSltm_hplfiraYyxl0_9wXDU6DcXneGLjd5dpoC2aRl8WQWFlWSZm6jciYXFko6d6bWEBfb8KlUcqGfgiDn8RHVSO2nuKDEr_w`,
    },
    body: body,
  })
    .then((res) => {
      console.log(res);
      // return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
