let title = "Google Classroom";
document.title = title;

let favicon = "https://ssl.gstatic.com/classroom/ic_product_classroom_32.png"
var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
}
link.href = favicon;