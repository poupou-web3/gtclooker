import {
  getProjects,
  getWalletsCount,
  getProjectItem,
  getRoundAttributes,
  getWalletAttributes,
} from "../pages/api/queries";

import { nFormatter } from "./transform";

export async function getProjectOverviewData() {
  //get data from api
  const projects = await getProjects();

  const uniqueContributors = await getWalletsCount();

  const totalContributions = projects
    .map((p) =>
      Number(p.total_amount_contributed_usd.replace(/[^0-9.-]+/g, ""))
    )
    .reduce((prev, next) => prev + next);

  const totalProjects = projects.length;

  const roundAttributes = await getRoundAttributes();
  const walletAttributes = await getWalletAttributes();

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
    totalContributors: {
      name: "Total Contributors",
      count: nFormatter(uniqueContributors, 1),
    },
  };

  const projectStatsData = [
    {
      name: "Money Mixer",
      value: roundAttributes[0]["money_mixer_count"],
      max: totalProjects,
      type: "negative",
    },
    {
      name: "On Chain History",
      value: roundAttributes[0]["on_chain_hist_count"],
      max: totalProjects,
      type: "positive",
    },
    {
      name: "Vote Twitter Imbalance",
      value: roundAttributes[0]["vote_imbalance_count"],
      max: totalProjects,
      type: "negative",
    },
  ];

  const walletStatsData = [
    {
      name: "Farmer",
      value: walletAttributes[0]["farmer_count"] - 1, //TODO: a fix required in sql function
      max: uniqueContributors,
      type: "negative",
    },
    {
      name: "Money Mixer",
      value: walletAttributes[0]["money_mixer_count"] - 1,
      max: uniqueContributors,
      type: "negative",
    },
    {
      name: "On Chain History",
      value: walletAttributes[0]["on_chain_hist_count"] - 1,
      max: uniqueContributors,
      type: "positive",
    },
    {
      name: "First Tx During Round",
      value: walletAttributes[0]["first_tx_during_round_count"] - 1,
      max: uniqueContributors,
      type: "negative",
    },
  ];

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
    projectStats: projectStatsData,
    walletStats: walletStatsData,
    projects: projectData,
  };

  return data;
}

export async function getProjectData(projectID) {
  //get data from api
  const { projectData: pData, contributionsData: wData } = await getProjectItem(
    projectID
  );

  const walletAttributes = await getWalletAttributes(projectID);

  const walletStatsData = [
    {
      name: "Farmer",
      value: walletAttributes[0]["farmer_count"] - 1, //TODO: a fix required in sql function
      max: pData[0].num_contributors,
      type: "negative",
    },
    {
      name: "Money Mixer",
      value: walletAttributes[0]["money_mixer_count"] - 1,
      max: pData[0].num_contributors,
      type: "negative",
    },
    {
      name: "On Chain History",
      value: walletAttributes[0]["on_chain_hist_count"] - 1,
      max: pData[0].num_contributors,
      type: "positive",
    },
    {
      name: "First Tx During Round",
      value: walletAttributes[0]["first_tx_during_round_count"] - 1,
      max: pData[0].num_contributors,
      type: "negative",
    },
  ];

  //setup counter data
  const projectData = {
    title: pData[0].title,
    wallet: pData[0].wallet_address,
    contributors: pData[0].num_contributors,
    amount: pData[0].total_amount_contributed_usd,
    tags: Object.values(pData[0].tags)[0],
  };

  const walletData = wData.map((w) => {
    return {
      address: w.wallet_id,
      amount: w.amount_contributed_usd,
      tags: Object.values(w.contributor_wallets.tags)[0],
      score: w.contributor_wallets.risk_score,
    };
  });

  return {
    projectData,
    walletData,
    walletStatsData,
  };
}
