import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import ShortenUrlForm from "../ShortenUrlForm";

Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });

export const handlers = [
    rest.post('https://api-ssl.bitly.com/v4/shorten', (req, res, ctx) => res(
          ctx.status(200),
          ctx.json({
            link: 'https://small-link.com'
          }),
        )),
  ]
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

describe("ShortenUrlForm", () => {
    test("shows input and button without error and link copied", async () => {
      render(
        <ShortenUrlForm />
      );
      expect(screen.getByTestId("shorten-input")).toBeInTheDocument();
      expect(screen.getByTestId("shorten-button")).toBeInTheDocument();
      expect(screen.queryByTestId("error-message")).toBeNull();
      expect(screen.queryByTestId("link-is-copied")).toBeNull();
    });
    test("shows error when submitting invalid value", async () => {
        render(
          <ShortenUrlForm />
        );
        const input = screen.getByTestId("shorten-input")
        const submitButton = screen.getByTestId("shorten-button")
        fireEvent.change(input, {target: {value: 'Good Day'}})
        fireEvent.click(submitButton);
        await waitFor(()=> {
            expect(screen.getByTestId("error-message")).toBeInTheDocument();
        })
      });
      test("shows the short value after successful response", async () => {
        render(
          <ShortenUrlForm />
        );
        jest.spyOn(navigator.clipboard, "writeText");
        const input = screen.getByTestId("shorten-input")
        const submitButton = screen.getByTestId("shorten-button")
        fireEvent.change(input, {target: {value: 'http://www.qwerty.com'}})
        fireEvent.click(submitButton);
        await waitFor(()=> {
            expect(screen.getByTestId("link-is-copied")).toBeInTheDocument();
            expect(screen.queryByTestId("error-message")).toBeNull();
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith("https://small-link.com");
        })
      });
  });
  
