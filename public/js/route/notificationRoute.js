async function notificationRoute(el, notificationTemplate, api, showError) {
    let html = notificationTemplate();
    el.html(html);

    const user = getUser();

    if(user) {
        try {
            // Load Service Provider
            const response = await api.get("/addresser/getAll", {
                params: {
                    token: getToken()
                }
            });
            const addresser = response.data;
            let html = notificationTemplate({addressers: addresser});
            el.html(html);

            await overwriteCreateNotificationForm(api, showError);

        } catch (e) {
            showError("Error", "An unexpected error occurred");
        }
    } else{
        document.getElementById("CreateNotification").disabled = true;
        const field = document.getElementById("errorCreateNotification");
        field.style.color = "red";
        field.textContent = "Please login";
    }
}