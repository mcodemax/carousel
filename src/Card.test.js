import React from "react";
import { render, fireEvent } from "@testing-library/react"; //but none is installed. You must install peer dependencies yourself. npm warning after installing react testing library
import Card from "./Card";

it("should render", () => {
  render(<Card/>)
});

it("matches snapshot", () => {
    const obj = {
                    caption:"Tst Caption",
                    src: "www.google.com",
                    currNum: 5,
                    totalNum: 10
                };
    const { asFragment } = render(<Card {...obj}/>);
    expect(asFragment()).toMatchSnapshot();
});

