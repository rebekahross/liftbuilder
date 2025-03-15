const supabase = require('./dbService');

// Fetch user profile
const fetchUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
};

// Update user profile
const updateProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      email: profileData.email
    })
    .eq('id', userId)
    .select()
    .single();
  
  return { data, error };
};

// Fetch user metrics
const fetchUserMetrics = async (userId) => {
  const { data, error } = await supabase
    .from('user_metrics')
    .select('*')
    .eq('associated_user_id', userId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') { // No rows found
      return { data: null };
    }
    return { error };
  }
  
  return { data };
};

// Update user metrics
const updateMetrics = async (userId, metricsData) => {
  // Check if metrics exist
  const { data: existingMetrics } = await fetchUserMetrics(userId);
  
  if (existingMetrics) {
    // Update existing metrics
    const { data, error } = await supabase
      .from('user_metrics')
      .update({
        height: metricsData.height,
        weight: metricsData.weight,
        sex: metricsData.sex,
        fitness_level: metricsData.fitness_level,
        bench_max: metricsData.bench_max,
        squat_max: metricsData.squat_max,
        mile_time: metricsData.mile_time,
        bicep_curl_max: metricsData.bicep_curl_max,
        power_clean_max: metricsData.power_clean_max,
        calf_raise_max: metricsData.calf_raise_max
      })
      .eq('id', existingMetrics.id)
      .select()
      .single();
    
    return { data, error };
  } else {
    // Create new metrics
    const { data, error } = await supabase
      .from('user_metrics')
      .insert({
        associated_user_id: userId,
        height: metricsData.height,
        weight: metricsData.weight,
        sex: metricsData.sex,
        fitness_level: metricsData.fitness_level,
        bench_max: metricsData.bench_max,
        squat_max: metricsData.squat_max,
        mile_time: metricsData.mile_time,
        bicep_curl_max: metricsData.bicep_curl_max,
        power_clean_max: metricsData.power_clean_max,
        calf_raise_max: metricsData.calf_raise_max
      })
      .select()
      .single();
    
    return { data, error };
  }
};

module.exports = {
  fetchUserProfile,
  updateProfile,
  fetchUserMetrics,
  updateMetrics
};