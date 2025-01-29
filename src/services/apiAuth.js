import supabase, { supabaseUrl } from "./supabase";

export async function signupApi({ email, password, fullname }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullname,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function loginApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function user() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logoutApi() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUserAccount({ password, fullname, avatar }) {
  const imageName = `${Math.random()}-${avatar?.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

  let updateUser;
  if (fullname) updateUser = { data: { fullname: fullname } };
  if (password) updateUser = { password };
  if (avatar) updateUser = { data: { fullname: fullname, avatar: imagePath } };
  const { data, error } = await supabase.auth.updateUser(updateUser);

  if (error) throw new Error(error.message);
  if (!avatar) return data;
  // upload image to supabase
  const { error: storageError } = await supabase.storage
    .from("avatars")
    // 1-------name---------file------
    .upload(imageName, avatar);
  if (storageError) throw new Error(storageError.message);

  return data;
}
