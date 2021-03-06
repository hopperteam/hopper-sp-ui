/*global Handlebars, axios,
* homeRoute, spRoute, subscriberRoute, notificationRoute, userRoute, Router*/
/*eslint no-undef: "error"*/

async function getUser(api, showError) {
    try {
        const response = await api.get("/user");
        return response.data;
    } catch (e) {
        showError("Error", e);
    }
}

window.addEventListener("load", async () => {
    // Instantiate api handler
    const api = axios.create({
        timeout: 5000
    });

    const el = $("#app");

    // Compile Handlebar Templates
    const errorTemplate = Handlebars.compile($("#error-template").html());
    const homeTemplate = Handlebars.compile($("#overview-template").html());
    const spTemplate = Handlebars.compile($("#sp-template").html());
    const subscriberTemplate = Handlebars.compile($("#subscriber-template").html());
    const notificationTemplate = Handlebars.compile($("#notification-template").html());
    const logoutTemplate = Handlebars.compile($("#logout-template").html());

    // Handler Declaration
    const router = new Router({
        mode: "history",
        page404: (path) => {
            const html = errorTemplate({
                color: "yellow",
                title: "Error 404 - Page NOT Found!",
                message: `The path "/${path}" does not exist on this site`,
            });
            el.html(html);
        },
    });

    // Display Error Banner
    const showError = (title, error) => {
        let message = error.message;

        // handle special errors
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    location.replace(error.response.data.reason);
                    return;
                default:
                    message = error.response.data.reason;
            }
        }

        const html = errorTemplate({ color: "red", title, message });
        el.html(html);
    };

    const user = await getUser(api, showError);

    document.getElementById("user").style.color = "black";
    document.getElementById("user").textContent = user.firstName + " " + user.lastName;

    router.add("/", async () => {
        await homeRoute(el, homeTemplate, api, showError);
    });

    router.add("/sp", async () => {
        await spRoute(el, spTemplate, api, showError);
    });

    router.add("/subscribe", async () => {
        await subscriberRoute(el, subscriberTemplate, api, showError);
    });

    router.add("/notification", async () => {
        await notificationRoute(el, notificationTemplate, api, showError);
    });

    router.add("/logoff", async () => {
        await userRoute(el, logoutTemplate, api, showError);
    });

    // Navigate app to current url
    router.navigateTo(window.location.pathname);

    // Highlight Active Menu on Refresh/Page Reload
    const link = $(`a[href$="${window.location.pathname}"]`);
    link.addClass("active");

    $("a").on("click", (event) => {
        // Block browser page load
        event.preventDefault();

        // Highlight Active Menu on Click
        const target = $(event.target);
        $(".item").removeClass("active");
        target.addClass("active");

        // Navigate to clicked url
        const href = target.attr("href");
        const path = href.substr(href.lastIndexOf("/"));
        router.navigateTo(path);
    });
});

function updateSp(id, name, imageUrl, manageUrl, contactEmail, isHidden){
    const form = document.getElementById("formUpdateSp");
    document.getElementById("UpdateSp").disabled = false;
    form.scrollIntoView();
    form.elements.id.value = id;
    form.elements.name.value = name;
    form.elements.imageUrl.value = imageUrl;
    form.elements.manageUrl.value = manageUrl;
    form.elements.contactEmail.value = contactEmail;
    form.elements.isHidden.checked = isHidden;
}
