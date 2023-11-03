import {render , screen } from "@testing-library/react"
import Products from "./index"
import {rest} from "msw"
import {setupServer} from "msw/node"
import data from "../../mock/products.json"

const server = setupServer(
    rest.get("https://fakestoreapi.com/products",(req,res,ctx)=>{

    return res(
        ctx.status(200),
        ctx.json(data)
    )
    })
)

beforeEach(()=>render(<Products />))
beforeAll(()=>server.listen())
afterEach(()=>server.resetHandlers())
afterAll(()=>server.close())

const getElement = async (element)=>{
    const elements = {
        "loading" : screen.getByText(/loading/i),
        "list" : await screen.findAllByRole("listitem")
    }

    if(elements[element]){ 
        return elements[element]
    }
}
 
describe("Products Component",()=>{

    //1
    test("should show all products properly",async()=>{
        expect(getElement("loading")).toBeInTheDocument();
        const list = await getElement("list")
        expect(list.length).toBe(5)
    })
})