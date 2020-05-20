/*eslint no-undef: "Handlebars"*/

window.addEventListener("load", () => {
    const el = $("#app");

    // Compile Handlebar Templates
    const errorTemplate = Handlebars.compile($("#error-template").html());
    const homeTemplate = Handlebars.compile($("#overview-template").html());
    const spTemplate = Handlebars.compile($("#sp-template").html());
    const subscriberTemplate = Handlebars.compile($("#subscriber-template").html());
    const notificationTemplate = Handlebars.compile($("#notification-template").html());
    const loginTemplate = Handlebars.compile($("#login-template").html());
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

    // Instantiate api handler
    const api = axios.create({
        timeout: 5000
    });

    // Display Error Banner
    const showError = (title, message) => {
        const html = errorTemplate({ color: "red", title, message });
        el.html(html);
    };

    router.add("/", async () => {
        homeRoute(el, homeTemplate, api, showError);
    });

    router.add("/sp", async () => {
        spRoute(el, spTemplate, api, showError);
    });

    router.add("/subscribe", async () => {
        subscriberRoute(el, subscriberTemplate, api, showError);
    });

    router.add("/notification", async () => {
        notificationRoute(el, notificationTemplate, api, showError);
    });

    router.add("/user", async () => {
        userRoute(el, logoutTemplate, loginTemplate, api, showError);
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
    localStorage.removeItem("userToken");
    location.reload();
}

function getUser() {
    return localStorage.getItem("user");
}

function setUser(user) {
    return localStorage.setItem("user", user);
}

function getToken(){
    return localStorage.getItem("userToken");
}

function setToken(token) {
    return localStorage.setItem("userToken", token);
}

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