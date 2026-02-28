function showLogin() {
  let section = document.getElementById("loginSection");
  section.style.display = "block";
}

function setLoadingState(isLoading) {
  let loading = document.getElementById("loading");
  let loginBtn = document.getElementById("loginBtn");

  loading.classList.toggle("d-none", !isLoading);
  loginBtn.disabled = isLoading;
  loginBtn.textContent = isLoading ? "Signing in..." : "Secure Login";
}

function loginAPI() {

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let message = document.getElementById("message");

  if (!email || !password) {
    message.innerHTML = "<span class='text-danger'>Enter email and password</span>";
    return;
  }

  setLoadingState(true);
  message.innerHTML = "";

  const localUsers = [
    { email: "shahi@123", password: "234" },
    { email: "eve.holt@reqres.in", password: "cityslicka" }
  ];

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(async response => {
    let data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data;
  })
  .then(data => {
    if (data.token) {
      message.innerHTML = "<span class='text-success'>Welcome to RemotePilot Jobs ✅</span>";
    } else {
      message.innerHTML = "<span class='text-danger'>Sign-in failed ❌</span>";
    }
  })
  .catch(error => {
    let localMatch = localUsers.some(
      user => user.email === email && user.password === password
    );

    if (localMatch) {
      message.innerHTML = "<span class='text-success'>Local demo login successful ✅</span>";
    } else {
      message.innerHTML = `<span class='text-danger'>${error.message}</span>`;
    }
  })
  .finally(() => {
    setLoadingState(false);
  });

}
