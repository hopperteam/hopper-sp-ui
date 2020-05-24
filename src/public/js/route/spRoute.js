async function spRoute(el, spTemplate, api, showError) {
    let html = spTemplate();
    el.html(html);

    $('.ui.accordion')
        .accordion()
    ;

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
        showError("Error", e);
    }

    $('.loading').removeClass('loading');
}