async function overwriteCreateSpForm(api, showError) {
    // overwrite default submit behavior
    const form = document.getElementById("formCreateSp");
    form.onsubmit = async function () {
        event.preventDefault();
        const body = {
            name: form.elements.name.value,
            imageUrl: form.elements.imageUrl.value,
            manageUrl: form.elements.manageUrl.value,
            contactEmail: form.elements.contactEmail.value,
            isHidden: form.elements.isHidden.checked
        };

        // don't send if null
        if(!body.manageUrl){
            delete body.manageUrl;
        }

        const response = await api.post("/app", body);
        try {
            const status = response.data.status.toString();
            if (status.localeCompare("success") == 0) {
                location.replace("/");
            } else {
                const field = document.getElementById("errorCreateSp");
                field.style.color = "red";
                field.textContent = response.data.reason.toString();
            }
        } catch (e) {
            showError("Error", e);
        }
    }
}

async function overwriteUpdateSpForm(api, showError) {
    const form = document.getElementById("formUpdateSp");
    form.onsubmit = async function () {
        event.preventDefault();
        const body = {
            id: form.elements.id.value,
            name: form.elements.name.value,
            imageUrl: form.elements.imageUrl.value,
            manageUrl: form.elements.manageUrl.value,
            contactEmail: form.elements.contactEmail.value,
            isHidden: form.elements.isHidden.checked,
            newCert: form.elements.newCert.checked
        };

        const response = await api.put("/app", body);

        try {
            const status = response.data.status.toString();
            if (status.localeCompare("success") == 0) {
                location.replace("/");
            } else {
                const field = document.getElementById("errorUpdateSP");
                field.style.color = "red";
                field.textContent = response.data.reason.toString();
            }
        } catch (e) {
            showError("Error", e);
        }
    }
}