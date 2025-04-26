require('./globalToken');

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Cookie", "OAuth_Token_Request_State=0f92f088-daff-4706-b23c-ac00e3fc562c; SI=a4f878ed-9516-4d8a-972a-2ad4cd560f12");
myHeaders.append("Authorization", "Bearer" + );

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://edu-api.21-school.ru/services/21-school/api/v1/sales", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));