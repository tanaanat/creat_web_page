import { Button, ButtonGroup } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { Text } from '@chakra-ui/react'
import {
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

export default function Database(){
  const [data, setData] = useState<{ id: number, name: string, age: number }[]>([]);
  const [loading, setLoading] = useState(false); // ローディング状態を追加
    async function getName() {
        try {
          const url = "http://127.0.0.1:8000/database";
          const res = await axios.get(url);
          setData(res.data)
          console.log(res.data) // response data
          console.log(res.status) // status code
        } catch (err) {
            console.error(err);
        
        }finally {
            setLoading(false); // ローディング終了
          }
      }

      useEffect(() => {
        getName();
      }, []);

    return (
    <>
        <Button onClick={getName} colorScheme='blue'>get Name</Button>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>name</Th>
                <Th>age</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((res) => (
                <Tr key={res.id}>
                  <Td>{res.id}</Td>
                  <Td>{res.name}</Td>
                  <Td>{res.age}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        </>
    )
}
