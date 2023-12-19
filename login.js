// login.js

document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector("#submitButton");

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        const userName = document.querySelector('input[name="UserName"]').value;
        const password = document.querySelector('input[name="Password"]').value;

        fetch("https://657c8d8a853beeefdb99a11f.mockapi.io/api/v1/user")
            .then(response => response.json())
            .then(users => {
                const matchingUser = users.find(user => user.username === userName && user.password === password);

                if (matchingUser) {
                    alert("Login successful!");

                    localStorage.setItem('userId', matchingUser.id);

                    window.location.href = "taskmanager.html";
                } else {
                    alert("Login failed. Please check your username and password.");
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    });
});
