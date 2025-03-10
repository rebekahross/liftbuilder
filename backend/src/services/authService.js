const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Login service
const loginService = async (email, password) => {
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
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        // Required for postgres trigger that auto updates profiles table
        data: {
            first_name: firstName,
            last_name: lastName,
            email: email,
        }
    }
  });

  if (error) {
    return { error: error.message };
  }

  return { user: data };
};

module.exports = { loginService, signUpService };
