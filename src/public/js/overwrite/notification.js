async function overwriteCreateNotificationForm(api, showError) {
    // overwrite default submit behavior
    const form = document.getElementById("formCreateNotification");
    form.onsubmit = async function () {
        event.preventDefault();
        const body = {
            subscriberId: form.elements.subscriberId.value,
            heading: form.elements.heading.value,
            imageUrl: form.elements.imageUrl.value,
            type: form.elements.type.value,
            isDone: form.elements.isDone.checked,
            isSilent: form.elements.isSilent.checked,
            isArchived: form.elements.isArchived.checked,
            content: form.elements.content.value
        };

        // don't send if null
        if(!body.imageUrl){
            delete body.imageUrl;
        }

        const response = await api.post("/notification", body);

        try {
            const status = response.data.status.toString();
            if (status.localeCompare("success") == 0) {
                location.replace("/");
            } else {
                const field = document.getElementById("errorCreateNotification");
                field.style.color = "red";
                field.textContent = response.data.reason.toString();
            }
        } catch (e) {
            showError("Error", e);
        }
    }
}