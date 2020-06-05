async function notificationRoute(el, notificationTemplate, api, showError) {
    let html = notificationTemplate();
    el.html(html);

    try {
        // Load Service Provider
        const response = await api.get("/subscribers");
        const subscriber = response.data;
        html = notificationTemplate({subscribers: subscriber});
        el.html(html);

        await overwriteCreateNotificationForm(api, showError);

    } catch (e) {
        showError("Error", e);
    }
}