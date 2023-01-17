import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box } from '@chakra-ui/react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['stripe-pricing-table']: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing</title>
        <meta name="description" content="Pricing" />
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      </Helmet>
      <Box width={{ base: '100%' }} height={{ base: '100%' }}>
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
        <stripe-pricing-table
          pricing-table-id="prctbl_1MPnqqFCaczULzzDyLOoHu2h"
          publishable-key="pk_live_51M9DryFCaczULzzDhcLdJx0EA8pG3JuLAlqdRc4PkW1Nj4p9jD81Ez46qYroTdU2CYFclOf1kAkctGqHaPVwvCYa0064n7XlT2"
        ></stripe-pricing-table>
      </Box>
    </>
  );
}

export default Pricing;
