async function addresserRoute(el, addresserTemplate, api, showError) {
    let html = addresserTemplate();
    el.html(html);

    const user = getUser();

    if(user) {
        try {
            // Load Service Provider
            const response = await api.get("/sp/getAll", {
                params: {
                    token: getToken()
                }
            });
            const apps = response.data;
            let html = addresserTemplate({apps: apps});
            el.html(html);

            await overwriteCreateAddresserForm(api, showError);

        } catch (e) {
            showError("Error", "An unexpected error occurred");
        }
    } else{
        document.getElementById("CreateAddresser").disabled = true;
        const field = document.getElementById("errorCreateAddresser");
        field.style.color = "red";
        field.textContent = "Please login";
    }
}