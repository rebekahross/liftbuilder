const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

const getSupabaseInstance = (userJwt) => {
  dotenv.config();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables. Please check your .env file.");
  }

  if (userJwt) {
    const options = {
      global: {
        headers: {
          Authorization: `Bearer ${userJwt}`,
        },
      },
    };
    return createClient(supabaseUrl, supabaseKey, options);
  } else {
    return createClient(supabaseUrl, supabaseKey);
  }
};

module.exports = getSupabaseInstance;
