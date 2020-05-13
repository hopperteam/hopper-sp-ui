async function userRoute(el, logoutTemplate, loginTemplate, api, showError) {
    //check if logged in or not
    const user = getUser();
    let html;

    if(user) {
        html = logoutTemplate({user: getUser()});
    } else {
        html = loginTemplate();
    }

    el.html(html);

    if(!user) {
        $('.ui.accordion')
            .accordion()
        ;
        await overwriteSignInForm(api, showError);
        await overwriteSignUpForm(api, showError);
    }
}