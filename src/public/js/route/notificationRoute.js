async function notificationRoute(el, notificationTemplate, api, showError) {
    let html = notificationTemplate();
    el.html(html);

    const user = getUser();

    if(user) {
        try {
            // Load Service Provider
            const response = await api.get("/subscribers", {
                params: {
                    token: getToken()
                }
            });
            const subscriber = response.data;
            let html = notificationTemplate({subscribers: subscriber});
            el.html(html);

            await overwriteCreateNotificationForm(api, showError);

        } catch (e) {
            showError("Error", e);
        }
    } else{
        document.getElementById("CreateNotification").disabled = true;
        const field = document.getElementById("errorCreateNotification");
        field.style.color = "red";
        field.textContent = "Please login";
    }
}