import { getProjectItem } from "../pages/api/projects/get";
import { getProjects } from "../pages/api/projects/list";
import { nFormatter } from "./transform";

export async function getProjectOverviewData() {
  //get data from api
  const projects = await getProjects();

  const totalContributions = projects
    .map((p) =>
      Number(p.total_amount_contributed_usd.replace(/[^0-9.-]+/g, ""))
    )
    .reduce((prev, next) => prev + next);
  const totalProjects = projects.length;

  //setup counter data
  const counterData = {
    totalProjects: {
      name: "Total Projects",
      count: nFormatter(totalProjects, 1),
    },
    totalContributed: {
      name: "Total Contributions",
      count: nFormatter(totalContributions, 1),
    },
  };

  //setup project list
  const projectData = projects.map((p) => {
    return {
      projectID: p.id,
      title: p.title,
      amount: p.total_amount_contributed_usd,
      contributors: p.num_contributors,
      tags: Object.values(p.tags)[0],
      riskScore: p.risk_score,
    };
  });

  const data = {
    counters: counterData,
    projects: projectData,
  };

  return data;
}

export async function getProjectData(projectID) {

  //get data from api
  const {projectData: pData, contributionsData: wData} = await getProjectItem(projectID);

  //setup counter data
  const projectData = {
    title: pData[0].title,
    wallet: pData[0].wallet_address,
    contributors: pData[0].num_contributors,
    amount: pData[0].total_amount_contributed_usd,
    tags: Object.values(pData[0].tags)[0],
  };


  const walletData = wData.map(w => {
    return {
      address : w.wallet_id,
      amount: w.amount_contributed_usd,
      tags: Object.values(w.contributor_wallets.tags)[0],
      score: w.contributor_wallets.risk_score
    }
  });

  return {
    projectData,
    walletData,
  };
}
