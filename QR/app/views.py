from django.shortcuts import render
import qrcode
from io import BytesIO
import base64
from django.http import HttpResponse
import io


def home(request):
    qr_data = None
    if request.method == "POST":
        data = request.POST.get("data", "")
        style = request.POST.get("style", "default")

        if style == "style1":
            fill_color = "#98FF98"
            back_color = "#FFB6C1"
        elif style == "style2":
            fill_color = "#33FF57"
            back_color = "#000000"
        elif style == "style3":
            fill_color = "#FF1493"
            back_color = "#000000"
        elif style == "style4":
            fill_color = "white"
            back_color = "black"
        else:
            fill_color = "#000000"
            back_color = "#FFFFFF"

        if data:
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_H,
                box_size=10,
                border=4,
            )
            qr.add_data(data)
            qr.make(fit=True)
            img = qr.make_image(fill_color=fill_color, back_color=back_color)

            buffer = BytesIO()
            img.save(buffer, format="PNG")
            buffer.seek(0)
            qr_data = (
                "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode()
            )
    return render(request, "app/home.html", {"data": qr_data})


def qr_modal(request):
    data = None
    if request.method == "POST":
        qr_data = request.POST.get("data", "")
        if qr_data:
            img = qrcode.make(qr_data)
            buf = io.BytesIO()
            img.save(buf, format="PNG")
            image_stream = buf.getvalue()
            data = "data:image/png;base64," + base64.b64encode(image_stream).decode()
    return render(
        request,
        "app/modal.html",
        {
            "data": data,
        },
    )

from django.shortcuts import render
import qrcode
from io import BytesIO
import base64
from django.http import HttpResponse


def home(request):
    qr_data = None
    if request.method == "POST":
        data = request.POST.get("data", "")
        style = request.POST.get("style", "default")  

        
        if style == "style1":
            fill_color = "#98FF98"
            back_color = "#FFB6C1"
        elif style == "style2":
            fill_color = "#33FF57"
            back_color = "#000000"
        elif style == "style3":
            fill_color = "#FF1493"
            back_color = "#000000"
        elif style == "style4":
            fill_color = "white"
            back_color = "black"
        else:
            fill_color = "#000000"
            back_color = "#FFFFFF"

        if data:
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_H,
                box_size=10,
                border=4,
            )
            qr.add_data(data)
            qr.make(fit=True)
            img = qr.make_image(fill_color=fill_color, back_color=back_color)

            buffer = BytesIO()
            img.save(buffer, format="PNG")
            buffer.seek(0)
            qr_data = (
                "data:image/png;base64," + base64.b64encode(buffer.getvalue()).decode()
            )
    return render(request, "app/home.html", {"data": qr_data})
