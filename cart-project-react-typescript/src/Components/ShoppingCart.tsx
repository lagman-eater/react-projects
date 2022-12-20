import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../Context/ShoppingCartContext";
import { FormatCurrency } from "../Utilities/FormatCurrecy";
import { CartItem } from "./CartItem";
import storeItems from '../Data/items.json'

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart()
    return <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {cartItems.map(item => (
                    <CartItem key={item.id}{...item} />
                ))}
                <div className="ms-auto fw-bold fs-5">Total {FormatCurrency(cartItems.reduce((total, curr) => {
                    const item = storeItems.find(i => i.id === curr.id)
                    return total + (item?.price || 0) * curr.quantity
                }, 0)
                )}</div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}