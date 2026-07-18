let workouts = [];

function AddWorkout(){
    let exercise = document.getElementById('Exercise').value;
    let weight = document.getElementById('Weight').value;
    let reps = document.getElementById('Reps').value;
    let sets = document.getElementById('Sets').value;

    let workout = {
        exercise: exercise,
        weight: weight,
        reps: reps,
        sets: sets
    };
    
    workouts.push(workout);
    DisplayWorkouts();
}

function DisplayWorkouts(){
    let output = "";

    for (let workout of workouts){
        output += `
        <div class="workoutcard">
            <h2>${workout.exercise}</h2>
            <hr>
            <p>${workout.weight}kg x ${workout.reps} reps</p>
            <p>${workout.sets} sets</p>
        </div>
       `;
    }

document.getElementById('WorkoutList').innerHTML = output;

}