export const getProducts = () => async (Dispatch) => {
    try {
        const data = await fetch("/getproducts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const res = await data.json();
        console.log(res);
        Dispatch({ type: "SUCCESS_GET_PRODUCTS", payload: res })

    } catch (error) {
        Dispatch({ type: "FAIL_GET_PRODUCTS", payload: error.response })
    }
}