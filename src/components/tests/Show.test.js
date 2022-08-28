import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const mockShowData = {
   name: 'Stranger Things',
   summary: 'Test Summary',
   seasons: [{
      id: 1,
      name: '1',
      episodes: [],
   },
   {
      id: 2,
      name: '2',
      episodes: [],
   },
   {
      id: 3,
      name: '3',
      episodes: [],
   },
   {
      id: 4,
      name: '4',
      episodes: [],
   }]
}

test('renders without errors', () => {
   render(<Show show={mockShowData} selectedSeason={'none'} />)
});

test('renders Loading component when prop show is null', () => {
   render(<Show show={null} selectedSeason={'none'} />)
});

test('renders same number of options seasons are passed in', () => {
   render(<Show show={mockShowData} selectedSeason={'none'} />)
});

test('handleSelect is called when an season is selected', () => {
   render(<Show show={mockShowData} selectedSeason={'none'} />)
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
   render(<Show show={mockShowData} selectedSeason={'none'} />)
});
