import { Button, ButtonGroup } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import React from 'react';

const ButtonExample = () => {
  const [settionClicked, setSettionClicked] = useState(false);
  const [githubClicked, setGithubClicked] = useState(false);

  useEffect(() => {
    if (settionClicked) {
      console.log("Settion button clicked");
    }
    if (githubClicked) {
      console.log("Github button clicked");
    }
  }, [settionClicked, githubClicked]);

  return (
    <ButtonGroup spacing="6">
      <Button 
        colorScheme="green" 
        onClick={() => setSettionClicked(true)}
      >
        Settion
      </Button>
      <Button 
        colorScheme="gray" 
        onClick={() => setGithubClicked(true)}
      >
        Github
      </Button>
    </ButtonGroup>
  );
};

export default ButtonExample;