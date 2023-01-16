import { Grid, VStack } from '@chakra-ui/react';
import React from 'react';

function Demo() {
  return (
    <Grid templateColumns="1fr" alignItems="center" justifyContent="center">
      <VStack align="center" justify="center">
        <iframe
          title="demo"
          src="https://demo.arcade.software/1KfsiicMWjdsE4m2SbNe?embed"
          width="720px"
          height="480px"
        />
      </VStack>
    </Grid>
  );
}

export default Demo;
