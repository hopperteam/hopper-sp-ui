async function homeRoute(el, homeTemplate, api, showError) {
    let html = homeTemplate();
    el.html(html);
    $('.ui.accordion')
        .accordion()
    ;

    try {
        // Load Service Provider
        // do all request and then wait
        let subscriber = api.get("/subscribers");
        let sp = api.get("/apps");
        let noti = api.get("/notifications");
        const subscribers = (await subscriber).data;
        const app = (await sp).data;
        const notification = (await noti).data;
        html = homeTemplate({apps: app, subscribers: subscribers, notifications: notification});
        el.html(html);
        $('.ui.accordion')
            .accordion()
        ;
    } catch (e) {
        showError("Error", e);
    }


    $('.loading').removeClass('loading');
}