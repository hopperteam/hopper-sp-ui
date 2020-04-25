window.addEventListener('load', () => {
    const el = $('#app');

    // Compile Handlebar Templates
    const errorTemplate = Handlebars.compile($('#error-template').html());
    const homeTemplate = Handlebars.compile($('#overview-template').html());
    const spTemplate = Handlebars.compile($('#sp-template').html());
    const addresserTemplate = Handlebars.compile($('#addresser-template').html());
    const notificationTemplate = Handlebars.compile($('#notification-template').html());
    const loginTemplate = Handlebars.compile($('#login-template').html());
    const logoutTemplate = Handlebars.compile($('#logout-template').html());

    // Router Declaration
    const router = new Router({
        mode: 'history',
        page404: (path) => {
            const html = errorTemplate({
                color: 'yellow',
                title: 'Error 404 - Page NOT Found!',
                message: `The path '/${path}' does not exist on this site`,
            });
            el.html(html);
        },
    });

    router.add('/', () => {
        let html = homeTemplate();
        el.html(html);
    });

    router.add('/sp', () => {
        let html = spTemplate();
        el.html(html);
    });

    router.add('/addresser', () => {
        let html = addresserTemplate();
        el.html(html);
    });

    router.add('/notification', () => {
        let html = notificationTemplate();
        el.html(html);
    });

    router.add('/user', () => {
        //check if logged in or not
        const user = getUser();
        let html;

        if(user) {
            html = logoutTemplate({user: getUser()});
        } else {
            html = loginTemplate();
        }

        el.html(html);
    });

// Navigate app to current url
    router.navigateTo(window.location.pathname);

// Highlight Active Menu on Refresh/Page Reload
    const link = $(`a[href$='${window.location.pathname}']`);
    link.addClass('active');

    $('a').on('click', (event) => {
        // Block browser page load
        event.preventDefault();

        // Highlight Active Menu on Click
        const target = $(event.target);
        $('.item').removeClass('active');
        target.addClass('active');

        // Navigate to clicked url
        const href = target.attr('href');
        const path = href.substr(href.lastIndexOf('/'));
        router.navigateTo(path);
    });
});

// Set Navigation Bar User Name
window.onload = function () {
    //localStorage.setItem("user", "Test");
    const user = getUser();
    if(user) {
        document.getElementById("user").style.color = "black";
        document.getElementById("user").textContent = user;
    } else {
        document.getElementById("user").textContent = "Login";
    }
};

function logoutFunction() {
    localStorage.removeItem("user");
    location.reload();
}

function getUser() {
    return localStorage.getItem("user");
}