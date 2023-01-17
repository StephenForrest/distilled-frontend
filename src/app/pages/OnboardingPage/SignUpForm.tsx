import React from 'react';
import { Box, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

function SignupForm() {
  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await fetch('https://your-form-backend-url', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <FormControl pt="6">
          <FormLabel htmlFor="first-name">First Name</FormLabel>
          <Input id="first-name" isRequired name="first-name" type="text" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="last-name">Last Name</FormLabel>
          <Input id="last-name" isRequired name="last-name" type="text" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="company">Company</FormLabel>
          <Input id="company" isRequired name="company" type="text" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="role">Role</FormLabel>
          <Select id="role" isRequired name="role">
            <option value="">Select a role</option>
            <option value="developer">Developer Advocate</option>
            <option value="designer">Community Manager</option>
            <option value="product-manager">Leadership</option>
            <option value="product-manager">Purchasing</option>
            <option value="product-manager">Project Manager</option>
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="number-of-employees">
            Number of Employees
          </FormLabel>
          <Select
            isRequired
            id="number-of-employees"
            name="number-of-employees"
          >
            <option value="">Select the number of employees</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </Select>
        </FormControl>
        <button type="submit">Submit</button>
      </Box>
    </form>
  );
}

export default SignupForm;
