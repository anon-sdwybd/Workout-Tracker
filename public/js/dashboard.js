let workouts = [];
let editingID = null;
let SelectedImage = null;

async function SubmitWorkout() {
    if (editingID !== null) {
        await EditWorkout(editingID);
    } else {
        await AddWorkout();
    };
}

async function AddWorkout() {
    let exercise = document.getElementById('Exercise').value;
    let weight = (document.getElementById('Weight').value);
    let reps = (document.getElementById('Reps').value);
    let sets = (document.getElementById('Sets').value);

    if (!exercise || !weight || !reps || !sets) {
        alert("Please complete all workout details");
        return;
    }

    const workout = {
        exercise,
        weight,
        reps,
        sets,
        image: SelectedImage
    }

    const token = sessionStorage.getItem("token");

    try {
        console.time("CreateWorkout");

        const response = await fetch("http://localhost:3000/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(workout)
        });

        console.timeEnd("CreateWorkout");

        if (!response.ok) {
            throw new Error("Server Failed to Save Workout...")
        }

        const data = await response.json();
        console.log("Saved to Back End", data)

        await LoadWorkouts();
        document.getElementById("WorkoutForm").reset();
        document.getElementById("imageDisplay").src = "";
        SelectedImage = null;

    } catch (error) {
        console.error("Error", error);
        alert("Could Not Save Workout")
    }
}

async function LoadWorkouts() {
    const token = sessionStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:3000/workouts", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        workouts = data;

        if (!response.ok) {
            throw new Error("Failed to Load Workouts");
        }

        console.log("Loaded Workouts", data);
        DisplayWorkouts(data);

    } catch (error) {
        console.error(error)
    }
}

function DisplayWorkouts() {
    let output = "";

    for (let index = 0; index < workouts.length; index++) {
        const workout = workouts[index];
        let imageHTML = "";
        let editingMessage = "";

        if (workout.image) {
            imageHTML = `<img src="${workout.image}">`;
        }
        if (editingID === workout._id) {
            editingMessage = `<p>✏️ Currently Editing ${workout.exercise}</p>`;
        }

        output += `
            <div class="workoutcard">
            <h2>${workout.exercise}</h2> ${imageHTML}
            <hr>
            <p>${workout.weight}kg x ${workout.reps} reps</p>
            <p>${workout.sets} sets</p>
            ${editingMessage}
            <button class="DeleteButton" onClick="DeleteWorkout('${workout._id}')">Delete</button> <button class="EditButton" onClick="StartEditing('${workout._id}')">Edit</button>
        </div>
       `;
    }
    document.getElementById('WorkoutList').innerHTML = output;
}

async function DeleteWorkout(id) {
    try {
        console.log("Deleting ID:", id);
        const response = await fetch(
            `http://localhost:3000/workouts/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Delete Failed");
        }

        await LoadWorkouts();
    } catch (error) {
        console.error(error)
    }
}

async function EditWorkout() {
    const token = sessionStorage.getItem("token");

    try {
        let exercise = document.getElementById('Exercise').value;
        let weight = document.getElementById('Weight').value;
        let reps = (document.getElementById('Reps')).value;
        let sets = document.getElementById('Sets').value;

        const workout = {
            exercise,
            weight,
            reps,
            sets,
            image: SelectedImage
        }

        const response = await fetch(`http://localhost:3000/workouts/${editingID}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(workout)
            });

        if (!response.ok) {
            throw new Error("Failed to Update Workout");
        }

        const data = await response.json();
        console.log("Updated:", data);

        await LoadWorkouts();

        document.getElementById("WorkoutForm").reset();
        document.getElementById("imageDisplay").src = "";
        editingID = null;

        DisplayWorkouts();

    } catch (error) {
        console.error(error)
    }
}

function StartEditing(id) {
    console.log("Editing:", id);

    let workout = workouts.find(
        w => w._id === id
    );

    if (!workout) {
        console.error("Workout Not Found");
        return;
    }

    editingID = workout._id;
    DisplayWorkouts();

    document.getElementById("Exercise").value = workout.exercise;
    document.getElementById("Weight").value = workout.weight;
    document.getElementById("Reps").value = workout.reps;
    document.getElementById("Sets").value = workout.sets;
    document.getElementById("imageDisplay").src = workout.image;
    if (workout.image) {
        imageDisplay.src = workout.image;
        imageDisplay.style.display = "block";
    } else {
        imageDisplay.src = "";
        imageDisplay.style.display = "none";
    }
}

function ChooseImage() {
    document.getElementById('ImagePicker').click();
}

function ViewImage(InputEvent) {
    const files = InputEvent.target.files;

    if (files.length === 0) {
        alert("Please Choose a File");
        return;
    }

    const Preview = files[0];
    const reader = new FileReader();
    reader.onload = function (ReaderEvent) {
        SelectedImage = ReaderEvent.target.result

        const ImageElement = document.getElementById('imageDisplay');
        ImageElement.src = SelectedImage;
        ImageElement.style.display = "block";
    };

    reader.readAsDataURL(Preview);
}

document.getElementById('ImagePicker').addEventListener('change', ViewImage);

LoadWorkouts();