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
  Input,
} from "@chakra-ui/react";

import { usePathname } from "next/navigation";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axios from "axios";

function GamesManagement() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfUser, setNumberOfUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.API}/api/create-game`, {
        name,
        description,
        numberOfUser,
      });

      toast("game create successfuly ... ");
    } catch (err) {
      toast(err.response.data);
      console.log(err.response.data);
    }
  };

  return (
    <>
      <Stack align={"center"}>
        <Box
          w={"700px"}
          h={"500px"}
          backgroundColor={"#48BB78"}
          borderRadius={"30px"}
          textAlign={"center"}
          marginTop={"100px"}
        >
          <Text color={"#fff"} fontSize={"40px"}>
            اضافه کردن بازی جدید به مجموعه
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl color={"#fff"} marginTop={"20px"}>
              <Input
                placeholder="name"
                backgroundColor={"#276749"}
                w={"400px"}
                borderRadius={"40px"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl color={"#fff"} marginBlock={"10px"}>
              <Input
                placeholder="description"
                backgroundColor={"#276749"}
                w={"400px"}
                h={"200px"}
                borderRadius={"40px"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl color={"#fff"}>
              <Input
                placeholder="numberOfUser"
                backgroundColor={"#276749"}
                w={"400px"}
                type="number"
                borderRadius={"40px"}
                value={numberOfUser}
                onChange={(e) => setNumberOfUser(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              backgroundColor={"#276749"}
              w={"300px"}
              borderRadius={"40px"}
              color={"#fff"}
              marginTop={"20px"}
            >
              تایید
            </Button>
          </form>
        </Box>
      </Stack>
    </>
  );
}

export default GamesManagement;
