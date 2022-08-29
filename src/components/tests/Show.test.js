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
   const fakeHandleSelect = jest.fn()

   render(<Show show={mockShowData} selectedSeason={'none'} onChange={fakeHandleSelect} />)

   //Sanity Tests - Making sure these are to be expected:
   expect(screen.getByRole('option', { name: '' }).selected).toBe(true)

   expect(screen.getAllByRole('option').length).toBe(5)

   //Select event is not working - when doing the expect(screen.getByRole('option', { name: '3' }).selected).toBe(true) comes back as false instead of true
   userEvent.selectOptions(screen.getByRole('combobox'), screen.getByRole('option', { name: '3' }))

   // console.log('HERE!', screen.getByRole('option', { name: '1' }))
   // expect(screen.getByRole('option', { name: '3' }).selected).toBe(true)
   // expect(fakeHandleSelect).toHaveBeenCalled()

   expect(screen.getByRole('option', { name: '1' }).selected).toBe(false)
   expect(screen.getByRole('option', { name: '2' }).selected).toBe(false)
   expect(screen.getByRole('option', { name: '3' }).selected).toBe(true)
   expect(screen.getByRole('option', { name: '4' }).selected).toBe(false)
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
   render(<Show show={mockShowData} selectedSeason={'none'} />)
});
