const getSupabaseInstance = require("./dbService");

// Helper functions for formatting
const formatTimeToString = (seconds) => {
  if (!seconds) return "";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
  return `${remainingSeconds} sec`;
};

const formatSecondsFromTimeString = (timeString) => {
  if (!timeString) return null;

  if (timeString.includes(":")) {
    const [minutes, seconds] = timeString.split(":").map(Number);
    return minutes * 60 + seconds;
  }

  if (timeString.includes("sec")) {
    return parseInt(timeString);
  }

  return null;
};

const getFieldsFromMeasurementType = (measurementType) => {
  switch (measurementType) {
    case "weight_reps":
      return ["Reps", "Weight"];
    case "time_distance":
      return ["Time", "Distance"];
    case "time_only":
      return ["Time"];
    case "bodyweight_reps":
      return ["Reps"];
    default:
      return ["Value"];
  }
};

const parseWeightField = (weightField) => {
  if (!weightField) return null;
  return parseFloat(weightField.replace(/[^\d.-]/g, ""));
};

const parseDistanceField = (distanceField) => {
  if (!distanceField) return [null, null];

  const match = distanceField.match(/^([\d.]+)\s*([a-zA-Z]+)$/);
  if (match) {
    return [parseFloat(match[1]), match[2]];
  }

  return [parseFloat(distanceField), "miles"];
};

