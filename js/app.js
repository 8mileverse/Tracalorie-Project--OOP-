class calorieTracker {
  constructor() {
    // runs the function when it is intanstiated
    this._calorielimit = 3000;
    this._totalLimit = 0;
    this._meals = []; // adds to the calorie
    this._workouts = []; // takes away from the calorie
    this._displayCaloriesLimit();
    this._displayCaloriesTotal(); // Display initial calories total on page load
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalProgress();
  }

  // Public Methods/Api --------------------------------
  addMeal(meal) {
    // to the meal list above
    this._meals.push(meal);
    this._totalLimit += meal.calories;
    this._render();
  }

  addWorkout(workouts) {
    // to the workout list above
    this._workouts.push(workouts);
    this._totalLimit -= workouts.calories;
    this._render();
  }

  // Private Methods --------------------------------
  _displayCaloriesTotal() {
    const totalCalEl = document.querySelector("#calories-total");
    totalCalEl.innerHTML = this._totalLimit;
  }

  _displayCaloriesLimit() {
    const totalCalLi = document.querySelector("#calories-limit");
    totalCalLi.innerHTML = this._calorielimit;
  }

  _displayCaloriesConsumed() {
    // calories gained

    const totalCalConsumedLi = document.getElementById("calories-consumed");
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );
    totalCalConsumedLi.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    // calories lost

    const totalCalBurnedLi = document.getElementById("calories-burned");

    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    totalCalBurnedLi.innerHTML = burned;
  }
  _displayCaloriesRemaining() {
    const totalCalRemainingLi = document.getElementById("calories-remaining");
    const calProgress = document.querySelector("#calorie-progress");
    const remaining = this._calorielimit - this._totalLimit;
    totalCalRemainingLi.innerHTML = remaining;

    if (remaining <= 0) {
      totalCalRemainingLi.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      totalCalRemainingLi.parentElement.parentElement.classList.add(
        "bg-danger"
      );
      calProgress.classList.add('bg-danger');
      calProgress.classList.remove('bg-success');
    } else {
      totalCalRemainingLi.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      totalCalRemainingLi.parentElement.parentElement.classList.add("bg-light");
      calProgress.classList.remove('bg-danger');
      calProgress.classList.add('bg-success');
    }
  }

  _displayCalProgress() {
    const calProgress = document.querySelector("#calorie-progress");
    const percentage = (this._totalLimit / this._calorielimit) * 100;
    const width = Math.min(percentage, 100);

    calProgress.style.width = `${width}%`;
  }
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalProgress();
  }
}
class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new calorieTracker();

const breakfast = new Meal("Breakfast", 4000);
const fatBurn = new Workout("Pushup", 500);

tracker.addMeal(breakfast);
tracker.addWorkout(fatBurn);

console.log(tracker); // outputs: 200

console.log(tracker._meals); // outputs:
console.log(tracker._workouts); // outputs:
