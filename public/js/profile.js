let isEditing = false;
let SelectedImage = "";

async function DisplayUserDetails() {
    const token = sessionStorage.getItem("token");

    const response = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    if (!response.ok) {
        console.error(data.message);
        return;
    }

    console.log("GET PROFILE:", data);

    profileData.username = data.username;
    profileData.email = data.email;
    profileData.pfp = data.pfp;
    profileData.bio = data.bio;
    profileData.displayname = data.displayname;

    console.log("PROFILE DATA BEFORE RENDER:", profileData);

    render();
}

let profileData = {
    username: "",
    email: "",
    pfp: "",
    bio: "",
    displayname: ""
}

function render() {
    const app = document.getElementById("profiledetails");

    app.innerHTML = `
        <div class="main-content">
            <div class="profile-card">

                <!-- Left Column -->
                <div class="left-column ${isEditing ? "editing" : ""}">

                    <div class="avatar-section">
                        <div class="avatar-wrapper">
                            ${profileData.pfp
            ? `<img id="image-preview" src="${profileData.pfp}" alt="Profile Picture">`
            : `<div id="image-preview" class="avatar-placeholder">AJ</div>`
        }
                        </div>

                         <input
        type="file"
        id="input-pfp"
        accept="image/*"
        style="display: none;"
    >

                        <button
                            class="change-photo-btn"
                            onclick="changeProfilePicture('input-pfp')"
                        >
                            Change Photo
                        </button>
                    </div>

                    ${isEditing
            ? `
                                <div class="left-inputs">

                                    <div class="form-group">
                                        <label>Display Name</label>
                                        <input
                                            type="text"
                                            id="input-displayname"
                                            value="${formData.displayname}"
                                        >
                                    </div>

                                    <div class="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            id="input-username"
                                            value="${formData.username}"
                                        >
                                    </div>

                                </div>
                            `
            : `
                                <div style="text-align:center;">
                                    <div class="username">
                                        ${profileData.displayname}
                                    </div>

                                    <div class="username">
                                        @${profileData.username}
                                    </div>
                                </div>

                                <button
                                    class="edit-profile-btn"
                                    onclick="startEditing()"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>

                                    Edit Profile
                                </button>
                            `
        }

                </div>

                <!-- Vertical Divider -->
                <div class="vertical-divider"></div>

                <!-- Right Column -->
                <div class="right-column ${isEditing ? "editing" : ""}">

                    ${isEditing
            ? `
                                <div class="right-header">
                                    <h2>Edit Profile</h2>
                                </div>

                                <div class="form-fields">

                                    <div class="form-group">
                                        <label>About Me</label>

                                        <textarea id="input-bio">${formData.bio}</textarea>
                                    </div>

                                </div>

                                <div class="form-actions">
                                    <button
                                        class="btn-cancel"
                                        onclick="cancelEditing()"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        class="btn-save"
                                        onclick="saveProfile()"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            `
            : `
                                <div class="section">
                                    <h3>About Me</h3>

                                    <p>${profileData.bio}</p>
                                </div>

                                <div class="section">
                                    <h3>Details</h3>

                                    <div class="details-grid">

                                        <div class="detail-item">
                                            <span class="detail-label">
                                                Email
                                            </span>

                                            <span class="detail-value">
                                                ${profileData.email}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            `
        }

                </div>

            </div>
        </div>
    `;

    document.getElementById("input-pfp").addEventListener("change", SelectProfileImage);
}

function startEditing() {
    formData = { ...profileData };
    isEditing = true;
    render();
}

function cancelEditing() {
    isEditing = false;
    render();
}

function changeProfilePicture(inputId) {
    const input = document.getElementById("input-pfp");
    input.click();
}

function SelectProfileImage(InputEvent) {
    const files = InputEvent.target.files;

    if (files.length === 0) {
        return;
    }

    const Preview = files[0];
    const reader = new FileReader();
    reader.onload = function(ReaderEvent) {
        SelectedImage = ReaderEvent.target.result

        const ImageElement = document.getElementById("image-preview");
        ImageElement.src = SelectedImage;

    };

    reader.readAsDataURL(Preview);
}

async function saveProfile() {
    const token = sessionStorage.getItem("token");

    try {
        const displayname = document.getElementById("input-displayname").value;
        const username = document.getElementById("input-username").value;
        const bio = document.getElementById("input-bio").value;

        const updatedData = {
            displayname,
            username,
            bio,
            pfp: SelectedImage || profileData.pfp
        };

        const response = await fetch("http://localhost:3000/profile",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed To Update Profile");
        }

        const data = await response.json();
        console.log("Profile Updated", data);

        isEditing = false;

        await DisplayUserDetails();

    } catch (error) {
        console.error(error)
    }
}


DisplayUserDetails();