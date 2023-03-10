const b = document.querySelector("#loginBtn");

b.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = document.querySelector("uName").value;
  const email = document.querySelector("uEmail").value;
  const password = document.querySelector("uPass").value;

  let res = await axios.post("/signup", { email, name, password });
});
