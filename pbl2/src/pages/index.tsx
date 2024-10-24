import { Inter } from "next/font/google";
import { Button } from "@chakra-ui/react";
import supabase from "@/libs/supabase";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const GitHubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
  }

  const SignOut = async () => {
    await supabase.auth.signOut({
    })
  }

  async function getSession() {
    const {data, error} = await supabase.auth.getSession();
    try {
      console.log(data)
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <>
      <Button onClick={getSession}>Session</Button>
      <Button onClick={GitHubSignIn}>Github</Button>
      <Button onClick={SignOut}>SignOut</Button>
    </>
  );
}