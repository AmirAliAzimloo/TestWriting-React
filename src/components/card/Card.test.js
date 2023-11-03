import {screen , render , act} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card"

const cardProps={
    title:"product1" ,
    price:"1000" ,
    description:"description of product1" ,
    image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" ,
    rating:{rate:3.5}
}

const getElement = (element)=>{
    const elements = {
        "title" : screen.getByText(cardProps.title),
        "price" : screen.getByText(`$${cardProps.price}`),
        "description" : screen.getByText(cardProps.description),
        "image" : screen.getByRole("img"),
        "rating" : screen.getByText(`${cardProps.rating.rate}`,{exact:false}),
        "button" : screen.getByRole("button")
    }

    if(elements[element]){
        return elements[element]
    }
}

const changeElement = (element)=>{
    act(()=>{
        userEvent.click(element)
    })
}

describe("Card Component",()=>{
    
    //1
    test("should show all card items properly",()=>{

        const view = render(<Card {...cardProps} />)

        const image = getElement("image")
        expect(image).toBeInTheDocument()
        expect(image.src).toContain(cardProps.image)

        const title = getElement("title")
        expect(title).toBeInTheDocument()

        const price  = getElement("price")
        expect(price).toBeInTheDocument()

        const description = getElement("description")
        expect(description).toBeInTheDocument()


        const rate= getElement("rating")
        expect(rate).toBeInTheDocument()

        expect(view.container.getElementsByClassName("price")[0]).toBeInTheDocument()
    })


    //2
    test("should change the button text after selecting card",()=>{
        render(
            <Card {...cardProps} />
        )

        // before click
        const button = getElement("button")
        expect(button).toHaveTextContent("Add to Cart")
        
        // after click
        changeElement(button)
        expect(button).toHaveClass("selected")
        expect(button).toHaveTextContent("selected")

        //after double click
        changeElement(button)
        expect(button).not.toHaveClass("selected")
        expect(button).toHaveTextContent("Add to Cart")

    })
})