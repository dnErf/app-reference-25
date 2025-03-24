document
    .querySelectorAll(".cart-quantity-selector button")
    .forEach((button) => {
        button.addEventListener("click", () => {
            const input = button.parentElement.querySelector("input")
            const value = Number(input)
            const isPlus = button.classList.contains("plus")
            const key = button.closest(".cart-item").getAttribute("data-key")

            if (isPlus) {
                input.value = value + 1
            }
            else if (value > 1) {
                input.value = value - 1
            }
        })
    })

    document.querySelectorAll(".remove-item")
        .forEach((remove) => {
            e.preventDefault()

            const item = remove.closest(".cart-item")
            const key = item.getAttribute("data-key")

            axios.post("/cart/change.js", {
                id: key,
                quantity: 0
            })
            .then((res) => {
                if (res.data.items.length === 0) {
                    document.querySelector("#cart_form").remove()
                    const html = document.createElement("div")
                    html.innerHTML = ``
                    document.querySelector(".cart .width").appendChild(html)
                }
            })
        })

    function changeItemQuantity(key, quantity) {
        axios
            .post("/cart/change.js", {
                id: key,
                quantity
            })
            .then((res) => {
                const totalDiscount = res.data.total_discount
                const totalPrice = res.data.total_price
                const item = res.data.items.find((item) => item.key === key)
                const itemPrice = item.final_line_price

                document.querySelector(`[data-key="${key}"] .line-item-price`)
                    .textContent = itemPrice
            })
    }