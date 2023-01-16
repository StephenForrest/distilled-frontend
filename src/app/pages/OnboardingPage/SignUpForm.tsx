import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';

function SignupForm() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [role, setRole] = React.useState('');
  const [numberOfEmployees, setNumberOfEmployees] = React.useState('');

  return (
    <>
      <Box
        as="form"
        width={{ base: '100%', md: '500px' }}
        mx="auto"
        px={8}
        py={6}
        rounded="lg"
        bg="white"
      >
        <FormControl>
          <FormLabel htmlFor="first-name">First Name</FormLabel>
          <Input
            id="first-name"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="last-name">Last Name</FormLabel>
          <Input
            id="last-name"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="company">Company</FormLabel>
          <Input
            id="company"
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="role">Role</FormLabel>
          <Select
            id="role"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="">Select a role</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="product-manager">Product Manager</option>
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel htmlFor="number-of-employees">
            Number of Employees
          </FormLabel>
          <Select
            id="number-of-employees"
            value={numberOfEmployees}
            onChange={e => setNumberOfEmployees(e.target.value)}
          >
            <option value="">Select the number of employees</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </Select>
        </FormControl>
      </Box>
      ;
    </>
  );
}

export default SignupForm;
