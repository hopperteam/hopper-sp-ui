async function overwriteCreateSubscriberForm(api, showError) {
    // overwrite default submit behavior
    const form = document.getElementById("formCreateSubscriber");
    form.onsubmit = async function () {
        event.preventDefault();
        const body = {
            accountName: form.elements.accountName.value,
            appId: form.elements.appId.value
        };

        const response = await api.post("/subscriber", body);

        try {
            const status = response.data.status.toString();
            if (status.localeCompare("success") == 0) {
                location.replace(response.data.redirect);
            } else {
                const field = document.getElementById("errorCreateSubscriber");
                field.style.color = "red";
                field.textContent = response.data.reason.toString();
            }
        } catch (e) {
            showError("Error", e);
        }
    }
}