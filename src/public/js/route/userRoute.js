async function userRoute(el, logoutTemplate, api, showError) {
    async function logoutFunction() {
        try {
            const response = await api.get("/logout");
            location.replace(response.data.redirect);
        } catch (e) {
            showError("Error", e);
        }
    }

    const html = logoutTemplate();
    el.html(html);

    try {
        // Load User
        const response = await api.get("/user");
        const user = response.data;
        let html = logoutTemplate({firstName: user.firstName, lastName: user.lastName});
        el.html(html);

        document.getElementById("logout").addEventListener("click", logoutFunction);

    } catch (e) {
        showError("Error", e);
    }
}