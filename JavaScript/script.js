const savedWorkouts = localStorage.getItem("workouts")
let workouts = savedWorkouts ? JSON.parse(savedWorkouts) : [];
let editingIndex = null;
let SelectedImage = null;

function SubmitWorkout() {
    if (editingIndex !== null) {
        EditWorkout(editingIndex);
    } else {
        AddWorkout();
    }
    DisplayWorkouts();
}

function AddWorkout() {
    let exercise = document.getElementById('Exercise').value;
    let weight = document.getElementById('Weight').value;
    let reps = document.getElementById('Reps').value;
    let sets = document.getElementById('Sets').value;

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

    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    DisplayWorkouts();
    document.getElementById("WorkoutForm").reset();
    document.getElementById("imageDisplay").src = "";
    SelectedImage = null;
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
        if (editingIndex === index) {
            editingMessage = `<p>✏️ Currently Editing ${workout.exercise}</p>`;
        }
        
        output += `
            <div class="workoutcard">
            <h2>${workout.exercise}</h2> ${imageHTML}
            <hr>
            <p>${workout.weight}kg x ${workout.reps} reps</p>
            <p>${workout.sets} sets</p>
            ${editingMessage}
            <button class="DeleteButton" onClick="DeleteWorkout(${index})">Delete</button> <button class="EditButton" onClick="StartEditing(${index})">Edit</button>
        </div>
       `;
        }
        document.getElementById('WorkoutList').innerHTML = output;
    }

function DeleteWorkout(index) {
    workouts.splice(index, 1);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    DisplayWorkouts();
}

function EditWorkout(index) {
    let exercise = document.getElementById('Exercise').value;
    let weight = document.getElementById('Weight').value;
    let reps = document.getElementById('Reps').value;
    let sets = document.getElementById('Sets').value;

    const workout = {
        exercise,
        weight,
        reps,
        sets,
        image: SelectedImage
    }

    workouts[index] = workout;

    localStorage.setItem("workouts", JSON.stringify(workouts));
    DisplayWorkouts();
    document.getElementById("WorkoutForm").reset();
    document.getElementById("imageDisplay").src = "";
    editingIndex = null;
}

function StartEditing(index) {
    editingIndex = index;

    const workout = workouts[index];

    document.getElementById("Exercise").value = workout.exercise;
    document.getElementById("Weight").value = workout.weight;
    document.getElementById("Reps").value = workout.reps;
    document.getElementById("Sets").value = workout.sets;
    document.getElementById("imageDisplay").src = workout.image;
    if(workout.image){
        imageDisplay.src = workout.image;
        imageDisplay.style.display = "block";
    }else{
        imageDisplay.src = "";
        imageDisplay.style.display = "none";
    }

    DisplayWorkouts();
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

DisplayWorkouts();