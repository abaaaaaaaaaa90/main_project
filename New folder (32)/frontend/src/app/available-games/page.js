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

const AvailableGames = () => {
  const [games, setGames] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPagaCount] = useState();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getGames(currentPage);
  }, []);

  function getGames(currp) {
    fetch(`${process.env.API}/api/games?currentPage=${currp}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data["currentPageData"]);
        setPagaCount(data["pageCount"]);
        console.log("data ........", data);
      });
  }

  return (
    <>
      <Stack align="center">
        <Flex
          marginTop={"80px"}
          w={"1300px"}
          justifyContent={"space-around"}
          flexWrap={"wrap"}
        >
          {games &&
            games.map((game, index) => (
              <Link href={`/available-games/${game["slug"]}`}>
                <Box
                  key={index}
                  backgroundColor={"#9B2C2C"}
                  w={"300px"}
                  paddingBlock={"50px"}
                  borderRadius={"10px"}
                  marginBlock={"12px"}
                >
                  <Text
                    fontSize={"20px"}
                    color={"#FFF5F5"}
                    textAlign={"center"}
                  >
                    {game["name"]}
                  </Text>

                  <Text
                    fontSize={"15px"}
                    color={"#FFF5F5"}
                    textAlign={"center"}
                    marginTop={"15px"}
                  >
                    {game["description"]}
                  </Text>
                </Box>
              </Link>
            ))}
        </Flex>
      </Stack>
    </>
  );
};

export default AvailableGames;
