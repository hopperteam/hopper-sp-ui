async function spRoute(el, spTemplate, api, showError) {
    let html = spTemplate();
    el.html(html);

    const user = getUser();

    $('.ui.accordion')
        .accordion()
    ;

    if(user) {
        try {
            // Load Service Provider
            const response = await api.get("/apps", {
                params: {
                    token: getToken()
                }
            });
            const apps = response.data;
            let html = spTemplate({apps: apps});
            el.html(html);
            $('.ui.accordion')
                .accordion()
            ;
            await overwriteCreateSpForm(api, showError);
            await overwriteUpdateSpForm(api, showError);
        } catch (e) {
            showError("Error", "An unexpected error occurred");
        }
    } else{
        document.getElementById("CreateSp").disabled = true;
        const field = document.getElementById("errorCreateSp");
        field.style.color = "red";
        field.textContent = "Please login";
    }

    $('.loading').removeClass('loading');
}