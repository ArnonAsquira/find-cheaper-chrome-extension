const baseUrl = "http://localhost:8080";
const input = document.querySelector("#product-name");
const button = document.querySelector("button");
import axios from "axios";

button.addEventListener("click", async () => {
  try {
    const bestRated = document.querySelector("#best-rated:checked")
      ? true
      : false;
    document.querySelector(".loader").textContent = "loading...";
    const { data } = await axios.post(`${baseUrl}/product/${input.value}`, {
      bestRated,
    });
    document.querySelector(".loader").textContent = "";
    window.open(data, "_blank");
  } catch (err) {
    document.querySelector(".loader").textContent = "";
    alert((err.response && err.response.data) || "something went wrong");
  }
});
