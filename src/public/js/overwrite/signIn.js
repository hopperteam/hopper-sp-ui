async function overwriteSignInForm(api) {
    // overwrite default submit behavior
    const form = document.getElementById("formSignIn");
    form.onsubmit = async function () {
        event.preventDefault();
        const body = {
            email: form.elements.email.value,
            password: form.elements.password.value
        };
        const response = await api.post("/signIn", body);
        try {
            const status = response.data.status.toString();
            if(status.localeCompare("success") == 0){
                setUser(form.elements.email.value);
                setToken(response.data.token);
                location.replace("/");
            } else {
                const field = document.getElementById("errorSignIn");
                field.style.color = "red";
                field.textContent = response.data.reason.toString();
            }
        } catch (e) {
            showError("Error", e);
        }
    }
}