// Fetch all workouts for a user
const fetchWorkouts = async (userJwt) => {
  const supabase = getSupabaseInstance(userJwt);
  const userId = (await supabase.auth.getUser()).data.user.id;
  const { data, error } = await supabase
    .from("workouts")
    .select(
      `
      id, 
      title, 
      description, 
      created_at, 
      completed_at, 
      duration_seconds, 
      difficulty_rating,
      is_active
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return { error };

  return { data };
};

// Fetch a user's active workout
const fetchActiveWorkout = async (userJwt) => {
  const supabase = getSupabaseInstance(userJwt);
  const userId = (await supabase.auth.getUser()).data.user.id;

  const { data, error } = await supabase
    .from("workouts")
    .select(
      `
      id, 
      title, 
      description, 
      created_at, 
      duration_seconds
    `
    )
    .eq("user_id", userId)
    .eq("is_active", true)
    .is("completed_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No results found
      return { data: null };
    }
    return { error };
  }

  // Format active workout for frontend
  const formattedWorkout = await formatWorkoutForFrontend(data.id, userJwt);

  return { data: formattedWorkout };
};

// Format workout data for frontend
const formatWorkoutForFrontend = async (workoutId, userJwt) => {
  // Get base workout data
  const supabase = getSupabaseInstance(userJwt);
  const userId = (await supabase.auth.getUser()).data.user.id;

  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .select(
      `
      id, 
      title, 
      description, 
      created_at, 
      completed_at, 
      duration_seconds, 
      difficulty_rating
    `
    )
    .eq("id", workoutId)
    .eq("user_id", userId)
    .single();

  if (workoutError) return null;

  // Get workout exercises
  const { data: workoutExercises, error: exercisesError } = await supabase
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

  if (exercisesError) return workout;

  // For each exercise, get the sets
  const exercisesWithSets = await Promise.all(
    workoutExercises.map(async (workoutExercise) => {
      const { data: sets, error: setsError } = await supabase
        .from("exercise_sets")
        .select("*")
        .eq("workout_exercise_id", workoutExercise.id)
        .order("set_number", { ascending: true });

      if (setsError) return null;

      // Get user's previous settings for this exercise if available
      const { data: userSettings } = await supabase
        .from("user_exercise_settings")
        .select("*")
        .eq("user_id", userId)
        .eq("exercise_id", workoutExercise.exercise_id)
        .single();

      // Format sets for frontend
      const formattedSets = sets.map((set) => {
        const measurementType = workoutExercise.exercises.measurement_type;

        // Format previous value (if needed)
        const prevValue = userSettings ? formatPreviousValue(userSettings, measurementType) : "";

        // Format current values
        let field1 = "";
        let field2 = "";

        switch (measurementType) {
          case "weight_reps":
            field1 = set.reps?.toString() || "";
            field2 = set.weight ? `${set.weight} Lbs` : "";
            break;
          case "time_distance":
            field1 = formatTimeToString(set.duration_seconds);
            field2 = set.distance ? `${set.distance} ${set.distance_unit || "miles"}` : "";
            break;
          case "time_only":
            field1 = formatTimeToString(set.duration_seconds);
            break;
          case "bodyweight_reps":
            field1 = set.reps?.toString() || "";
            break;
        }

        return {
          setComplete: set.is_completed || false,
          prev: prevValue,
          field1,
          field2,
        };
      });

      // Return formatted exercise
      return {
        id: workoutExercise.id,
        title: workoutExercise.exercises.name,
        initRestTime: workoutExercise.rest_time,
        fields: getFieldsFromMeasurementType(workoutExercise.exercises.measurement_type),
        sets: formattedSets,
        note: workoutExercise.note,
      };
    })
  );

  // Filter out null values
  const validExercises = exercisesWithSets.filter((ex) => ex !== null);

  return {
    ...workout,
    setData: validExercises,
  };
};

// Format previous value based on measurement type
const formatPreviousValue = (userSettings, measurementType) => {
  switch (measurementType) {
    case "weight_reps":
      if (userSettings.preferred_reps && userSettings.preferred_weight) {
        return `${userSettings.preferred_reps} x ${userSettings.preferred_weight} Lbs`;
      }
      return "";
    case "time_distance":
      // Not implemented yet
      return "";
    case "time_only":
      // Not implemented yet
      return "";
    case "bodyweight_reps":
      if (userSettings.preferred_reps) {
        return `${userSettings.preferred_reps} reps`;
      }
      return "";
    default:
      return "";
  }
};

// Fetch a specific workout by id
const fetchWorkoutById = async (workoutId, userJwt) => {
  // Check if the workout belongs to the user
  const supabase = getSupabaseInstance(userJwt);
  const userId = (await supabase.auth.getUser()).data.user.id;
  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", workoutId)
    .eq("user_id", userId)
    .single();

  if (workoutError) return { error: workoutError };

  // Format for frontend
  const formattedWorkout = await formatWorkoutForFrontend(workoutId, userJwt);

  return { data: formattedWorkout };
};

// Insert a new workout
const insertWorkout = async (workoutData, userJwt) => {
  // Create the workout record
  const supabase = getSupabaseInstance(userJwt);
  console.log(await supabase.auth.getUser());
  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .insert({
      user_id: (await supabase.auth.getUser()).data.user.id,
      title: workoutData.title || "New Workout",
      description: workoutData.description || "",
      is_active: true,
    })
    .select()
    .single();

  if (workoutError) return { error: workoutError };

  // If exercises are provided, add them
  if (workoutData.exercises && Array.isArray(workoutData.exercises)) {
    await Promise.all(
      workoutData.exercises.map(async (exercise, index) => {
        // 1. Insert workout exercise
        const { data: workoutExercise, error: exerciseError } = await supabase
          .from("workout_exercises")
          .insert({
            workout_id: workout.id,
            exercise_id: exercise.exercise_id,
            position: index + 1,
            rest_time: exercise.rest_time || 60,
            note: exercise.note || null,
          })
          .select()
          .single();

        if (exerciseError) {
          console.error(exerciseError);
          return;
        } // Continue with next exercise

        // 2. If sets are provided, add them
        if (exercise.sets && Array.isArray(exercise.sets)) {
          // Get measurement type for this exercise
          const { data: exerciseDetails } = await supabase
            .from("exercises")
            .select("measurement_type")
            .eq("id", exercise.exercise_id)
            .single();

          const measurementType = exerciseDetails?.measurement_type || "weight_reps";

          // Create sets
          const setsToInsert = exercise.sets.map((set, setIndex) => {
            return createSetObject(workoutExercise.id, setIndex + 1, set, measurementType);
          });

          await supabase.from("exercise_sets").insert(setsToInsert);
        }
      })
    );
  }

  // Return the formatted workout
  return await fetchWorkoutById(workout.id, userJwt);
};

// Helper to create a set object for DB insertion
const createSetObject = (workoutExerciseId, setNumber, setData, measurementType) => {
  const setObject = {
    workout_exercise_id: workoutExerciseId,
    set_number: setNumber,
    is_completed: setData.setComplete || false,
  };

  // Add fields based on measurement type
  switch (measurementType) {
    case "weight_reps":
      setObject.reps = parseInt(setData.field1) || null;
      setObject.weight = parseWeightField(setData.field2);
      break;
    case "time_distance":
      setObject.duration_seconds = formatSecondsFromTimeString(setData.field1);
      if (setData.field2) {
        const [distance, unit] = parseDistanceField(setData.field2);
        setObject.distance = distance;
        setObject.distance_unit = unit;
      }
      break;
    case "time_only":
      setObject.duration_seconds = formatSecondsFromTimeString(setData.field1);
      break;
    case "bodyweight_reps":
      setObject.reps = parseInt(setData.field1) || null;
      break;
  }

  return setObject;
};

// Update an existing workout
const modifyWorkout = async (workoutId, updates, userJwt) => {
  const supabase = getSupabaseInstance(userJwt);
  const userId = (await supabase.auth.getUser()).data.user.id;

  // First check if the workout belongs to the user
  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", workoutId)
    .eq("user_id", userId)
    .single();

  if (workoutError) return { error: workoutError };

  // Update basic workout info if provided
  if (updates.title || updates.description !== undefined) {
    const { error: updateError } = await supabase
      .from("workouts")
      .update({
        title: updates.title || workout.title,
        description: updates.description !== undefined ? updates.description : workout.description,
      })
      .eq("id", workoutId);

    if (updateError) return { error: updateError };
  }

  // If exercises are provided, handle them
  if (updates.exercises && Array.isArray(updates.exercises)) {
    // First get existing workout exercises
    const result = await supabase
      .from("workout_exercises")
      .select("id, exercise_id, position")
      .eq("workout_id", workoutId)
      .order("position", { ascending: true });
    const existingExercises = result.data;

    // Handle each exercise update
    await Promise.all(
      updates.exercises.map(async (exerciseUpdate, index) => {
        // Check if this is an existing exercise or a new one
        const existingExercise = existingExercises?.find((ex) => ex.id === exerciseUpdate.id);

        if (existingExercise) {
          // Update existing exercise
          await supabase
            .from("workout_exercises")
            .update({
              rest_time: exerciseUpdate.initRestTime || null,
              note: exerciseUpdate.note || null,
              position: index + 1, // Update position if order changed
            })
            .eq("id", existingExercise.id);

          // If sets are provided, update them
          if (exerciseUpdate.sets && Array.isArray(exerciseUpdate.sets)) {
            // Get measurement type
            const { data: exerciseDetails } = await supabase
              .from("exercises")
              .select("measurement_type")
              .eq("id", existingExercise.exercise_id)
              .single();

            const measurementType = exerciseDetails?.measurement_type || "weight_reps";

            // Get existing sets
            const { data: existingSets } = await supabase
              .from("exercise_sets")
              .select("*")
              .eq("workout_exercise_id", existingExercise.id)
              .order("set_number", { ascending: true });

            // Update or create sets
            await Promise.all(
              exerciseUpdate.sets.map(async (setUpdate, setIndex) => {
                const existingSet = existingSets?.find((s) => s.set_number === setIndex + 1);

                if (existingSet) {
                  // Update existing set
                  const setObject = createSetObject(
                    existingExercise.id,
                    setIndex + 1,
                    setUpdate,
                    measurementType
                  );

                  await supabase.from("exercise_sets").update(setObject).eq("id", existingSet.id);
                } else {
                  // Create new set
                  const setObject = createSetObject(
                    existingExercise.id,
                    setIndex + 1,
                    setUpdate,
                    measurementType
                  );

                  await supabase.from("exercise_sets").insert(setObject);
                }
              })
            );

            // Remove any sets that are no longer needed
            if (existingSets && existingSets.length > exerciseUpdate.sets.length) {
              const setNumbersToKeep = exerciseUpdate.sets.map((_, i) => i + 1);
              const setsToRemove = existingSets.filter((s) => !setNumbersToKeep.includes(s.set_number));

              if (setsToRemove.length > 0) {
                await supabase
                  .from("exercise_sets")
                  .delete()
                  .in(
                    "id",
                    setsToRemove.map((s) => s.id)
                  );
              }
            }
          }
        } else if (exerciseUpdate.id) {
          // This is a new exercise to add
          const { data: newExercise, error: newExerciseError } = await supabase
            .from("workout_exercises")
            .insert({
              workout_id: workoutId,
              exercise_id: exerciseUpdate.id,
              position: index + 1,
              rest_time: exerciseUpdate.initRestTime || 60,
              note: exerciseUpdate.note || null,
            })
            .select()
            .single();

          if (newExerciseError) return; // Continue with next exercise

          // If sets are provided, add them
          if (exerciseUpdate.sets && Array.isArray(exerciseUpdate.sets)) {
            // Get measurement type
            const { data: exerciseDetails } = await supabase
              .from("exercises")
              .select("measurement_type")
              .eq("id", exerciseUpdate.id)
              .single();

            const measurementType = exerciseDetails?.measurement_type || "weight_reps";

            // Create sets
            const setsToInsert = exerciseUpdate.sets.map((set, setIndex) => {
              return createSetObject(newExercise.id, setIndex + 1, set, measurementType);
            });

            await supabase.from("exercise_sets").insert(setsToInsert);
          }
        }
      })
    );

    // Remove exercises that are no longer in the update
    if (existingExercises) {
      const exerciseIdsToKeep = updates.exercises.map(e => e.id);

      const exercisesToRemove = existingExercises.filter((e) => !exerciseIdsToKeep.includes(e.exercise_id));

      if (exercisesToRemove.length > 0) {
        await supabase
          .from("workout_exercises")
          .delete()
          .in(
            "id",
            exercisesToRemove.map((e) => e.id)
          );
      }
    }
  }

  // Return the updated workout
  return await fetchWorkoutById(workoutId, userJwt);
};

// Remove a workout
const removeWorkout = async (workoutId, userJwt) => {
  const supabase = getSupabaseInstance();

  // First check if the workout belongs to the user
  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", workoutId)
    .eq("user_id", userJwt)
    .single();

  if (workoutError) return { error: workoutError };

  // Delete the workout
  const { error: deleteError } = await supabase.from("workouts").delete().eq("id", workoutId);

  if (deleteError) return { error: deleteError };

  return { success: true };
};

// Mark a workout as complete
const markWorkoutComplete = async (workoutId, completionData, userJwt) => {
  const supabase = getSupabaseInstance(userJwt);
  const userId = (await supabase.auth.getUser()).data.user.id;

  // First check if the workout belongs to the user
  const { data: workout, error: workoutError } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", workoutId)
    .eq("user_id", userId)
    .single();

  if (workoutError) return { error: workoutError };

  // Update workout as completed
  const { error: updateError } = await supabase
    .from("workouts")
    .update({
      completed_at: new Date().toISOString(),
      duration_seconds: completionData.duration_seconds || workout.duration_seconds,
      difficulty_rating: completionData.difficulty_rating || null,
      is_active: false,
    })
    .eq("id", workoutId);

  if (updateError) return { error: updateError };

  // If exercises with difficulty ratings are provided, process them
  if (completionData.exercises && Array.isArray(completionData.exercises)) {
    // Process each exercise
    await Promise.all(
      completionData.exercises.map(async (exerciseData) => {
        // Get the exercise details
        const { data: workoutExercise } = await supabase
          .from("workout_exercises")
          .select("exercise_id")
          .eq("id", exerciseData.id)
          .single();

        if (!workoutExercise) return; // Skip if exercise not found

        // Record exercise history
        await supabase.from("exercise_history").insert({
          user_id: userId,
          exercise_id: workoutExercise.exercise_id,
          workout_id: workoutId,
          performed_at: new Date().toISOString(),
          weight: exerciseData.weight,
          reps: exerciseData.reps,
          duration_seconds: exerciseData.duration_seconds,
          distance: exerciseData.distance,
          distance_unit: exerciseData.distance_unit,
          difficulty_rating: exerciseData.difficulty_rating,
        });

        // Update user exercise settings if difficulty rating provided
        if (exerciseData.difficulty_rating) {
          // Check if settings exist
          const { data: existingSettings } = await supabase
            .from("user_exercise_settings")
            .select("*")
            .eq("user_id", userId)
            .eq("exercise_id", workoutExercise.exercise_id)
            .single();

          if (existingSettings) {
            // Update existing settings
            await supabase
              .from("user_exercise_settings")
              .update({
                preferred_weight: exerciseData.weight || existingSettings.preferred_weight,
                preferred_reps: exerciseData.reps || existingSettings.preferred_reps,
                last_difficulty_rating: exerciseData.difficulty_rating,
              })
              .eq("id", existingSettings.id);
          } else {
            // Create new settings
            await supabase.from("user_exercise_settings").insert({
              user_id: userId,
              exercise_id: workoutExercise.exercise_id,
              preferred_weight: exerciseData.weight,
              preferred_reps: exerciseData.reps,
              preferred_sets: null,
              preferred_rest_time: null,
              last_difficulty_rating: exerciseData.difficulty_rating,
            });
          }
        }
      })
    );
  }

  // Return the completed workout
  return await fetchWorkoutById(workoutId, userJwt);
};

module.exports = {
  fetchWorkouts,
  fetchWorkoutById,
  insertWorkout,
  modifyWorkout,
  removeWorkout,
  markWorkoutComplete,
  fetchActiveWorkout,
};
