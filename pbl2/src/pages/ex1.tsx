import { Button, Input, VStack, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import supabase from "@/libs/supabase";

type Item = {
    id: number;
    name: string;
    age: string;
  };

const inter = Inter({ subsets: ["latin"] });　//ログアウトボタンのため

export default function Bottonpage() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [items, setItems] = useState<Item[]>([]); // Item型の配列として型定義
  const [response, setResponse] = useState(null); // サーバーのレスポンスを保存
  const [error, setError] = useState<string | null>(null);

  //こっからログアウト用
  const GitHubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }

  const SignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.reload();  // サインアウト後にページをリロード
    } catch (error) {
      console.error("サインアウト中にエラーが発生しました", error);
    }
  }

  async function getSession() {
    const {data, error} = await supabase.auth.getSession();
    try {
      console.log(data)
    } catch (error) {
        console.error(error);
    }
  }

  //ここまでログアウト用

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
      const url = "http://localhost:8000/post"; // APIエンドポイント
      const res = await axios.post(url, { id, name, age });
      setResponse(res.data); // サーバーのレスポンスを保存
      setItems((prevItems) => [...prevItems, res.data]); // 送信したデータをテーブルに追加
      setId(""); // フォームをリセット
      setName(""); // フォームをリセット
      setAge(""); // フォームをリセット
      await getItems();//最新のデータを取得してテーブルを更新
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteItem(id: number) {
    try {
        const url = `http://localhost:8000/delete/${id}`;
        await axios.delete(url); // DELETEリクエストでアイテムを削除
        setError(null); // エラーをクリア

        // 削除後にアイテムを再取得
        getItems();
    } catch (err) {
        setError("アイテムの削除中にエラーが発生しました");
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
                  <Td>
                     <Button colorScheme="red" onClick={() => deleteItem(res.id)}>削除</Button> {/* 削除ボタン */}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* サーバーのレスポンスを表示（オプション） */}
        {response && <Text>サーバーからの応答: {JSON.stringify(response)}</Text>}
      </VStack>

      <Button onClick={getSession}>Session</Button>
      <Button onClick={GitHubSignIn}>Github</Button>
       <Button onClick={SignOut}>SignOut</Button>
    </>   
  );
}