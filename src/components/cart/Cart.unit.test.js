import React from "react";
import Cart from "./Cart";

import { render } from "@testing-library/react";

describe("Tests for Cart component", () => {
  it("Should add/remove an product item in cart when listProductItens is updated", () => {
    const { getByTestId } = render(<Cart />);
    //add item on listProductItens

    //check if it renderizes an ProductItem component

    //remove item on listProductItens

    //check if it was removed on component
  });
});
