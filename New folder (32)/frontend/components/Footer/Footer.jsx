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
} from "@chakra-ui/react";

function Footer() {
  return (
    <>
      <Box padding={"5px"} backgroundColor={"#9AE6B4"}>
        <Flex justifyContent={"space-around"} marginTop={"10px"}>
          <Text>ارتباط با ما :</Text>

          <Text>gmail : ab.aaaaaaa90@gmail.com</Text>
          <Text>whatsapp : +989929951629</Text>
          <Text>telegram : @abaaaaaaaaaa</Text>
        </Flex>
      </Box>
    </>
  );
}

export default Footer;
