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
            document.querySelector('.modal-content').innerHTML =
                doc.querySelector('.modal-content').innerHTML;
            setTimeout(() => {
                setDownloadHandler();
                setCloseHandler();
            }, 0);
        })
        .catch((error) => console.error("Ошибка:", error));
    };
});