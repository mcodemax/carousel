import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";

const cardData = [
  {
    src: image1,
    caption: "Photo by Richard Pasquarella on Unsplash"
  },
  {
    src: image2,
    caption: "Photo by Pratik Patel on Unsplash"
  },
  {
    src: image3,
    caption: "Photo by Josh Post on Unsplash"
  }
]

it("should render", () => {
  render(<Carousel/>)
});

it('should match snapshot', () => {
  const obj = {
    title: 'Test Title',
    cardData: cardData
  };
  const { asFragment } = render(<Carousel {...obj}/>);
  expect(asFragment()).toMatchSnapshot();
});

//test doesn't work on the last arrow, test breaks
it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});
