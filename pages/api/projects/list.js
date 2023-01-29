import { supabase } from "../../../lib/supabase";

export async function getProjects() {
  try {
    let { data } = await supabase.from("projects").select();
    return data;
  } catch (error) {
    console.log(error);
    throw "query execution failed";
  }
}

export default async function handler(req, res) {
  try {
    const data = await getProjects();
    res.status(200).json(data);
  } catch (error) {
    // unhide to check error
    // res.status(500).json({ error: error.message });
  }
}
