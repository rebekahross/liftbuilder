const getSupabaseInstance = require("./dbService");

// Format timestamp to date string
const formatDateString = (timestamp) => {
  if (!timestamp) return "";

  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Format seconds to time string
const formatElapsedTimeString = (seconds) => {
  if (!seconds) return "N/A";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let resultStrings = [];

  if (hours > 0) {
    resultStrings.push(`${hours} ${hours === 1 ? "Hour" : "Hours"}`);
  }

  if (minutes > 0) {
    resultStrings.push(`${minutes} ${minutes === 1 ? "Minute" : "Minutes"}`);
  }

  if (remainingSeconds > 0) {
    resultStrings.push(`${remainingSeconds} ${remainingSeconds === 1 ? "Second" : "Seconds"}`);
  }

  return resultStrings.length > 0 ? resultStrings.join(", ") : "0 Seconds";
};

// Fetch workout history for a user
const fetchWorkoutHistory = async (userJwt) => {
  // Fetch completed workouts
  const supabase = getSupabaseInstance(userJwt);
  const userId = (await supabase.auth.getUser()).data.user.id;
  const { data: workouts, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", userId)
    .not("completed_at", "is", null)
    .order("completed_at", { ascending: false });

  if (error) return { error };

  // Format each workout for the frontend
  const formattedWorkouts = await Promise.all(
    workouts.map(async (workout) => {
      // Calculate total weight lifted (yield)
      const { data: exerciseHistory } = await supabase
        .from("exercise_history")
        .select("weight, reps")
        .eq("workout_id", workout.id);

      const totalWeight = exerciseHistory
        ? exerciseHistory.reduce((total, entry) => {
            return total + (entry.weight || 0) * (entry.reps || 0);
          }, 0)
        : 0;

      // Format for frontend
      return {
        id: workout.id,
        title: workout.title,
        date: formatDateString(workout.completed_at),
        // yield: `${Math.round(totalWeight)} Lbs`,
        yield: `${Math.floor(Math.random() * 10000)} Lbs`,
        durationSeconds: workout.duration_seconds || 0,
        difficultyPercentage: (workout.difficulty_rating || 5) * 10,
      };
    })
  );

  return { data: formattedWorkouts };
};

// Fetch detailed workout history for a specific workout
const fetchWorkoutHistoryDetail = async (workoutId, userJwt) => {
  const supabase = getSupabaseInstance(userJwt);
  const userId = (await supabase.auth.getUser()).data.user.id;
  // Check if the workout belongs to the user
  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", workoutId)
    .eq("user_id", userId)
    .single();

  if (workoutError) return { error: workoutError };

  // Get all exercise history for this workout
  const { data: exerciseHistories, error: historyError } = await supabase
    .from("workout_exercises")
    .select(
      `
    id,
    exercise_id,
    position,
    rest_time,
    note,
    exercises!inner (
      id,
      name,
      measurement_type
    )
  `
    )
    .eq("workout_id", workoutId)
    .order("position", { ascending: true });
  if (historyError) return { error: historyError };
  console.log(exerciseHistories);

  // Group by exercise
  const exerciseGroups = {};
  exerciseHistories.forEach((history) => {
    const exerciseId = history.exercise_id;

    if (!exerciseGroups[exerciseId]) {
      exerciseGroups[exerciseId] = {
        title: history.exercises.name,
        measurement_type: history.exercises.measurement_type,
        entries: [],
      };
    }

    exerciseGroups[exerciseId].entries.push(history);
  });

  // Format each exercise group for the frontend
  const setData = Object.values(exerciseGroups).map((group) => {
    // Determine fields based on measurement type
    let fields;
    switch (group.measurement_type) {
      case "weight_reps":
        fields = ["Reps", "Weight"];
        break;
      case "time_distance":
        fields = ["Time", "Distance"];
        break;
      case "time_only":
        fields = ["Time"];
        break;
      case "bodyweight_reps":
        fields = ["Reps"];
        break;
      default:
        fields = ["Value"];
    }

    // Format sets
    const sets = group.entries.map((entry) => {
      const setData = {
        // Base fields that all sets will have
        field1: "",
        field2: "",
      };

      // Set values based on measurement type
      switch (group.measurement_type) {
        case "weight_reps":
          setData.field1 = entry.reps ? entry.reps.toString() : "";
          setData.field2 = entry.weight ? `${entry.weight} Lbs` : "";
          break;
        case "time_distance":
          setData.field1 = entry.duration_seconds ? formatElapsedTimeString(entry.duration_seconds) : "";
          setData.field2 = entry.distance ? `${entry.distance} ${entry.distance_unit || "miles"}` : "";
          break;
        case "time_only":
          setData.field1 = entry.duration_seconds ? formatElapsedTimeString(entry.duration_seconds) : "";
          break;
        case "bodyweight_reps":
          setData.field1 = entry.reps ? entry.reps.toString() : "";
          break;
      }

      return setData;
    });

    return {
      title: group.title,
      fields: fields,
      sets: sets,
    };
  });

  // Calculate total weight lifted (yield)
  const totalWeight = exerciseHistories.reduce((total, entry) => {
    return total + (entry.weight || 0) * (entry.reps || 0);
  }, 0);

  // Format complete response
  const formattedResponse = {
    id: workout.id,
    title: workout.title,
    date: formatDateString(workout.completed_at),
    yield: `${Math.round(totalWeight)} Lbs`,
    durationSeconds: workout.duration_seconds || 0,
    difficultyPercentage: (workout.difficulty_rating || 5) * 10,
    setData: setData,
  };

  return { data: formattedResponse };
};

module.exports = {
  fetchWorkoutHistory,
  fetchWorkoutHistoryDetail,
};
