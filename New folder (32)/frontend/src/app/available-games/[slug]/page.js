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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { Context } from "../../../../context";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

function GameDetails() {
  const [game, setGame] = useState();
  const [request, setRequest] = useState();

  const [gamerequests, setgameRequests] = useState();
  const [usersInGame, setusersInGame] = useState();
  const { slug } = useParams();

  console.log("********************", slug);

  useEffect(() => {
    getGame();
    gameRequests();
  }, [slug]);

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  console.log("{{{{{{{{{{", user);
  function getGame() {
    fetch(`${process.env.API}/api/game/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
      });
  }

  console.log(user && user.role && user.role.includes("manager"));
  const hendleRequestToParticipateInGame = async () => {
    try {
      if (!user) {
        toast("please login ....");
      } else {
        try {
          // console.log(request);

          console.log("??????????????$$$$", user["_id"]);
          const { data } = await axios.put(
            `${process.env.API}/api/gameRequest`,
            {
              userId: user["name"],
              gameId: game["name"],
            }
          );
          console.log(data);
          toast("request send successfuly .... ");
        } catch (error) {
          console.log(error);
          toast("try egain ......");
        }
      }
    } catch (error) {
      console.log(error);
      toast("Please login ....");
    }
  };

  const gameRequests = async () => {
    try {
      // console.log(request);

      const { data } = await axios.get(
        `${process.env.API}/api/game-requests/${slug}`,
        {
          gameSlug: slug,
        }
      );
      console.log("#######$$$$$$^^^^^^^^^^", data && data["users_list"]);
      setgameRequests(data["users_list"]);
      setusersInGame(data["users_in_game"]);
      toast("request send successfuly .... ");
    } catch (error) {
      console.log(error);
      toast("try egain ......");
    }
  };

  const userUpdate = async (userId) => {
    try {
      console.log(userId);
      const { data } = await axios.put(
        `${process.env.API}/api/game-upadate/${slug}`,
        {
          userId,
          gameSlug: slug,
        }
      );
      toast("game updated!");
    } catch (err) {
      toast(err.response.data);
    }
  };

  const handleGameUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/game-updated/${game["_id"]}`,
        {
          ...game,
        }
      );
      toast("game updated!");
    } catch (err) {
      toast(err.response.data);
    }
  };

  return (
    <>
      <Stack align={"center"} marginTop={"100px"}>
        {user && user.role && user["role"] == "manager" ? (
          <Button
            padding={"10px"}
            borderRadius={"20px"}
            backgroundColor={"#48BB78"}
          >
            شما میتوانید کاربران در این بازی را مدیریت کنید{" "}
          </Button>
        ) : (
          <Button
            padding={"10px"}
            borderRadius={"20px"}
            backgroundColor={"#48BB78"}
            onClick={() => hendleRequestToParticipateInGame()}
          >
            {user &&
            user["role"] == "user" &&
            game &&
            game["requests"] &&
            game["requests"].includes(user._id) &&
            game["requests"].includes(user._id)
              ? "شما قبلا درخواست شرکت در این بازی را ارسال کرده اید"
              : "برای ثبت درخواست شرکت در بازی کلیک کنید"}
          </Button>
        )}
        <Box
          backgroundColor={"#276749"}
          padding={"100px"}
          w={"700px"}
          textAlign={"center"}
          color={"#fff"}
          borderRadius={"20px"}
        >
          <Text marginTop={"50px"} fontSize={"20px"}>
            نام بازی:‌‌‌‌ {game && game.name}
          </Text>
          <Box w={"500px"} marginTop={"50px"}>
            <Text> توضیحات: {game && game.description}</Text>
          </Box>
          <Text marginTop={"50px"}>
            تعداد کاربران مورد نیاز: {game && game.numberOfUser}
          </Text>
        </Box>

        {user && user["role"] == "manager" && (
          <>
            {" "}
            <Button
              padding={"10px"}
              borderRadius={"20px"}
              backgroundColor={"#48BB78"}
            >
              بازیکنانی که برای شرکت در بازی درخواست ارسال کرده اند
            </Button>
            <Stack align="center">
              <Box marginTop="100px">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th fontSize={"20px"}>نام</Th>
                      <Th fontSize={"20px"}>ایمیل</Th>
                      <Th fontSize={"20px"}>شماره تلفن</Th>
                      <Th fontSize={"20px"}>وضعیت</Th>
                      <Th paddingLeft={"200px"} fontSize={"20px"}>
                        اضافه کردن به بازی
                      </Th>
                    </Tr>
                  </Thead>

                  {gamerequests &&
                    gamerequests.map((r, index) => (
                      <Tbody>
                        <Tr key={index}>
                          <Td>{r["name"]}</Td>
                          <Td>{r["email"]}</Td>
                          <Td>{r["phoneNumber"]}</Td>
                          <Td>
                            {r["accepted"] == true
                              ? "confirmed"
                              : "unconfirmed"}
                          </Td>
                          <Td paddingLeft={"250px"}>
                            <Button onClick={() => userUpdate(r["name"])}>
                              اضافه کردن
                            </Button>
                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
                </Table>
              </Box>
            </Stack>
          </>
        )}

        <Button
          padding={"10px"}
          borderRadius={"20px"}
          backgroundColor={"#48BB78"}
        >
          بازیکنانی که ثبت نام انها در این بازی تایید شده است{" "}
        </Button>
        <Stack align="center" marginBottom={"100PX"}>
          <Box marginTop="100px">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize={"20px"}>نام</Th>
                  <Th fontSize={"20px"}>ایمیل</Th>
                  <Th fontSize={"20px"}>شماره تلفن</Th>
                  <Th fontSize={"20px"}>وضعیت</Th>
                </Tr>
              </Thead>
              {console.log("????????", usersInGame)}

              {usersInGame &&
                usersInGame.map((r, index) => (
                  <Tbody>
                    <Tr key={index}>
                      <Td>{r["name"]}</Td>
                      <Td>{r["email"]}</Td>
                      <Td>{r["phoneNumber"]}</Td>
                      <Td>
                        {r["accepted"] == true ? "تایید شده" : "تایید نشده"}
                      </Td>
                    </Tr>
                  </Tbody>
                ))}
            </Table>
          </Box>
        </Stack>

        {user && user["role"] == "manager" && (
          <>
            <Box
              marginTop={"100px"}
              backgroundColor={"#276749"}
              padding={"100px"}
              w={"700px"}
              textAlign={"center"}
              color={"#fff"}
              borderRadius={"20px"}
              marginBottom={"100px"}
            >
              <form onSubmit={handleGameUpdate}>
                <FormControl>
                  <FormLabel color={"#fff"}>نام</FormLabel>
                  <Input
                    value={game && game.name}
                    onChange={(e) => setGame({ ...game, name: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>توضیحات</FormLabel>
                  <Input
                    value={game && game.description ? game.description : "..."}
                    onChange={(e) =>
                      setGame({ ...game, description: e.target.value })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>تعداد افراد مورد نیاز</FormLabel>
                  <Input
                    value={
                      game && game.numberOfUser ? game.numberOfUser : "..."
                    }
                    onChange={(e) =>
                      setGame({ ...game, numberOfUser: e.target.value })
                    }
                  />
                </FormControl>

                <Button type={"submit"} marginTop={"60px"}>
                  اپدیت
                </Button>
              </form>
            </Box>
          </>
        )}
      </Stack>
    </>
  );
}

export default GameDetails;
