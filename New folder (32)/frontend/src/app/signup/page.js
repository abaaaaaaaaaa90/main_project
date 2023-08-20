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
import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

import Link from "next/link";

function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [father_name, setFather_name] = useState("");
  const [identity_card_number, setIdentity_card_number] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.API}/api/register`, {
        name,
        lastName,
        father_name,
        identity_card_number,
        email,
        password,
        phoneNumber,
        gender,
        description,
        birthday,
      });
      toast("Registration successful. Please login.");
      setEmail("");
      setPassword("");
      setName("");
      setLastName("");
      setFather_name("");
      setIdentity_card_number("");
      setPhoneNumber("");
      setGender("");
      setDescription("");
      setBirthday("");
    } catch (err) {
      toast(err.response.data);
      console.log(err);
    }
  };

  return (
    <>
      <Stack align={"center"}>
        <Box
          w={"1200px"}
          h={"670px"}
          backgroundColor={"#48BB78"}
          borderRadius={"30px"}
          textAlign={"center"}
          marginTop={"70px"}
        >
          <Text color={"#fff"} fontSize={"40px"} marginTop={"30px"}>
            SIGN UP
          </Text>
          <form onSubmit={handleSubmit}>
            <Flex flexDirection={"row"} justify={"center"}>
              <Flex flexDirection={"column"} marginInline={"40px"}>
                <FormControl color={"#fff"} marginBlock={"20px"}>
                  <FormLabel></FormLabel>
                  <Input
                    placeholder="Email"
                    backgroundColor={"#276749"}
                    w={"300px"}
                    type="email"
                    borderRadius={"40px"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl color={"#fff"} marginBlock={"20px"}>
                  <FormLabel></FormLabel>
                  <Input
                    placeholder="name"
                    backgroundColor={"#276749"}
                    w={"300px"}
                    borderRadius={"40px"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>

                <FormControl color={"#fff"} marginBlock={"20px"}>
                  <FormLabel></FormLabel>
                  <Input
                    placeholder="father name"
                    backgroundColor={"#276749"}
                    w={"300px"}
                    borderRadius={"40px"}
                    value={father_name}
                    onChange={(e) => setFather_name(e.target.value)}
                  />
                </FormControl>

                <FormControl color={"#fff"} marginBlock={"20px"}>
                  <FormLabel></FormLabel>
                  <Input
                    placeholder="gender"
                    backgroundColor={"#276749"}
                    w={"300px"}
                    borderRadius={"40px"}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </FormControl>

                <FormControl color={"#fff"} marginBlock={"20px"}>
                  <FormLabel></FormLabel>
                  <Input
                    placeholder="birthday"
                    backgroundColor={"#276749"}
                    w={"300px"}
                    borderRadius={"40px"}
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </FormControl>
              </Flex>

              <Flex flexDirection={"column"} marginInline={"40px"}>
                <FormControl color={"#fff"} marginBlock={"20px"}>
                  <FormLabel></FormLabel>
                  <Input
                    placeholder="password"
                    backgroundColor={"#276749"}
                    w={"300px"}
                    type="password"
                    borderRadius={"40px"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>

                <FormControl color={"#fff"} marginBlock={"20px"}>
                  <FormLabel></FormLabel>
                  <Input
                    placeholder="last name"
                    backgroundColor={"#276749"}
                    w={"300px"}
                    borderRadius={"40px"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>

                <FormControl color={"#fff"} marginBlock={"20px"}>
                  <FormLabel></FormLabel>
                  <Input
                    placeholder="identity card number"
                    backgroundColor={"#276749"}
                    w={"300px"}
                    borderRadius={"40px"}
                    value={identity_card_number}
                    onChange={(e) => setIdentity_card_number(e.target.value)}
                  />
                </FormControl>

                <FormControl color={"#fff"} marginBlock={"20px"}>
                  <FormLabel></FormLabel>
                  <Input
                    placeholder="phoneNumber"
                    backgroundColor={"#276749"}
                    w={"300px"}
                    borderRadius={"40px"}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormControl>

                <FormControl color={"#fff"} marginBlock={"20px"}>
                  <FormLabel></FormLabel>
                  <Input
                    placeholder="description"
                    backgroundColor={"#276749"}
                    w={"300px"}
                    borderRadius={"40px"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </Flex>
            </Flex>

            <Button
              type="submit"
              backgroundColor={"#276749"}
              w={"300px"}
              borderRadius={"40px"}
              color={"#fff"}
              marginTop={"50px"}
            >
              ثبت نام
            </Button>
          </form>
        </Box>
      </Stack>
    </>
  );
}

export default SignUp;
