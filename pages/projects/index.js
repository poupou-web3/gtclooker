import {
  Box,
  Icon,
  Flex,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { MdAttachMoney, MdBuild } from "react-icons/md";

import ProjectTable from "../../components/tables/project-table";
import Counter from "../../components/cards/counter";
import { getProjectOverviewData } from "../../lib/project-utils";

export default function ProjectsPage(props) {
  const { data } = props;
  const { counters, projects } = data;

  const brandColor = useColorModeValue("blue", "white");
  const boxBg = useColorModeValue("gray.100", "whiteAlpha.100");

  return (
    <Box margin="auto" width="80%">
      <Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px" mb="20px">
          <Counter
            key={counters.totalProjects.name}
            startContent={
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"50%"}
                w="56px"
                h="56px"
                bg={boxBg}
              >
                <Icon w="32px" h="32px" as={MdBuild} color={brandColor} />
              </Flex>
            }
            name={counters.totalProjects.name}
            value={counters.totalProjects.count}
          />

          <Counter
            key={counters.totalContributed.name}
            startContent={
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"50%"}
                w="56px"
                h="56px"
                bg={boxBg}
              >
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              </Flex>
            }
            name={counters.totalContributed.name}
            value={counters.totalContributed.count}
          />
        </SimpleGrid>
      </Box>
      <ProjectTable tableData={projects} />
    </Box>
  );
}

export async function getStaticProps() {
  const data = await getProjectOverviewData();

  return {
    props: {
      data: data,
    },
  };
}
