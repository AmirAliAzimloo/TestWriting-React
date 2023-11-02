import { render, screen } from "@testing-library/react";
import {AppRouter} from "./index"
import { MemoryRouter } from "react-router-dom";

describe("Router",()=>{
    test("should load products page in router",()=>{
        const route = "/products"

        render(
            <MemoryRouter initialEntries={[route]} >
                <AppRouter/>
            </MemoryRouter>
        )

        expect(screen.getByText(/products/i)).toBeInTheDocument()
    })
})