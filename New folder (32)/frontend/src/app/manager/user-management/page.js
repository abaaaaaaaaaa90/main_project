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
} from "@chakra-ui/react";

import { usePathname } from "next/navigation";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axios from "axios";
import { Context } from "../../../../context";

const UserManagement = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPagaCount] = useState();

  useEffect(() => {
    getUsers(currentPage);
  }, []);

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  function getUsers(currp) {
    fetch(`${process.env.API}/api/users?currentPage=${currp}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data["currentPageData"]);
        setPagaCount(data["pageCount"]);
        console.log("data ........", data);
      });
  }

  const userUpdate = async (userId) => {
    try {
      console.log(userId);
      const { data } = await axios.put(
        `${process.env.API}/api/user-upadate/${userId}`,
        {
          accepted: "true",
        }
      );
      toast("User updated!");
    } catch (err) {
      toast(err.response.data);
    }
  };

  return (
    <>
      <Stack align="center">
        <Box marginTop="100px">
          <Table variant="simple">
            <TableCaption>کاربران</TableCaption>
            <Thead>
              <Tr>
                <Th>نام</Th>
                <Th>ایمیل</Th>
                <Th>شماره تلفن</Th>
                <Th>وضعیت</Th>
                <Th paddingLeft={"200px"}>تایید ثبت نام کاربر</Th>
              </Tr>
            </Thead>

            {users &&
              user["role"] == "manager" &&
              users.map((user, index) => (
                <Tbody>
                  <Tr key={index}>
                    <Td>{user["name"]}</Td>
                    <Td>{user["email"]}</Td>
                    <Td>{user["phoneNumber"]}</Td>
                    <Td>
                      {user["accepted"] == true ? "confirmed" : "unconfirmed"}
                    </Td>
                    <Td paddingLeft={"250px"}>
                      <Button onClick={() => userUpdate(user["_id"])}>
                        تایید
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              ))}
          </Table>
        </Box>
      </Stack>
    </>
  );
};

export default UserManagement;
