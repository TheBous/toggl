/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";

import App from "../App";

describe("<App />", () => {
    const {container: app} = render(<App />);
    test("App matches the snapshot", () => {
        expect(app).toMatchSnapshot();
    });
});
