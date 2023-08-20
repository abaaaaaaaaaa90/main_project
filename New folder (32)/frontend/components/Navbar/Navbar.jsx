import {
  Flex,
  Button,
  Icon,
  Menu,
  Text,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

import { Context } from "../../context";
import Link from "next/link";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
const Navbar = () => {
  const pathName = usePathname();

  const router = useRouter();

  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const logout = async () => {
    let answer = window.confirm("Are you sure you want to exit?");
    if (!answer) return;
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get(`${process.env.API}/api/logout`);
    toast(data.message);
    router.push("/");
  };

  return (
    <Flex
      justifyContent={"space-around"}
      alignItems={"center"}
      backgroundColor={"#48BB78"}
      height={"66px"}
      color={"white"}
      gap={"2rem"}
    >
      <Flex>
        {!user && (
          <>
            <Link href={"/login"}>
              <Button
                fontSize={""}
                backgroundColor={"#276749"}
                color={"#fff"}
                borderRadius={"20px"}
                w={"100px"}
              >
                ورود
              </Button>
            </Link>

            <Link href={"/signup"}>
              <Button
                fontSize={""}
                backgroundColor={"#276749"}
                color={"#fff"}
                borderRadius={"20px"}
                w={"100px"}
              >
                ثبت نام
              </Button>
            </Link>
          </>
        )}

        {user && (
          <Button
            fontSize={""}
            backgroundColor={"#276749"}
            color={"#fff"}
            borderRadius={"20px"}
            w={"100px"}
            onClick={logout}
          >
            خروج
          </Button>
        )}
      </Flex>

      <Link href={"/available-games"}>
        <Button
          fontSize={""}
          backgroundColor={"#276749"}
          color={"#fff"}
          borderRadius={"20px"}
          w={"160px"}
        >
          بازی ها
        </Button>
      </Link>

      <Link href={"/available-menu"}>
        <Button
          fontSize={""}
          backgroundColor={"#276749"}
          color={"#fff"}
          borderRadius={"20px"}
          w={"160px"}
        >
          منو
        </Button>
      </Link>

      {user &&
        user["role"] == "manager" &&
        pathName.includes("/manager") == false && (
          <Link href={"/manager"}>
            <Button
              fontSize={""}
              backgroundColor={"#276749"}
              color={"#fff"}
              borderRadius={"20px"}
              w={"160px"}
            >
              مدیریت{" "}
            </Button>
          </Link>
        )}

      {pathName.includes("/manager") && user && user["role"] == "manager" && (
        <>
          <Link href={"/manager/user-management"}>
            <Button
              fontSize={""}
              backgroundColor={"#276749"}
              color={"#fff"}
              borderRadius={"20px"}
              w={"160px"}
            >
              مدیریت کاربران
            </Button>
          </Link>

          <Link href={"/manager/games-management"}>
            <Button
              fontSize={""}
              backgroundColor={"#276749"}
              color={"#fff"}
              borderRadius={"20px"}
              w={"170px"}
            >
              مدیریت بازی ها
            </Button>
          </Link>

          <Link href={"/manager/night-management"}>
            <Button
              fontSize={""}
              backgroundColor={"#276749"}
              color={"#fff"}
              borderRadius={"20px"}
              w={"160px"}
            >
              مدیریت شب ها
            </Button>
          </Link>
        </>
      )}

      {user && user["role"] == "boss" && (
        <Link href={"/boss/managers-management"}>
          <Button
            fontSize={""}
            backgroundColor={"#276749"}
            color={"#fff"}
            borderRadius={"20px"}
            w={"200px"}
          >
            Manager management
          </Button>
        </Link>
      )}

      {user && user["role"] == "user" && (
        <Link href={"/user/profile"}>
          <Button
            fontSize={""}
            backgroundColor={"#276749"}
            color={"#fff"}
            borderRadius={"20px"}
            w={"200px"}
          >
            profile
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default Navbar;
