import { Fragment } from "react";
import { Flex } from "@chakra-ui/react";
import SimpleSidebar from "./side-navigation";
import { useRouter } from 'next/router';



function Layout(props) {

  return (
    <main>
      <SimpleSidebar>{props.children}</SimpleSidebar>
    </main>
  );
}

export default Layout;
