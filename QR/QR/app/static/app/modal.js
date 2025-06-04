document.addEventListener("DOMContentLoaded", function() {
    function setDownloadHandler() {
        const downloadBtn = document.getElementById("downloadBtn");
        const qrImage = document.getElementById("qrImage");
        if (downloadBtn && qrImage) {
            downloadBtn.onclick = function() {
                const link = document.createElement('a');
                link.href = qrImage.src;
                link.download = 'qr_code.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
        }
    }

    function setCloseHandler() {
        const modal = document.getElementById("qrModal");
        const closeBtn = document.querySelector(".close");
        if (closeBtn && modal) {
            closeBtn.onclick = function () {
                modal.style.display = "none";
            };
        }
    }

    setDownloadHandler();
    setCloseHandler();

    window.changeStyle = function(style) {
        const modalContent = document.querySelector('.modal-content');
        modalContent.classList.add('loading');

        const formData = new FormData(document.getElementById("styleForm"));
        formData.set("style", style);

        fetch("", {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value,
            },
        })
        .then((response) => response.text())
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            requestAnimationFrame(() => {
                modalContent.innerHTML = doc.querySelector('.modal-content').innerHTML;
                setDownloadHandler();
                setCloseHandler();
                modalContent.classList.remove('loading');
            });
        })
        .catch((error) => {
            console.error("Ошибка:", error);
            showErrorNotification("Произошла ошибка при обновлении стиля QR-кода");
        });
    };

    function showErrorNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
});