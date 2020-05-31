async function userRoute(el, logoutTemplate, api, showError) {

    let html = logoutTemplate();
    el.html(html);

    try {
        // Load User
        const response = await api.get("/user");
        const user = response.data;
        let html = logoutTemplate({firstName: user.firstName, lastName: user.lastName});
        el.html(html);

        document.getElementById("logout").addEventListener("click", function(){
            logoutFunction(api, showError);
        });

    } catch (e) {
        showError("Error", e);
    }
}

async function logoutFunction(api, showError) {
    try {
        const response = await api.get("/logout");
        location.replace(response.data.redirect);
    } catch (e) {
        showError("Error", e);
    }
}