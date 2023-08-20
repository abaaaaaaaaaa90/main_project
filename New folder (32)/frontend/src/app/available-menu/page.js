"use client";
import {
  Flex,
  Button,
  Icon,
  Menu,
  Text,
  MenuList,
  MenuButton,
  MenuItem,
  Stack,
  Box,
} from "@chakra-ui/react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { menu } from "./menu";

console.log(menu["menu"]);

const AvailableMenu = () => {
  const [menuList, setMenuList] = useState(menu["menu"]);
  return (
    <>
      <Stack align="center">
        <Text fontSize={"30px"} marginTop={"70px"}>
          منو
        </Text>

        <Box>
          {menuList &&
            menuList.map((menuDta, index) => (
              <Box
                w={"350px"}
                h={"70px"}
                textAlign={"center"}
                backgroundColor={"#9AE6B4"}
                borderRadius={"20px"}
                marginBlock={"20px"}
              >
                <Flex
                  align={"center"}
                  justifyContent={"space-around"}
                  paddingBlock={"20px"}
                  fontSize={"20px"}
                >
                  <Text>{menuDta["name"]}</Text>
                  <Text color={"#3182ce"}>{menuDta["price"]}</Text>
                </Flex>
              </Box>
            ))}
        </Box>
      </Stack>
    </>
  );
};

export default AvailableMenu;
