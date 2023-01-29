import { supabase } from "../../../lib/supabase";

export async function getProjectItem(projectID) {
  try {


    const contributionsData = await supabase
      .from("contributions")
      .select(
        `
      wallet_id,
      amount_contributed_usd,
      contributor_wallets (
        tags,
        risk_score
      )
    `
      )
      .eq("project_id", projectID);



    const projectData = await supabase
      .from("projects")
      .select(
        `
      title,
      wallet_address,
      gitcoin_url,
      tags,
      risk_score,
      num_contributors,
      total_amount_contributed_usd
    `
      )
      .eq("id", projectID);

    const data = {
      projectData: projectData.data,
      contributionsData: contributionsData.data,
    };

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
