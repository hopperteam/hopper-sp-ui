async function subscriberRoute(el, subscriberTemplate, api, showError) {
    let html = subscriberTemplate();
    el.html(html);

    const user = getUser();

    if(user) {
        try {
            // Load Service Provider
            const response = await api.get("/apps", {
                params: {
                    token: getToken()
                }
            });
            const apps = response.data;
            let html = subscriberTemplate({apps: apps});
            el.html(html);

            await overwriteCreateSubscriberForm(api, showError);

        } catch (e) {
            showError("Error", "An unexpected error occurred");
        }
    } else{
        document.getElementById("CreateSubscriber").disabled = true;
        const field = document.getElementById("errorCreateSubscriber");
        field.style.color = "red";
        field.textContent = "Please login";
    }
}