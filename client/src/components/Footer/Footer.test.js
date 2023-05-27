

it("test_cart_has_products", () => {
    const mockCart = [{_id: 1, name: "Product 1", price: 10, photo: "path/to/photo"}]
    localStorage.setItem("Cart", JSON.stringify(mockCart))
    const wrapper = shallow(<Footer />)
    expect(wrapper.find(".product")).toHaveLength(1)
})