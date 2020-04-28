async function overwriteCreateAddresserForm(api, showError) {
    // overwrite default submit behavior
    const form = document.getElementById("formCreateAddresser");
    form.onsubmit = async function () {
        event.preventDefault();
        const body = {
            accountName: form.elements.accountName.value,
            appId: form.elements.appId.value
        };

        const response = await api.post("/addresser/create", body, {
            params: {
                token: getToken()
            }
        });
        try {
            const status = response.data.status.toString();
            if (status.localeCompare("success") == 0) {
                location.replace(response.data.redirect);
            } else {
                const field = document.getElementById("errorCreateAddresser");
                field.style.color = "red";
                field.textContent = response.data.reason.toString();
            }
        } catch (e) {
            showError("Error", "An unexpected error occurred");
        }
    }
}