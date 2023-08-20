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
  Box,
  Stack,
  FormLabel,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

import React, { useState, useContext, useEffect } from "react";

import { Context } from "../../../context";
import Link from "next/link";
import axios from "axios";

import { useRouter } from "next/navigation";

const Login = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.API}/api/login`, {
        email,
        password,
      });

      window.localStorage.setItem("user", JSON.stringify(data));

      toast("login successfuly ... ");

      console.log(data["role"] == "boss");
      console.log(data);

      if (data && data["role"] == "boss") {
        router.push("/boss");
      } else if (data && data["role"] == "manager") {
        router.push("/manager");
      } else {
        router.push("/");
      }
    } catch (err) {
      toast(err.response.data);
      console.log(err.response.data);
    }
  };

  return (
    <>
      <Stack align={"center"}>
        <Box
          w={"500px"}
          h={"600px"}
          backgroundColor={"#48BB78"}
          borderRadius={"30px"}
          textAlign={"center"}
          marginTop={"100px"}
        >
          <Text color={"#fff"} fontSize={"40px"} marginBlock={"30px"}>
            فرم ورود
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl color={"#fff"} marginTop={"100px"}>
              <Input
                placeholder="ایمیل"
                backgroundColor={"#276749"}
                w={"300px"}
                type="email"
                borderRadius={"40px"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl color={"#fff"}>
              <Input
                placeholder="پسورد"
                type="password"
                backgroundColor={"#276749"}
                w={"300px"}
                borderRadius={"40px"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              backgroundColor={"#276749"}
              w={"300px"}
              borderRadius={"40px"}
              color={"#fff"}
              marginTop={"150px"}
            >
              ورود
            </Button>
          </form>
        </Box>
      </Stack>
    </>
  );
};

export default Login;
