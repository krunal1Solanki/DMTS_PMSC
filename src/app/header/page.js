"use client";
import React, { useEffect, useState } from 'react';
import { FaWater, FaCalendarAlt, FaUsers, FaCog, FaPowerOff } from 'react-icons/fa';
import { Box, Flex, Heading, Icon, Spacer, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const headerStyles = {
    backgroundColor: 'teal.1200',
    color: 'white',
    height: '53px',
    borderBottom: '2px solid #4A5568',
    boxShadow: '0px 2px 4px rgba(1, 2, 2, 5)',
    top: 0,
    width: '100%',
    zIndex: 1000,
    padding: '0.5rem 2rem',
  };

  const logoStyles = {
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    letterSpacing: '1px',
    marginLeft: '0.5rem',
    userSelect: 'none',
  };

  const menuStyles = {
    gap: '1.5rem',
    mr: '2rem',
    display: 'flex',
    alignItems: 'center',
  };

  const menuItemStyles = {
    cursor: 'pointer',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    transition: 'color 0.3s',
    _hover: { color: '#63B3ED' },
  };

  const iconStyles = {
    fontSize: '1.2rem',
    marginRight: '0.5rem',
  };

  return (
    <Flex {...headerStyles}>
      <Flex align="center" {...menuStyles}>
        <Icon color={'teal'} as={FaWater} {...iconStyles} />
        <Heading
          {...logoStyles}
          onClick={() => router.push('/')}
          bgClip="text"
        >
          <span style={{ color: 'teal' }}>Aqualogix</span>{' '}
          <span style={{ color: 'teal' }}>DMTS</span>
        </Heading>
        <Spacer />
      </Flex>
      <Spacer />
      <Flex align="center" {...menuStyles} color={'teal'}>
        <Box {...menuItemStyles} onClick={() => router.push('/scheduler')}>
          <Icon as={FaCalendarAlt} {...iconStyles} />
          Dashboard
        </Box>
        <Box {...menuItemStyles} onClick={() => router.push('/users')}>
          <Icon as={FaUsers} {...iconStyles} />
          Users
        </Box>
        <Box {...menuItemStyles} onClick={() => router.push('/settings')}>
          <Icon as={FaCog} {...iconStyles} />
          Settings
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
