import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';

import Display from './../Display';
import fetchShow from '../../api/fetchShow';

jest.mock('../../api/fetchShow')

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


test('renders without errors with no props', async () => {
   render(<Display />)
});

test('renders Show component when the button is clicked ', async () => {
   fetchShow.mockResolvedValueOnce(mockShowData)
   render(<Display />)

   const button = screen.getByRole('button')
   userEvent.click(button)

   //Waiting for the Show Component to show
   const displayShow = await screen.findByTestId('show-container')
   expect(displayShow).toBeInTheDocument()
});

test('renders show season options matching your data when the button is clicked', async () => {
   fetchShow.mockResolvedValueOnce(mockShowData)
   render(<Display />)

   const button = screen.getByRole('button')

   await act(async () => {
      userEvent.click(button)
   })

   //Waiting for the Show Component to show
   await waitFor(() => {
      const numSeasons = screen.queryAllByTestId('season-option')
      expect(numSeasons).toHaveLength(4)
   })
});

test('displayFunction is called when the fetch button is pressed', async () => {
   fetchShow.mockResolvedValueOnce(mockShowData)
   const displayFunc = jest.fn()

   render(<Display displayFun={displayFunc()} />)

   const button = screen.getByRole('button')
   userEvent.click(button)

   await waitFor(() => {
      expect(displayFunc).toHaveBeenCalled()
   })
})