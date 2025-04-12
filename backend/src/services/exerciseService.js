const getSupabaseInstance = require('./dbService');

// Fetch all exercises
const fetchAllExercises = async () => {
  const supabase = getSupabaseInstance()

  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .order('name', { ascending: true });
  
  return { data, error };
};

// Fetch a specific exercise
const fetchExerciseById = async (exerciseId) => {
  const supabase = getSupabaseInstance()

  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', exerciseId)
    .single();
  
  return { data, error };
};

// Fetch exercises by category
const fetchExercisesByCategory = async (category) => {
  const supabase = getSupabaseInstance()

  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('category', category)
    .order('name', { ascending: true });
  
  return { data, error };
};

// Fetch user exercise settings
const fetchUserExerciseSettings = async (userId) => {
  const supabase = getSupabaseInstance()

  const { data, error } = await supabase
    .from('user_exercise_settings')
    .select(`
      id,
      exercise_id,
      preferred_weight,
      preferred_reps,
      preferred_sets,
      preferred_rest_time,
      last_difficulty_rating,
      exercises (
        id,
        name,
        category,
        measurement_type
      )
    `)
    .eq('user_id', userId);
  
  return { data, error };
};

// Update user exercise settings
const updateExerciseSettings = async (userId, exerciseId, settingsData) => {
  const supabase = getSupabaseInstance()

  // Check if settings already exist
  const { data: existingSettings, error: checkError } = await supabase
    .from('user_exercise_settings')
    .select('*')
    .eq('user_id', userId)
    .eq('exercise_id', exerciseId)
    .single();
  
  if (checkError && checkError.code !== 'PGRST116') { // Not 'no rows returned'
    return { error: checkError };
  }
  
  if (existingSettings) {
    // Update existing settings
    const { data, error } = await supabase
      .from('user_exercise_settings')
      .update({
        preferred_weight: settingsData.preferred_weight,
        preferred_reps: settingsData.preferred_reps,
        preferred_sets: settingsData.preferred_sets,
        preferred_rest_time: settingsData.preferred_rest_time,
        last_difficulty_rating: settingsData.last_difficulty_rating
      })
      .eq('id', existingSettings.id)
      .select()
      .single();
    
    return { data, error };
  } else {
    // Create new settings
    const { data, error } = await supabase
      .from('user_exercise_settings')
      .insert({
        user_id: userId,
        exercise_id: exerciseId,
        preferred_weight: settingsData.preferred_weight,
        preferred_reps: settingsData.preferred_reps,
        preferred_sets: settingsData.preferred_sets,
        preferred_rest_time: settingsData.preferred_rest_time,
        last_difficulty_rating: settingsData.last_difficulty_rating
      })
      .select()
      .single();
    
    return { data, error };
  }
};

module.exports = {
  fetchAllExercises,
  fetchExerciseById,
  fetchExercisesByCategory,
  fetchUserExerciseSettings,
  updateExerciseSettings
};