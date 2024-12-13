class calorieTracker {
  constructor() {
    // runs the function when it is intanstiated
    this._calorieLimit = 0;
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
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workouts) {
    // to the workout list above
    this._workouts.push(workouts);
    this._totalLimit -= workouts.calories;
    this._displayNewWorkout(workouts);
    this._render();
  }

  removeMeal(id) {
    const mealIndex = this._meals.findIndex((meal) => meal.id === id);
    if (mealIndex !== -1) {
      const meal = this._meals[mealIndex];
      this._totalLimit -= meal.calories;
      this._meals.splice(mealIndex, 1);
      this._render();
    }
  }

  removeWorkout(id) {
    const WorkoutIndex = this._workouts.findIndex(
      (workout) => workout.id === id
    );
    if (WorkoutIndex !== -1) {
      const workout = this._workouts[WorkoutIndex];
      this._totalLimit += workout.calories;
      this._workouts.splice(WorkoutIndex, 1);
      this._render();
    }
  }

  setLimit(calorieLimit) {
    this._calorieLimit = calorieLimit;
    this._displayCaloriesLimit();
    this._render();
  }

  reset() {
    this._totalLimit = 0;
    this._meals = [];
    this._workouts = [];
    this._render();
  }

  // Private Methods --------------------------------
  _displayCaloriesTotal() {
    const totalCalEl = document.querySelector("#calories-total");
    totalCalEl.innerHTML = this._totalLimit;
  }

  _displayCaloriesLimit() {
    const totalCalLi = document.querySelector("#calories-limit");
    totalCalLi.innerHTML = this._calorieLimit;
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
    const remaining = this._calorieLimit - this._totalLimit;
    totalCalRemainingLi.innerHTML = remaining;

    if (remaining <= 0) {
      totalCalRemainingLi.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      totalCalRemainingLi.parentElement.parentElement.classList.add(
        "bg-danger"
      );
      calProgress.classList.add("bg-danger");
      calProgress.classList.remove("bg-success");
    } else {
      totalCalRemainingLi.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      totalCalRemainingLi.parentElement.parentElement.classList.add("bg-light");
      calProgress.classList.remove("bg-danger");
      calProgress.classList.add("bg-success");
    }
  }

  _displayCalProgress() {
    const calProgress = document.querySelector("#calorie-progress");
    const percentage = (this._totalLimit / this._calorieLimit) * 100;
    const width = Math.min(percentage, 100);

    calProgress.style.width = `${width}%`;
  }

  _displayNewMeal(meal) {
    const mealsEl = document.querySelector("#meal-items");
    const newMeal = document.createElement("div");

    newMeal.classList.add("card", "my-2");
    newMeal.setAttribute("data-id", meal.id);
    newMeal.innerHTML = `
         
      <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${meal.name}</h4>
                <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                ${meal.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
      `;
    mealsEl.appendChild(newMeal);
  }

  _displayNewWorkout(workouts) {
    const workoutsEl = document.querySelector("#workout-items");
    const newWorkout = document.createElement("div");

    newWorkout.classList.add("card", "my-2");
    newWorkout.setAttribute("data-id", workouts.id);
    newWorkout.innerHTML = `
         
      <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="mx-1">${workouts.name}</h4>
                <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
                ${workouts.calories}
                </div>
                <button class="delete btn btn-danger btn-sm mx-2">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
      `;
    workoutsEl.appendChild(newWorkout);
  }
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalProgress();
    this._displayNewMeal();
    this._displayNewWorkout();
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

class App {
  constructor() {
    this._tracker = new calorieTracker();
    document
      .querySelector("#meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));

    document
      .querySelector("#workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));

    document
      .querySelector("#meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));

    document
      .querySelector("#workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));

    document
      .querySelector("#filter-meals")
      .addEventListener("keyup", this._filterItem.bind(this, "meal"));

    document
      .querySelector("#filter-workouts")
      .addEventListener("keyup", this._filterItem.bind(this, "workout"));

    document
      .querySelector("#reset")
      .addEventListener("click", this._reset.bind(this));

    document
      .querySelector("#limit-form")
      .addEventListener("submit", this._setLimit.bind(this));
  }

  _newItem(type, e) {
    e.preventDefault();
    const name = document.querySelector(`#${type}-name`);
    const cal = document.querySelector(`#${type}-calories`);

    // Validate Inputs
    if (name.value === "" || cal.value === "") {
      alert("Please fill in all Fields");
      return;
    }

    if (type === "meal") {
      const meal = new Meal(name.value, +cal.value); // Create new Meal instance
      this._tracker.addMeal(meal); // Add meal to tracker
    } else {
      const workout = new Workout(name.value, +cal.value); // Create new Workout instance
      this._tracker.addWorkout(workout); // Add workout to tracker
    }

    name.value = "";
    cal.value = "";

    // Close the item collapse
    const collapseItem = document.querySelector(`#collapse-${type}`);
    const bsCollapse = new bootstrap.Collapse(collapseItem, { toggle: true });
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      if (confirm("Are you sure you want to remove this ?")) {
        const id = e.target.closest(".card").getAttribute("data-id");

        type === "meal"
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);
        e.target.closest(".card").remove();
      }
    }
  }

  // _filterItem(type, e) {
  //   const filterValue = e.target.value.toLowerCase();
  //   const items = document
  //     .querySelectorAll(`#${type}-items .card`)
  //     .forEach((item) => {
  //       const name = item.firstElementChild.firstElementChild.textContent;

  //       if (name.toLowerCase().indexOf(filterValue) != -1) {
  //         item.style.display = "block";
  //       }else{
  //         item.style.display = "none";
  //       }

  //     });
  // }

  _filterItem(type, e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
      const name = item.firstElementChild.firstElementChild.textContent;
      if (name.toLowerCase().indexOf(text) != -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
  _reset() {
    if (confirm("Are you sure you want to reset everything?")) {
      this._tracker.reset();
      document.getElementById("meal-items").innerHTML = "";
      document.getElementById("workout-items").innerHTML = "";
      document.getElementById("filter-meals").value = "";
      document.getElementById("filter-workouts").value = "";
    }
  }
  _setLimit(e) {
    e.preventDefault();

    const limit = document.querySelector("#limit");

    if (limit.value === "") {
      alert("Please enter a calorie limit");
      return;
    }
    this._tracker.setLimit(+limit.value); // especially if we are passing in a number as a value instead of string
    limit.value = ""; // Clear the input field

    const modalEl = document.querySelector("#limit-modal");

    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide(); // Hide the modal after setting the limit
  }
}
const app = new App(); // Initialize the App class
