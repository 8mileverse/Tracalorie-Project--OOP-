class calorieTracker {
  constructor() {
    this._calorielimit = 3000;
    this._totalLimit = 0;
    this._meals = []; // adds to the calorie
    this._workouts = []; // takes away from the calorie
  }

  addMeal(meal) {
    // to the meal list above
    this._meals.push(meal);
    this._totalLimit += meal.calories;
  }

  addWorkout(workouts) {
    // to the workout list above
    this._workouts.push(workouts);
    this._totalLimit -= workouts.calories;
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

const breakfast = new Meal('Breakfast', 400);
const fatBurn = new Workout('Pushup', 500 )

tracker.addMeal(breakfast);
tracker.addWorkout(fatBurn);

console.log(tracker); // outputs: 200

console.log(tracker._meals); // outputs:
console.log(tracker._workouts); // outputs: