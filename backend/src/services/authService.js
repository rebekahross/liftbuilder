const getSupabaseInstance = require("./dbService")

// Login service
const loginService = async (email, password) => {
  const supabase = getSupabaseInstance()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { user: data };
};

// SignUp service
const signUpService = async (firstName, lastName, email, password) => {
  const supabase = getSupabaseInstance()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Required for postgres trigger that auto updates profiles table
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  console.log(data);
  return { user: data };
};

module.exports = { loginService, signUpService };
