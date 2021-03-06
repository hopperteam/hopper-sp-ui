async function spRoute(el, spTemplate, api, showError) {
    let html = spTemplate();
    el.html(html);

    $('.ui.accordion')
        .accordion()
    ;

    try {
        // Load Service Provider
        const response = await api.get("/apps");
        const apps = response.data;
        html = spTemplate({apps: apps});
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