import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import App from "./App"

describe("Componente Principal", ()=> {
    it("Deve adicionar um Todo", async()=>{
        render(<App/>)

        const button = screen.getByRole("button");

        const input = screen.getByPlaceholderText("Procurar ou adicionar um todo...");

        await userEvent.type(input, "Fazer o todo");

        await userEvent.click(button);

        const todo = screen.getByText("Fazer o todo");

        expect(todo).toBeTruthy();
    })
})