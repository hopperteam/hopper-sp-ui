async function subscriberRoute(el, subscriberTemplate, api, showError) {
    let html = subscriberTemplate();
    el.html(html);

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
        showError("Error", e);
    }
}