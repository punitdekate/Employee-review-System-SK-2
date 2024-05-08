function deleteEmployee(customId, role) {
    console.log(customId, role)
    if (role == "Admin") {
        displayPopup("Administrative users cannot be deleted");
    } else {
        const yesBtn = document.getElementById('btn-yes');
        const noBtn = document.getElementById('btn-no');
        const popUp = document.getElementById('popup-overlay');
        popUp.style.display = 'flex';
        yesBtn.addEventListener('click', () => {
            fetch(`https://employee-review-system-sk-2.onrender.com/main_page/view_employee/${customId}`, {
                method: "DELETE",
                credentials: "include"
            }).then(response => {
                window.location.href = response.url;
                popUp.style.display = 'none';
                displayPopup("User removed successfully")
            }).catch(error => {
                console.log(error);
            })
        })
        noBtn.addEventListener("click", () => {
            popUp.style.display = 'none';
        })
    }
}

async function updateAdmin(customId, role) {
    if (role == "Admin") {
        displayPopup("Already admin user");
    } else {
        fetch(`https://employee-review-system-sk-2.onrender.com/main_page/view_employee/update_role/${customId}`, {
            method: "GET",
            credentials: "include"
        }).then(response => {
            window.location.href = response.url;
        }).catch(error => {
            console.log(error);
        })
        displayPopup("User updated as admin");
    }
}

function deletePerformance(_id) {
    const yesBtn = document.getElementById('btn-yes');
    const noBtn = document.getElementById('btn-no');
    const popUp = document.getElementById('popup-overlay');
    popUp.style.display = 'flex';
    yesBtn.addEventListener('click', () => {
        fetch(`https://employee-review-system-sk-2.onrender.com/main_page/view_performance/${_id}`, {
            method: "DELETE",
            credentials: "include"
        }).then(response => {
            window.location.href = response.url;
            popUp.style.display = 'none';
            displayPopup("Performance removed successfully!")

        }).catch(error => {
            console.log(error);
        })
    })
    noBtn.addEventListener("click", () => {
        popUp.style.display = 'none';
    })
}

const assignFeedback = document.getElementById('assign-feedback');
assignFeedback.addEventListener('click', (event) => {
    event.preventDefault();

    const assignReview = document.getElementById('assign_review');
    const formData = new FormData(assignReview);
    const jsonData = {};

    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }
    console.log(JSON.stringify(jsonData));
    fetch(`https://employee-review-system-sk-2.onrender.com/main_page/assign_review`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json' // adjust content type as needed
        },
        body: JSON.stringify(jsonData)
    }).then(response => {
        window.location.href = response.url;
    }).catch(error => {
        console.log(error);
    })
    displayPopup("Review assigned successfully!")
});



function displayPopup(message, duration = 3000) {
    const popUp = document.getElementById('popup-container');
    const popUpMsg = document.getElementById('pop-up-msg');
    popUpMsg.innerText = message;
    popUp.style.display = 'block';
    setTimeout(() => {
        popUp.style.display = 'none';
    }, duration);
}
