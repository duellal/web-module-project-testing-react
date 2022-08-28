import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const testEpisode = {
   id: 1,
   name: "",
   image: "http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg",
   season: 1,
   number: 1,
   summary: "This is a summary of the episode.",
   runtime: 1
}

const testEpisodeWithoutImage = {
   id: 2,
   name: "",
   image: null,
   season: 2,
   number: 3,
   summary: "This is a summary of the episode.",
   runtime: 43
}


test("renders without error", () => {
   render(<Episode episode={testEpisode} />)
});

test("renders the summary test passed as prop", () => {
   render(<Episode episode={testEpisode} />)

   const summary = screen.getByText(/this is a summary of the episode./i)

   expect(summary).toBeInTheDocument()
   expect(summary).not.toBeNull()
   expect(summary).toBeDefined()
   expect(summary).toHaveTextContent(/this is a summary of the episode./i)
});

test("renders default image when image is not defined", () => {
   render(<Episode episode={testEpisodeWithoutImage} />)

   const altImage = screen.getByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')

   expect(altImage).toBeInTheDocument()
});
