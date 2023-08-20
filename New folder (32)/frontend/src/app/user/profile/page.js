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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

import { Context } from "../../../../context";

import Link from "next/link";

const UserProfile = () => {
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {}, [user]);

  const [values, setValues] = useState(user);

  console.log(values);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/user-update/${user["_id"]}`,
        {
          ...values,
        }
      );
      toast("User updated!");
    } catch (err) {
      toast(err.response.data);
    }
  };

  console.log("??????games", values && values.gameRequests);

  return (
    <>
      <Stack align={"center"}>
        <Text marginTop={"100px"}>
          وضعیت اکانت :
          {values && values.accepted ? "پذیرش شده" : "هنوز پذیرش نشده"}
        </Text>
        <Box
          w={"400px"}
          h={"500px"}
          backgroundColor={"#48BB78"}
          padding={"60px"}
          borderRadius={"30px"}
          textAlign={"center"}
          marginTop={"100px"}
        >
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel></FormLabel>
              <Input
                value={values && values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel></FormLabel>
              <Input
                value={values && values.email ? values.email : "..."}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel></FormLabel>
              <Input
                value={
                  values && values.identity_card_number
                    ? values.identity_card_number
                    : "..."
                }
                onChange={(e) =>
                  setValues({ ...values, identity_card_number: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel></FormLabel>
              <Input
                value={
                  values && values.phoneNumber ? values.phoneNumber : "..."
                }
                onChange={(e) =>
                  setValues({ ...values, phoneNumber: e.target.value })
                }
              />
            </FormControl>

            <Button type={"submit"} marginTop={"80px"}>
              اپدیت
            </Button>
          </form>
        </Box>

        <Flex marginTop={"150px"} direction={"column"}>
          <Text>
            لیست بازی هایی که شما برای شرکت در انها درخواست ارسال کرده اید{" "}
          </Text>
          <Text>
            {values &&
              values.gameRequests &&
              values.gameRequests.map((game, index) => <Text>{game}</Text>)}
          </Text>
        </Flex>

        <Flex marginTop={"150px"} marginBottom={"150px"} direction={"column"}>
          <Text>لیست بازی هایی که ثبت نام شما در انها تایید شده </Text>
          <Text>
            {values &&
              values.games &&
              values.games.map((game, index) => <Text>{game}</Text>)}
          </Text>
        </Flex>
      </Stack>
    </>
  );
};

export default UserProfile;
