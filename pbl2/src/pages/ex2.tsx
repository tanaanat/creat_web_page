import { Button, Input, VStack, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";

type Item = {
    id: number;
    name: string;
    age: number;
  };

export default function Bottonpage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [items, setItems] = useState<Item[]>([]); // Item型の配列として型定義
  const [response, setResponse] = useState(null); // サーバーのレスポンスを保存

  // データを取得する関数 (GET)
  async function getItems() {
    try {
      const url = "http://localhost:8000/database"; // APIエンドポイント
      const res = await axios.get(url);
      setItems(res.data); // 取得したデータを保存
    } catch (err) {
      console.error(err);
    }
  }

  // データを送信する関数 (POST)
  async function postItem() {
    try {
      const url = "http://localhost:8000/post/{id}/{name}/{age}"; // APIエンドポイント
      const res = await axios.post(url, { id,name, age });
      setResponse(res.data); // サーバーのレスポンスを保存
      setItems((prevItems) => [...prevItems, res.data]); // 送信したデータをテーブルに追加
      setId(""); // フォームをリセット
      setName(""); // フォームをリセット
      setAge(""); // フォームをリセット
    } catch (err) {
      console.error(err);
    }
  }

  // ページが読み込まれた時にデータを取得する (useEffectで初期化)
  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <VStack spacing={4}>
        {/* 入力フォーム */}
        <Input
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="年齢"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        
        {/* POSTリクエストを送信するボタン */}
        <Button colorScheme="blue" onClick={postItem}>
          送信
        </Button>

        {/* テーブル表示 */}
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>名前</Th>
                <Th>年齢</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((res) => (
                <Tr key={res.id}>
                  <Td>{res.id}</Td>
                  <Td>{res.name}</Td>
                  <Td>{res.age}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* サーバーのレスポンスを表示（オプション） */}
        {response && <Text>サーバーからの応答: {JSON.stringify(response)}</Text>}
      </VStack>
    </>
  );
}