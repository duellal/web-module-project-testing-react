import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'

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

   const loading = screen.getByTestId(/loading-container/i)

   expect(loading).toBeInTheDocument()
});

test('renders same number of options seasons are passed in', () => {
   render(<Show show={mockShowData} selectedSeason={'none'} />)

   const numSeasons = screen.getAllByTestId(/season-option/i)

   expect(numSeasons).toHaveLength(4)
});

test('handleSelect is called when an season is selected', () => {
   render(<Show show={mockShowData} selectedSeason={'none'} />)

   const seasonThree = screen.getByRole('option', { name: '3' })

   userEvent.selectOptions(
      screen.getByRole('combobox'),
      seasonThree
   )
   userEvent.click(seasonThree)

   expect(seasonThree).toBeInTheDocument()
})

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
   const { rerender } = render(<Show show={mockShowData} selectedSeason={'none'} />)

   let episodes = screen.queryByTestId('episodes-container')

   expect(episodes).not.toBeInTheDocument()

   rerender(<Show show={mockShowData} selectedSeason={'3'} />)

   episodes = screen.getByTestId('episodes-container')

   expect(episodes).toBeInTheDocument()
});
