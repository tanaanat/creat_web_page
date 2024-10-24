import { Button, Input, VStack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function Bottonpage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [response, setResponse] = useState(null); // サーバーのレスポンスを保存

  async function postItem() {
    try {
      const url = "http://localhost:8000/post/{id}/{name}/{age}"; // 適切なAPIエンドポイントに変更
      const res = await axios.post(url, { id, name, age });
      setResponse(res.data); // サーバーのレスポンスデータを保存
      console.log(res.data); // レスポンスデータ
    } catch (err) {
      console.error(err);
    }
  }

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

        {/* サーバーのレスポンスを表示 */}
        {response && <Text>サーバーからの応答: {JSON.stringify(response)}</Text>}
      </VStack>
    </>
  );
}