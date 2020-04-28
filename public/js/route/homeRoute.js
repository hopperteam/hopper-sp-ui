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
            let addresser = api.get("/addresser/getAll", {
                params: {
                    token: getToken()
                }
            });
            let sp = api.get("/sp/getAll", {
                params: {
                    token: getToken()
                }
            });
            let noti = api.get("/notification/getAll", {
                params: {
                    token: getToken()
                }
            });
            const addressers = (await addresser).data;
            const app = (await sp).data;
            const notification = (await noti).data;
            let html = homeTemplate({apps: app, addressers: addressers, notifications: notification});
            el.html(html);
            $('.ui.accordion')
                .accordion()
            ;
        } catch (e) {
            showError("Error", "An unexpected error occurred");
        }
    }

    $('.loading').removeClass('loading');
}