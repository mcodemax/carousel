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

//when you’re on the second image, clicking the left arrow 
// will move you to the first image
it('should go to the previous picture, when on 2nd picture', () => {
  const { queryByTestId, queryByAltText } = render(<Carousel cardData={cardData}/>);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  
  //set carosel to 2nd card
  // move forward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  //on 1st pic here
  expect(queryByAltText(cardData[1].caption)).not.toBeInTheDocument();
  expect(queryByAltText(cardData[0].caption)).toBeInTheDocument();
});

it('should remove left and right arrows at the beginning or end of the slideshow', () => {
  const { queryByTestId } = render(<Carousel cardData={cardData}/>);

  //test for no left arrow on 1st slide
  expect(queryByTestId("left-arrow")).toEqual(null);

  //test for no right arrow on last slide
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  expect(queryByTestId("right-arrow")).toEqual(null);
});