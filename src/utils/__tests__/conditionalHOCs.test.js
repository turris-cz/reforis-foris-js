/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { render } from "customTestRender";
import { API_STATE } from "api/utils";
import {
    withEither, withSpinner, withSending, withSpinnerOnSending, withError, withErrorMessage,
} from "../conditionalHOCs";

describe("conditional HOCs", () => {
    const First = () => <p>First</p>;
    const Alternative = () => <p>Alternative</p>;

    describe("withEither", () => {
        it("should render First component", () => {
            const withAlternative = withEither(() => false, Alternative);
            const FirstWithConditional = withAlternative(First);
            const { getByText } = render(<FirstWithConditional />);
            expect(getByText("First")).toBeDefined();
        });

        it("should render Alternative component", () => {
            const withAlternative = withEither(() => true, Alternative);
            const FirstWithConditional = withAlternative(First);
            const { getByText } = render(<FirstWithConditional />);
            expect(getByText("Alternative")).toBeDefined();
        });
    });

    describe("withSpinner", () => {
        it("should render First component", () => {
            const withSpinnerHidden = withSpinner(() => false);
            const FirstWithConditional = withSpinnerHidden(First);
            const { getByText } = render(<FirstWithConditional />);
            expect(getByText("First")).toBeDefined();
        });

        it("should render spinner", () => {
            const withSpinnerVisible = withSpinner(() => true);
            const FirstWithConditional = withSpinnerVisible(First);
            const { container } = render(<FirstWithConditional />);
            expect(container).toMatchSnapshot();
        });
    });

    describe("withSending", () => {
        it("should render First component", () => {
            const withAlternative = withSending(Alternative);
            const FirstWithConditional = withAlternative(First);
            const { getByText } = render(<FirstWithConditional apiState={API_STATE.SUCCESS} />);
            expect(getByText("First")).toBeDefined();
        });

        it("should render Alternative component", () => {
            const withAlternative = withSending(Alternative);
            const FirstWithConditional = withAlternative(First);
            const { getByText } = render(<FirstWithConditional apiState={API_STATE.SENDING} />);
            expect(getByText("Alternative")).toBeDefined();
        });
    });

    describe("withSpinnerOnSending", () => {
        it("should render First component", () => {
            const FirstWithConditional = withSpinnerOnSending(First);
            const { getByText } = render(<FirstWithConditional apiState={API_STATE.SUCCESS} />);
            expect(getByText("First")).toBeDefined();
        });

        it("should render spinner", () => {
            const FirstWithConditional = withSpinnerOnSending(First);
            const { container } = render(<FirstWithConditional apiState={API_STATE.SENDING} />);
            expect(container).toMatchSnapshot();
        });
    });

    describe("withError", () => {
        it("should render First component", () => {
            const withErrorHidden = withError(() => false);
            const FirstWithConditional = withErrorHidden(First);
            const { getByText } = render(<FirstWithConditional />);
            expect(getByText("First")).toBeDefined();
        });

        it("should render error message", () => {
            const withErrorVisible = withError(() => true);
            const FirstWithConditional = withErrorVisible(First);
            const { container } = render(<FirstWithConditional />);
            expect(container).toMatchSnapshot();
        });
    });

    describe("withErrorMessage", () => {
        it("should render First component", () => {
            const FirstWithConditional = withErrorMessage(First);
            const { getByText } = render(<FirstWithConditional apiState={API_STATE.SUCCESS} />);
            expect(getByText("First")).toBeDefined();
        });

        it("should render error message", () => {
            const FirstWithConditional = withErrorMessage(First);
            const { container } = render(<FirstWithConditional apiState={API_STATE.ERROR} />);
            expect(container).toMatchSnapshot();
        });
    });
});
