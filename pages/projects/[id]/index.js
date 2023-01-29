import { Box, Select } from "@chakra-ui/react";

import React, { useState } from "react";

import WalletTable from "../../../components/tables/wallet-table";
import ProjectProfile from "../../../components/profile/profile";
import { getProjectData } from "../../../lib/project-utils";

export default function ProjectIndex(props) {
  const { data } = props;
  const { projectData, walletData } = data;

  return (
    <Box margin="auto" width="80%">
      <ProjectProfile projectData={projectData} />
      <WalletTable tableData={walletData} />
    </Box>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;

  const data = await getProjectData(id);

  return {
    props: {
      data: data,
    },
  };
}

export function getStaticPaths() {
  const paths = [];
  return { paths, fallback: "blocking" };
}