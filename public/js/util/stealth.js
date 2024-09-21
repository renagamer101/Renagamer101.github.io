export default function(url = '') {
    let inFrame;
    try {
        inFrame = window !== top;
    } catch (e) {
        inFrame = true;
    }

    setTimeout(() => {
        if (!navigator.userAgent.includes("Firefox")) {
            const popup = open("about:blank", "_blank");

            if (!popup || popup.closed) {
                alert("StealthEngine was unable to open a popup. (do you have popups disabled?)");
            } else {
                const doc = popup.document;
                const iframe = doc.createElement("iframe");
                const style = iframe.style;

                var isClosed = setInterval(function() {
                    if (popup.closed) {
                        clearInterval(isClosed);
                    }
                }, 1000)

                const img = doc.createElement("link");
                iframe.src = url;
                style.position = "fixed";
                style.top = style.bottom = style.left = style.right = 0;
                style.border = style.outline = "none";
                style.width = style.height = "100%";
                doc.body.appendChild(iframe);
                doc.head.appendChild(img);
            }
        }
    }, 1500)
}