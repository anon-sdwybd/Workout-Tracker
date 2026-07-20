const savedWorkouts = localStorage.getItem("workouts")
let workouts = savedWorkouts?JSON.parse(savedWorkouts):[];
let editingIndex = null;

function SubmitWorkout(){
    if (editingIndex !== null){
        EditWorkout(editingIndex);
    }else{
        AddWorkout();
    }
}

function AddWorkout(){
    let exercise = document.getElementById('Exercise').value;
    let weight = document.getElementById('Weight').value;
    let reps = document.getElementById('Reps').value;
    let sets = document.getElementById('Sets').value;

    const workout = {
        exercise,
        weight,
        reps,
        sets
    }
    
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    DisplayWorkouts();
    document.getElementById("WorkoutForm").reset();
}

function DisplayWorkouts(){
    let output = "";

    for (let index = 0; index < workouts.length; index++){
        const workout = workouts[index];
        output += `
        <div class="workoutcard">
            <h2>${workout.exercise}</h2>
            <hr>
            <p>${workout.weight}kg x ${workout.reps} reps</p>
            <p>${workout.sets} sets</p>
            <button class="DeleteButton" onClick="DeleteWorkout(${index})">Delete</button> <button class="EditButton" onClick="StartEditing(${index})">Edit</button>
        </div>
       `;
    }

document.getElementById('WorkoutList').innerHTML = output;

}

function DeleteWorkout(index){
    workouts.splice(index, 1);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    DisplayWorkouts();
}

function EditWorkout(index){
    let exercise = document.getElementById('Exercise').value;
    let weight = document.getElementById('Weight').value;
    let reps = document.getElementById('Reps').value;
    let sets = document.getElementById('Sets').value;

    const workout = {
        exercise,
        weight,
        reps,
        sets
    }

    workouts[index] = workout;
    
    localStorage.setItem("workouts", JSON.stringify(workouts));
    DisplayWorkouts();
    editingIndex = null;
}

function StartEditing(index){
    editingIndex = index;
}

DisplayWorkouts();