import {render , screen , fireEvent } from "@testing-library/react"
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
        "list" : await screen.findAllByRole("listitem"),
        "options" :  screen.getAllByRole("option")
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

    //2
    test("should filter for jewelery terms",async()=>{
        const list = await getElement("list")
        
        // click on one of the options in filter select
        // userEvent or fireEvent

        await fireEvent.change(screen.getByRole("combobox"),{target:{value:"jewerly"}})
        const options = getElement("options")

        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeFalsy();
        expect(options[2].selected).toBeTruthy();
        expect(options[3].selected).toBeFalsy(); 
        expect(options[4].selected).toBeFalsy();
    
        expect(screen.getAllByRole("listitem")).toEqual([list[1]])
        expect(screen.queryByText("product1")).not.toBeInTheDocument()
        expect(screen.getByText("product2")).toBeInTheDocument()

    })
})