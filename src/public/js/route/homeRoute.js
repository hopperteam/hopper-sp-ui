async function homeRoute(el, homeTemplate, api, showError) {
    let html = homeTemplate();
    el.html(html);
    $('.ui.accordion')
        .accordion()
    ;

    if(getUser()){
        try {
            // Load Service Provider
            // do all request and then wait
            let subscriber = api.get("/subscribers", {
                params: {
                    token: getToken()
                }
            });
            let sp = api.get("/apps", {
                params: {
                    token: getToken()
                }
            });
            let noti = api.get("/notifications", {
                params: {
                    token: getToken()
                }
            });
            const subscribers = (await subscriber).data;
            const app = (await sp).data;
            const notification = (await noti).data;
            let html = homeTemplate({apps: app, subscribers: subscribers, notifications: notification});
            el.html(html);
            $('.ui.accordion')
                .accordion()
            ;
        } catch (e) {
            showError("Error", e);
        }
    }

    $('.loading').removeClass('loading');
}